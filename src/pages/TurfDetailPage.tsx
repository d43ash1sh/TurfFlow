import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Check, Clock, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { turfs } from '../data/mockData';
import type { TimeSlot } from '../data/mockData';
import { generateTimeSlots } from '../utils/slots';
import { calculatePrice } from '../utils/pricing';
import './TurfDetailPage.css';

export default function TurfDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const turf = turfs.find(t => t.id === id) || turfs[0];

  const [slots, setSlots] = useState<TimeSlot[]>(() => {
    const initialSlots = generateTimeSlots();
    initialSlots[5].status = 'booked'; // 11:00
    initialSlots[12].status = 'booked'; // 18:00
    return initialSlots;
  });
  
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedStart, setSelectedStart] = useState<string>('06:00');
  const [selectedEnd, setSelectedEnd] = useState<string>('07:00');

  const dates = Array.from({ length: 32 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  }).filter(d => d.getMonth() === new Date().getMonth())
    .map(d => d.toISOString().split('T')[0]);

  const [isAvailable, setIsAvailable] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const startHour = parseInt(selectedStart.split(':')[0]);
  const endHour = parseInt(selectedEnd.split(':')[0]);
  const duration = endHour - startHour;

  useEffect(() => {
    const startIndex = slots.findIndex(s => s.time === selectedStart);
    const rangeAvailable = slots
      .slice(startIndex, startIndex + duration)
      .every(s => s.status !== 'booked');
    setIsAvailable(rangeAvailable);
  }, [selectedStart, selectedEnd, slots, duration]);

  useEffect(() => {
    const startH = parseInt(selectedStart.split(':')[0]);
    const endH = parseInt(selectedEnd.split(':')[0]);
    if (endH <= startH) {
      setSelectedEnd(`${(startH + 1).toString().padStart(2, '0')}:00`);
    }
  }, [selectedStart]);

  const total = calculatePrice(turf.basePrice, turf.extraHourPrice, duration);

  const handleBook = () => {
    if (!isAvailable) return;
    setShowConfirmModal(true);
  };

  const confirmBooking = () => {
    const booking = {
      id: Date.now().toString(),
      turfId: turf.id,
      date: selectedDate,
      startTime: selectedStart,
      endTime: selectedEnd,
      duration,
      totalAmount: total,
      status: 'upcoming' as const,
    };
    navigate('/booking-summary', {
      state: { turf, booking, total, date: selectedDate }
    });
  };

  return (
    <div className="page-wrapper turf-detail">
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
        <section className="turf-detail__gallery">
          <div className="gallery-scroll">
            {turf.images.map((img, idx) => (
              <img key={idx} src={img} alt={`${turf.name} gallery ${idx}`} className="gallery-item" />
            ))}
          </div>
        </section>

        <div className="turf-detail__price-row">
          <div>
            <span className="turf-detail__price">₹{turf.basePrice}</span>
            <span className="turf-detail__per"> /1st hr</span>
            <span className="turf-detail__extra"> · ₹{turf.extraHourPrice}/extra hr</span>
          </div>
          <div className="turf-detail__rating-box">
            <Star size={16} fill="#d97706" color="#d97706" />
            <strong>{turf.rating}</strong>
            <span>({turf.reviews} reviews)</span>
          </div>
        </div>

        <p className="turf-detail__desc">{turf.description}</p>

        <section className="turf-detail__section">
          <h2>Amenities</h2>
          <div className="turf-detail__amenities">
            {turf.amenities.map(a => (
              <span key={a} className="turf-detail__amenity"><Check size={13} />{a}</span>
            ))}
          </div>
        </section>

        <section className="turf-detail__section">
          <h2>Select Date</h2>
          <div className="turf-detail__dates-container">
            {Object.entries(
              dates.reduce((acc, d) => {
                const month = new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                if (!acc[month]) acc[month] = [];
                acc[month].push(d);
                return acc;
              }, {} as Record<string, string[]>)
            ).map(([month, monthDates]) => (
              <div key={month} className="turf-detail__month-group">
                <h3 className="turf-detail__month-label">{month}</h3>
                <div className="turf-detail__dates">
                  {monthDates.map(d => {
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
              </div>
            ))}
          </div>
        </section>

        <section className="turf-detail__section">
          <h2>Select Time</h2>
          
          <div className="time-selection-chips">
            <div className="chip-group">
              <label className="chip-label">Start Time</label>
              <div className="chip-scroll">
                {slots.slice(0, -1).map(s => (
                  <button
                    key={`start-${s.time}`}
                    className={`time-chip ${selectedStart === s.time ? 'time-chip--active' : ''}`}
                    onClick={() => setSelectedStart(s.time)}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            </div>

            <div className="chip-group">
              <label className="chip-label">End Time</label>
              <div className="chip-scroll">
                {(() => {
                  const filteredEndTimes = slots
                    .map(s => {
                      const hour = parseInt(s.time.split(':')[0]);
                      return `${(hour + 1).toString().padStart(2, '0')}:00`;
                    })
                    .filter(time => {
                      const sH = parseInt(selectedStart.split(':')[0]);
                      const eH = parseInt(time.split(':')[0]);
                      return eH > sH;
                    });
                  
                  return filteredEndTimes.map(t => (
                    <button
                      key={`end-${t}`}
                      className={`time-chip ${selectedEnd === t ? 'time-chip--active' : ''}`}
                      onClick={() => setSelectedEnd(t)}
                    >
                      {t}
                    </button>
                  ));
                })()}
              </div>
            </div>
          </div>

          {!isAvailable && (
            <div className="availability-banner availability-banner--error">
              <span>⚠️ Selected range is already booked.</span>
            </div>
          )}

          <div className="inline-book-card glass-panel shadow-card">
            <div className="inline-book-info">
              <span className="inline-total">₹{total.toLocaleString()}</span>
              <span className="inline-duration">{duration} hour{duration > 1 ? 's' : ''} Selected</span>
            </div>
            <button 
              id="turf-detail-book-btn" 
              className="book-btn-large" 
              onClick={handleBook}
              disabled={!isAvailable}
            >
              Confirm & Book Now
            </button>
          </div>
        </section>

        <div style={{ height: 60 }} />
      </div>

      {showConfirmModal && (
        <div className="booking-modal-overlay">
          <div className="booking-modal shadow-card">
            <h3>Confirm Booking?</h3>
            <p>Proceed with booking <strong>{turf.name}</strong>?</p>
            <div className="booking-modal-details">
              <div className="modal-detail-item">
                <span>Date</span>
                <span>{new Date(selectedDate).toLocaleDateString()}</span>
              </div>
              <div className="modal-detail-item">
                <span>Time</span>
                <span>{selectedStart} → {selectedEnd}</span>
              </div>
              <div className="modal-detail-item">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <div className="booking-modal-actions">
              <button className="modal-btn-confirm" onClick={confirmBooking}>Yes, Confirm</button>
              <button className="modal-btn-cancel" onClick={() => setShowConfirmModal(false)}>No, Cancel</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
