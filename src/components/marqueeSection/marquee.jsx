// src/components/MarqueeSection.jsx
"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const brands = [
  { name: "Bugatti", logoPath: "/bugatti-logo.png" },
  { name: "Lamborghini", logoPath: "/lambo-logo.jpg" },
  { name: "Ferrari", logoPath: "/ferrarri-logo.jpg" },
  { name: "McLaren", logoPath: "/mclaren-logo.jpg" },
  { name: "Koenigsegg", logoPath: "/koenigsegg-logo.png" },
  { name: "Pagani", logoPath: "/pagani-logo.png" },
  { name: "Rimac", logoPath: "/rimac-logo.jpg" },
  { name: "Porsche", logoPath: "/porsche-logo.png" },
  { name: "Aston Martin", logoPath: "/aston-logo.png" },
  { name: "Hennessey", logoPath: "/hennessy-logo.png" },
  { name: "Rolls-Royce", logoPath: "/rolls-logo.png" },
  { name: "Bentley", logoPath: "/bentley-logo.png" },
  { name: "Mercedes-AMG", logoPath: "/mercedes-logo.jpg" },
];

export default function MarqueeSection() {
  return (
    <section className="py-8 bg-base-200 border-y border-base-300">
      <Marquee
        speed={40}
        gradient={false}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        <div className="flex items-center gap-12">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 min-w-25 group"
            >
              <div className="relative h-12 w-24 transition-all duration-300 group-hover:scale-110">
                <Image
                  src={brand.logoPath}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-base-content/70 group-hover:text-primary transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
