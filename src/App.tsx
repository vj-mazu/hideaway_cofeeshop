import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, MapPin, ArrowRight, X, PlayCircle, Sun, ShoppingBag, Star, Sparkles, Briefcase, Dog, CreditCard, Laptop, Leaf, Wind, Users } from 'lucide-react';

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`logo-official-wrapper ${className}`}>
    <img 
      src="/images/hideaway_logo.jpg" 
      alt="Hideaway Coffee House" 
      className="logo-image-main"
    />
  </div>
);

import './App.css';

// We implement minimal components right here to ensure seamless integration and fewer file reads.
// High quality animations via framer-motion are applied to all sections.

import type { Variants } from 'framer-motion';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="nav-logo">
          <Logo />
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#experience">Features</a></li>
          <li><a href="#reels">Reels</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-socials">
          <a href="#"><Coffee size={20} /></a>
          <a href="https://instagram.com/hideawaycoffee" target="_blank" rel="noreferrer"><InstagramIcon size={20} /></a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        {/* Placeholder image name for the storefront picture */}
        <img 
          src="/images/storefront.jpg" 
          alt="Hideaway Coffee House Storefront" 
          loading="eager" 
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80'; }} 
        />
        <div className="hero-bg-overlay"></div>
      </div>
      <div className="container">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeIn} className="hero-title">
            Exceptional <br /><span className="heading-gold">Coffee</span> & Community
          </motion.h1>
          <motion.p variants={fadeIn} className="hero-desc">
            A premium retreat offering artisanal coffees, fresh juices, and delicious bites. Step inside and let the aroma awaken your senses.
          </motion.p>
          <motion.div variants={fadeIn} className="hero-buttons">
            <a href="#menu" className="btn-solid">View Menu</a>
            <a href="https://maps.app.goo.gl/cb1HMhTrcnfDXthj9" target="_blank" rel="noreferrer" className="btn-primary">Find Us</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container about-grid">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="about-image"
        >
          {/* Placeholder for the barista pouring latte art */}
          <img src="/images/barista.jpg" alt="Bar barista pouring latte art" loading="lazy" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80'; }} />
        </motion.div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="about-content"
        >
          <h2 className="heading-gold">Crafting Perfection</h2>
          <p>
            At Hideaway Coffee House, we believe in the art of coffee. Every cup is meticulously crafted using the finest beans, ensuring a rich, luxurious flavor profile.
          </p>
          <p>
            Whether you are here for a quick morning espresso or a leisurely afternoon matcha, our passionate baristas are dedicated to delivering an unforgettable experience.
          </p>
          <a href="#menu" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex', gap: '0.5rem', alignItems: 'center', textDecoration: 'none' }}>
            Learn More <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface FeatureItem {
  text: string;
  icon: any;
  available?: boolean;
}

interface FeatureCategory {
  title: string;
  icon: any;
  features: FeatureItem[];
}

