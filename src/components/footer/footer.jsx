import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-base-content mb-4">
              Useful Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/cars"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  Explore Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/add-car"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  Add a Car
                </Link>
              </li>
              <li>
                <Link
                  href="/my-bookings"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/my-cars"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  My Cars
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-base-content mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-base-content/70">
                <FaEnvelope className="text-primary" />
                <span>support@drivefleet.com</span>
              </li>
              <li className="flex items-center gap-3 text-base-content/70">
                <FaPhoneAlt className="text-primary" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3 text-base-content/70">
                <FaMapMarkerAlt className="text-primary" />
                <span>Gulshan 2, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-base-content mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                className="btn btn-circle btn-ghost text-base-content hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="btn btn-circle btn-ghost text-base-content hover:text-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="btn btn-circle btn-ghost text-base-content hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="btn btn-circle btn-ghost text-base-content hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-base-300 mt-8 pt-6 text-center text-sm text-base-content/60">
          &copy; {new Date().getFullYear()} DriveFleet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
