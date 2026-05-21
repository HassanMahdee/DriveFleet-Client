"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

export default function Banner() {
  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center lg:justify-start overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.png')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
            Your Journey <span className="text-primary">Starts Here</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Experience the thrill of driving the world&apos;s most exclusive
            hypercars. From Bugatti to Lamborghini – we bring the dream to your
            driveway.
          </p>
          <Link
            href="/cars"
            className="btn btn-primary rounded-full px-8 py-3 text-base font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Explore Cars
          </Link>
        </motion.div>

        <div className="absolute bottom-11 left-1/2 -translate-x-1/2 animate-bounce">
          <IoIosArrowDown className="w-6 h-6 text-white/60" />
        </div>
      </div>
    </div>
  );
}
