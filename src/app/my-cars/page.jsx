"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

export default function MyAddedCars() {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingCar, setUpdatingCar] = useState(null);
  const [editForm, setEditForm] = useState({
    dailyRentPrice: "",
    description: "",
    available: true,
    imageURL: "",
    carType: "",
    pickupLocation: "",
  });

  useEffect(() => {
    const fetchMyCars = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-cars`,
        );
        if (!res.ok) throw new Error("Failed to fetch your cars");
        const data = await res.json();
        setCars(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCars();
  }, []);

  const handleDelete = async (carId, carName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${carName}"?`,
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${carId}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error("Delete failed");
      toast.success(`${carName} deleted`);
    } catch (err) {
      toast.error(err.message);
    }
    router.refresh();
  };

  const openUpdateModal = (car) => {
    setUpdatingCar(car);
    setEditForm({
      dailyRentPrice: car.dailyRentPrice,
      description: car.description,
      available: car.available,
      imageURL: car.imageURL,
      carType: car.carType,
      pickupLocation: car.pickupLocation,
    });
    document.getElementById("update_modal").showModal();
  };

  const handleUpdate = async (e) => {
    if (!updatingCar) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${updatingCar._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        },
      );
      if (!res.ok) throw new Error("Update failed");
      toast.success("Car updated successfully");
      router.refresh();
      document.getElementById("update_modal").close();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const carTypes = [
    "SUV",
    "Sedan",
    "Hatchback",
    "Luxury",
    "Hypercar",
    "Electric",
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-base-content mb-8">
        My Added Cars
      </h1>

      {cars.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-base-content/70">
            You haven&apos;t added any cars yet.
          </p>
          <button
            onClick={() => router.push("/add-car")}
            className="btn btn-primary mt-4 rounded-full"
          >
            Add Your First Car
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="card bg-base-200 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <figure className="relative h-48 w-full">
                <Image
                  src={car.imageURL}
                  alt={car.carName}
                  fill
                  className="object-cover"
                />
              </figure>
              <div className="card-body p-5">
                <h2 className="card-title text-xl font-semibold">
                  {car.carName}
                </h2>
                <p className="text-primary font-bold text-lg">
                  ${car.dailyRentPrice}/day
                </p>
                <div className="flex gap-2 flex-wrap mt-1">
                  <span className="badge badge-outline">{car.carType}</span>
                  <span
                    className={`badge ${car.available ? "badge-success" : "badge-error"}`}
                  >
                    {car.available ? "Available" : "Unavailable"}
                  </span>
                </div>
                <p className="text-sm text-base-content/70 mt-2">
                  {car.pickupLocation}
                </p>
                <p className="text-sm line-clamp-2">{car.description}</p>
                <div className="card-actions justify-end mt-4 gap-2">
                  <button
                    onClick={() => openUpdateModal(car)}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(car._id, car.carName)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <dialog id="update_modal" className="modal">
        <div className="modal-box bg-base-200 rounded-2xl max-w-lg">
          <h3 className="font-bold text-xl mb-4">Update Car</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="form-control">
              <label className="label">Daily Rent Price ($)</label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={editForm.dailyRentPrice}
                onChange={(e) =>
                  setEditForm({ ...editForm, dailyRentPrice: e.target.value })
                }
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Image URL</label>
              <input
                type="url"
                className="input input-bordered w-full"
                value={editForm.imageURL}
                onChange={(e) =>
                  setEditForm({ ...editForm, imageURL: e.target.value })
                }
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Car Type</label>
              <select
                className="select select-bordered w-full"
                value={editForm.carType}
                onChange={(e) =>
                  setEditForm({ ...editForm, carType: e.target.value })
                }
              >
                {carTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">Pickup Location</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={editForm.pickupLocation}
                onChange={(e) =>
                  setEditForm({ ...editForm, pickupLocation: e.target.value })
                }
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Description</label>
              <textarea
                rows={3}
                className="textarea textarea-bordered w-full"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                required
              />
            </div>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <span className="label-text">Available for rent</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={editForm.available}
                  onChange={(e) =>
                    setEditForm({ ...editForm, available: e.target.checked })
                  }
                />
              </label>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => document.getElementById("update_modal").close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary rounded-full">
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
