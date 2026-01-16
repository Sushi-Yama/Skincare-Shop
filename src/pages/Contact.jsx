import React, { useState } from 'react';
import { sendContactFormToTelegram } from '../services/telegramService';

const Contact = ({ navigateTo }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [telegramSent, setTelegramSent] = useState(false);

  const contactMethods = [
    {
      type: 'email',
      title: 'Email Us',
      info: 'support@perfectskincare.com',
      description: 'We typically respond within 24 hours',
      icon: '✉️'
    },
    {
      type: 'phone',
      title: 'Call Us',
      info: '+1 (800) 123-4567',
      description: 'Mon-Fri 9am-6pm PST',
      icon: '📞'
    },
    {
      type: 'chat',
      title: 'Live Chat',
      info: 'Available now',
      description: 'Click the chat icon in the bottom right',
      icon: '💬'
    }
  ];

  const faqs = [
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, you can return it within 30 days for a full refund."
    },
    {
      question: "Do you test on animals?",
      answer: "Never. We are proudly cruelty-free and Leaping Bunny certified. All our products are tested on willing humans only."
    },
    {
      question: "How do I know which products are right for my skin?",
      answer: "Take our Skin Quiz or book a free virtual consultation with our skincare experts to get personalized recommendations."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes! We ship to over 50 countries. Shipping rates and delivery times vary by location."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Scroll to top for better UX
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Prepare contact data for Telegram
      const contactData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        contactMethod: formData.contactMethod,
        timestamp: new Date().toISOString(),
        ip: 'N/A', // In real app, you could get IP from backend
        userAgent: navigator.userAgent,
        page: 'Contact Page'
      };

      // Send to Telegram
      const telegramResponse = await sendContactFormToTelegram(contactData);
      
      if (telegramResponse) {
        setTelegramSent(true);
        console.log('Contact form submitted and sent to Telegram:', formData);
        
        // Show success state
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          contactMethod: 'email'
        });

        // Auto-scroll to show success message
        setTimeout(() => {
          window.scrollTo({
            top: document.querySelector('.bg-light').offsetTop,
            behavior: 'smooth'
          });
        }, 100);
      } else {
        throw new Error('Telegram notification failed');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('Message sent but notification failed. Our team will still receive your message.');
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }

    // Reset submission status after 10 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setTelegramSent(false);
    }, 10000);
  };

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
              We're Here to Help
            </h1>
            <p className="text-xl text-dark mb-8">
              Have questions about our products, your skin, or anything else? Our team of skincare experts is ready to assist you.
            </p>
            
            {/* Telegram Notification */}
            {telegramSent && (
              <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-in-down">
                <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Message sent to our team via Telegram!
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-light p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center">
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-semibold text-dark mb-2">{method.title}</h3>
                <p className="text-accent font-medium text-lg mb-2">{method.info}</p>
                <p className="text-dark">{method.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-dark mb-6">Send Us a Message</h3>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="text-xl font-semibold text-dark mb-2">Message Sent Successfully!</h4>
                  <p className="text-dark mb-4">
                    {telegramSent 
                      ? "Your message has been sent to our team via Telegram. We'll get back to you within 24 hours."
                      : "Thank you for contacting us. Our team will get back to you within 24 hours."
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setTelegramSent(false);
                      }}
                      className="text-accent font-medium hover:text-opacity-80 transition duration-300 bg-white border border-accent px-4 py-2 rounded-lg"
                    >
                      Send another message
                    </button>
                    <button 
                      onClick={() => navigateTo('products')}
                      className="text-dark font-medium hover:text-accent transition duration-300"
                    >
                      Browse Products →
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-dark font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition duration-300"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-dark font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition duration-300"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-dark font-medium mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition duration-300"
                    >
                      <option value="">Select a topic</option>
                      <option value="Product Recommendations">Product Recommendations</option>
                      <option value="Order & Shipping">Order & Shipping</option>
                      <option value="Returns & Refunds">Returns & Refunds</option>
                      <option value="Ingredient Questions">Ingredient Questions</option>
                      <option value="Business Partnerships">Business Partnerships</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Skin Concerns">Skin Concerns</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-dark font-medium mb-2">Preferred Contact Method</label>
                    <div className="flex flex-wrap gap-4">
                      {['email', 'phone', 'whatsapp'].map((method) => (
                        <label key={method} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method}
                            checked={formData.contactMethod === method}
                            onChange={handleInputChange}
                            className="mr-2 w-4 h-4 text-accent"
                          />
                          <span className="text-dark capitalize">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-dark font-medium mb-2">Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition duration-300"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  {/* Telegram Notification Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-blue-600 text-sm">📱</span>
                      </div>
                      <div>
                        <p className="text-sm text-blue-800">
                          Your message will be instantly sent to our team via Telegram for immediate attention.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-8 rounded-lg font-semibold text-lg transition duration-300 flex items-center justify-center ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-accent text-white hover:bg-opacity-90'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending to Telegram...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                        Send Message via Telegram
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ & Info */}
            <div>
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-dark mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <h4 className="font-semibold text-dark mb-2">{faq.question}</h4>
                      <p className="text-dark">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => navigateTo('products')}
                  className="mt-6 text-accent font-medium hover:text-opacity-80 transition duration-300 flex items-center"
                >
                  View all FAQs
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>

              <div className="bg-primary rounded-xl p-8">
                <h3 className="text-2xl font-bold text-dark mb-4">Visit Our Store</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-dark mb-1">Location</h4>
                    <p className="text-dark">123 Skincare Ave, Suite 100<br />San Francisco, CA 94107</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">Store Hours</h4>
                    <p className="text-dark">
                      Monday - Friday: 10am - 8pm<br />
                      Saturday: 10am - 6pm<br />
                      Sunday: 12pm - 5pm
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    window.open('https://maps.google.com/?q=123+Skincare+Ave+San+Francisco+CA', '_blank');
                  }}
                  className="w-full bg-dark text-white py-3 px-8 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
                >
                  Get Directions
                </button>
              </div>

              {/* Telegram Stats */}
              <div className="mt-8 bg-gradient-to-r from-accent to-secondary rounded-xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Instant Telegram Response</h4>
                    <p className="text-sm opacity-90">Messages sent directly to our team</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm">Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">1h</div>
                    <div className="text-sm">Avg Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay in the Loop</h2>
            <p className="text-xl mb-8">
              Subscribe to our newsletter for skincare tips, new product launches, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg text-dark"
              />
              <button className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-4 text-gray-300">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-dark mb-6">Connect With Us</h3>
          <p className="text-dark mb-8 max-w-2xl mx-auto">
            Follow us on social media for skincare tips, behind-the-scenes content, and community discussions.
          </p>
          <div className="flex justify-center space-x-6">
            {[
              { name: 'Facebook', icon: '📘', color: 'bg-blue-100', textColor: 'text-blue-600' },
              { name: 'Instagram', icon: '📷', color: 'bg-pink-100', textColor: 'text-pink-600' },
              { name: 'Twitter', icon: '🐦', color: 'bg-blue-50', textColor: 'text-blue-400' },
              { name: 'YouTube', icon: '📹', color: 'bg-red-100', textColor: 'text-red-600' },
              { name: 'TikTok', icon: '🎵', color: 'bg-black', textColor: 'text-white' }
            ].map((social, index) => (
              <a 
                key={index}
                href="#" 
                className="group transform hover:-translate-y-1 transition duration-300"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${social.color} group-hover:shadow-lg transition duration-300`}>
                  <span className={`text-2xl ${social.textColor}`}>{social.icon}</span>
                </div>
                <span className="text-sm text-dark group-hover:text-accent transition duration-300">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;