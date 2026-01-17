import React, { useState, useEffect } from 'react';
import { skincareProducts } from '../data/products';
import { sendToTelegram } from '../services/TelegramService';

const Cart = ({ cartItems, updateQuantity, removeFromCart, navigateTo, addToCart, openProductDetail }) => {
  const [notification, setNotification] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [customerName, setCustomerName] = useState('Guest');

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = cartTotal > 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08; // 8% tax
  const orderTotal = cartTotal + shippingCost + tax;

  // Auto scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Get customer name from localStorage if available
    const savedName = localStorage.getItem('customerName');
    if (savedName) {
      setCustomerName(savedName);
    }
  }, []);

  // Get recommended products (exclude items already in cart)
  useEffect(() => {
    const getRecommendedProducts = () => {
      const availableProducts = skincareProducts.filter(
        product => !cartItems.some(item => item.id === product.id)
      );

      const cartCategories = [...new Set(cartItems.map(item => item.category))];

      let recommendations = availableProducts.filter(
        product => !cartCategories.includes(product.category)
      );

      if (recommendations.length < 4) {
        const sameCategoryProducts = availableProducts.filter(
          product => cartCategories.includes(product.category)
        ).slice(0, 4 - recommendations.length);

        recommendations = [...recommendations, ...sameCategoryProducts];
      }

      if (recommendations.length < 4) {
        const remainingProducts = availableProducts
          .filter(p => !recommendations.some(r => r.id === p.id))
          .slice(0, 4 - recommendations.length);

        recommendations = [...recommendations, ...remainingProducts];
      }

      return recommendations.slice(0, 4);
    };

    if (cartItems.length > 0) {
      const recommendations = getRecommendedProducts();
      setRecommendedProducts(recommendations);
    } else {
      setRecommendedProducts([]);
    }
  }, [cartItems]);

  // Custom add to cart function with notification
  const handleAddToCart = (product) => {
    addToCart(product);

    setNotification({
      message: `Added ${product.name} to cart!`,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handle product click with auto-scroll
  const handleProductClick = (product) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setTimeout(() => {
      openProductDetail(product);
    }, 100);
  };

  // Handle View Cart button click
  const handleViewCart = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setNotification(null);
    navigateTo('cart');
  };

  // Handle checkout with Telegram notification
  const handleCheckout = async () => {
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    try {
      // Prepare cart data for Telegram
      const cartData = {
        items: cartItems,
        total: cartTotal,
        itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
        customerName: customerName,
        shippingCost: shippingCost,
        tax: tax,
        orderTotal: orderTotal,
        timestamp: new Date().toISOString(),
        orderId: `CART-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      };

      // Send to Telegram
      const telegramResponse = await sendToTelegram(cartData, 'cart_checkout');

      if (telegramResponse) {
        // Show success notification
        setNotification({
          message: 'Checkout started! Our team has been notified.',
          productName: 'Proceeding to checkout',
          productPrice: orderTotal,
          productImage: ''
        });

        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to send to Telegram:', error);
      // Don't show error to user, just proceed
    }

    // Navigate to checkout after 500ms
    setTimeout(() => {
      navigateTo('checkout');
    }, 500);
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setTimeout(() => {
      navigateTo('products');
    }, 100);
  };

  // Save customer name when input changes
  const handleNameChange = (e) => {
    const name = e.target.value;
    setCustomerName(name);
    localStorage.setItem('customerName', name);
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-20 bg-light">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-dark mb-4">Your Cart is Empty</h1>
          <p className="text-dark mb-8 max-w-md mx-auto">
            Looks like you haven't added any skincare products to your cart yet.
          </p>
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });

              setTimeout(() => {
                navigateTo('products');
              }, 100);
            }}
            className="bg-accent text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition duration-300"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-light">
      {/* Custom Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-white rounded-lg shadow-xl border-l-4 border-accent p-4 max-w-sm w-full">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-lg overflow-hidden mr-3">
                  {notification.productImage ? (
                    <img
                      src={notification.productImage}
                      alt={notification.productName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23F8E5E5'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dy='.3em' fill='%23A5B4CB'%3E✨%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">📋</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-dark">{notification.message}</h4>
                  <button
                    onClick={() => setNotification(null)}
                    className="text-gray-400 hover:text-dark"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                {notification.productName && (
                  <p className="text-dark mt-1">{notification.productName}</p>
                )}
                {notification.productPrice > 0 && (
                  <p className="text-accent font-bold mt-1">${notification.productPrice.toFixed(2)}</p>
                )}
                <div className="flex items-center mt-2 text-sm text-dark">
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {notification.message.includes('Checkout') ? 'Processing...' : 'Item added successfully'}
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <button
                onClick={handleViewCart}
                className="w-full bg-accent text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition duration-300 text-sm"
              >
                {notification.message.includes('Checkout') ? 'View Order Summary' : 'View Cart'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Customer Name Input */}
              <div className="p-6 border-b bg-primary">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center mr-4">
                    <span>👤</span>
                  </div>
                  <div className="flex-grow">
                    <label className="block text-dark font-medium mb-1">Your Name (for order notification)</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={handleNameChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-dark"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <p className="text-sm text-dark mt-2">
                  Your order details will be sent to our team via Telegram for immediate processing.
                </p>
              </div>

              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b bg-primary">
                <div className="col-span-6 font-semibold text-dark">Product</div>
                <div className="col-span-2 font-semibold text-dark text-center">Price</div>
                <div className="col-span-2 font-semibold text-dark text-center">Quantity</div>
                <div className="col-span-2 font-semibold text-dark text-center">Total</div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 border-b">
                  <div className="flex items-center">
                    {/* Product Image - Clickable */}
                    <div
                      className="w-20 h-20 bg-primary rounded-lg overflow-hidden flex items-center justify-center mr-6 cursor-pointer"
                      onClick={() => handleProductClick(item)}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23F8E5E5'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='.3em' fill='%23A5B4CB'%3E✨%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      ) : (
                        <div className="text-2xl text-secondary">✨</div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center">
                        <div className="md:w-1/2 mb-4 md:mb-0">
                          <h3
                            className="font-semibold text-dark text-lg cursor-pointer hover:text-accent transition duration-300"
                            onClick={() => handleProductClick(item)}
                          >
                            {item.name}
                          </h3>
                          <p className="text-sm text-dark">{item.category} • {item.skinType}</p>
                        </div>

                        {/* Price */}
                        <div className="md:w-1/6 text-center mb-4 md:mb-0">
                          <span className="font-semibold text-dark">${item.price.toFixed(2)}</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="md:w-1/6 flex justify-center mb-4 md:mb-0">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-2 text-dark hover:text-accent"
                            >
                              -
                            </button>
                            <span className="px-3 py-2">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-2 text-dark hover:text-accent"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total & Remove */}
                        <div className="md:w-1/6 flex items-center justify-between md:justify-center">
                          <span className="font-semibold text-accent">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="md:hidden text-dark hover:text-red-500 ml-4"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>

                        {/* Remove Button (Desktop) */}
                        <div className="hidden md:block md:w-1/12 text-center">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-dark hover:text-red-500"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <div className="p-6">
                <button
                  onClick={handleContinueShopping}
                  className="text-accent font-semibold hover:text-opacity-80 transition duration-300 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-dark mb-6">Order Summary</h2>

              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-dark">Subtotal</span>
                  <span className="font-semibold text-dark">${cartTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-dark">Shipping</span>
                  <span className="font-semibold text-dark">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-dark">Tax (8%)</span>
                  <span className="font-semibold text-dark">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-dark">Total</span>
                    <span className="text-accent">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-dark font-medium mb-2">Promo Code</label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-grow px-4 py-3 border rounded-l-lg text-dark"
                  />
                  <button className="bg-dark text-white px-4 py-3 rounded-r-lg font-medium hover:bg-opacity-90 transition duration-300">
                    Apply
                  </button>
                </div>
              </div>

              {/* Telegram Notification */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-blue-600">📱</span>
                  </div>
                  <div>
                    <p className="text-sm text-blue-800">
                      Your order will be instantly sent to our team via Telegram for processing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-accent text-white py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition duration-300 mb-4 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                Proceed to Checkout
              </button>

              <p className="text-center text-sm text-dark">
                Free shipping on orders over $50
              </p>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-dark mb-3">We accept:</p>
                <div className="flex space-x-2">
                  {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((method, index) => (
                    <div key={index} className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-medium text-gray-700">
                      {method.charAt(0)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products Section */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t">
            <h2 className="text-3xl font-bold text-dark mb-8">You Might Also Like</h2>
            <p className="text-dark mb-8">Complete your skincare routine with these essentials:</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300 cursor-pointer group"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="h-40 bg-primary rounded-lg mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23F8E5E5'/%3E%3Ctext x='50%25' y='50%25' font-size='48' text-anchor='middle' dy='.3em' fill='%23A5B4CB'%3E✨%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-dark mb-2">{product.name}</h3>
                  <p className="text-accent font-bold mb-3">${product.price.toFixed(2)}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="w-full bg-primary text-dark py-2 rounded-lg font-medium hover:bg-opacity-80 transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;