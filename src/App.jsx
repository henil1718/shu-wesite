import { useState, useEffect } from 'react'
import './App.css'

const ShoeIcon = ({ sole = '#1a1a1a', upper = '#f0ece4', lace = '#c8a97e', size = 280 }) => (
  <svg viewBox="0 0 400 260" width={size} xmlns="http://www.w3.org/2000/svg">
    <path d="M50 200 Q70 214 220 216 Q340 218 360 200 Q368 190 360 182 Q340 176 220 174 Q70 172 50 182 Z" fill={sole}/>
    <path d="M80 182 Q78 155 92 130 Q108 105 135 98 Q175 88 215 90 Q255 92 285 108 Q310 122 320 155 Q325 168 322 182 Z" fill={upper}/>
    <path d="M80 182 Q76 162 90 142 Q104 124 120 118 Q140 112 155 116 Q130 148 128 182 Z" fill={upper} opacity="0.85"/>
    <path d="M155 116 Q200 106 245 108 Q275 110 295 126 Q302 155 298 182 Q260 176 215 175 Q170 174 128 179 Z" fill={upper} opacity="1.1"/>
    <line x1="165" y1="133" x2="283" y2="130" stroke={lace} strokeWidth="2" opacity="0.9"/>
    <line x1="163" y1="147" x2="285" y2="144" stroke={lace} strokeWidth="2" opacity="0.9"/>
    <line x1="161" y1="161" x2="287" y2="158" stroke={lace} strokeWidth="2" opacity="0.9"/>
    <line x1="160" y1="174" x2="288" y2="171" stroke={lace} strokeWidth="2" opacity="0.9"/>
    <circle cx="165" cy="133" r="4" fill={sole}/><circle cx="283" cy="130" r="4" fill={sole}/>
    <circle cx="163" cy="147" r="4" fill={sole}/><circle cx="285" cy="144" r="4" fill={sole}/>
    <circle cx="161" cy="161" r="4" fill={sole}/><circle cx="287" cy="158" r="4" fill={sole}/>
    <circle cx="160" cy="174" r="4" fill={sole}/><circle cx="288" cy="171" r="4" fill={sole}/>
    <path d="M298 182 Q310 162 305 138 Q295 118 283 110 Q292 136 290 182 Z" fill={upper} opacity="0.8"/>
    <path d="M290 112 Q298 104 306 112 Q302 124 294 126 Z" fill={lace}/>
  </svg>
)

const products = [
  { id: 1, name: 'Blanc Classic', sub: 'Lifestyle / Unisex', price: '$289', badge: 'New', sole: '#1a1a1a', upper: '#f0ece4', lace: '#c8a97e' },
  { id: 2, name: 'Noir Luxe', sub: 'Lifestyle / Men\'s', price: '$319', badge: null, sole: '#c8a97e', upper: '#2c2c2c', lace: '#c8a97e' },
  { id: 3, name: 'Desert Sand', sub: 'Limited Edition / Unisex', price: '$349', badge: 'Limited', sole: '#1a1a1a', upper: '#d4c5b0', lace: '#ffffff' },
  { id: 4, name: 'Cloud Runner', sub: 'Performance / Unisex', price: '$259', badge: null, sole: '#555', upper: '#e8e8e8', lace: '#888' },
  { id: 5, name: 'Terra Warm', sub: 'Lifestyle / Women\'s', price: '$299', badge: null, sole: '#8b6f5e', upper: '#c4956a', lace: '#ffffff' },
  { id: 6, name: 'Midnight Gold', sub: 'Lifestyle / Unisex', price: '$379', badge: 'New', sole: '#1a1a1a', upper: '#1a1a1a', lace: '#c8a97e' },
]

function Nav({ page, setPage, bagCount }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isAbout = page === 'about'
  const navColor = (isAbout && !scrolled) ? '#ffffff' : '#0d0d0d'

  return (
    <nav className={`${scrolled ? 'scrolled' : ''} ${page === 'about' ? 'nav-about' : ''}`}>
      <span className="nav-logo" style={{ color: navColor }} onClick={() => setPage('home')}>SHU</span>
      <ul className="nav-links">
        <li><a style={{ color: navColor }} onClick={() => setPage('home')}>Home</a></li>
        <li><a style={{ color: navColor }} onClick={() => setPage('products')}>Products</a></li>
        <li><a style={{ color: navColor }} onClick={() => setPage('about')}>About</a></li>
      </ul>
      <button className="nav-cart" style={{ color: navColor }}>Bag ({bagCount})</button>
    </nav>
  )
}

