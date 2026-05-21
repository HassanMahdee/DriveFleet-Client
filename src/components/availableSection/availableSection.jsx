"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { useCars } from "@/contexts/carsContext";
import { MdLocationOn } from 'react-icons/md'
import { BsPeopleFill } from 'react-icons/bs'
import Loader from "../loader/loader";

export default function AvailableSection() {
  const { cars, loading } = useCars();

  if (loading) return <Loader />;

  const featuredCars = [...cars]
    .sort((a, b) => b.dailyRentPrice - a.dailyRentPrice)
    .slice(0, 6);

  if (featuredCars.length === 0) return null;

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
            Available Hypercars
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            The crown jewels of our fleet – handpicked for the ultimate driving
            experience.
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="featured-carousel"
          >
            {featuredCars.map((car) => (
              <SwiperSlide key={car._id}>
                <div className="bg-base-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl min-h-120 flex flex-col">
                  <div className="relative h-56 w-full">
                    <Image
                      src={car.imageURL}
                      alt={car.carName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                      ৳{car.dailyRentPrice}/day
                    </div>
                  </div>
                  <div className="p-5 flex flex-col grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-base-content">
                        {car.carName}
                      </h3>
                      <span className="badge badge-outline badge-primary badge-lg text-xs">
                        {car.carType}
                      </span>
                    </div>
                    <p className="text-base-content/70 text-sm mb-3 line-clamp-2">
                      {car.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto pt-4">
                      <div className="flex flex-col justify-center gap-2 text-sm">
                        <span>
                          <BsPeopleFill /> {car.seatCapacity} seats
                        </span>
                        <span>
                          <MdLocationOn /> {car.pickupLocation}
                        </span>
                      </div>
                      <Link
                        href={`/cars/${car._id}`}
                        className="btn btn-primary btn-sm rounded-full"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
