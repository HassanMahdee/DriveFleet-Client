"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddCar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState("true");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCar = Object.fromEntries(formData.entries());
    if (
      !newCar.carName ||
      !newCar.brand ||
      !newCar.dailyRentPrice ||
      !newCar.imageURL ||
      !newCar.seatCapacity ||
      !newCar.pickupLocation ||
      !newCar.description
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const carToSend = {
      ...newCar,
      dailyRentPrice: Number(newCar.dailyRentPrice),
      seatCapacity: Number(newCar.seatCapacity),
      available: availability === "true" ? true : false,
    };

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carToSend),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add car");
      }

      toast.success("Car added successfully!");
      router.push("/my-cars");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-base-content mb-8">
        Add a New Car
      </h1>
      <form
        onSubmit={handleSubmit}
        className="card bg-base-200 rounded-2xl p-6 shadow-md space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Car Name *</span>
            </label>
            <input
              type="text"
              name="carName"
              placeholder="e.g., Bugatti Chiron Super Sport"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Brand *</span>
            </label>
            <input
              type="text"
              name="brand"
              placeholder="e.g., Bugatti"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Car Type *</span>
            </label>
            <select
              name="carType"
              className="select select-bordered w-full"
              required
            >
              <option value="SUV">Luxury SUV</option>
              <option value="SUV">Sport</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury Sedan</option>
              <option value="Hypercar">Hypercar</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Daily Rent Price (৳) *
              </span>
            </label>
            <input
              type="number"
              name="dailyRentPrice"
              placeholder="e.g., 85000"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-medium">Image URL *</span>
            </label>
            <input
              type="url"
              name="imageURL"
              placeholder="https://images.unsplash.com/..."
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Seat Capacity *</span>
            </label>
            <input
              type="number"
              name="seatCapacity"
              placeholder="e.g., 2"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Pickup Location *</span>
            </label>
            <input
              type="text"
              name="pickupLocation"
              placeholder="e.g., Gulshan 2, Dhaka"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-medium">Description *</span>
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Detailed description of the car..."
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <span className="label-text font-medium">Available for Rent</span>
              <input
                type="checkbox"
                name="available"
                className="checkbox checkbox-primary"
                defaultChecked
                onChange={(e) => setAvailability(e.target.checked)}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary rounded-full px-8"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
}
