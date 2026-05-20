import Image from "next/image";
import { ThemeToggleBtn } from "./themeToggleBtn";
import Link from "next/link";
import { MdDirectionsCar } from "react-icons/md";
import { NavPath } from "./navPaths";
const links = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Explore Cars" },
];
export function Navbar() {
  return (
    <nav className="navbar backdrop-blur-md bg-base-100/80 sticky top-0 z-50 border-b border-base-300 px-4 lg:px-10">
      <div className="navbar-start">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary font-bold text-xl"
        >
          <MdDirectionsCar size={28} />
          DriveFleet
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex gap-6">
        {links.map((link) => (
          <NavPath key={link.href} link={link} />
        ))}
      </div>
      <div className="navbar-end gap-2">
        <ThemeToggleBtn />
        {/* {session ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="avatar cursor-pointer">
              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="profile"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 rounded-2xl z-1 w-52 p-2 shadow mt-2"
            >
              <li className="px-3 py-2 text-sm font-semibold text-base-content/60">
                {session.user?.name}
              </li>
              <li>
                <Link href="/add-car">Add Car</Link>
              </li>
              <li>
                <Link href="/my-bookings">My Bookings</Link>
              </li>
              <li>
                <Link href="/my-cars">My Added Cars</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm rounded-full">
            Login
          </Link>
        )} */}
      </div>
    </nav>
  );
}
