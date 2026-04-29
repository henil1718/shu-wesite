import { useState, useEffect } from 'react'
import './App.css'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Bounds, Environment, useGLTF } from '@react-three/drei'
import { useRef } from 'react'

function Shoe3D() {
  const { scene } = useGLTF('/new_balance_997.glb')
  const group = useRef()
  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return
      child.castShadow = true
      child.receiveShadow = true
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach((material) => {
        if (!material) return
        material.envMapIntensity = 1.15
        if (typeof material.roughness === 'number') {
          material.roughness = Math.max(0.18, material.roughness * 0.9)
        }
        if (typeof material.metalness === 'number') {
          material.metalness = Math.min(0.35, material.metalness + 0.04)
        }
        material.needsUpdate = true
      })
    })
  }, [scene])
  useFrame((state) => {
    group.current.rotation.y += 0.005
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
  })
  return (
    <group ref={group}>
      <primitive object={scene} scale={0.90} position={[0, -80, 0]} />
    </group>
  )
}

function ImmersiveShoe3D() {
  const { scene } = useGLTF('/new_balance_997.glb')
  const group = useRef()
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0.6, 12)
  }, [camera])

  useFrame((state) => {
    const t = Math.min(1, state.clock.elapsedTime / 1.3)
    camera.position.z = 12 - 8.5 * t
    camera.position.y = 0.6 - 0.35 * t
    group.current.rotation.y += 0.006
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.04
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.05
  })

  return <primitive ref={group} object={scene} scale={0.34} position={[0, -0.45, 0]} />
}

const parsePrice = (price) => Number(price.replace('$', ''))
const products = [
  { id: 1, name: '9060', sub: 'Lifestyle / Unisex', price: '$289', badge: 'New', image: 'nb1.jpg', rating: 4.8, reviews: 412, description: 'Bold retro runner silhouette with plush underfoot comfort and premium layered upper.', highlights: ['ABZORB + SBS cushioning', 'Premium suede mesh upper', 'Wide all-day comfort fit'] },
  { id: 2, name: '204L', sub: 'Lifestyle / Men\'s', price: '$319', badge: null, image: 'nb2.jpg', rating: 4.7, reviews: 286, description: 'Low-profile everyday pair with minimalist lines, responsive sole and city-ready grip.', highlights: ['Lightweight foam midsole', 'Breathable engineered mesh', 'Slip-resistant rubber outsole'] },
  { id: 3, name: 'ABZORD 2010 Grey Days', sub: 'Limited Edition / Unisex', price: '$349', badge: 'Limited', image: 'nb3.jpg', rating: 4.9, reviews: 198, description: 'A collector-focused release that blends archival aesthetics with modern comfort geometry.', highlights: ['Limited Grey Days colorway', 'Dual-density cushioning stack', 'Reflective branding details'] },
  { id: 4, name: '1080v15 Grey Days', sub: 'Performance / Unisex', price: '$259', badge: null, image: 'nb4.jpg', rating: 4.8, reviews: 521, description: 'Performance runner tuned for smooth transitions, soft landings and high-mile durability.', highlights: ['Fresh Foam X platform', 'High-rebound toe-off', 'Engineered heel lockdown'] },
  { id: 5, name: 'ABZORB 5030 Grey Days', sub: 'Lifestyle / Men\'s', price: '$299', badge: null, image: 'nb5.jpg', rating: 4.6, reviews: 307, description: 'Street-focused comfort pair with elevated materials and subtle vintage-inspired detailing.', highlights: ['ABZORB impact absorption', 'Premium nubuck overlays', 'Flexible forefoot grooves'] },
  { id: 6, name: 'FuelCell Rebel v5', sub: 'Lifestyle / Unisex', price: '$379', badge: 'New', image: 'nb6.jpg', rating: 4.9, reviews: 174, description: 'High-energy daily trainer with propulsive feel, featherweight build and modern profile.', highlights: ['FuelCell responsive foam', 'Ultra-light race mesh upper', 'Fast-transition rocker shape'] },
]

