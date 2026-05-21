"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

const CarsContext = createContext();

export function CarsProvider({ children }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const isMounted = useRef(true);

  const fetchCars = useCallback(async () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (selectedType) params.append("type", selectedType);
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/cars${params.toString() ? `?${params}` : ""}`;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error(`Failed to fetch cars: ${res.status}`);
      const data = await res.json();
      if (isMounted.current) setCars(data);
    } catch (err) {
      if (isMounted.current) setError(err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, [searchTerm, selectedType]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchCars().catch(() => {});
    return () => {
      abortController.abort();
      isMounted.current = false;
    };
  }, [fetchCars]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

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
