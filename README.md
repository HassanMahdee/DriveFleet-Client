# DriveFleet – Premium Car Rental

**Live Site:** [https://drivefleet.vercel.app](https://drivefleet.vercel.app)  
*(Replace with your actual deployed URL)*

## 🚗 Features

- **Secure Authentication** – Login with email/password or Google account. JWT tokens are stored in HTTP‑only cookies for enhanced security.
- **Explore & Filter Cars** – Browse all available hypercars, search by name (case‑insensitive), and filter by type (SUV, Sedan, Hypercar, etc.).
- **Full Car Management** – Add new cars, update price, description, availability, image, type, and location. Delete your own listings with a confirmation modal.
- **Easy Booking System** – Choose pickup/return dates, decide if you need a driver, add special notes, and see the total price instantly. View all your bookings with booking date as a link to the car details.
- **Responsive Modern UI** – Built with Tailwind CSS and DaisyUI, featuring light/dark theme toggle, smooth carousels using Swiper, and a marquee of car brand logos.
- **Private Dashboard** – Access “My Bookings”, “My Added Cars”, and “Add Car” only when logged in. Protected routes automatically redirect unauthenticated users.

## 🛠️ Tech Stack

- Next.js (App Router, JavaScript)
- Tailwind CSS + DaisyUI
- Better Auth (authentication)
- JWT HTTP‑only cookies
- React Context (global car state)
- Swiper, Fast Marquee, React Icons, React Toastify

## 📁 Project Structure
src/
├── app/ # Pages (Home, Explore Cars, Car Details, Login, Register, Add Car, My Bookings, My Cars)
├── components/ # Reusable UI (Navbar, Footer, CarCard, BookingModal, etc.)
├── context/ # CarsContext for search/filter state
├── lib/ # Better Auth and JWT helpers
└── middleware.js # Route protection

## 🌐 Deployment

Deployed on Vercel.

---

*Built as an academic assignment – DriveFleet "Your Journey Starts Here"*