const Experience = () => {
  const categories: FeatureCategory[] = [
    {
      title: "Service Excellence",
      icon: <ShoppingBag size={24} />,
      features: [
        { text: "Outdoor Seating", icon: <Sun size={14} />, available: true },
        { text: "On-site Services", icon: <Briefcase size={14} />, available: true },
        { text: "Takeaway & Dine-in", icon: <ShoppingBag size={14} />, available: true },
        { text: "No Delivery", icon: <X size={14} />, available: false },
        { text: "Wheelchair Accessible", icon: <Wind size={14} />, available: true },
        { text: "No Accessible Car Park", icon: <X size={14} />, available: false }
      ]
    },
    {
      title: "Atmosphere",
      icon: <Sparkles size={24} />,
      features: [
        { text: "Casual & Trendy", icon: <Sparkles size={14} />, available: true },
        { text: "Solo & Work Friendly", icon: <Laptop size={14} />, available: true },
        { text: "Dogs Welcome Inside", icon: <Dog size={14} />, available: true },
        { text: "No Reservations", icon: <X size={14} />, available: false },
        { text: "Tourist Friendly", icon: <Users size={14} />, available: true }
      ]
    },
    {
      title: "Highlights",
      icon: <Star size={24} />,
      features: [
        { text: "Artisan Coffee", icon: <Coffee size={14} />, available: true },
        { text: "Gourmet Desserts", icon: <Star size={14} />, available: true },
        { text: "Specialist Tea", icon: <Leaf size={14} />, available: true },
        { text: "Vegan Options", icon: <Leaf size={14} />, available: true }
      ]
    },
    {
      title: "Convenience",
      icon: <CreditCard size={24} />,
      features: [
        { text: "Credit / Debit Cards", icon: <CreditCard size={14} />, available: true },
        { text: "NFC Mobile Payments", icon: <CreditCard size={14} />, available: true },
        { text: "Dogs Welcome", icon: <Dog size={14} />, available: true },
        { text: "Urban Retreat", icon: <MapPin size={14} />, available: true }
      ]
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="menu-header-center"
        >
          <h2 className="heading-gold">The Hideaway Experience</h2>
          <p style={{ color: 'var(--text-muted)' }}>Everything you need for the perfect afternoon.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="experience-grid"
        >
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              variants={fadeIn}
              className="experience-card"
            >
              <div className="experience-icon">{cat.icon}</div>
              <h4>{cat.title}</h4>
              <ul className="experience-list">
                {cat.features.map((feat, j) => (
                  <li key={j} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.8rem',
                    opacity: feat.available === false ? 0.5 : 1,
                    textDecoration: feat.available === false ? 'line-through' : 'none'
                  }}>
                    <span style={{ color: feat.available === false ? 'var(--text-muted)' : 'var(--accent-gold)' }}>
                      {feat.available === false ? <X size={14} /> : feat.icon}
                    </span>
                    {feat.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const VisualMenu = () => {
  return (
    <section className="visual-menu">
      <div className="container">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="visual-title heading-gold"
        >
          Our Signatures
        </motion.h2>
        <motion.div 
          className="menu-options"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          <motion.div 
            variants={slideInLeft} 
            whileHover={{ scale: 1.05, rotate: 1 }} 
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="menu-card"
          >
            <img src="/images/breakfast_perfect.jpg" alt="Signature Breakfast" loading="lazy" />
            <h4>Breakfast</h4>
          </motion.div>
          <motion.div 
            variants={slideInRight} 
            whileHover={{ scale: 1.05, rotate: -1 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
            className="menu-card"
          >
            <img src="/images/easter.jpg" alt="Sweet Treats" loading="lazy" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80'; }} />
            <h4>Treats</h4>
          </motion.div>
          <motion.div 
            variants={slideInLeft} 
            whileHover={{ scale: 1.05, rotate: 1 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
            className="menu-card"
          >
            <img src="/images/latte.jpg" alt="Hot Drinks" loading="lazy" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80'; }} />
            <h4>Hot Drinks</h4>
          </motion.div>
          <motion.div 
            variants={slideInRight} 
            whileHover={{ scale: 1.05, rotate: -1 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
            className="menu-card"
          >
            <img src="/images/filter_coffee.png" alt="Filter Coffee" loading="lazy" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80'; }} />
            <h4>Filter Coffee</h4>
          </motion.div>
          <motion.div 
            variants={slideInLeft} 
            whileHover={{ scale: 1.05, rotate: 1 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
            className="menu-card"
          >
            <img src="https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80" alt="Fresh Juices" loading="lazy" />
            <h4>Fresh Juices</h4>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};



const staggerMenu: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
  }
};


const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -200, rotate: -2 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 200, rotate: 2 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } }
};



const menuCategories = [
  {
    id: "espresso",
    title: "Espresso & Coffee",
    icon: "☕",
    image: "/images/latte.jpg",
    items: [
      { name: "Double Espresso", price: "£2.60" },
      { name: "Espresso Macchiato", price: "£3.10" },
      { name: "Cortado", price: "£3.10" },
      { name: "Americano / Long Black", price: "£3.10" },
      { name: "Flat White", price: "£3.60" },
      { name: "Cappuccino", price: "£3.60" },
      { name: "Latte", price: "£3.60" }
    ]
  },
  {
    id: "hot-drinks",
    title: "Hot Drinks",
    icon: "🍵",
    image: "/images/barista.jpg",
    items: [
      { name: "Matcha Latte", price: "£4.50" },
      { name: "Chai Latte", price: "£4.50" },
      { name: "Turmeric Latte", price: "£4.50" },
      { name: "Beetroot Latte", price: "£4.50" },
      { name: "Hot Chocolate", price: "£4.00" },
      { name: "Luxury Hot Chocolate", price: "£4.50" },
      { name: "Selection of specialist tea", price: "£3.00" }
    ]
  },
  {
    id: "breakfast",
    title: "Breakfast",
    icon: "🥐",
    image: "/images/breakfast_perfect.jpg",
    items: [
      { name: "Sourdough Toast w/ Preserves", price: "£4.50" },
      { name: "Sourdough Toast w/ Eggs", price: "£6.50" },
      { name: "Avocado on Sourdough", price: "£8.50" },
      { name: "Granola w/ Yogurt & Fruit", price: "£7.50" },
      { name: "Selection of Pastries", price: "from £3.00" }
    ]
  },
  {
    id: "juices",
    title: "Fresh Juices",
    icon: "🍊",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1200&q=80",
    items: [
      { name: "Classic Orange", price: "£7.00" },
      { name: "Apple, Carrot & Ginger", price: "£7.00" },
      { name: "Orange, Carrot & Ginger", price: "£7.00" },
      { name: "Clean Green", price: "£7.00" },
      { name: "Clean Red", price: "£7.00" },
      { name: "Orange Sunrise", price: "£7.50" },
      { name: "Green", price: "£7.50" },
      { name: "Velvet", price: "£7.50" },
      { name: "Tropical", price: "£7.50" },
      { name: "Large Orange", price: "£8.00" }
    ]
  },
  {
    id: "smoothies",
    title: "Smoothies",
    icon: "🥤",
    image: "/images/smoothies_ai.png",
    items: [
      { name: "Tropicale", price: "£7.50" },
      { name: "Hulk", price: "£7.50" },
      { name: "Purple Haze", price: "£7.50" },
      { name: "Coconut Beauty", price: "£7.50" },
      { name: "Strawberry & Banana", price: "£7.50" },
      { name: "Green Twist", price: "£7.50" },
      { name: "Beauty", price: "£7.50" }
    ]
  },
  {
    id: "extras",
    title: "Extras",
    icon: "✨",
    image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=1200&q=80",
    items: [
      { name: "Extra Shot", price: "£1.00" },
      { name: "Decaf", price: "£0.50" },
      { name: "Iced", price: "£0.50" },
      { name: "Vanilla / Caramel / Hazelnut", price: "£0.50" },
      { name: "Oat / Sprout milk", price: "Free" }
    ]
  }
];

const FullMenu = () => {
  const [activeTab, setActiveTab] = useState(menuCategories[0].id);
  const activeCategory = menuCategories.find(c => c.id === activeTab);

  return (
    <section id="menu" className="full-menu">
       <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="menu-header-center"
          >
             <h2>For <span className="heading-gold">Classical</span> You...</h2>
             <p style={{ color: 'var(--text-muted)' }}>Explore our complete selection of carefully curated items.</p>
          </motion.div>

          <div className="menu-tabs">
            {menuCategories.map(cat => (
              <button 
                key={cat.id} 
                className={`menu-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <span>{cat.icon}</span> {cat.title}
              </button>
            ))}
          </div>

          <div className="menu-content-grid">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: -300, rotate: -5, filter: 'blur(20px)' }}
                whileInView={{ opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 300, rotate: 5, filter: 'blur(20px)' }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 1
                }}
                whileHover={{ scale: 1.05 }}
                className="menu-big-image"
              >
                <img src={activeCategory?.image} alt={activeCategory?.title} className="animate-kenburns" loading="lazy" />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab + "-items"}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={staggerMenu}
                className="menu-items-grid"
              >
                {activeCategory?.items.map(item => (
                  <MenuItem key={item.name} name={item.name} price={item.price} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
       </div>
    </section>
  );
};

const MenuItem = ({ name, price }: { name: string, price: string }) => (
  <motion.div 
    className="menu-item-box"
    variants={fadeUpItem}
  >
    <span className="menu-item-name">{name}</span>
    <span className="menu-item-price">{price}</span>
  </motion.div>
);

const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="modal-content"
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
          <div className="privacy-text">
      <h2>Hideaway Privacy Commitment</h2>
      <p className="privacy-date">Version 1.4 — Official Governance</p>
      
      <p>At Hideaway Coffee House, your privacy is a foundational pillar of our service. This document outlines our rigorous standards for data protection and your rights as a valued guest of our digital space.</p>

      <h3>1. Information Architecture & Collection</h3>
      <p>We operate on a 'Privacy by Design' framework. We only collect data that is essential for operational excellence. Primary data points include voluntarily submitted contact details for reservations and anonymized metadata used to optimize your browsing journey.</p>

      <h3>2. Lawful Basis and Purpose</h3>
      <p>Our processing activities are anchored in the legal grounds of contractual necessity and legitimate business interest. We utilize information to personalize your Hideaway experience, communicate essential shop updates, and maintain the security of our digital infrastructure.</p>

      <h3>3. Data Sovereignty and Security</h3>
      <p>Your data remains yours. Hideaway Coffee House utilizes industry-standard AES-256 encryption for any stored data. We strictly prohibit the sale or unauthorized sharing of user information with third-party brokers. Data sharing is limited to essential operational partners (e.g., Google Maps API) who satisfy our strict privacy criteria.</p>

      <h3>4. Cookie and Analytics Policy</h3>
      <p>We utilize 'Essential' and 'Performance' cookies to provide a seamless interface. These small files allow us to understand traffic patterns without identifying individual users, ensuring our site remains fast and responsive across the globe.</p>

      <h3>5. International Rights (GDPR / UK DPA)</h3>
      <p>You possess the "Right to be Forgotten," the right to data portability, and the right to access any information we hold. For immediate data requests or formal inquiries, please contact our Data Protection Officer at our Soho location.</p>

      <h3>6. Retention and Disposal</h3>
      <p>Information is retained only for as long as necessary to fulfill the purposes outlined above. Upon expiration of the retention period, data is securely and permanently purged from our systems.</p>

      <h3>7. Policy Updates</h3>
      <p>Hideaway Coffee House reserves the right to refine this policy to reflect evolving legal standards. Continued use of our services constitutes acknowledgment of these terms.</p>
    </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const REELS_DATA = [
  { id: 1, video: "/videos/reel_1.mp4", caption: "A regular day at Hideaway Coffee House 😎" },
  { id: 2, video: "/videos/reel_2.mp4", caption: "Hideaway: Central London’s hidden gem ☕️📍" },
];

const SocialBuzz = () => {
  return (
    <section id="reels" className="reels-section">
      <div className="container">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="heading-gold"
        >
          Hideaway <span style={{ color: 'var(--text-primary)' }}>Reels</span>
        </motion.h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Experience the motion of our artisan craft.</p>
        
        <div className="reels-grid">
          {REELS_DATA.map((reel) => (
            <motion.div 
              key={reel.id}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="reel-video-container"
            >
              <video 
                src={reel.video} 
                className="reel-player"
                autoPlay 
                muted 
                loop 
                playsInline
                preload="auto"
                onClick={(e) => {
                  const video = e.currentTarget;
                  video.muted = !video.muted;
                }}
              />
              <div className="reel-overlay">
                <div className="reel-sound-hint">
                  <PlayCircle size={20} />
                  <span>Tap for sound</span>
                </div>
                <p className="reel-caption">{reel.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onPrivacyClick }: { onPrivacyClick: () => void }) => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>Visit Us</h3>
            <a href="https://maps.app.goo.gl/cb1HMhTrcnfDXthj9" target="_blank" rel="noreferrer" className="address-link">
              <p>7 Farrier's Psge</p>
              <p>London W1D 7DP</p>
              <p>United Kingdom</p>
            </a>
            <a href="https://instagram.com/hideawaycoffee" target="_blank" rel="noreferrer" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <InstagramIcon size={16} /> @hideawaycoffee
            </a>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#menu">Menu</a>
            <button onClick={onPrivacyClick} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, marginTop: '0.5rem', textAlign: 'left', fontSize: '1rem' }}>Privacy Policy</button>
          </div>
          <div className="footer-col">
            <h3>Location</h3>
            <p>Find us on Google Maps for the easiest route to your perfect cup of coffee.</p>
            <a href="https://maps.app.goo.gl/cb1HMhTrcnfDXthj9" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem' }}>
              <MapPin size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '5px' }} /> View Map
            </a>
          </div>
          <div className="footer-col">
            <h3>Opening Hours</h3>
            <ul className="opening-hours flex" style={{ listStyle: 'none', padding: 0 }}>
              <li><span>Mon - Fri</span> <span>7:30 am – 5:00 pm</span></li>
              <li className="today"><span>Saturday</span> <span>9:00 am – 5:30 pm</span></li>
              <li><span>Sunday</span> <span>9:00 am – 5:00 pm</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Hideaway Coffee House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: initial (logo hidden)
    // Stage 1: logo appears (0.3s)
    // Stage 2: ring glows (1s)
    // Stage 3: text appears (1.8s)
    // Stage 4: progress bar (2.2s)
    // Complete at 4s
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setStage(2), 1000);
    const t3 = setTimeout(() => setStage(3), 1800);
    const t4 = setTimeout(() => setStage(4), 2200);
    const done = setTimeout(onComplete, 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(done); };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.15,
        filter: 'blur(30px)',
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
      }}
      style={{ transformOrigin: 'center center' }}
      className="splash-screen"
    >
      {/* Ambient particles */}
      <div className="splash-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="splash-particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }} />
        ))}
      </div>

      <motion.div className="splash-content">
        {/* Animated golden ring */}
        <motion.div
          className="splash-logo-ring"
          initial={{ scale: 0.6, opacity: 0, rotate: -180 }}
          animate={stage >= 1 ? { scale: 1, opacity: 1, rotate: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={`splash-ring-glow ${stage >= 2 ? 'active' : ''}`} />
          
          {/* Logo image */}
          <motion.div
            className="splash-logo-container"
            initial={{ scale: 0, opacity: 0 }}
            animate={stage >= 1 ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <img
              src="/images/hideaway_logo.jpg"
              alt="Hideaway Coffee House"
              className="splash-logo-img"
            />
            <div className={`splash-logo-shimmer ${stage >= 2 ? 'active' : ''}`} />
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="splash-tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="splash-tag-line-deco" />
          <p className="splash-tag-text">HIDEAWAY</p>
          <span className="splash-tag-line-deco" />
        </motion.div>

        <motion.p
          className="splash-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          COFFEE HOUSE
        </motion.p>

        {/* Loading bar */}
        <motion.div
          className="splash-progress-track"
          initial={{ opacity: 0 }}
          animate={stage >= 4 ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="splash-progress-fill"
            initial={{ scaleX: 0 }}
            animate={stage >= 4 ? { scaleX: 1 } : {}}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <AnimatePresence mode="wait">
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <motion.div 
          initial={{ opacity: 0, filter: 'blur(10px)' }} 
          animate={{ opacity: 1, filter: 'blur(0px)' }} 
          transition={{ duration: 1.2 }} 
          className="app-container"
        >
          <Navbar />
          <Hero />
          <About />
          <VisualMenu />
          <FullMenu />
          <Experience />
          <SocialBuzz />
          <Footer onPrivacyClick={() => setPrivacyOpen(true)} />
        </motion.div>
      )}
    </>
  );
}

export default App;
