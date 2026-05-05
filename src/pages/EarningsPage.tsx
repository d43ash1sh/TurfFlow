import AdminSidebar from '../components/AdminSidebar';
import { earningsData, ownerTurfs } from '../data/mockData';
import { TrendingUp, TrendingDown, DollarSign, CalendarCheck, Star } from 'lucide-react';
import './OwnerDashboard.css';
import './AdminPages.css';

export default function EarningsPage() {
  const growth = (((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100).toFixed(1);
  const isPositive = Number(growth) >= 0;

  const stats = [
    { label: 'Total Earnings', value: `₹${(earningsData.totalEarnings / 1000).toFixed(1)}K`, icon: DollarSign, color: 'var(--primary)', sub: 'All time' },
    { label: 'This Month', value: `₹${(earningsData.thisMonth / 1000).toFixed(1)}K`, icon: isPositive ? TrendingUp : TrendingDown, color: isPositive ? 'var(--primary)' : 'var(--error)', sub: `${isPositive ? '+' : ''}${growth}% vs last month` },
    { label: 'Total Bookings', value: earningsData.totalBookings, icon: CalendarCheck, color: 'var(--secondary)', sub: `${earningsData.thisMonthBookings} this month` },
    { label: 'Avg Rating', value: earningsData.avgRating, icon: Star, color: '#d97706', sub: 'Across all turfs' },
  ];

  const maxEarnings = Math.max(...earningsData.monthlyData.map(d => d.earnings));

  return (
    <div className="owner-layout">
      <AdminSidebar />
      <main className="owner-main">
        <header className="owner-header">
          <div>
            <h1>Earnings & Analytics</h1>
            <p>Track your revenue and performance metrics</p>
          </div>
        </header>

        <div className="owner-stats">
          {stats.map(stat => (
            <div key={stat.label} id={`earnings-stat-${stat.label.toLowerCase().replace(/ /g, '-')}`} className="owner-stat-card shadow-card">
              <div className="owner-stat-icon" style={{ background: `${stat.color}18`, color: stat.color }}>
                <stat.icon size={20} />
              </div>
              <div className="owner-stat-info">
                <span className="label-bold">{stat.label}</span>
                <strong className="owner-stat-value">{stat.value}</strong>
                <span style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Big Bar Chart */}
        <div className="owner-card shadow-card">
          <h2>Monthly Revenue</h2>
          <div className="earnings-chart" id="monthly-chart">
            {earningsData.monthlyData.map(d => {
              const pct = (d.earnings / maxEarnings) * 100;
              return (
                <div key={d.month} className="earnings-chart__col">
                  <span className="earnings-chart__val">₹{(d.earnings / 1000).toFixed(1)}K</span>
                  <div className="earnings-chart__bar-track">
                    <div className="earnings-chart__bar-fill" style={{ height: `${pct}%` }} />
                  </div>
                  <span className="earnings-chart__month">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Per-turf breakdown */}
        <div className="owner-card shadow-card">
          <h2>Revenue by Turf</h2>
          <div className="earnings-turf-rows">
            {ownerTurfs.map((turf, i) => {
              const share = i === 0 ? 65 : 35;
              return (
                <div key={turf.id} className="earnings-turf-row" id={`earnings-turf-${turf.id}`}>
                  <img src={turf.image} alt={turf.name} className="earnings-turf-img" />
                  <div className="earnings-turf-info">
                    <strong>{turf.name}</strong>
                    <span>{turf.location}</span>
                    <div className="earnings-progress-wrap">
                      <div className="earnings-progress-bar">
                        <div className="earnings-progress-fill" style={{ width: `${share}%` }} />
                      </div>
                      <span className="label-bold">{share}%</span>
                    </div>
                  </div>
                  <div className="earnings-turf-amount">
                    <strong>₹{Math.round(earningsData.totalEarnings * share / 100 / 1000)}K</strong>
                    <span>{share === 65 ? earningsData.thisMonthBookings : earningsData.totalBookings - earningsData.thisMonthBookings} bookings</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
