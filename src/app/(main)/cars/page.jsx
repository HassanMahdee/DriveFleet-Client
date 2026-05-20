"use client";
import { useCars } from "@/contexts/carsContext";
import CarCard from "@/components/cards/carCard";
import Spinner from "@/components/loader/loader";
import { useState, useEffect } from "react";

export default function ExploreCars() {
  const {
    cars,
    loading,
    setSearchTerm,
    selectedType,
    setSelectedType,
    carTypes,
  } = useCars();
  const [tempSearch, setTempSearch] = useState("");
  useEffect(() => {
    setSearchTerm("");
    setSelectedType("");
  }, [setSearchTerm, setSelectedType]);
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-4 justify-center">
        <input
          type="text"
          placeholder="Search by car name"
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
          className="input input-bordered"
        />
        <button
          className="btn btn-primary"
          onClick={() => setSearchTerm(tempSearch)}
        >
          Search
        </button>
        <select
          className="select select-bordered"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          {carTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-4">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
}
