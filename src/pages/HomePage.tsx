import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import TurfCard from '../components/TurfCard';
import { turfs, sports } from '../data/mockData';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [activeSport, setActiveSport] = useState('All');

  const filtered = activeSport === 'All' ? turfs : turfs.filter(t => t.sport === activeSport);
  const featured = turfs.slice(0, 2);

  return (
    <div className="page-wrapper home-page">
      {/* Header */}
      <header className="home-header glass-panel">
        <div className="home-header__left">
          <div className="home-header__greeting">
            <p className="label-bold" style={{ color: 'var(--primary)' }}>Good Evening! 👋</p>
            <h2 className="home-header__name">Debashish</h2>
          </div>
          <div className="home-header__location">
            <MapPin size={13} />
            <span>Guwahati, Assam</span>
          </div>
        </div>
        <button id="home-notification-btn" className="home-header__notif">
          <Bell size={20} />
          <span className="home-header__notif-badge" />
        </button>
      </header>

      <div className="home-content">
        {/* Search Bar */}
        <div className="home-search" onClick={() => navigate('/explore')} id="home-search-bar">
          <Search size={18} className="home-search__icon" />
          <span className="home-search__placeholder">Search turfs, locations...</span>
        </div>

        {/* Hero Banner */}
        <div className="home-hero">
          <div className="home-hero__text">
            <h1>Book Your Turf<br /><span>Instantly</span></h1>
            <p>Find, reserve, and play on the best turfs in your city.</p>
            <button id="home-explore-btn" onClick={() => navigate('/explore')}>
              Explore Now <ChevronRight size={16} />
            </button>
          </div>
          <div className="home-hero__visual">⚽</div>
        </div>

        {/* Sports Filter */}
        <section className="home-section">
          <div className="home-section__header">
            <h2>Popular Sports</h2>
          </div>
          <div className="sport-chips">
            {sports.map(sport => (
              <button
                key={sport}
                id={`sport-chip-${sport.toLowerCase()}`}
                className={`sport-chip ${activeSport === sport ? 'sport-chip--active' : ''}`}
                onClick={() => setActiveSport(sport)}
              >
                {sport === 'Football' ? '⚽' : sport === 'Cricket' ? '🏏' : sport === 'Badminton' ? '🏸' : sport === 'Basketball' ? '🏀' : sport === 'Tennis' ? '🎾' : '🔍'} {sport}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Turfs */}
        <section className="home-section">
          <div className="home-section__header">
            <h2>Featured Turfs</h2>
            <button id="home-see-all-btn" className="home-see-all" onClick={() => navigate('/explore')}>
              See All <ChevronRight size={14} />
            </button>
          </div>
          <div className="home-turfs-grid">
            {filtered.length > 0 ? filtered.map(turf => (
              <TurfCard key={turf.id} turf={turf} />
            )) : (
              <p style={{ color: 'var(--on-surface-variant)', gridColumn: '1/-1', textAlign: 'center', padding: '32px 0' }}>
                No turfs found for {activeSport}. Try another sport.
              </p>
            )}
          </div>
        </section>

        {/* Quick Booking Banner */}
        <div className="home-quick-banner">
          <div>
            <h3>Own a Turf?</h3>
            <p>List your venue and start earning today.</p>
          </div>
          <button id="home-list-turf-btn" onClick={() => navigate('/signup')}>Get Started</button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
