"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

export default function MyBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings`,
        );
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId, carName) => {
    const confirmCancel = window.confirm(`Cancel booking for "${carName}"?`);
    if (!confirmCancel) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${bookingId}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error("Cancellation failed");
      toast.success(`Booking for ${carName} cancelled`);
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-base-content mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-base-content/70">
            You haven&apos;t booked any cars yet.
          </p>
          <Link href="/cars" className="btn btn-primary mt-4 rounded-full">
            Explore Cars
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="card bg-base-200 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col sm:flex-row"
            >
              <div className="relative h-40 sm:h-auto sm:w-40 shrink-0">
                <Image
                  src={booking.carImage}
                  alt={booking.carName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="card-body p-5 flex-1">
                <Link
                  href={`/cars/${booking.carId}`}
                  className="hover:underline"
                >
                  <h2 className="card-title text-xl font-semibold text-primary">
                    {booking.carName}
                  </h2>
                </Link>
                <p className="text-lg font-bold text-primary">
                  Total: ${booking.totalPrice}
                </p>
                <p className="text-sm text-base-content/70">
                  📅 {new Date(booking.startDate).toLocaleDateString()} →{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p className="text-sm">💰 ${booking.dailyRentPrice} per day</p>
                <div className="flex flex-wrap gap-2 text-sm text-base-content/80">
                  <span>
                    🚗 Driver needed: {booking.driverNeeded ? "Yes" : "No"}
                  </span>
                  {booking.specialNote && (
                    <span className="italic">
                      📝 Note: {booking.specialNote}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <Link
                    href={`/cars/${booking.carId}`}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    📅 Booked on:{" "}
                    {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Link>
                  <button
                    onClick={() => handleCancel(booking._id, booking.carName)}
                    className="btn btn-sm btn-error rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
