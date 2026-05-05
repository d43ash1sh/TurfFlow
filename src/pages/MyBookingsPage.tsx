import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { bookings } from '../data/mockData';
import './MyBookingsPage.css';

const statusColor: Record<string, string> = {
  upcoming: 'status--upcoming',
  completed: 'status--completed',
  cancelled: 'status--cancelled',
};

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];
  const [activeTab, setActiveTab] = [tabs[0], (v: string) => {}];

  return (
    <div className="page-wrapper my-bookings">
      <header className="my-bookings__header glass-panel">
        <h1>My Bookings</h1>
        <p>{bookings.length} bookings</p>
      </header>

      <div className="my-bookings__content">
        {bookings.length === 0 ? (
          <div className="my-bookings__empty">
            <span style={{ fontSize: 48 }}>📅</span>
            <h3>No bookings yet</h3>
            <p>Book a turf to get started</p>
            <button onClick={() => navigate('/explore')}>Explore Turfs</button>
          </div>
        ) : (
          <div className="my-bookings__list">
            {bookings.map(booking => (
              <div key={booking.id} id={`booking-card-${booking.id}`} className="my-bookings__card shadow-card">
                <img src={booking.image} alt={booking.turfName} className="my-bookings__img" />
                <div className="my-bookings__info">
                  <div className="my-bookings__top-row">
                    <h3>{booking.turfName}</h3>
                    <span className={`my-bookings__status ${statusColor[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                  <span className="my-bookings__location"><MapPin size={12}/>{booking.location}</span>
                  <div className="my-bookings__meta">
                    <span><Calendar size={12}/>{new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span><Clock size={12}/>{booking.slots.join(', ')}</span>
                  </div>
                  <div className="my-bookings__footer">
                    <span className="my-bookings__amount">₹{booking.totalAmount.toLocaleString()}</span>
                    {booking.status === 'upcoming' && (
                      <button
                        id={`rebook-${booking.id}`}
                        className="my-bookings__rebook-btn"
                        onClick={() => navigate(`/turf/${booking.turfId}`)}
                      >
                        Rebook <ChevronRight size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
