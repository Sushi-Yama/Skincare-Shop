import React, { useState, useEffect } from 'react';
import { sendToTelegram } from '../services/telegramService';

const Checkout = ({ cartItems, cartTotal, navigateTo }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    phone: '',
    specialInstructions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingCost = cartTotal > 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shippingCost + tax;

  // Auto scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Load saved customer data from localStorage
    const savedData = localStorage.getItem('customerData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    // Generate initial order ID
    setOrderId(`ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`);
  }, []);

  // Auto scroll to top when step changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: value
    };
    setFormData(newData);

    // Save to localStorage
    localStorage.setItem('customerData', JSON.stringify(newData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step < 3) {
      if (step === 1) {
        // Validate shipping info
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
          alert('Please fill in all required shipping information');
          return;
        }
      }

      if (step === 2) {
        // Validate payment info
        if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
          alert('Please fill in all payment information');
          return;
        }
      }

      // Scroll to top before changing step
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Small delay to ensure scroll completes
      setTimeout(() => {
        setStep(step + 1);
      }, 100);
    } else {
      // Final order placement
      setIsSubmitting(true);

      try {
        // Generate new order ID
        const finalOrderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        setOrderId(finalOrderId);

        // Prepare order data for Telegram
        const orderData = {
          orderId: finalOrderId,
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone || 'Not provided',
            address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`
          },
          payment: {
            cardType: detectCardType(formData.cardNumber),
            lastFour: formData.cardNumber.slice(-4),
            nameOnCard: formData.cardName,
            expiry: formData.expiryDate
          },
          items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: (item.price * item.quantity).toFixed(2),
            category: item.category
          })),
          totals: {
            subtotal: cartTotal,
            shipping: shippingCost,
            tax: tax,
            total: orderTotal
          },
          shipping: shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`,
          specialInstructions: formData.specialInstructions || 'None',
          timestamp: new Date().toISOString()
        };

        // Send to Telegram
        const telegramResponse = await sendToTelegram(orderData, 'order_placed');

        if (telegramResponse) {
          setOrderPlaced(true);

          // Clear cart data from localStorage
          localStorage.removeItem('cartItems');
          localStorage.removeItem('customerData');

          // Scroll to top to show success message
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

          // Show success message
          setTimeout(() => {
            setIsSubmitting(false);

            // Redirect to home after 3 seconds
            setTimeout(() => {
              navigateTo('home');
            }, 3000);
          }, 2000);
        } else {
          throw new Error('Telegram notification failed');
        }
      } catch (error) {
        console.error('Order placement failed:', error);
        alert('Order placement failed. Please try again.');
        setIsSubmitting(false);
      }
    }
  };

  // Detect card type
  const detectCardType = (cardNumber) => {
    const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardPattern = /^5[1-5][0-9]{14}$/;
    const amexPattern = /^3[47][0-9]{13}$/;

    if (visaPattern.test(cardNumber)) return 'Visa';
    if (mastercardPattern.test(cardNumber)) return 'Mastercard';
    if (amexPattern.test(cardNumber)) return 'American Express';
    return 'Credit Card';
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Handle card number input
  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange({
      target: {
        name: 'cardNumber',
        value: formatted
      }
    });
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  // Handle expiry date input
  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    handleInputChange({
      target: {
        name: 'expiryDate',
        value: formatted
      }
    });
  };

  // Handle Back button click with auto-scroll
  const handleBackClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setTimeout(() => {
      setStep(step - 1);
    }, 100);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold text-dark mb-6">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-dark font-medium mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-dark"
                  required
                />
              </div>
              <div>
                <label className="block text-dark font-medium mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-dark"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-dark font-medium mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-dark"
                  required
                />
              </div>
              <div>
                <label className="block text-dark font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-dark"
                  placeholder="(123) 456-7890"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-dark font-medium mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-dark"
                  required
                  placeholder="Street address"
                />
              </div>
              <div>
                <label className="block text-dark font-medium mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-dark"
                  required
                />
              </div>
              <div>
                <label className="block text-dark font-medium mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-dark"
                  required
                />
              </div>
              <div>
                <label className="block text-dark font-medium mb-2">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-dark"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold text-dark mb-6">Payment Information</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-dark font-medium mb-2">
                  Card Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full px-4 py-3 border rounded-lg text-dark"
                  required
                />
              </div>
              <div>
                <label className="block text-dark font-medium mb-2">
                  Name on Card <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-dark"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-dark font-medium mb-2">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-4 py-3 border rounded-lg text-dark"
                    required
                  />
                </div>
                <div>
                  <label className="block text-dark font-medium mb-2">
                    CVV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="4"
                    className="w-full px-4 py-3 border rounded-lg text-dark"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold text-dark mb-6">Order Review</h3>

            {/* Order Confirmation */}
            {orderPlaced ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h4 className="text-2xl font-bold text-green-800 mb-2">Order Placed Successfully!</h4>
                <p className="text-green-700 mb-4">
                  Your order #{orderId} has been received and sent to our team via Telegram.
                </p>
                <p className="text-green-600">
                  You will receive a confirmation email shortly. Redirecting to home page...
                </p>
              </div>
            ) : (
              <>
                {/* Telegram Notification */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-blue-600 text-xl">📱</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">Instant Telegram Notification</h4>
                      <p className="text-blue-700">
                        Your complete order details will be sent to our team via Telegram immediately after you place your order. Our team will process your order right away!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-dark mb-4">Order Summary</h4>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between mb-2">
                      <span className="text-dark">
                        {item.quantity} × {item.name}
                      </span>
                      <span className="font-semibold text-dark">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t mt-4 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-dark">Subtotal</span>
                      <span className="text-dark">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark">Shipping</span>
                      <span className="text-dark">
                        {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark">Tax</span>
                      <span className="text-dark">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span className="text-dark">Total</span>
                      <span className="text-accent">${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-dark mb-2">Shipping Address</h4>
                  <p className="text-dark">
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}<br />
                    {formData.city}, {formData.state} {formData.zipCode}<br />
                    {formData.email}<br />
                    {formData.phone || 'Phone: Not provided'}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-dark mb-2">Payment Method</h4>
                  <p className="text-dark">
                    {detectCardType(formData.cardNumber)} ending in {formData.cardNumber.slice(-4)}<br />
                    Name: {formData.cardName}<br />
                    Expires: {formData.expiryDate}
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-dark font-medium mb-2">Special Instructions (Optional)</label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg text-dark"
                    rows="3"
                    placeholder="Any special delivery instructions or notes..."
                  />
                </div>

                <div className="flex items-start mb-6">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 mr-3"
                    required
                  />
                  <label htmlFor="terms" className="text-dark text-sm">
                    I agree to the Terms of Service and Privacy Policy. I understand that my order details will be sent to the skincare team via Telegram for processing. I authorize the charge to my payment method.
                  </label>
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark mb-2">Checkout</h1>
        <p className="text-dark mb-8">Complete your purchase in 3 simple steps</p>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {['Shipping', 'Payment', 'Review'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div className={`flex flex-col items-center ${index < step ? 'text-accent' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${index < step ? 'bg-accent border-accent text-white' : 'border-gray-300'}`}>
                    {index < step ? '✓' : index + 1}
                  </div>
                  <span className="mt-2 text-sm font-medium">{label}</span>
                </div>
                {index < 2 && (
                  <div className={`h-1 w-24 ${index < step - 1 ? 'bg-accent' : 'bg-gray-300'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
              {renderStep()}

              {/* Navigation Buttons */}
              {!orderPlaced && (
                <div className="flex justify-between mt-8 pt-8 border-t">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBackClick}
                      className="px-8 py-3 border border-dark text-dark rounded-lg hover:bg-dark hover:text-white transition duration-300"
                      disabled={isSubmitting}
                    >
                      Back
                    </button>
                  )}

                  <button
                    type="submit"
                    className={`ml-auto px-8 py-3 rounded-lg font-semibold transition duration-300 flex items-center ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent text-white hover:bg-opacity-90'}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : step === 3 ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Place Order & Send to Telegram
                      </>
                    ) : (
                      'Continue'
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-6">Your Order</h3>

              {/* Order Items */}
              <div className="mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center mb-4 pb-4 border-b">
                    <div className="w-16 h-16 bg-primary rounded-lg overflow-hidden flex items-center justify-center mr-4">
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
                        <div className="text-xl text-secondary">✨</div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-dark">{item.name}</h4>
                      <div className="flex justify-between text-sm text-dark">
                        <span>Qty: {item.quantity}</span>
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-3">
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
                  <span className="text-dark">Tax</span>
                  <span className="font-semibold text-dark">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-dark">Total</span>
                    <span className="text-accent">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Telegram Info */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center text-sm text-dark mb-2">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Instant Telegram Notification
                </div>
                <div className="flex items-center text-sm text-dark">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  100% Satisfaction Guarantee
                </div>
                <div className="flex items-center text-sm text-dark">
                  <svg className="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure SSL Encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;