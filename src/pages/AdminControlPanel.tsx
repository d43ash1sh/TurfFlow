import AdminSidebar from '../components/AdminSidebar';
import { turfs, users, bookings, earningsData } from '../data/mockData';
import { MapPin, Users, CalendarCheck, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import './OwnerDashboard.css';
import './AdminPages.css';

export default function AdminControlPanel() {
  const stats = [
    { label: 'Total Turfs', value: turfs.length, icon: MapPin, color: 'var(--primary)' },
    { label: 'Total Users', value: users.length, icon: Users, color: 'var(--secondary)' },
    { label: 'Total Bookings', value: earningsData.totalBookings, icon: CalendarCheck, color: 'var(--tertiary)' },
    { label: 'Platform Revenue', value: `₹${(earningsData.totalEarnings / 1000).toFixed(0)}K`, icon: TrendingUp, color: '#d97706' },
  ];

  const recentActivity = [
    { icon: CheckCircle, color: 'var(--primary)', text: 'New turf "Green Zone Sports Hub" was listed', time: '2 hrs ago' },
    { icon: Users, color: 'var(--secondary)', text: 'User Meghna Roy was suspended for policy violation', time: '5 hrs ago' },
    { icon: CalendarCheck, color: '#d97706', text: 'Booking #TF91234 confirmed at Goal Arena Turf', time: '7 hrs ago' },
    { icon: AlertTriangle, color: 'var(--error)', text: 'Complaint received for Thunder Badminton Court', time: '1 day ago' },
  ];

  return (
    <div className="owner-layout">
      <AdminSidebar />
      <main className="owner-main">
        <header className="owner-header">
          <div>
            <h1>Admin Control Panel</h1>
            <p>Platform-wide overview and management</p>
          </div>
          <div className="admin-badge">
            <AlertTriangle size={16} />
            <span>1 pending review</span>
          </div>
        </header>

        <div className="owner-stats">
          {stats.map(stat => (
            <div key={stat.label} id={`admin-stat-${stat.label.toLowerCase().replace(/ /g, '-')}`} className="owner-stat-card shadow-card">
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

        <div className="owner-two-col">
          {/* All Turfs */}
          <div className="owner-card shadow-card">
            <div className="owner-card__header">
              <h2>All Listings</h2>
              <span className="label-bold" style={{ color: 'var(--on-surface-variant)' }}>{turfs.length} total</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Turf</th>
                    <th>Sport</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {turfs.map(turf => (
                    <tr key={turf.id} id={`admin-turf-row-${turf.id}`}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <img src={turf.image} alt={turf.name} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                          <div>
                            <strong style={{ fontSize: 13, color: 'var(--on-surface)' }}>{turf.name}</strong>
                            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: 3 }}>
                              <MapPin size={10} />{turf.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{turf.sport}</td>
                      <td>₹{turf.basePrice}/hr</td>
                      <td>⭐ {turf.rating}</td>
                      <td><span className="my-bookings__status status--upcoming">Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="owner-card shadow-card">
            <h2>Recent Activity</h2>
            <div className="admin-activity-list">
              {recentActivity.map((act, i) => (
                <div key={i} className="admin-activity-row" id={`activity-${i}`}>
                  <div className="admin-activity-icon" style={{ background: `${act.color}18`, color: act.color }}>
                    <act.icon size={16} />
                  </div>
                  <div className="admin-activity-text">
                    <p>{act.text}</p>
                    <span className="label-bold">{act.time}</span>
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
