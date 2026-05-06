import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, ChevronRight, Navigation, RefreshCcw, X } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const greeting = useGreeting();
  const { location, city, loading: locLoading, error: locError, requestLocation } = useGeolocation();

  const filteredTurfs = useMemo(() => {
    let list = [...turfs];
    
    // Filter by search query (Global search)
    if (searchQuery) {
      list = list.filter(t => 
        t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.sport.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (activeSport !== 'All') {
      // Only filter by sport if NOT searching
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
  }, [activeSport, searchQuery, location]);

  const nearestTurfId = location && filteredTurfs.length > 0 ? filteredTurfs[0].id : null;

  return (
    <div className="page-wrapper home-page">
      {/* Premium Header */}
      <header className="home-header">
        <div className="home-header__brand">
          <h1 className="brand-title">Turf<span>Flow</span></h1>
          <div className="home-header__location" onClick={requestLocation}>
            <MapPin size={12} className={locLoading ? 'pulse' : ''} />
            <span>{locLoading ? 'Detecting...' : (city || 'Itanagar, Arunachal')}</span>
          </div>
        </div>
        <div className="home-header__quote-container">
          <p className="animated-quote">"Play with heart. Win with grace."</p>
        </div>
      </header>

      <div className="home-content">
        {/* Search Bar - Inline Filtering */}
        <div className="home-search-container">
          <div className="home-search-bar shadow-sm">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by location or name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Content: Hide Hero/Sports when searching for better focus */}
        {!searchQuery ? (
          <>
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
          </>
        ) : (
          <div className="search-results-meta">
            <p className="results-count">Found <strong>{filteredTurfs.length}</strong> turfs matching your search</p>
          </div>
        )}

        {/* Featured/Results Turfs */}
        <section className="home-section">
          <div className="home-section__header">
            <h2>{searchQuery ? 'Search Results' : 'Featured Turfs'}</h2>
            {!searchQuery && (
              <button id="home-see-all-btn" className="home-see-all" onClick={() => navigate('/explore')}>
                See All <ChevronRight size={14} />
              </button>
            )}
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
            ) : filteredTurfs.length > 0 ? (
              filteredTurfs.map(turf => (
                <TurfCard 
                  key={turf.id} 
                  turf={turf} 
                  userLocation={location}
                  isNearest={turf.id === nearestTurfId}
                />
              ))
            ) : (
              <div className="no-results">
                <span className="no-results-icon">🔍</span>
                <p>No turfs found matching "{searchQuery}"</p>
                <button className="clear-search-link" onClick={() => setSearchQuery('')}>Clear search</button>
              </div>
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
