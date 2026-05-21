"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BookingModal({ car }) {
  const session = authClient.useSession();
  const user = session.data?.user;
  const router = useRouter();
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) return 0;
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = calculateDays();
  const totalPrice = days * car.dailyRentPrice;

  const handleBook = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select pickup and return dates");
      return;
    }
    if (days <= 0) {
      toast.error("Return date must be after pickup date");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            carId: car._id,
            carName: car.carName,
            carImage: car.imageURL,
            dailyRentPrice: car.dailyRentPrice,
            totalPrice,
            startDate,
            endDate,
            driverNeeded,
            specialNote,
          }),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Booking failed");
      }

      toast.success("Car booked successfully!");
      document.getElementById("booking_modal").close();
      router.push("/my-bookings");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="btn btn-primary rounded-full px-8"
        onClick={() => {
          if (user) {
            document.getElementById("booking_modal").showModal();
          } else {
            router.push("/login");
          }
        }}
      >
        Book Now
      </button>

      <dialog id="booking_modal" className="modal">
        <div className="modal-box bg-base-200 rounded-2xl max-w-md">
          <h3 className="font-bold text-xl mb-4">Book {car.carName}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label text-sm">Pickup Date</label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  min={new Date().toISOString().split("T")[0]}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label text-sm">Return Date</label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  min={startDate || new Date().toISOString().split("T")[0]}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {days > 0 && (
              <div className="bg-base-300 p-3 rounded-lg">
                <p className="text-sm">
                  ${car.dailyRentPrice} × {days} day{days !== 1 && "s"}
                </p>
                <p className="text-xl font-bold text-primary">
                  Total: ${totalPrice}
                </p>
              </div>
            )}

            <label className="label cursor-pointer justify-start gap-4">
              <span className="label-text font-medium">Driver Needed?</span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={driverNeeded}
                onChange={(e) => setDriverNeeded(e.target.checked)}
              />
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Special requests or notes..."
              rows={3}
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form>
            <button
              className="btn btn-primary rounded-full"
              onClick={handleBook}
              disabled={isLoading || days === 0}
            >
              {isLoading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
              Confirm Booking (${totalPrice})
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
