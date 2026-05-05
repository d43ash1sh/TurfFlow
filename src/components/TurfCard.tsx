import './TurfCard.css';
import { Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Turf } from '../data/mockData';

interface TurfCardProps {
  turf: Turf;
}

export default function TurfCard({ turf }: TurfCardProps) {
  const navigate = useNavigate();
  return (
    <div className="turf-card shadow-card" onClick={() => navigate(`/turf/${turf.id}`)} id={`turf-card-${turf.id}`}>
      <div className="turf-card__image-wrap">
        <img src={turf.image} alt={turf.name} className="turf-card__image" />
        <span className="turf-card__sport label-bold">{turf.sport}</span>
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
