import { notFound } from "next/navigation";
import BookingModal from "@/components/modals/bookingModal";
import Image from "next/image";

async function getCar(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function CarDetails({ params }) {
  const { id } = await params;
  const car = await getCar(id);

  if (!car) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
          <Image
            src={car.imageURL}
            alt={car.carName}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-base-content">
            {car.carName}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-primary badge-lg">{car.carType}</span>
            <span
              className={`badge badge-lg ${car.available ? "badge-success" : "badge-error"}`}
            >
              {car.available ? "Available Now" : "Currently Unavailable"}
            </span>
          </div>
          <p className="text-3xl font-bold text-primary">
            ৳{car.dailyRentPrice}
            <span className="text-base font-normal text-base-content/60">
              {" "}
              / day
            </span>
          </p>
          <div className="divider" />
          <div className="space-y-2 text-base-content/80">
            <p>
              <strong>Brand:</strong> {car.brand}
            </p>
            <p>
              <strong>Seat Capacity:</strong> {car.seatCapacity} seats
            </p>
            <p>
              <strong>Pickup Location:</strong> {car.pickupLocation}
            </p>
            <p>
              <strong>Description:</strong> {car.description}
            </p>
          </div>

          {car.available ? (
            <BookingModal car={car} />
          ) : (
            <button className="btn btn-disabled w-full md:w-auto" disabled>
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
