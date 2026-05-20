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
    let isMounted = true;
    const fetchCars = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`);
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
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      !searchTerm ||
      car.carName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || car.carType === selectedType;
    return matchesSearch && matchesType;
  });

  const carTypes = [...new Set(cars.map((car) => car.carType))];

  return (
    <CarsContext.Provider
      value={{
        cars: filteredCars,
        allCars: cars,
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
