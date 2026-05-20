import Link from 'next/link'
import { MdLocationOn } from 'react-icons/md'
import { BsPeopleFill } from 'react-icons/bs'
import Image from 'next/image'

export default function CarCard({ car }) {
  return (
    <div className="card bg-base-200 shadow-md hover:-translate-y-1 transition-transform duration-300 rounded-2xl overflow-hidden">
      <figure className="h-52 overflow-hidden">
        <Image
          src={car.imageURL}
          alt={car.carName}
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
      </figure>
      <div className="card-body p-5">
        <div className="flex justify-between items-start">
          <h3 className="card-title text-base-content text-lg font-semibold">{car.carName}</h3>
          <span className={`badge ${car.available ? 'badge-success' : 'badge-error'} badge-sm`}>
            {car.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <span className="badge badge-outline badge-secondary text-xs">{car.carType}</span>
        <div className="flex gap-4 text-sm text-base-content/60 mt-1">
          <span className="flex items-center gap-1"><BsPeopleFill />{car.seatCapacity} Seats</span>
          <span className="flex items-center gap-1"><MdLocationOn />{car.pickupLocation}</span>
        </div>
        <div className="card-actions justify-between items-center mt-3">
          <p className="text-primary font-bold text-lg">${car.dailyRentPrice}<span className="text-xs font-normal text-base-content/60">/day</span></p>
          <Link href={`/cars/${car._id}`} className="btn btn-primary btn-sm rounded-full">View Details</Link>
        </div>
      </div>
    </div>
  )
}