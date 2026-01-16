import React, { useState, useEffect } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import { skincareProducts } from '../data/products';

const Products = ({ navigateTo, openProductDetail, addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [notification, setNotification] = useState(null);
  
  const categories = ['all', 'Cleanser', 'Serum', 'Moisturizer', 'Sunscreen', 'Treatment', 'Toner'];
  
  const filteredProducts = selectedCategory === 'all' 
    ? skincareProducts 
    : skincareProducts.filter(product => product.category === selectedCategory);
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.featured ? -1 : 1; // featured first by default
  });

  // Auto scroll to top when component mounts or filters change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [selectedCategory, sortBy]);

  // Custom add to cart function with notification (same as Home component)
  const handleAddToCart = (product) => {
    // Call the original addToCart function
    addToCart(product);
    
    // Show custom notification
    setNotification({
      message: `Added ${product.name} to cart!`,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image
    });
    
    // Auto hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handle product click with auto-scroll
  const handleProductClick = (product) => {
    // Scroll to top before opening product detail
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Then open product detail
    openProductDetail(product);
  };

  return (
    <div className="py-12 bg-light">
      {/* Custom Notification - Same as Home component */}
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
                <p className="text-accent font-bold mt-1">${notification.productPrice.toFixed(2)}</p>
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
                onClick={() => navigateTo('cart')}
                className="w-full bg-accent text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition duration-300 text-sm"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark mb-4">All Skincare Products</h1>
          <p className="text-dark max-w-2xl mx-auto">
            Discover our complete collection of scientifically-formulated skincare for every skin type and concern.
          </p>
        </div>
        
        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="flex items-center">
            <span className="text-dark mr-2">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-4 py-2 text-dark"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
        
        {/* Products Grid */}
        <ProductGrid 
          products={sortedProducts} 
          openProductDetail={handleProductClick} // Use custom handleProductClick instead of openProductDetail
          addToCart={handleAddToCart} // Use custom handleAddToCart instead of addToCart
        />
        
        {/* Results Info */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-dark">
            Showing {sortedProducts.length} of {skincareProducts.length} products
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;