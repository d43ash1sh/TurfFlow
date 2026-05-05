import AdminSidebar from '../components/AdminSidebar';
import { users } from '../data/mockData';
import { Search, UserX, Shield, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import './OwnerDashboard.css';
import './AdminPages.css';

export default function UserManagementPage() {
  const [query, setQuery] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="owner-layout">
      <AdminSidebar />
      <main className="owner-main">
        <header className="owner-header">
          <div>
            <h1>User Management</h1>
            <p>{users.length} registered users</p>
          </div>
          <div className="admin-search-wrap">
            <Search size={16} />
            <input
              id="user-search-input"
              type="text"
              placeholder="Search users..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="owner-card shadow-card">
          <div className="admin-table-wrap">
            <table className="admin-table" id="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>Joined</th>
                  <th>Bookings</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(user => (
                  <tr key={user.id} id={`user-row-${user.id}`}>
                    <td>
                      <div className="admin-user-cell">
                        <div className="admin-user-avatar" style={{
                          background: user.role === 'admin' ? 'var(--tertiary-container)' :
                            user.role === 'owner' ? 'var(--secondary-container)' : 'var(--primary-container)'
                        }}>
                          {user.name[0]}
                        </div>
                        <div>
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`admin-role-badge admin-role-badge--${user.role}`}>
                        {user.role === 'admin' && <Shield size={11} />}
                        {user.role}
                      </span>
                    </td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.joinDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="admin-table__center">{user.bookings}</td>
                    <td>
                      <span className={`my-bookings__status ${user.status === 'active' ? 'status--upcoming' : 'status--cancelled'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          id={`suspend-user-${user.id}`}
                          className="admin-action-btn admin-action-btn--danger"
                          title={user.status === 'active' ? 'Suspend' : 'Reactivate'}
                        >
                          <UserX size={14} />
                        </button>
                        <button
                          id={`more-user-${user.id}`}
                          className="admin-action-btn"
                          title="More options"
                        >
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
