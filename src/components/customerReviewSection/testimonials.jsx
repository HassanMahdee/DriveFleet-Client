import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Image from "next/image";

const testimonials = [
  {
    name: "Rafiq Ahmed",
    role: "CEO, Tech Solutions",
    rating: 5,
    text: "The Bugatti Chiron was an absolute beast. Impeccable service and the car was spotless. Will rent again!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Tahmina Akhter",
    role: "Fashion Designer",
    rating: 5,
    text: "Rented the Lamborghini Revuelto for my wedding – unforgettable experience. Professional and punctual.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Shahriar Hossain",
    role: "Entrepreneur",
    rating: 4.5,
    text: "Great selection of hypercars. The Rimac Nevera is mind‑blowing. Highly recommend DriveFleet.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
            What Our Customers Say
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Real reviews from real drivers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-base-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-base-content">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-base-content/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex text-yellow-500 mb-3">
                {[...Array(5)].map((_, i) => {
                  const star = i + 1;
                  if (star <= testimonial.rating) return <FaStar key={i} />;
                  if (star - 0.5 <= testimonial.rating)
                    return <FaStarHalfAlt key={i} />;
                  return <FaStar key={i} className="text-base-300" />;
                })}
              </div>
              <p className="text-base-content/80 italic">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
