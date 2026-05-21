import { FaShieldAlt, FaHeadset, FaCar } from "react-icons/fa";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <FaCar className="text-4xl text-primary" />,
      title: "Premium Fleet",
      description:
        "Access the world's most exclusive hypercars – meticulously maintained and ready to impress.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-primary" />,
      title: "Fully Insured",
      description:
        "Every rental includes comprehensive insurance coverage. Drive with complete peace of mind.",
    },
    {
      icon: <FaHeadset className="text-4xl text-primary" />,
      title: "24/7 Concierge",
      description:
        "Our team is available round the clock to assist with bookings, routes, or any special request.",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
            Why Choose DriveFleet
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Experience luxury, performance, and service like never before.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-base-100 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-base-content mb-2">
                {benefit.title}
              </h3>
              <p className="text-base-content/70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
