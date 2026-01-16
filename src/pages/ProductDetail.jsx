import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { skincareProducts } from '../data/products';

const ProductDetail = ({ product, addToCart, navigateTo, openProductDetail }) => {
  const [selectedSize, setSelectedSize] = useState('50ml');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  // ដកទិន្នន័យពី localStorage ប្រសិន product prop គឺ null
  useEffect(() => {
    if (product) {
      setCurrentProduct(product);
      setSelectedSize(product.size || '50ml');
    } else {
      // Fallback: ព្យាយាមយកពី localStorage
      const savedProduct = localStorage.getItem('selectedProduct');
      if (savedProduct) {
        try {
          const parsedProduct = JSON.parse(savedProduct);
          setCurrentProduct(parsedProduct);
          setSelectedSize(parsedProduct.size || '50ml');
        } catch (error) {
          console.error('Error parsing saved product:', error);
        }
      }
    }
  }, [product]);

  // Auto scroll to top when product changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentProduct]);

  useEffect(() => {
    if (currentProduct) {
      // Get images from product or use default array
      const productImages = currentProduct.images || [currentProduct.image];
      
      // Find related products
      const related = skincareProducts
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);
      
      if (related.length === 0) {
        const featured = skincareProducts
          .filter(p => p.id !== currentProduct.id && p.featured)
          .slice(0, 4);
        setRelatedProducts(featured);
      } else {
        setRelatedProducts(related);
      }
    }
  }, [currentProduct]);

  // Get current selected image
  const selectedImage = currentProduct?.images ? currentProduct.images[selectedImageIndex] : currentProduct?.image;

  // Custom add to cart function with notification
  const handleAddToCart = () => {
    if (!currentProduct) return;
    
    const productWithQuantity = { 
      ...currentProduct, 
      quantity,
      selectedSize
    };
    
    addToCart(productWithQuantity);
    
    setNotification({
      message: `Added ${quantity} × ${currentProduct.name} to cart!`,
      productName: currentProduct.name,
      productPrice: currentProduct.price,
      productImage: selectedImage,
      quantity: quantity,
      size: selectedSize
    });
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Custom add to cart for related products
  const handleRelatedAddToCart = (relatedProduct) => {
    addToCart(relatedProduct);
    
    setNotification({
      message: `Added ${relatedProduct.name} to cart!`,
      productName: relatedProduct.name,
      productPrice: relatedProduct.price,
      productImage: relatedProduct.image,
      quantity: 1,
      size: relatedProduct.size || '50ml'
    });
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (!currentProduct) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-dark mb-4">Product Not Found</h1>
        <button 
          onClick={() => navigateTo('products')}
          className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
        >
          Browse Products
        </button>
      </div>
    );
  }

  // Get product images - use images array if exists, otherwise create array with main image
  const productImages = currentProduct.images || [currentProduct.image, currentProduct.image, currentProduct.image, currentProduct.image];

  return (
    <div className="py-12 bg-light">
      {/* Custom Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-white rounded-lg shadow-xl border-l-4 border-accent p-4 max-w-sm w-full">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-lg overflow-hidden mr-3">
                  <img 
                    src={notification.productImage} 
                    alt={notification.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23F8E5E5'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dy='.3em' fill='%23A5B4CB'%3E✨%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-dark">Added to Cart!</h4>
                  <button 
                    onClick={() => setNotification(null)}
                    className="text-gray-400 hover:text-dark"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <p className="text-dark mt-1">{notification.productName}</p>
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <p className="text-accent font-bold">${(notification.productPrice * notification.quantity).toFixed(2)}</p>
                    <p className="text-xs text-dark">
                      {notification.quantity} × ${notification.productPrice.toFixed(2)} • {notification.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm text-dark">
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Item added successfully
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <button 
                onClick={() => {
                  setNotification(null);
                  navigateTo('cart');
                }}
                className="w-full bg-accent text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition duration-300 text-sm"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <button 
            onClick={() => navigateTo('products')}
            className="text-dark hover:text-accent transition duration-300"
          >
            ← Back to Products
          </button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <div className="h-96 bg-primary rounded-lg overflow-hidden relative group">
                <img 
                  src={selectedImage} 
                  alt={currentProduct.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23F8E5E5'/%3E%3Ctext x='50%25' y='50%25' font-size='48' text-anchor='middle' dy='.3em' fill='%23A5B4CB'%3E✨%3C/text%3E%3C/svg%3E";
                  }}
                />
                {/* Navigation arrows for images */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : productImages.length - 1))}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 w-10 h-10 rounded-full flex items-center justify-center transition duration-300 shadow-md"
                    >
                      <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 w-10 h-10 rounded-full flex items-center justify-center transition duration-300 shadow-md"
                    >
                      <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {productImages.length}
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-4 mt-6 overflow-x-auto pb-2">
                {productImages.map((img, i) => (
                  <div 
                    key={i}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition duration-300 ${
                      selectedImageIndex === i ? 'border-accent' : 'border-transparent hover:border-accent'
                    }`}
                    onClick={() => setSelectedImageIndex(i)}
                  >
                    <img 
                      src={img} 
                      alt={`${currentProduct.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23F8E5E5'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dy='.3em' fill='%23A5B4CB'%3E✨%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <span className="text-sm font-semibold text-secondary uppercase tracking-wide">
                {currentProduct.category}
              </span>
              <h1 className="text-4xl font-bold text-dark mt-2 mb-4">{currentProduct.name}</h1>
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < currentProduct.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-dark">({currentProduct.rating}/5) • 128 reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="text-4xl font-bold text-accent mb-2">${currentProduct.price.toFixed(2)}</div>
              <p className="text-dark">Free shipping on orders over $50</p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-dark mb-3">Description</h3>
              <p className="text-dark leading-relaxed">{currentProduct.description}</p>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-dark mb-3">Key Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {currentProduct.ingredients.map((ingredient, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-primary text-dark rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-dark mb-3">Size</h3>
              <div className="flex space-x-4">
                {['30ml', '50ml', '100ml'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border rounded-lg transition duration-300 ${
                      selectedSize === size
                        ? 'border-accent bg-accent text-white'
                        : 'border-gray-300 text-dark hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-dark mb-3">Quantity</h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-dark hover:text-accent"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 text-lg font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-dark hover:text-accent"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-accent text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add to Cart - ${(currentProduct.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t pt-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-dark mb-2">Skin Type</h4>
                  <p className="text-dark">{currentProduct.skinType}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-dark mb-2">Size</h4>
                  <p className="text-dark">{currentProduct.size}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t">
            <h2 className="text-3xl font-bold text-dark mb-8">Related Products</h2>
            <p className="text-dark mb-8">You might also like these {currentProduct.category} products:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  addToCart={handleRelatedAddToCart}
                  openProductDetail={openProductDetail}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => navigateTo('products')}
                className="bg-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition duration-300"
              >
                View All {currentProduct.category} Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;