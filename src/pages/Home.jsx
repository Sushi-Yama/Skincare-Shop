import React, { useState } from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import SkinQuiz from '../components/SkinQuiz';
import { skincareProducts } from '../data/products';

const Home = ({ navigateTo, openProductDetail, addToCart }) => {
  const featuredProducts = skincareProducts.filter(product => product.featured);
  const bestSellers = skincareProducts.slice(0, 4);
  const [notification, setNotification] = useState(null);

  // Define category images
  const categories = [
    { 
      name: 'Cleansers', 
      image: 'https://i.pinimg.com/736x/6b/d9/a3/6bd9a308c9f68480aaf6c6e6d619d68f.jpg',
      type: 'Cleanser'
    },
    { 
      name: 'Moisturizers', 
      image: 'https://i.pinimg.com/736x/de/c3/46/dec34610ccc0c718c29d84b97846b65d.jpg',
      type: 'Moisturizer'
    },
    { 
      name: 'Serums', 
      image: 'https://i.pinimg.com/736x/e7/85/51/e78551e2eb722a0439f28c38e56e7438.jpg',
      type: 'Serum'
    },
    { 
      name: 'Sunscreen', 
      image: 'https://i.pinimg.com/1200x/9c/df/04/9cdf04cec4ae7f37582bfff765917772.jpg',
      type: 'Sunscreen'
    }
  ];

  // Custom add to cart function with notification
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

  return (
    <div>
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

      <Hero navigateTo={navigateTo} />
      
      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Featured Products</h2>
            <p className="text-dark max-w-2xl mx-auto">
              Discover our curated collection of premium skincare essentials for radiant, healthy skin.
            </p>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            openProductDetail={openProductDetail}
            addToCart={handleAddToCart} // Use custom handleAddToCart
          />
          
          <div className="text-center mt-12">
            <button 
              onClick={() => navigateTo('products')}
              className="bg-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition duration-300"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>
      
      {/* Categories Section - UPDATED WITH IMAGES */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden group"
                onClick={() => navigateTo('products')}
              >
                {/* Category Image */}
                <div className="h-40 w-full rounded-lg overflow-hidden mb-4 relative">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23F8E5E5'/%3E%3Ctext x='50%25' y='50%25' font-size='48' text-anchor='middle' dy='.3em' fill='%23A5B4CB'%3E✨%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300"></div>
                </div>
                
                <h3 className="font-semibold text-dark">{category.name}</h3>
                <p className="text-sm text-dark mt-1">Explore our collection</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Best Sellers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">Best Sellers</h2>
          
          <ProductGrid 
            products={bestSellers} 
            openProductDetail={openProductDetail}
            addToCart={handleAddToCart} // Use custom handleAddToCart
          />
        </div>
      </section>
      
      <SkinQuiz />
      
      {/* Newsletter Section */}
      {/* <section className="py-16 bg-dark text-white ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Skincare Community</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to get exclusive offers, skincare tips, and early access to new products.
          </p>
          
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg text-dark"
            />
            <button className="bg-accent px-6 py-3 rounded-r-lg font-medium hover:bg-opacity-90 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;