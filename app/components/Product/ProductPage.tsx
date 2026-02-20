"use client"
// import React, { useState } from 'react';
// import './ProductPage.css';

// const ProductPage: React.FC = () => {
//   const [selectedSize, setSelectedSize] = useState('41');
//   const [selectedColor, setSelectedColor] = useState(0);
//   const [mainImage, setMainImage] = useState('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop');

//   const colors = [
//     { name: 'White', img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop' },
//     { name: 'Grey', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1000&auto=format&fit=crop' },
//     { name: 'Black', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop' }
//   ];

//   const thumbnails = [
//     colors[0].img,
//     'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop',
//     'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
//     'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop'
//   ];

//   return (
//     <div className="product-container">
//       {/* Sidebar/Navigation Mockup */}
//       <nav className="breadcrumb">
//         Clothes and shoes  •  Shoes  •  Reebok
//       </nav>

//       <div className="product-grid">
//         {/* Left: Image Gallery */}
//         <div className="image-section">
//           <div className="main-image-card">
//             <img src={mainImage} alt="Reebok Zig" />
//           </div>
//           <div className="thumbnail-row">
//             {thumbnails.map((thumb, i) => (
//               <div key={i} className="thumb" onClick={() => setMainImage(thumb)}>
//                 <img src={thumb} alt="thumb" />
//               </div>
//             ))}
//             <div className="thumb more">+4 more</div>
//           </div>
//         </div>

//         {/* Right: Product Details */}
//         <div className="details-section">
//           <div className="brand-header">
//             <span className="brand-logo">👟 Reebok</span>
//             <span className="sku">HR1325R00--B</span>
//           </div>

//           <h1 className="product-title">Shoes Reebok Zig Kinetica 3</h1>
          
//           <div className="rating">
//             <span className="stars">★★★★☆</span>
//             <span className="review-count">42 reviews</span>
//           </div>

//           <div className="price">$199.00</div>

//           {/* Color Selection */}
//           <div className="option-group">
//             <p className="label">Color — <span>{colors[selectedColor].name}</span></p>
//             <div className="color-options">
//               {colors.map((c, i) => (
//                 <div 
//                   key={i} 
//                   className={`color-box ${selectedColor === i ? 'active' : ''}`}
//                   onClick={() => { setSelectedColor(i); setMainImage(c.img); }}
//                 >
//                   <img src={c.img} alt={c.name} />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Size Selection */}
//           <div className="option-group">
//             <div className="size-header">
//               <p className="label">Size — <span>EU Men</span></p>
//               <span className="size-guide">Size guide</span>
//             </div>
//             <div className="size-grid">
//               {['40.5', '41', '42', '43', '43.5', '44', '44.5', '45', '46'].map(size => (
//                 <button 
//                   key={size}
//                   className={`size-btn ${selectedSize === size ? 'active' : ''}`}
//                   onClick={() => setSelectedSize(size)}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="action-row">
//             <button className="add-to-cart">
//               <span className="cart-icon">🛒</span> Add to cart
//             </button>
//             <button className="wishlist-btn">♡</button>
//           </div>

//           <p className="shipping-info">🚚 Free delivery on orders over $30.0</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

import React, { useState } from 'react';
import './ProductPage.css';

const ProductPage: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState('41');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const colors = [
    { id: 1, name: 'Cloud White', hex: '#f8f9fa', img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000' },
    { id: 2, name: 'Moon Grey', hex: '#e2e2e2', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1000' },
    { id: 3, name: 'Core Black', hex: '#1a1a1a', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000' }
  ];

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className="shop-wrapper">
      <div className="product-card-main">
        {/* Left Side: Visuals */}
        <section className="gallery-side">
          <div className="badge-new">NEW ARRIVAL</div>
          <div className="main-stage">
            <img 
              src={colors[selectedColor].img} 
              alt="Product" 
              className="hero-img"
            />
          </div>
          <div className="thumb-strip">
            {colors.map((c, i) => (
              <button 
                key={c.id} 
                className={`thumb-btn ${selectedColor === i ? 'active' : ''}`}
                onClick={() => setSelectedColor(i)}
              >
                <img src={c.img} alt={c.name} />
              </button>
            ))}
            <div className="thumb-btn more-view">+4</div>
          </div>
        </section>

        {/* Right Side: Info */}
        <section className="info-side">
          <header className="info-header">
            <div className="brand-meta">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Reebok_2019_logo.svg" alt="logo" className="mini-logo" />
              <span className="serial">SKU: RBK-2026-KF</span>
            </div>
            <h1 className="title-text">Zig Kinetica 3 Lifestyle</h1>
            <div className="review-bar">
              <span className="stars-fill">★★★★</span><span className="stars-empty">★</span>
              <span className="count">(42 Reviews)</span>
            </div>
          </header>

          <div className="price-tag">
            <span className="currency">$</span>199.00
            <span className="old-price">$240.00</span>
          </div>

          {/* Color Picker */}
          <div className="control-box">
            <label className="box-label">COLOR: <span>{colors[selectedColor].name}</span></label>
            <div className="color-swatches">
              {colors.map((c, i) => (
                <div 
                  key={c.id}
                  className={`swatch-circle ${selectedColor === i ? 'selected' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setSelectedColor(i)}
                />
              ))}
            </div>
          </div>

          {/* Size Picker */}
          <div className="control-box">
            <div className="label-row">
              <label className="box-label">SELECT SIZE (EU)</label>
              <button className="guide-link">Size Chart</button>
            </div>
            <div className="grid-sizes">
              {['40', '41', '42', '43', '44', '45'].map(size => (
                <button 
                  key={size}
                  className={`size-tile ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Buy */}
          <div className="purchase-footer">
            <div className="qty-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            
            <button 
              className={`add-btn ${isAdding ? 'loading' : ''}`} 
              onClick={handleAddToCart}
            >
              {isAdding ? 'ADDING...' : 'ADD TO CART'}
            </button>
            
            <button className="heart-btn">♥</button>
          </div>

          <div className="trust-badges">
            <p>✓ 30-Day Free Returns</p>
            <p>✓ 2-Year Warranty Included</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;