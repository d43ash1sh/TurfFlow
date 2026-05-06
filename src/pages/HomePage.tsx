import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, ChevronRight, Navigation, RefreshCcw } from 'lucide-react';
import { useGreeting } from '../hooks/useGreeting';
import { useGeolocation } from '../hooks/useGeolocation';
import { calculateDistance } from '../utils/distance';
import BottomNav from '../components/BottomNav';
import TurfCard from '../components/TurfCard';
import Hero from '../components/Hero';
import { turfs, sports } from '../data/mockData';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [activeSport, setActiveSport] = useState('All');
  const greeting = useGreeting();
  const { location, city, loading: locLoading, error: locError, requestLocation } = useGeolocation();

  const sortedTurfs = useMemo(() => {
    let list = [...turfs];
    
    // Filter by sport
    if (activeSport !== 'All') {
      list = list.filter(t => t.sport === activeSport);
    }

    // Sort by distance if location is available
    if (location) {
      list.sort((a, b) => {
        const distA = calculateDistance(location.lat, location.lng, a.lat, a.lng);
        const distB = calculateDistance(location.lat, location.lng, b.lat, b.lng);
        return distA - distB;
      });
    }
    
    return list;
  }, [activeSport, location]);

  const nearestTurfId = location && sortedTurfs.length > 0 ? sortedTurfs[0].id : null;

  return (
    <div className="page-wrapper home-page">
      {/* Header */}
      <header className="home-header glass-panel">
        <div className="home-header__left">
          <div className="home-header__greeting">
            <p className="label-bold" style={{ color: 'var(--primary)' }}>{greeting}</p>
          </div>
          <div className="home-header__location">
            <MapPin size={13} className={locLoading ? 'pulse' : ''} />
            <span>{locLoading ? 'Detecting location...' : (city || 'Guwahati, Assam')}</span>
          </div>
        </div>
        <button id="home-notification-btn" className="home-header__notif">
          <Bell size={20} />
          <span className="home-header__notif-badge" />
        </button>
      </header>

      <div className="home-content">
        {/* Location Discovery Banner */}
        {!location && (
          <div className={`location-banner glass-panel ${locError ? 'location-banner--error' : ''}`}>
            <div className="location-banner__icon">
              <Navigation size={20} className={locLoading ? 'pulse' : ''} />
            </div>
            <div className="location-banner__text">
              <h4>{locError ? 'Location Error' : 'Find Nearby Turfs'}</h4>
              <p>{locError || 'Allow location access to see the closest turfs around you.'}</p>
            </div>
            <button 
              className="location-banner__btn" 
              onClick={requestLocation}
              disabled={locLoading}
            >
              {locLoading ? <RefreshCcw size={16} className="spin" /> : locError ? 'Retry' : 'Enable'}
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="home-search" onClick={() => navigate('/explore')} id="home-search-bar">
          <Search size={18} className="home-search__icon" />
          <span className="home-search__placeholder">Search turfs, locations...</span>
        </div>

        {/* Hero Banner */}
        <Hero />

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
            {locLoading ? (
              // Skeletons
              [1, 2, 3, 4].map(i => (
                <div key={i} className="turf-skeleton shadow-card">
                  <div className="turf-skeleton__image shimmer" />
                  <div className="turf-skeleton__body">
                    <div className="turf-skeleton__line shimmer" style={{ width: '70%' }} />
                    <div className="turf-skeleton__line shimmer" style={{ width: '40%' }} />
                  </div>
                </div>
              ))
            ) : sortedTurfs.length > 0 ? (
              sortedTurfs.map(turf => (
                <TurfCard 
                  key={turf.id} 
                  turf={turf} 
                  userLocation={location}
                  isNearest={turf.id === nearestTurfId}
                />
              ))
            ) : (
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
