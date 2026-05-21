import Banner from "@/components/banner/banner";
import MarqueeSection from "@/components/marqueeSection/marquee";
import AvailableSection from "@/components/availableSection/availableSection";
import WhyChooseUs from "@/components/whyChooseUsSection/whyChooseUs";
import Testimonials from "@/components/customerReviewSection/testimonials";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <Banner />
      <MarqueeSection />
      <AvailableSection />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
