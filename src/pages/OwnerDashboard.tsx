import { useNavigate } from 'react-router-dom';
import { TrendingUp, Star, Users, CalendarCheck, Plus, MoreVertical, MapPin } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import { useGreeting } from '../hooks/useGreeting';
import { ownerTurfs, bookings, earningsData } from '../data/mockData';
import './OwnerDashboard.css';

export default function OwnerDashboard() {
  const navigate = useNavigate();

  const greeting = useGreeting();

  const stats = [
    { label: 'Total Earnings', value: `₹${(earningsData.totalEarnings / 1000).toFixed(1)}K`, icon: TrendingUp, color: 'var(--primary)' },
    { label: 'This Month', value: `₹${(earningsData.thisMonth / 1000).toFixed(1)}K`, icon: TrendingUp, color: 'var(--secondary)' },
    { label: 'Total Bookings', value: earningsData.totalBookings, icon: CalendarCheck, color: 'var(--tertiary)' },
    { label: 'Avg Rating', value: earningsData.avgRating, icon: Star, color: '#d97706' },
  ];

  const recentBookings = bookings.slice(0, 3);

  return (
    <div className="owner-layout">
      <AdminSidebar />
      <main className="owner-main">
        <header className="owner-header">
          <div>
            <h1>Owner Dashboard</h1>
            <p>{greeting} Here's your performance overview.</p>
          </div>
          <button id="add-turf-btn" className="owner-add-btn" onClick={() => navigate('/owner/turfs')}>
            <Plus size={18} /> Add Turf
          </button>
        </header>

        {/* Stats Grid */}
        <div className="owner-stats">
          {stats.map(stat => (
            <div key={stat.label} className="owner-stat-card shadow-card" id={`stat-${stat.label.toLowerCase().replace(/ /g, '-')}`}>
              <div className="owner-stat-icon" style={{ background: `${stat.color}18`, color: stat.color }}>
                <stat.icon size={20} />
              </div>
              <div className="owner-stat-info">
                <span className="label-bold">{stat.label}</span>
                <strong className="owner-stat-value">{stat.value}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Chart: Monthly Earnings Bar */}
        <div className="owner-card shadow-card">
          <h2>Monthly Earnings</h2>
          <div className="owner-chart">
            {earningsData.monthlyData.map(d => {
              const max = Math.max(...earningsData.monthlyData.map(x => x.earnings));
              const pct = (d.earnings / max) * 100;
              return (
                <div key={d.month} className="owner-chart__bar-wrap">
                  <span className="owner-chart__value">₹{(d.earnings/1000).toFixed(1)}K</span>
                  <div className="owner-chart__bar">
                    <div className="owner-chart__bar-fill" style={{ height: `${pct}%` }} />
                  </div>
                  <span className="owner-chart__label">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="owner-two-col">
          {/* My Turfs */}
          <div className="owner-card shadow-card">
            <div className="owner-card__header">
              <h2>My Turfs</h2>
              <button id="view-all-turfs-btn" onClick={() => navigate('/owner/turfs')}>View All</button>
            </div>
            <div className="owner-turfs-list">
              {ownerTurfs.map(turf => (
                <div key={turf.id} className="owner-turf-row" id={`owner-turf-${turf.id}`}>
                  <img src={turf.image} alt={turf.name} className="owner-turf-img" />
                  <div className="owner-turf-info">
                    <strong>{turf.name}</strong>
                    <span><MapPin size={11}/>{turf.location}</span>
                    <span>₹{turf.basePrice}/hr · ⭐{turf.rating}</span>
                  </div>
                  <button className="owner-turf-menu"><MoreVertical size={16} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="owner-card shadow-card">
            <div className="owner-card__header">
              <h2>Recent Bookings</h2>
              <button id="view-all-bookings-btn" onClick={() => navigate('/admin/bookings')}>View All</button>
            </div>
            <div className="owner-bookings-list">
              {recentBookings.map(b => (
                <div key={b.id} className="owner-booking-row" id={`owner-booking-${b.id}`}>
                  <div className="owner-booking-info">
                    <strong>{b.turfName}</strong>
                    <span>{new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · {b.startTime}</span>
                  </div>
                  <div className="owner-booking-right">
                    <span className={`my-bookings__status status--${b.status}`}>{b.status}</span>
                    <strong style={{ color: 'var(--primary)' }}>₹{b.totalAmount.toLocaleString()}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