function Nav({ page, setPage, bagCount }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navColor = '#1f2430'

  return (
    <nav className={`${scrolled ? 'scrolled' : ''} ${page === 'about' ? 'nav-about' : ''}`}>
      <span className="nav-logo" style={{ color: navColor }} onClick={() => setPage('home')}>NEW BALANCE</span>
      <ul className="nav-links">
        <li><a style={{ color: navColor }} onClick={() => setPage('home')}>Home</a></li>
        <li><a style={{ color: navColor }} onClick={() => setPage('products')}>Products</a></li>
        <li><a style={{ color: navColor }} onClick={() => setPage('about')}>About</a></li>
      </ul>
      <button className="nav-cart" style={{ color: navColor }} onClick={() => setPage('bag')}>Bag ({bagCount})</button>
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
  <div style={{ width: '100%', height: '100%' }}>
    <Canvas camera={{ position: [0, -0.5, 11], fov: 40 }} shadows dpr={[1, 2]}>
      <ambientLight intensity={0.1} />
      <hemisphereLight intensity={0.3} groundColor="#181818" />
      <directionalLight
        position={[4, 5, 3]}
        intensity={0.9}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0002}
      />
      <Environment preset="city" intensity={0.3} />
      <Bounds fit clip margin={1.8}>
        <Shoe3D />
      </Bounds>
      <ContactShadows
        position={[-0.1, -1.15, 0]}
        opacity={0.42}
        scale={8}
        blur={2.3}
        far={3}
      />
      <OrbitControls enableZoom={false} enablePan={false} target={[0, 0, 0]} />
    </Canvas>
  </div>
</div>
      </section>

      

      <section className="features">
        {[
          { num: '01', title: 'Precision Craft', text: 'Every Shoe is assembled by hand, stitch by stitch. We believe footwear is a form of personal architecture — built to carry your story.' },
          { num: '02', title: 'Conscious Materials', text: 'We source only from ethical suppliers. Our leathers, foams, and fabrics are selected for longevity, not trend. Built to last years, not seasons.' },
          { num: '03', title: 'Timeless Form', text: 'NEW BALANCE designs don\'t follow trends. We study posture, movement, and ergonomics — then distill it into a silhouette that feels as good as it looks.' },
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
         <img src="nb7.jpg" alt="Featured Shoe" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
        </div>
        <div className="featured-info">
          <p className="featured-label">Featured Drop</p>
          <h2 className="featured-title">The NEW BALANCE<br />Cloud Runner</h2>
          <p className="featured-desc">Our most refined silhouette. Bone white leather, gold-toned eyelets, and a hand-stitched midsole. The shoe that started it all — reimagined.</p>
          <div className="featured-price">$289</div>
          <button className="btn-primary" onClick={() => setPage('products')}>Shop Collection</button>
        </div>
      </section>

      <Footer />
    </>
  )
}

function Products({ onAddToBag }) {
  const [active, setActive] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showImmersiveView, setShowImmersiveView] = useState(false)
  const filters = ['All', "Men's", "Women's", 'Runners', 'Lifestyle', 'Limited']

  const openProductDetail = (product) => setSelectedProduct(product)
  const closeProductDetail = () => {
    setSelectedProduct(null)
    setShowImmersiveView(false)
  }

  useEffect(() => {
    if (!selectedProduct) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeProductDetail()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedProduct])

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
          <div className="product-card" key={p.id} onClick={() => openProductDetail(p)}>
            <div className="product-card-visual">
              {p.badge && <div className="product-badge">{p.badge}</div>}
              <img className="product-card-image" src={p.image} alt={p.name} loading="lazy" />
            </div>
            <p className="product-name">{p.name}</p>
            <p className="product-sub">{p.sub}</p>
            <div className="product-footer">
              <span className="product-price">{p.price}</span>
              <button
                className="product-add"
                onClick={(event) => {
                  event.stopPropagation()
                  onAddToBag(p)
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="product-detail-overlay" onClick={closeProductDetail}>
          <div className="product-detail-scene" onClick={(event) => event.stopPropagation()}>
            <div className="product-detail-zoom">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="product-detail-image" />
            </div>
            <aside className="product-detail-panel">
              <button className="product-detail-close" onClick={closeProductDetail}>Close</button>
              <p className="product-detail-eyebrow">Immersive Product View</p>
              <h3>{selectedProduct.name}</h3>
              <p className="product-detail-sub">{selectedProduct.sub}</p>
              <p className="product-detail-price">{selectedProduct.price}</p>
              <p className="product-detail-rating">Rating {selectedProduct.rating} / 5 · {selectedProduct.reviews} reviews</p>
              <p className="product-detail-description">{selectedProduct.description}</p>
              <ul className="product-detail-highlights">
                {selectedProduct.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="product-detail-actions">
                <button className="btn-ghost" onClick={() => setShowImmersiveView(true)}>Enter 3D View</button>
                <button className="btn-primary" onClick={() => onAddToBag(selectedProduct)}>Add To Bag</button>
              </div>
            </aside>
          </div>
        </div>
      )}
      {showImmersiveView && selectedProduct && (
        <div className="immersive-overlay" onClick={() => setShowImmersiveView(false)}>
          <div className="immersive-shell" onClick={(event) => event.stopPropagation()}>
            <div className="immersive-header">
              <p>Inside {selectedProduct.name}</p>
              <button className="product-detail-close" onClick={() => setShowImmersiveView(false)}>Close View</button>
            </div>
            <Canvas camera={{ position: [0, 0.6, 12], fov: 48 }} shadows dpr={[1, 2]}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 6, 4]} intensity={1.2} />
              <Environment preset="warehouse" intensity={0.6} />
              <ImmersiveShoe3D />
              <ContactShadows position={[0, -1.15, 0]} opacity={0.36} scale={10} blur={2.2} far={4} />
              <OrbitControls enablePan={false} maxDistance={6} minDistance={2.2} />
            </Canvas>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

function Bag({ cartItems, updateQty, removeFromBag }) {
  const subtotal = cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0)
  const shipping = subtotal > 0 ? 18 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <>
      <section className="bag-page">
        <div className="bag-header">
          <h1>Your Cart</h1>
          <p>{cartItems.length} item types selected</p>
        </div>
        <div className="bag-layout">
          <div className="bag-items">
            {cartItems.length === 0 && <p className="bag-empty">Your bag is empty. Add a pair from the products page.</p>}
            {cartItems.map((item) => (
              <article key={item.id} className="bag-item-card">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.sub}</p>
                  <strong>{item.price}</strong>
                </div>
                <div className="bag-item-actions">
                  <div className="qty-controls">
                    <button onClick={() => updateQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromBag(item.id)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
          <aside className="checkout-panel">
            <h2>Checkout</h2>
            <label>Full Name<input type="text" placeholder="John Doe" /></label>
            <label>Address<input type="text" placeholder="221B Baker Street" /></label>
            <label>City<input type="text" placeholder="London" /></label>
            <label>Postal Code<input type="text" placeholder="NW1 6XE" /></label>
            <label>Payment Method
              <select defaultValue="card">
                <option value="card">Credit / Debit Card</option>
                <option value="upi">UPI</option>
                <option value="paypal">PayPal</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </label>
            <div className="totals">
              <p><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></p>
              <p><span>Shipping</span><span>${shipping.toFixed(2)}</span></p>
              <p><span>Tax</span><span>${tax.toFixed(2)}</span></p>
              <p className="total-row"><span>Total</span><span>${total.toFixed(2)}</span></p>
            </div>
            <button className="btn-primary">Proceed To Payment</button>
          </aside>
        </div>
      </section>
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
          <p className="about-para">NEW BALANCE was founded with one simple conviction: the world didn't need another loud shoe brand. It needed something quieter — more considered.</p>
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
          { title: 'Longevity', text: 'We offer lifetime sole replacement on every pair. A NEW BALANCE is an investment you\'ll reach for every morning for years.' },
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
          <div className="footer-brand">NEW BALANCE</div>
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
        <p className="footer-copy">© 2026 NEW BALANCE. All rights reserved.</p>
        <div className="footer-socials"><span>Instagram</span><span>Twitter</span><span>Pinterest</span></div>
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPage] = useState('home')
  const [bagItems, setBagItems] = useState([])

  const addToBag = (product) => {
    setBagItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const updateQty = (productId, delta) => {
    setBagItems((prev) => prev
      .map((item) => item.id === productId ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
      .filter((item) => item.qty > 0))
  }

  const removeFromBag = (productId) => {
    setBagItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const bagCount = bagItems.reduce((sum, item) => sum + item.qty, 0)

  useEffect(() => { window.scrollTo(0, 0) }, [page])

  const renderPage = () => {
    if (page === 'home') return <Home setPage={setPage} />
    if (page === 'products') return <Products onAddToBag={addToBag} />
    if (page === 'bag') return <Bag cartItems={bagItems} updateQty={updateQty} removeFromBag={removeFromBag} />
    return <About />
  }

  return (
    <>
      <Nav page={page} setPage={setPage} bagCount={bagCount} />
      <main key={page} className="page-transition">
        {renderPage()}
      </main>
    </>
  )
}