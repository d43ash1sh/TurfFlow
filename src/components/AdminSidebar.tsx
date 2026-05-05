import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, MapPin, CalendarCheck, TrendingUp, Users, Settings, LogOut, ChevronLeft
} from 'lucide-react';
import './AdminSidebar.css';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: CalendarCheck, label: 'My Bookings', path: '/admin/bookings' },
  { icon: MapPin, label: 'My Turfs', path: '/owner/turfs' },
  { icon: TrendingUp, label: 'Earnings', path: '/owner/earnings' },
  { icon: Users, label: 'User Management', path: '/admin/users' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="admin-sidebar glass-panel">
      <div className="admin-sidebar__header">
        <div className="admin-sidebar__logo">
          <span className="admin-sidebar__logo-icon">⚽</span>
          <span className="admin-sidebar__logo-text">TurfFlow</span>
        </div>
        <button className="admin-sidebar__back" onClick={() => navigate('/')}>
          <ChevronLeft size={18} />
        </button>
      </div>
      <nav className="admin-sidebar__nav">
        {menuItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              id={`sidebar-${label.toLowerCase().replace(' ', '-')}`}
              className={`admin-sidebar__item ${isActive ? 'admin-sidebar__item--active' : ''}`}
              onClick={() => navigate(path)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
      <button className="admin-sidebar__logout" onClick={() => navigate('/login')}>
        <LogOut size={20} />
        <span>Log Out</span>
      </button>
    </aside>
  );
}
