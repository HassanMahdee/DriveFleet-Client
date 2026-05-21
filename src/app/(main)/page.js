import Banner from "@/components/banner/banner";
import MarqueeSection from "@/components/marqueeSection/marquee";
import FeaturedSection from "@/components/featuredSection/featuredSection";

export default function Home() {
  return (
    <div>
      <Banner />
      <MarqueeSection />
      <FeaturedSection />
    </div>
  );
}
