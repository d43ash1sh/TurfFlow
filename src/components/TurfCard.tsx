import './TurfCard.css';
import { Star, MapPin, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Turf } from '../data/mockData';
import { calculateDistance, formatDistance } from '../utils/distance';

interface TurfCardProps {
  turf: Turf;
  userLocation?: { lat: number; lng: number } | null;
  isNearest?: boolean;
}

export default function TurfCard({ turf, userLocation, isNearest }: TurfCardProps) {
  const navigate = useNavigate();

  const distance = userLocation 
    ? calculateDistance(userLocation.lat, userLocation.lng, turf.lat, turf.lng)
    : null;

  return (
    <div className="turf-card shadow-card" onClick={() => navigate(`/turf/${turf.id}`)} id={`turf-card-${turf.id}`}>
      <div className="turf-card__image-wrap">
        <img src={turf.image} alt={turf.name} className="turf-card__image" />
        <span className="turf-card__sport label-bold">{turf.sport}</span>
        {distance !== null && (
          <div className={`turf-card__distance-badge ${isNearest ? 'turf-card__distance-badge--nearest' : ''}`}>
            <Navigation size={10} />
            <span>{isNearest ? 'Nearest' : formatDistance(distance)}</span>
          </div>
        )}
      </div>
      <div className="turf-card__body">
        <h3 className="turf-card__name">{turf.name}</h3>
        <div className="turf-card__meta">
          <span className="turf-card__location">
            <MapPin size={13} />
            {turf.location}
          </span>
          <span className="turf-card__rating">
            <Star size={13} fill="currentColor" />
            {turf.rating} ({turf.reviews})
          </span>
        </div>
        <div className="turf-card__footer">
          <span className="turf-card__price">₹{turf.price}<span>/hr</span></span>
          <button className="turf-card__btn" onClick={e => { e.stopPropagation(); navigate(`/turf/${turf.id}`); }}>Book Now</button>
        </div>
      </div>
    </div>
  );
}
