import React, { useState } from 'react';

const Footer = ({ navigateTo }) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const quickLinks = [
    { label: 'Home', page: 'home' },
    { label: 'All Products', page: 'products' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact Us', page: 'contact' },
    { label: 'Skin Types Guide', page: 'skin-types' },
    { label: 'Skincare Routines', page: 'routines' },
  ];

  const supportLinks = [
    { label: 'Contact Support', page: 'contact' },
    { label: 'FAQs', page: 'faqs' },
    { label: 'Shipping & Returns', page: 'shipping' },
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms of Service', page: 'terms' },
    { label: 'My Account', page: 'account' },
  ];

  const companyInfo = [
    { icon: '📍', text: '123 Skincare Ave, San Francisco, CA 94107' },
    { icon: '📞', text: '+1 (800) 123-4567' },
    { icon: '✉️', text: 'support@perfectskincare.com' },
    { icon: '⏰', text: 'Mon-Fri 9am-6pm PST' },
  ];

  return (
    <footer className="bg-dark text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <div 
              className="text-2xl font-bold mb-4 brand-font cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              Sophia <span className="text-accent">Skincare</span>
            </div>
            <p className="text-gray-300 mb-6">
              Science-backed skincare for visible results. Clean, effective, and sustainable.
            </p>
            
            {/* Company Info */}
            <div className="space-y-2 mb-6">
              {companyInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <span className="mr-3 mt-1">{info.icon}</span>
                  <span className="text-gray-300 text-sm">{info.text}</span>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-dark hover:bg-accent hover:text-white transition duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-dark hover:bg-accent hover:text-white transition duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-dark hover:bg-accent hover:text-white transition duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-dark hover:bg-accent hover:text-white transition duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => navigateTo(link.page)}
                    className="text-gray-300 hover:text-accent transition duration-300 text-left w-full"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => {
                      if (link.page === 'faqs' || link.page === 'shipping' || link.page === 'privacy' || link.page === 'terms') {
                        // For demo purposes, show an alert. In a real app, these would be separate pages.
                        alert(`This would navigate to the ${link.label} page.`);
                      } else {
                        navigateTo(link.page);
                      }
                    }}
                    className="text-gray-300 hover:text-accent transition duration-300 text-left w-full"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Get skincare tips, new product launches, and exclusive offers delivered to your inbox.
            </p>
            
            {subscribed ? (
              <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 text-center">
                <div className="text-green-400 font-medium mb-1">Thank you for subscribing!</div>
                <p className="text-green-300 text-sm">You'll receive our next skincare newsletter.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-l-lg text-dark"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-accent px-4 py-3 rounded-r-lg font-medium hover:bg-opacity-90 transition duration-300 whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-gray-400 text-xs">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
            
            {/* Payment Methods */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-gray-300 mb-3">We accept:</p>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay'].map((method) => (
                  <div key={method} className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                &copy; {currentYear} Sophia Skincare. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                This is a demo e-commerce website for educational purposes.
              </p>
            </div>
            
            {/* Certifications/Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-400">
                <span className="mr-2">🌱</span>
                <span>Cruelty-Free</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <span className="mr-2">♻️</span>
                <span>Sustainable Packaging</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <span className="mr-2">🔒</span>
                <span>Secure SSL</span>
              </div>
            </div>
          </div>
          
          {/* Back to Top */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-6 mx-auto flex items-center text-accent hover:text-opacity-80 transition duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;