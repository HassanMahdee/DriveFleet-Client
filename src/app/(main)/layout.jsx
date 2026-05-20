import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { CarsProvider } from "@/contexts/carsContext";
export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <CarsProvider>
        {children}
      </CarsProvider>
      <Footer />
    </div>
  );
}