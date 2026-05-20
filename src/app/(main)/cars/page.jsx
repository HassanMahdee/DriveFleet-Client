"use client";
import { useCars } from "@/contexts/carsContext";
import CarCard from "@/components/cards/carCard";
import Spinner from "@/components/loader/loader";

export default function ExploreCars() {
  const {
    cars,
    loading,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    carTypes,
  } = useCars();

  if (loading) {
    return <Spinner />;
  }
  console.log(cars);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by car name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered"
      />
      <select
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
}
