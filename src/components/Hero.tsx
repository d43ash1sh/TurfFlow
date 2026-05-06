import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import footballImg from '../assets/football.png';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();
  
  // Mouse movement tracking for parallax/tilt effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  // Smooth springs for high-performance motion
  const springConfig = { damping: 25, stiffness: 150 };
  const ballX = useSpring(useTransform(mouseX, [-500, 500], [-50, 50]), springConfig);
  const ballY = useSpring(useTransform(mouseY, [-500, 500], [-50, 50]), springConfig);
  const ballRotate = useSpring(useTransform(mouseX, [-500, 500], [-30, 30]), springConfig);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.section 
      className="hero-section"
      onMouseMove={handleMouseMove}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Dynamic Background Elements */}
      <div className="hero-bg">
        <motion.div 
          className="hero-blob hero-blob--1"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="hero-blob hero-blob--2"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="pulse-dot" />
            Live Bookings Active
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="hero-title">
            Book Your Turf<br />
            <span className="text-gradient">Instantly</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="hero-subtitle">
            Experience the next generation of sports booking. Find, reserve, and play on the best turfs in your city.
          </motion.p>
          
          <motion.div variants={itemVariants} className="hero-actions">
            <button 
              className="hero-btn-primary"
              onClick={() => navigate('/explore')}
            >
              Explore Now <ChevronRight size={18} />
            </button>
            <button className="hero-btn-secondary">Learn More</button>
          </motion.div>
        </div>

        <motion.div 
          className="hero-visual"
          style={{ x: ballX, y: ballY, rotate: ballRotate }}
          variants={itemVariants}
        >
          <div className="football-wrapper">
            <img src={footballImg} alt="Football" className="hero-football" />
            <div className="football-glow" />
            <div className="football-shadow" />
          </div>
          
          {/* Decorative Elements */}
          <motion.div 
            className="floating-card glass-panel"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="floating-card__icon">⭐</div>
            <div>
              <p className="label-bold">4.9/5</p>
              <p className="text-tiny">User Rating</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
