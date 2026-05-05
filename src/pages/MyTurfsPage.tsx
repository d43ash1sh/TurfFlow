import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, MapPin, Star, Calendar } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import { ownerTurfs } from '../data/mockData';
import './OwnerDashboard.css';
import './MyTurfsPage.css';

export default function MyTurfsPage() {
  return (
    <div className="owner-layout">
      <AdminSidebar />
      <main className="owner-main">
        <header className="owner-header">
          <div>
            <h1>My Turfs</h1>
            <p>Manage your turf listings and availability</p>
          </div>
          <button id="add-new-turf-btn" className="owner-add-btn">
            <Plus size={18} /> Add New Turf
          </button>
        </header>

        <div className="my-turfs-grid">
          {ownerTurfs.map(turf => (
            <div key={turf.id} id={`manage-turf-${turf.id}`} className="my-turfs-card shadow-card">
              <div className="my-turfs-card__image-wrap">
                <img src={turf.image} alt={turf.name} className="my-turfs-card__image" />
                <span className="my-turfs-card__sport label-bold">{turf.sport}</span>
                <div className="my-turfs-card__actions">
                  <button id={`edit-turf-${turf.id}`} className="my-turfs-card__action-btn my-turfs-card__action-btn--edit">
                    <Edit2 size={15} />
                  </button>
                  <button id={`delete-turf-${turf.id}`} className="my-turfs-card__action-btn my-turfs-card__action-btn--delete">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="my-turfs-card__body">
                <div className="my-turfs-card__header-row">
                  <h3>{turf.name}</h3>
                  <span className="my-turfs-card__rating"><Star size={13} fill="#d97706" color="#d97706"/>{turf.rating}</span>
                </div>
                <span className="my-turfs-card__location"><MapPin size={13}/>{turf.location}</span>
                <div className="my-turfs-card__stats">
                  <div className="my-turfs-card__stat">
                    <span className="label-bold">Rate</span>
                    <strong>₹{turf.price}/hr</strong>
                  </div>
                  <div className="my-turfs-card__stat">
                    <span className="label-bold">Reviews</span>
                    <strong>{turf.reviews}</strong>
                  </div>
                  <div className="my-turfs-card__stat">
                    <span className="label-bold">Status</span>
                    <strong className="status--upcoming">Active</strong>
                  </div>
                </div>
                <div className="my-turfs-card__amenities">
                  {turf.amenities.slice(0, 3).map(a => (
                    <span key={a} className="my-turfs-card__amenity">{a}</span>
                  ))}
                  {turf.amenities.length > 3 && (
                    <span className="my-turfs-card__amenity">+{turf.amenities.length - 3}</span>
                  )}
                </div>
                <button id={`manage-slots-${turf.id}`} className="my-turfs-card__slots-btn">
                  <Calendar size={15} /> Manage Slots
                </button>
              </div>
            </div>
          ))}

          {/* Add turf placeholder */}
          <div className="my-turfs-add-card" id="add-turf-card">
            <Plus size={32} />
            <span>Add New Turf</span>
            <p>List your venue and start earning</p>
          </div>
        </div>
      </main>
    </div>
  );
}
