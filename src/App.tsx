import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import TurfDetailPage from './pages/TurfDetailPage';
import BookingSummaryPage from './pages/BookingSummaryPage';
import MyBookingsPage from './pages/MyBookingsPage';
import OwnerDashboard from './pages/OwnerDashboard';
import MyTurfsPage from './pages/MyTurfsPage';
import UserManagementPage from './pages/UserManagementPage';
import EarningsPage from './pages/EarningsPage';
import AdminControlPanel from './pages/AdminControlPanel';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Player/User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/turf/:id" element={<TurfDetailPage />} />
        <Route path="/booking-summary" element={<BookingSummaryPage />} />
        <Route path="/bookings" element={<MyBookingsPage />} />
        <Route path="/profile" element={<Navigate to="/login" replace />} />

        {/* Owner Routes */}
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/turfs" element={<MyTurfsPage />} />
        <Route path="/owner/earnings" element={<EarningsPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminControlPanel />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/bookings" element={<MyBookingsPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
