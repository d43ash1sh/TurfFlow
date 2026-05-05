# TurfFlow - Professional Turf Booking & Management Platform

Welcome to **TurfFlow** (TurfReserve Pro), a high-fidelity, production-ready web application for sports turf booking and management. This project was built based on the Stitch design system (Project ID: `77470155319258071`).

## 🚀 Overview

TurfFlow is a dual-purpose platform:
1.  **For Players**: A seamless mobile-first experience to discover, filter, and book sports turfs in their vicinity.
2.  **For Owners/Admins**: A robust desktop-optimized dashboard to manage listings, track earnings, monitor user activity, and analyze performance.

## 🛠 Tech Stack

-   **Frontend**: React 18 with Vite
-   **Language**: TypeScript (for type-safe development)
-   **Styling**: Vanilla CSS with CSS Variables (Design Tokens)
-   **Icons**: Lucide React
-   **Routing**: React Router DOM v6

## 🎨 Design System (Lexend + Glassmorphism)

The app follows a **Modern Glassmorphic** aesthetic:
-   **Typography**: `Lexend` for headings (professional & sporty) and `Inter` for body text (readability).
-   **Colors**:
    -   `Primary`: `#00BF4E` (Sporty Green)
    -   `Secondary`: `#39B8FD` (Neon Blue)
    -   `Surface`: Translucent glass panels with `backdrop-filter: blur(12px)`.
-   **Grid**: A strict 4px/8px spacing system for visual consistency.

## 📂 Project Structure

```text
src/
├── assets/           # Static assets (logos, images)
├── components/       # Reusable UI components
│   ├── BottomNav     # Mobile-first navigation
│   ├── AdminSidebar  # Desktop navigation for owners
│   └── TurfCard      # Interactive listing card
├── data/             # Centralized Mock Data & Types
│   └── mockData.ts   # ALL data models (Turfs, Bookings, Users, Earnings)
├── pages/            # Individual screens with dedicated CSS files
│   ├── HomePage      # Hero, filters, featured turfs
│   ├── ExplorePage   # Advanced search & category discovery
│   ├── TurfDetailPage# Slot selection & booking engine
│   ├── Auth/         # Login & Signup flows
│   ├── Dashboards/   # Owner/Admin analytics & tables
│   └── ...           # All 12 screens are implemented here
├── App.tsx           # Route definitions & app entry
└── index.css         # Global design tokens (CSS Variables)
```

## 🏗 Key Systems to Understand

### 1. The Slot Selection Engine (`TurfDetailPage.tsx`)
The booking system uses a state-driven grid.
-   **States**: `Available` (Green), `Booked` (Gray/Disabled), `Selected` (Yellow/Primary).
-   **Logic**: Users can select multiple contiguous or non-contiguous slots. The total is calculated in real-time and passed to the `BookingSummaryPage` via React Router's `state`.

### 2. Role-Based Navigation
-   The app supports three roles: `Player`, `Owner`, and `Admin`.
-   **Players** see the Bottom Navigation bar.
-   **Owners/Admins** see the Admin Sidebar on desktop and a modified mobile view.

### 3. Mock Data Engine (`data/mockData.ts`)
Everything is currently powered by a robust mock dataset. 
-   **To integrate a Backend**: You simply need to replace the imports in components/pages with API calls (e.g., using `useEffect` and `fetch` or `React Query`).
-   The types are already defined, making it easy to map database responses to the UI.

## 🛣 Future Roadmap (What to work on next)

1.  **Backend Integration**: Connect to Supabase or Firebase for Authentication and PostgreSQL for data persistence.
2.  **Payment Gateway**: Integrate Razorpay or Stripe API in `BookingSummaryPage`.
3.  **Real-time Availability**: Use WebSockets (or Supabase Realtime) to reflect slot bookings instantly across all users.
4.  **Image Uploads**: Implement Cloudinary or S3 for owners to upload their turf photos in `MyTurfsPage`.
5.  **Notifications**: Add a notification system for booking confirmations and reminders.

## 🏁 Getting Started

1.  **Clone the repo**:
    ```bash
    git clone https://github.com/d43ash1sh/TurfFlow.git
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run Dev Server**:
    ```bash
    npm run dev
    ```

---

*Built with ❤️ for the TurfFlow team.*
