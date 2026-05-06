import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Star, X } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import TurfCard from '../components/TurfCard';
import { turfs, sports } from '../data/mockData';
import './ExplorePage.css';

export default function ExplorePage() {
  const [activeSport, setActiveSport] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [maxPrice, setMaxPrice] = useState(2000);

  const filtered = turfs.filter(t => {
    const matchSport = activeSport === 'All' || t.sport === activeSport;
    const matchPrice = t.basePrice <= maxPrice;
    return matchSport && matchPrice;
  });

  return (
    <div className="page-wrapper explore-page">
      {/* Premium Category Header */}
      <header className="explore-premium-header">
        <div className="explore-header-top">
          <h1 className="explore-title">Explore <span>Categories</span></h1>
          <button id="explore-filter-btn" className={`explore-filter-btn ${showFilter ? 'explore-filter-btn--active' : ''}`} onClick={() => setShowFilter(!showFilter)}>
            <SlidersHorizontal size={18} />
          </button>
        </div>
        
        <div className="category-navigation">
          {sports.map(sport => (
            <button
              key={sport}
              id={`explore-sport-${sport.toLowerCase()}`}
              className={`category-chip ${activeSport === sport ? 'category-chip--active' : ''}`}
              onClick={() => setActiveSport(sport)}
            >
              <span className="category-icon">{sport === 'Football' ? '⚽' : sport === 'Cricket' ? '🏏' : sport === 'Badminton' ? '🏸' : sport === 'Basketball' ? '🏀' : sport === 'Tennis' ? '🎾' : '🎯'}</span>
              <span className="category-name">{sport}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Filter Panel */}
      {showFilter && (
        <div className="explore-filter-panel glass-panel">
          <div className="filter-header">
            <span className="label-bold">Budget (Max: ₹{maxPrice})</span>
            <button className="filter-reset" onClick={() => setMaxPrice(2000)}>Reset</button>
          </div>
          <input
            id="explore-price-range"
            type="range" min={300} max={2000} step={50}
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="explore-range"
          />
        </div>
      )}

      <div className="explore-content">
        {/* Results count */}
        <p className="explore-count">
          <span className="label-bold">{filtered.length} turfs</span> found
          {activeSport !== 'All' && ` for ${activeSport}`}
        </p>

        {filtered.length === 0 ? (
          <div className="explore-empty">
            <span style={{ fontSize: 48 }}>🔍</span>
            <h3>No turfs found</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="explore-grid">
            {filtered.map(turf => <TurfCard key={turf.id} turf={turf} />)}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