function Home({ setPage }) {
  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">New Collection — 2026</p>
          <h1 className="hero-title">Walk in<br /><em>Silence.</em><br />Run in<br />Style.</h1>
          <p className="hero-desc">Footwear crafted for those who move with intention. Minimal design. Maximum performance.</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => setPage('products')}>Shop Now</button>
            <button className="btn-ghost" onClick={() => setPage('about')}>Our Story →</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-shoe">
            <ShoeIcon sole="#1a1a1a" upper="#f0ece4" lace="#c8a97e" size={380} />
          </div>
        </div>
      </section>

      <div className="marquee-section">
        <div className="marquee-track">
          {[0,1].map(i => (
            <div className="marquee-item" key={i}>
              Crafted with Intention <span>✦</span> Free Shipping Worldwide <span>✦</span> Sustainable Materials <span>✦</span> 30-Day Returns <span>✦</span> New Collection 2026 <span>✦</span> Handcrafted Soles <span>✦</span>
            </div>
          ))}
        </div>
      </div>

      <section className="features">
        {[
          { num: '01', title: 'Precision Craft', text: 'Every SHU is assembled by hand, stitch by stitch. We believe footwear is a form of personal architecture — built to carry your story.' },
          { num: '02', title: 'Conscious Materials', text: 'We source only from ethical suppliers. Our leathers, foams, and fabrics are selected for longevity, not trend. Built to last years, not seasons.' },
          { num: '03', title: 'Timeless Form', text: 'SHU designs don\'t follow trends. We study posture, movement, and ergonomics — then distill it into a silhouette that feels as good as it looks.' },
        ].map(f => (
          <div key={f.num}>
            <div className="feature-num">{f.num}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-text">{f.text}</p>
          </div>
        ))}
      </section>

      <section className="featured">
        <div className="featured-visual">
          <div className="featured-shoe">
            <ShoeIcon sole="#c8a97e" upper="#ffffff" lace="#1a1a1a" size={420} />
          </div>
        </div>
        <div className="featured-info">
          <p className="featured-label">Featured Drop</p>
          <h2 className="featured-title">The SHU<br />Blanc Classic</h2>
          <p className="featured-desc">Our most refined silhouette. Bone white leather, gold-toned eyelets, and a hand-stitched midsole. The shoe that started it all — reimagined.</p>
          <div className="featured-price">$289</div>
          <button className="btn-primary" onClick={() => setPage('products')}>Shop Collection</button>
        </div>
      </section>

      <Footer />
    </>
  )
}

function Products({ bagCount, setBagCount }) {
  const [active, setActive] = useState('All')
  const filters = ['All', "Men's", "Women's", 'Runners', 'Lifestyle', 'Limited']
  return (
    <>
      <div className="products-hero">
        <h1>The Collection</h1>
        <p>26 styles. One philosophy.</p>
      </div>
      <div className="filter-bar">
        {filters.map(f => (
          <button key={f} className={`filter-btn ${active === f ? 'active' : ''}`} onClick={() => setActive(f)}>{f}</button>
        ))}
      </div>
      <div className="products-grid">
        {products.map(p => (
          <div className="product-card" key={p.id}>
            <div className="product-card-visual">
              {p.badge && <div className="product-badge">{p.badge}</div>}
              <ShoeIcon sole={p.sole} upper={p.upper} lace={p.lace} size={240} />
            </div>
            <p className="product-name">{p.name}</p>
            <p className="product-sub">{p.sub}</p>
            <div className="product-footer">
              <span className="product-price">{p.price}</span>
              <button className="product-add" onClick={() => setBagCount(bagCount + 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}

function About() {
  return (
    <>
      <div className="about-hero">
        <h1>We believe shoes<br />are <em>architecture</em><br />for the body.</h1>
        <p>Founded 2026 · Minimal by design · Global by nature</p>
      </div>
      <div className="about-content">
        <div className="about-text-block">
          <p className="about-label">Our Philosophy</p>
          <h2 className="about-heading">Born from the idea that less is always more.</h2>
          <p className="about-para">SHU was founded with one simple conviction: the world didn't need another loud shoe brand. It needed something quieter — more considered.</p>
          <p className="about-para">Every silhouette we create goes through a rigorous stripping process. We add, then subtract, until only what matters remains.</p>
          <p className="about-para">We don't chase trends. We study movement, posture, and the long arc of design history — and we make shoes that belong in that arc.</p>
        </div>
        <div className="about-stats">
          {[['26','Styles in current collection'],['12','Countries we ship to'],['100%','Ethically sourced materials'],['1','Philosophy: Less, but better']].map(([num, label]) => (
            <div className="stat-item" key={label}>
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="about-values">
        {[
          { title: 'Sustainability', text: 'We use vegetable-tanned leathers, recycled foams, and water-based adhesives. Our packaging is fully compostable.' },
          { title: 'Craft', text: 'Our shoes are assembled in small-batch workshops by artisans who have spent decades perfecting their trade.' },
          { title: 'Longevity', text: 'We offer lifetime sole replacement on every pair. A SHU is an investment you\'ll reach for every morning for years.' },
        ].map(v => (
          <div key={v.title}>
            <h3 className="value-title">{v.title}</h3>
            <p className="value-text">{v.text}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-brand">SHU</div>
          <p className="footer-tagline">Move in silence.<br />Walk with purpose.<br />Built for the quiet confident.</p>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">Shop</p>
          <ul><li>New Arrivals</li><li>Men's</li><li>Women's</li><li>Limited Edition</li></ul>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">Company</p>
          <ul><li>Our Story</li><li>Sustainability</li><li>Careers</li></ul>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">Support</p>
          <ul><li>Sizing Guide</li><li>Returns</li><li>Contact</li></ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2026 SHU. All rights reserved.</p>
        <div className="footer-socials"><span>Instagram</span><span>Twitter</span><span>Pinterest</span></div>
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPage] = useState('home')
  const [bagCount, setBagCount] = useState(0)

  useEffect(() => { window.scrollTo(0, 0) }, [page])

  return (
    <>
      <Nav page={page} setPage={setPage} bagCount={bagCount} />
      {page === 'home' && <Home setPage={setPage} />}
      {page === 'products' && <Products bagCount={bagCount} setBagCount={setBagCount} />}
      {page === 'about' && <About />}
    </>
  )
}