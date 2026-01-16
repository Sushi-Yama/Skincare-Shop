import React, { useState, useEffect, useRef } from 'react';
import { skincareProducts } from '../data/products';

const Header = ({ navigateTo, cartCount, openCart, openProductDetail }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  const handleNavigation = (page) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  // Handle search input
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = skincareProducts
      .filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.skinType.toLowerCase().includes(query)
      )
      .slice(0, 5); // Limit to 5 results

    setSearchResults(results);
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  // Handle search result click - UPDATED
  const handleSearchResultClick = (product) => {
    // Close search and mobile menu
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
    setIsMobileMenuOpen(false);
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Use openProductDetail to set the selected product and navigate
    if (openProductDetail) {
      openProductDetail(product);
    }
  };

  const menuItems = [
    { label: 'Home', page: 'home' },
    { label: 'All Products', page: 'products' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
    { label: 'Skin Types', page: 'skin-types' },
    { label: 'Routines', page: 'routines' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-2xl font-bold text-dark cursor-pointer brand-font"
            onClick={() => handleNavigation('home')}
          >
            Sophia <span className="text-accent">Skincare</span>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button 
                key={item.label}
                onClick={() => handleNavigation(item.page)}
                className="text-dark hover:text-accent transition duration-300 py-2 px-1 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Button/Input */}
            <div className="relative" ref={searchRef}>
              {/* Desktop Search */}
              <div className="hidden md:flex items-center">
                {showSearch ? (
                  <div className="relative">
                    <input
                      id="search-input"
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition duration-300"
                      autoFocus
                    />
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                        setShowSearch(false);
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-dark"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={toggleSearch}
                    className="text-dark hover:text-accent transition duration-300"
                    title="Search products"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                )}
              </div>

              {/* Mobile Search Button */}
              <button 
                className="md:hidden text-dark hover:text-accent"
                onClick={toggleSearch}
                title="Search products"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>

              {/* Search Results Dropdown */}
              {showSearch && searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full md:w-96 bg-white rounded-lg shadow-xl border z-50 overflow-hidden">
                  <div className="p-3 bg-primary border-b">
                    <p className="text-sm font-medium text-dark">
                      Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSearchResultClick(product)}
                        className="p-3 border-b hover:bg-gray-50 cursor-pointer transition duration-200 flex items-start group"
                      >
                        <div className="w-12 h-12 bg-primary rounded-lg overflow-hidden flex-shrink-0 mr-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23F8E5E5'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dy='.3em' fill='%23A5B4CB'%3E✨%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-dark group-hover:text-accent transition duration-200">
                            {product.name}
                          </h4>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-600 mr-3">{product.category}</span>
                            <span className="text-sm px-2 py-0.5 bg-primary text-dark rounded-full">
                              {product.skinType}
                            </span>
                          </div>
                          <p className="text-accent font-bold mt-1">${product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition duration-200">
                          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                  {searchResults.length === 5 && (
                    <div 
                      className="p-3 text-center cursor-pointer hover:bg-gray-50 transition duration-200"
                      onClick={() => {
                        handleNavigation('products');
                        setSearchQuery('');
                      }}
                    >
                      <span className="text-accent font-medium">View all results</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Account Button */}
            <button 
              className="text-dark hover:text-accent hidden md:block"
              onClick={() => navigateTo('account')}
              title="My Account"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </button>
            
            {/* Cart Icon with Badge */}
            <button 
              onClick={openCart}
              className="relative text-dark hover:text-accent"
              title="Shopping Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-dark hover:text-accent"
              onClick={toggleMobileMenu}
              title="Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              {/* Mobile Search Input */}
              <div className="mb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition duration-300"
                    autoFocus={isMobileMenuOpen}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-dark"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Mobile Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-lg shadow border max-h-64 overflow-y-auto">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSearchResultClick(product)}
                        className="p-3 border-b hover:bg-gray-50 cursor-pointer transition duration-200"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary rounded-lg overflow-hidden flex-shrink-0 mr-3">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-dark">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                          <span className="text-accent font-bold">${product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.page)}
                  className="text-dark hover:text-accent transition duration-300 py-2 px-2 text-left flex items-center"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile-only actions */}
              <div className="pt-4 border-t mt-2 space-y-3">
                <button 
                  onClick={() => {
                    handleNavigation('account');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center text-dark hover:text-accent transition duration-300 py-2 w-full text-left"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  My Account
                </button>
                
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCart();
                  }}
                  className="flex items-center text-dark hover:text-accent transition duration-300 py-2 w-full text-left"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  Shopping Cart
                  {cartCount > 0 && (
                    <span className="ml-auto bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Fullscreen Search */}
        {showSearch && window.innerWidth < 768 && (
          <div className="fixed inset-0 bg-white z-50 p-4">
            <div className="flex items-center mb-6">
              <button 
                onClick={toggleSearch}
                className="text-dark mr-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow border-b-2 border-gray-300 px-4 py-2 focus:outline-none focus:border-accent text-lg"
                autoFocus
              />
            </div>
            
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSearchResultClick(product)}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-primary rounded-lg overflow-hidden flex-shrink-0 mr-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-dark">{product.name}</h3>
                        <p className="text-gray-600 text-sm">{product.category}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-accent font-bold">${product.price.toFixed(2)}</span>
                          <span className="ml-3 text-xs px-2 py-0.5 bg-primary text-dark rounded-full">
                            {product.skinType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery.trim() !== '' ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-gray-600">No products found for "{searchQuery}"</p>
                <button 
                  onClick={() => handleNavigation('products')}
                  className="mt-4 text-accent font-medium"
                >
                  Browse all products
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✨</div>
                <p className="text-gray-600">Start typing to search for skincare products</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => {
                      setSearchQuery('Serum');
                    }}
                    className="px-4 py-2 bg-primary text-dark rounded-lg"
                  >
                    Serum
                  </button>
                  <button 
                    onClick={() => {
                      setSearchQuery('Moisturizer');
                    }}
                    className="px-4 py-2 bg-primary text-dark rounded-lg"
                  >
                    Moisturizer
                  </button>
                  <button 
                    onClick={() => {
                      setSearchQuery('Cleanser');
                    }}
                    className="px-4 py-2 bg-primary text-dark rounded-lg"
                  >
                    Cleanser
                  </button>
                  <button 
                    onClick={() => {
                      setSearchQuery('Sunscreen');
                    }}
                    className="px-4 py-2 bg-primary text-dark rounded-lg"
                  >
                    Sunscreen
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;