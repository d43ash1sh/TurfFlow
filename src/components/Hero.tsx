import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { turfs } from '../data/mockData';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);

  // Use the first 5 turfs for the hero slider
  const heroTurfs = turfs.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroTurfs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroTurfs.length]);

  return (
    <section className="hero-section">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          className="hero-bg-image"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{ backgroundImage: `url(${heroTurfs[currentIdx].image})` }}
        >
          <div className="hero-overlay" />
        </motion.div>
      </AnimatePresence>

      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-badge">
            <span className="pulse-dot" />
            Live from {heroTurfs[currentIdx].city}
          </div>
          
          <h1 className="hero-title">
            Book <span className="text-highlight">{heroTurfs[currentIdx].name}</span><br />
            <span className="text-gradient">Instantly</span>
          </h1>
          
          <p className="hero-subtitle">
            Find and reserve the best turfs in Itanagar and Naharlagun. Professional grounds for professional players.
          </p>
          
          <div className="hero-actions">
            <button 
              className="hero-btn-primary"
              onClick={() => navigate(`/turf/${heroTurfs[currentIdx].id}`)}
            >
              Book Now <ChevronRight size={18} />
            </button>
            <button className="hero-btn-secondary" onClick={() => navigate('/explore')}>Explore All</button>
          </div>
        </motion.div>

        <div className="hero-dots">
          {heroTurfs.map((_, idx) => (
            <div 
              key={idx} 
              className={`hero-dot ${idx === currentIdx ? 'hero-dot--active' : ''}`}
              onClick={() => setCurrentIdx(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
