'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function BookingModal({ car }) {
  const router = useRouter();
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBook = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId: car._id,
          carName: car.carName,
          carImage: car.imageURL,
          dailyRentPrice: car.dailyRentPrice,
          driverNeeded,
          specialNote,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Booking failed');
      }

      toast.success('Car booked successfully!');
      document.getElementById('booking_modal').close();
      router.push('/my-bookings');
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
        onClick={() => document.getElementById('booking_modal').showModal()}
      >
        Book Now
      </button>

      <dialog id="booking_modal" className="modal">
        <div className="modal-box bg-base-200 rounded-2xl max-w-md">
          <h3 className="font-bold text-xl mb-4">Book {car.carName}</h3>
          <div className="space-y-4">
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
              disabled={isLoading}
            >
              {isLoading && <span className="loading loading-spinner loading-xs"></span>}
              Confirm Booking
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