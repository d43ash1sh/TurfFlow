import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Check, Clock } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { turfs, timeSlots } from '../data/mockData';
import type { TimeSlot } from '../data/mockData';
import './TurfDetailPage.css';

export default function TurfDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const turf = turfs.find(t => t.id === id) || turfs[0];

  const [slots, setSlots] = useState<TimeSlot[]>(timeSlots.map(s => ({ ...s })));
  const [selectedDate, setSelectedDate] = useState('2026-05-10');

  const toggleSlot = (slotId: string) => {
    setSlots(prev => prev.map(s =>
      s.id === slotId && s.status !== 'booked'
        ? { ...s, status: s.status === 'selected' ? 'available' : 'selected' }
        : s
    ));
  };

  const selected = slots.filter(s => s.status === 'selected');
  const total = selected.length * turf.price;

  const handleBook = () => {
    if (selected.length === 0) return;
    navigate('/booking-summary', { state: { turf, selected, total, date: selectedDate } });
  };

  // Generate next 7 dates
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  return (
    <div className="page-wrapper turf-detail">
      {/* Hero Image */}
      <div className="turf-detail__hero">
        <img src={turf.image} alt={turf.name} className="turf-detail__hero-img" />
        <div className="turf-detail__hero-overlay" />
        <button id="turf-detail-back-btn" className="turf-detail__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div className="turf-detail__hero-info">
          <span className="label-bold turf-detail__sport">{turf.sport}</span>
          <h1 className="turf-detail__title">{turf.name}</h1>
          <div className="turf-detail__meta-row">
            <span className="turf-detail__location"><MapPin size={13} />{turf.location}</span>
            <span className="turf-detail__rating"><Star size={13} fill="currentColor" />{turf.rating}</span>
          </div>
        </div>
      </div>

      <div className="turf-detail__content">
        {/* Price & Rating */}
        <div className="turf-detail__price-row">
          <div>
            <span className="turf-detail__price">₹{turf.price}</span>
            <span className="turf-detail__per">/hr per slot</span>
          </div>
          <div className="turf-detail__rating-box">
            <Star size={16} fill="#d97706" color="#d97706" />
            <strong>{turf.rating}</strong>
            <span>({turf.reviews} reviews)</span>
          </div>
        </div>

        {/* Description */}
        <p className="turf-detail__desc">{turf.description}</p>

        {/* Amenities */}
        <section className="turf-detail__section">
          <h2>Amenities</h2>
          <div className="turf-detail__amenities">
            {turf.amenities.map(a => (
              <span key={a} className="turf-detail__amenity"><Check size={13} />{a}</span>
            ))}
          </div>
        </section>

        {/* Date Picker */}
        <section className="turf-detail__section">
          <h2>Select Date</h2>
          <div className="turf-detail__dates">
            {dates.map(d => {
              const dt = new Date(d);
              const day = dt.toLocaleDateString('en-US', { weekday: 'short' });
              const date = dt.getDate();
              return (
                <button
                  key={d}
                  id={`date-${d}`}
                  className={`turf-detail__date-btn ${selectedDate === d ? 'turf-detail__date-btn--active' : ''}`}
                  onClick={() => setSelectedDate(d)}
                >
                  <span className="turf-detail__date-day">{day}</span>
                  <span className="turf-detail__date-num">{date}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Slot Grid */}
        <section className="turf-detail__section">
          <h2>Available Slots</h2>
          <div className="slot-legend">
            <span className="slot-legend__item slot-legend__available">Available</span>
            <span className="slot-legend__item slot-legend__booked">Booked</span>
            <span className="slot-legend__item slot-legend__selected">Selected</span>
          </div>
          <div className="slot-grid">
            {slots.map(slot => (
              <button
                key={slot.id}
                id={`slot-${slot.id}`}
                disabled={slot.status === 'booked'}
                className={`slot-btn slot-btn--${slot.status}`}
                onClick={() => toggleSlot(slot.id)}
              >
                <Clock size={11} />
                {slot.time}
              </button>
            ))}
          </div>
        </section>

        <div style={{ height: 100 }} />
      </div>

      {/* Sticky Booking Footer */}
      {selected.length > 0 && (
        <div className="turf-detail__book-bar glass-panel">
          <div className="turf-detail__book-info">
            <span className="label-bold">{selected.length} slot{selected.length > 1 ? 's' : ''} selected</span>
            <span className="turf-detail__book-total">₹{total.toLocaleString()}</span>
          </div>
          <button id="turf-detail-book-btn" className="turf-detail__book-cta" onClick={handleBook}>
            Book Now →
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
