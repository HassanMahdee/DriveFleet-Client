"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CarsContext = createContext();

export function CarsProvider({ children }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (selectedType) params.append("type", selectedType);

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/cars${params.toString() ? `?${params}` : ""}`;
    const fetchCars = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch cars");
        const data = await res.json();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [searchTerm, selectedType]);

  const carTypes = [...new Set(cars.map((car) => car.carType))];

  return (
    <CarsContext.Provider
      value={{
        cars,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedType,
        setSelectedType,
        carTypes,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarsContext);
  if (!context) throw new Error("useCars must be used within CarsProvider");
  return context;
}
