const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Add AnimatePresence import
code = code.replace(/import { motion } from 'framer-motion';/, "import { motion, AnimatePresence } from 'framer-motion';");

// Replace FullMenu & MenuItem
const newMenu = `
const menuCategories = [
  {
    id: "coffee",
    title: "Espresso & Coffee",
    icon: "☕",
    image: "/images/barista.jpg",
    items: [
      { name: "Espresso", price: "£3.00" },
      { name: "Macchiato", price: "£3.20" },
      { name: "Cortado", price: "£3.20" },
      { name: "Long Black", price: "£3.20" },
      { name: "Filter Coffee", price: "£3.20" },
      { name: "Flat White", price: "£3.60" },
      { name: "Latte", price: "£3.80" },
      { name: "Cappuccino", price: "£3.80" },
      { name: "Mocha", price: "£3.90" },
      { name: "Iced Latte", price: "£4.00" },
      { name: "Iced Americano", price: "£3.90" },
      { name: "Iced Mocha", price: "£4.20" },
      { name: "Iced Choc", price: "£4.50" }
    ]
  },
  {
    id: "hot",
    title: "Hot Drinks",
    icon: "🍵",
    image: "/images/latte.jpg",
    items: [
      { name: "Hot Chocolate", price: "£4.00" },
      { name: "Matcha", price: "£4.00" },
      { name: "Chai", price: "£4.00" },
      { name: "Turmeric", price: "£4.00" },
      { name: "Pumpkin Spice", price: "£5.00" },
      { name: "Tea Selection", price: "£3.40" }
    ]
  },
  {
    id: "breakfast",
    title: "Breakfast",
    icon: "🥐",
    image: "/images/overhead.jpg",
    items: [
      { name: "Ham & Cheese Croissant", price: "£6.50" },
      { name: "Porridge", price: "£6.50" },
      { name: "Yoghurt Pot", price: "£6.50" }
    ]
  },
  {
    id: "juices",
    title: "Fresh Juices",
    icon: "🍊",
    image: "/images/easter.jpg",
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
    image: "/images/storefront.jpg",
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
    image: "/images/barista.jpg",
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
                className={\`menu-tab-btn \${activeTab === cat.id ? 'active' : ''}\`}
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="menu-big-image"
              >
                <img src={activeCategory?.image} alt={activeCategory?.title} />
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
    whileHover={{ y: -2, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
  >
    <span className="menu-item-name">{name}</span>
    <span className="menu-item-price">{price}</span>
  </motion.div>
);
`;

const menuStart = code.indexOf(`const FullMenu = () => {`);
const menuEnd = code.indexOf(`const Footer = () => {`);
if (menuStart === -1 || menuEnd === -1) {
    console.error("Could not find FullMenu or Footer");
    process.exit(1);
}

code = code.substring(0, menuStart) + newMenu + '\n' + code.substring(menuEnd);

// Add loading state in App
const appStart = code.indexOf("function App() {");
const splashScreen = `
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'var(--bg-dark)', zIndex: 9999,
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}
    >
      <motion.div style={{ textAlign: 'center' }}>
        <motion.h1
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } }}
          style={{ color: 'var(--text-light)', fontSize: '5rem', fontWeight: 700, letterSpacing: '0.1em', margin: 0 }}
        >
          Coffee
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  
  return (
    <>
      <AnimatePresence>
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }} 
          className="app-container"
        >
          <Navbar />
          <Hero />
          <About />
          <VisualMenu />
          <FullMenu />
          <Footer />
        </motion.div>
      )}
    </>
  );
}
`;

code = code.substring(0, appStart) + splashScreen;

fs.writeFileSync('src/App.tsx', code);
console.log("Updated App.tsx successfully");
