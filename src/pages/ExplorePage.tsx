import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Star, X } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import TurfCard from '../components/TurfCard';
import { turfs, sports } from '../data/mockData';
import './ExplorePage.css';

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [activeSport, setActiveSport] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1500);

  const filtered = turfs.filter(t => {
    const matchSport = activeSport === 'All' || t.sport === activeSport;
    const matchQuery = t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.location.toLowerCase().includes(query.toLowerCase());
    const matchPrice = t.price <= maxPrice;
    return matchSport && matchQuery && matchPrice;
  });

  return (
    <div className="page-wrapper explore-page">
      {/* Sticky top bar */}
      <header className="explore-header glass-panel">
        <div className="explore-search-wrap">
          <Search size={17} className="explore-search-icon" />
          <input
            id="explore-search-input"
            className="explore-search-input"
            type="text"
            placeholder="Search turfs, areas..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="explore-search-clear" onClick={() => setQuery('')}>
              <X size={15} />
            </button>
          )}
        </div>
        <button id="explore-filter-btn" className={`explore-filter-btn ${showFilter ? 'explore-filter-btn--active' : ''}`} onClick={() => setShowFilter(!showFilter)}>
          <SlidersHorizontal size={17} />
        </button>
      </header>

      {/* Filter Panel */}
      {showFilter && (
        <div className="explore-filter-panel">
          <div className="explore-filter-row">
            <span className="label-bold">Max Price: ₹{maxPrice}/hr</span>
            <input
              id="explore-price-range"
              type="range" min={300} max={1500} step={50}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="explore-range"
            />
          </div>
        </div>
      )}

      {/* Sports Chips */}
      <div className="explore-sports-row">
        {sports.map(sport => (
          <button
            key={sport}
            id={`explore-sport-${sport.toLowerCase()}`}
            className={`sport-chip ${activeSport === sport ? 'sport-chip--active' : ''}`}
            onClick={() => setActiveSport(sport)}
          >
            {sport === 'Football' ? '⚽' : sport === 'Cricket' ? '🏏' : sport === 'Badminton' ? '🏸' : sport === 'Basketball' ? '🏀' : sport === 'Tennis' ? '🎾' : '🔍'} {sport}
          </button>
        ))}
      </div>

      <div className="explore-content">
        {/* Results count */}
        <p className="explore-count">
          <span className="label-bold">{filtered.length} turfs</span> found
          {activeSport !== 'All' && ` for ${activeSport}`}
          {query && ` matching "${query}"`}
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
