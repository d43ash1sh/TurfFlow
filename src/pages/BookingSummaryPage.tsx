import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import './BookingSummaryPage.css';
import type { Turf, TimeSlot } from '../data/mockData';

export default function BookingSummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { turf, selected, total, date } = (location.state || {}) as {
    turf: Turf; selected: TimeSlot[]; total: number; date: string;
  };

  const [payMethod, setPayMethod] = useState<'upi' | 'card' | 'wallet'>('upi');
  const [confirmed, setConfirmed] = useState(false);

  if (!turf) {
    navigate('/');
    return null;
  }

  const tax = Math.round(total * 0.05);
  const grandTotal = total + tax;
  const formattedDate = new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  if (confirmed) {
    return (
      <div className="booking-confirmed">
        <div className="booking-confirmed__icon">
          <CheckCircle size={64} color="var(--primary)" />
        </div>
        <h1>Booking Confirmed! 🎉</h1>
        <p>Your slots have been reserved at <strong>{turf.name}</strong></p>
        <div className="booking-confirmed__details">
          <div className="booking-confirmed__detail-row"><Calendar size={16}/><span>{formattedDate}</span></div>
          <div className="booking-confirmed__detail-row"><Clock size={16}/><span>{selected.map(s => s.time).join(', ')}</span></div>
          <div className="booking-confirmed__detail-row"><CreditCard size={16}/><span>₹{grandTotal.toLocaleString()} paid</span></div>
        </div>
        <div className="booking-confirmed__booking-id">
          Booking ID: <strong>TF{Math.floor(Math.random()*100000)}</strong>
        </div>
        <button id="booking-done-btn" className="booking-summary__pay-btn" onClick={() => navigate('/bookings')}>
          View My Bookings
        </button>
        <button id="booking-home-btn" className="booking-summary__secondary-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="page-wrapper booking-summary">
      <header className="booking-summary__header glass-panel">
        <button id="booking-back-btn" onClick={() => navigate(-1)} className="booking-summary__back">
          <ArrowLeft size={20} />
        </button>
        <h2>Booking Summary</h2>
        <div />
      </header>

      <div className="booking-summary__content">
        {/* Turf Info */}
        <div className="booking-summary__card shadow-card">
          <img src={turf.image} alt={turf.name} className="booking-summary__turf-img" />
          <div className="booking-summary__turf-info">
            <h3>{turf.name}</h3>
            <span className="booking-summary__location"><MapPin size={13}/>{turf.location}</span>
          </div>
        </div>

        {/* Booking Details */}
        <div className="booking-summary__card shadow-card">
          <h3 className="booking-summary__section-title">Booking Details</h3>
          <div className="booking-summary__detail-row">
            <span className="label-bold">Date</span>
            <span>{formattedDate}</span>
          </div>
          <div className="booking-summary__detail-row">
            <span className="label-bold">Sport</span>
            <span>{turf.sport}</span>
          </div>
          <div className="booking-summary__detail-row">
            <span className="label-bold">Slots</span>
            <div className="booking-summary__slots">
              {selected.map(s => (
                <span key={s.id} className="booking-summary__slot-chip">{s.time}</span>
              ))}
            </div>
          </div>
          <div className="booking-summary__detail-row">
            <span className="label-bold">Duration</span>
            <span>{selected.length} hour{selected.length > 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="booking-summary__card shadow-card">
          <h3 className="booking-summary__section-title">Price Breakdown</h3>
          <div className="booking-summary__detail-row">
            <span>₹{turf.price} × {selected.length} slot{selected.length > 1 ? 's' : ''}</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <div className="booking-summary__detail-row">
            <span>GST (5%)</span>
            <span>₹{tax.toLocaleString()}</span>
          </div>
          <div className="booking-summary__detail-row booking-summary__total-row">
            <strong>Total Amount</strong>
            <strong className="booking-summary__grand-total">₹{grandTotal.toLocaleString()}</strong>
          </div>
        </div>

        {/* Payment Method */}
        <div className="booking-summary__card shadow-card">
          <h3 className="booking-summary__section-title">Payment Method</h3>
          <div className="booking-summary__payment-options">
            {(['upi', 'card', 'wallet'] as const).map(method => (
              <button
                key={method}
                id={`pay-method-${method}`}
                className={`booking-summary__pay-option ${payMethod === method ? 'booking-summary__pay-option--active' : ''}`}
                onClick={() => setPayMethod(method)}
              >
                <span>{method === 'upi' ? '📱' : method === 'card' ? '💳' : '👛'}</span>
                <span>{method === 'upi' ? 'UPI' : method === 'card' ? 'Card' : 'Wallet'}</span>
              </button>
            ))}
          </div>
          {payMethod === 'upi' && (
            <div className="booking-summary__upi">
              <input type="text" placeholder="Enter UPI ID (e.g. name@upi)" className="booking-summary__upi-input" id="upi-input" defaultValue="debashish@okicici" />
            </div>
          )}
        </div>
      </div>

      <div className="booking-summary__footer glass-panel">
        <div className="booking-summary__footer-total">
          <span className="label-bold">Total</span>
          <span className="booking-summary__footer-amount">₹{grandTotal.toLocaleString()}</span>
        </div>
        <button id="confirm-payment-btn" className="booking-summary__pay-btn" onClick={() => setConfirmed(true)}>
          Confirm & Pay
        </button>
      </div>
    </div>
  );
}
