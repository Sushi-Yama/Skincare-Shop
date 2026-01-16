import React, { useState } from 'react';

const Account = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'Sophia Lanin',
    email: 'sophia.lanin@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'img/pic/susu.jpg',
    joinDate: 'January 15, 2023',
    orderCount: 8,
    totalSpent: 342.50
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      address: '123 Main Street',
      city: 'Pnom penh',
      state: 'pp',
      zipCode: '10001',
      country: 'Cambodia',
      isDefault: true
    },
    {
      id: 2,
      name: 'Work',
      address: '456 Business Avenue',
      city: 'Pnom pnh',
      state: 'pp',
      zipCode: '10002',
      country: 'Cambodia',
      isDefault: false
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      lastFour: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      lastFour: '8888',
      expiry: '08/24',
      isDefault: false
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: 'ORD-00123',
      date: '2024-01-15',
      items: 3,
      total: 89.99,
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'ORD-00122',
      date: '2024-01-10',
      items: 2,
      total: 54.50,
      status: 'Shipped',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'ORD-00121',
      date: '2024-01-05',
      items: 1,
      total: 32.99,
      status: 'Processing',
      statusColor: 'bg-yellow-100 text-yellow-800'
    }
  ]);

  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setUserData(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    }));
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (formData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
    alert('Password changed successfully!');
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
  };

  const handleViewOrder = (orderId) => {
    navigateTo('order-detail');
    // In a real app, you would pass the orderId to the order detail page
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigateTo('home');
      alert('You have been logged out successfully.');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'addresses', label: 'Addresses', icon: '🏠' },
    { id: 'payments', label: 'Payments', icon: '💳' },
    { id: 'security', label: 'Security', icon: '🔒' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark mb-4">My Account</h1>
          <p className="text-dark max-w-2xl mx-auto">
            Manage your profile, orders, addresses, and payment methods
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <img 
                    src={userData.avatar} 
                    alt={userData.name}
                    className="w-full h-full rounded-full object-cover border-4 border-primary"
                  />
                  <button 
                    className="absolute bottom-0 right-0 bg-accent text-white p-2 rounded-full hover:bg-opacity-90 transition duration-300"
                    onClick={() => alert('Upload new photo')}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <h2 className="text-xl font-bold text-dark">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
                <div className="mt-2 text-sm text-gray-500">
                  Member since {userData.joinDate}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-primary p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-dark">{userData.orderCount}</div>
                  <div className="text-sm text-gray-600">Orders</div>
                </div>
                <div className="bg-secondary p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-dark">${userData.totalSpent.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition duration-300 ${
                      activeTab === tab.id
                        ? 'bg-accent text-white'
                        : 'text-dark hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl mr-3">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === tab.id && (
                      <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    )}
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full mt-8 px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-dark mb-6">Profile Information</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-dark font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-dark font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-dark font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-dark font-medium mb-2">Member Since</label>
                        <input
                          type="text"
                          value={userData.joinDate}
                          disabled
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-600"
                        />
                      </div>
                    </div>
                    <div className="pt-6 border-t">
                      <button
                        onClick={handleSaveProfile}
                        className="px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition duration-300"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-dark">Order History</h2>
                    <button 
                      onClick={() => navigateTo('products')}
                      className="px-6 py-2 bg-primary text-dark rounded-lg font-medium hover:bg-opacity-80 transition duration-300"
                    >
                      Continue Shopping
                    </button>
                  </div>
                  
                  {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 text-dark font-medium">Order ID</th>
                            <th className="text-left py-3 px-4 text-dark font-medium">Date</th>
                            <th className="text-left py-3 px-4 text-dark font-medium">Items</th>
                            <th className="text-left py-3 px-4 text-dark font-medium">Total</th>
                            <th className="text-left py-3 px-4 text-dark font-medium">Status</th>
                            <th className="text-left py-3 px-4 text-dark font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                              <td className="py-4 px-4 font-medium text-dark">{order.id}</td>
                              <td className="py-4 px-4">{order.date}</td>
                              <td className="py-4 px-4">{order.items} item{order.items !== 1 ? 's' : ''}</td>
                              <td className="py-4 px-4 font-bold text-accent">${order.total.toFixed(2)}</td>
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <button
                                  onClick={() => handleViewOrder(order.id)}
                                  className="px-4 py-2 bg-primary text-dark rounded-lg font-medium hover:bg-opacity-80 transition duration-300 text-sm"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-6">📦</div>
                      <h3 className="text-xl font-bold text-dark mb-2">No Orders Yet</h3>
                      <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                      <button 
                        onClick={() => navigateTo('products')}
                        className="px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition duration-300"
                      >
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-dark">Saved Addresses</h2>
                    <button 
                      onClick={() => alert('Add new address')}
                      className="px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition duration-300"
                    >
                      + Add New Address
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map(address => (
                      <div key={address.id} className="border rounded-xl p-6 hover:shadow-md transition duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-dark text-lg">{address.name}</h3>
                            {address.isDefault && (
                              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => alert(`Edit ${address.name} address`)}
                              className="text-gray-400 hover:text-dark"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => alert(`Delete ${address.name} address`)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{address.address}</p>
                        <p className="text-gray-600 mb-2">{address.city}, {address.state} {address.zipCode}</p>
                        <p className="text-gray-600 mb-4">{address.country}</p>
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="px-4 py-2 bg-primary text-dark rounded-lg font-medium hover:bg-opacity-80 transition duration-300 text-sm"
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-dark">Payment Methods</h2>
                    <button 
                      onClick={() => alert('Add new payment method')}
                      className="px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition duration-300"
                    >
                      + Add New Card
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {paymentMethods.map(payment => (
                      <div key={payment.id} className="border rounded-xl p-6 hover:shadow-md transition duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center mr-4">
                              <span className="font-bold text-gray-700">{payment.type.charAt(0)}</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-dark">{payment.type} •••• {payment.lastFour}</h3>
                              <p className="text-gray-600">Expires {payment.expiry}</p>
                              {payment.isDefault && (
                                <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            {!payment.isDefault && (
                              <button
                                onClick={() => handleSetDefaultPayment(payment.id)}
                                className="px-4 py-2 bg-primary text-dark rounded-lg font-medium hover:bg-opacity-80 transition duration-300 text-sm"
                              >
                                Set as Default
                              </button>
                            )}
                            <button 
                              onClick={() => alert(`Edit ${payment.type} card`)}
                              className="text-gray-400 hover:text-dark"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Security Note */}
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium text-blue-800">Your payment information is secure</p>
                        <p className="text-blue-600 text-sm">We use industry-standard encryption to protect your data. Your payment details are never stored in plain text.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-dark mb-6">Security Settings</h2>
                  
                  <div className="space-y-8">
                    {/* Change Password */}
                    <div>
                      <h3 className="text-xl font-bold text-dark mb-4">Change Password</h3>
                      <div className="space-y-4 max-w-md">
                        <div>
                          <label className="block text-dark font-medium mb-2">Current Password</label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-dark font-medium mb-2">New Password</label>
                          <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                          <p className="text-gray-600 text-sm mt-1">Password must be at least 6 characters long</p>
                        </div>
                        <div>
                          <label className="block text-dark font-medium mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                        </div>
                        <button
                          onClick={handlePasswordChange}
                          className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition duration-300"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="pt-8 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-dark mb-2">Two-Factor Authentication</h3>
                          <p className="text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <button className="px-6 py-2 bg-primary text-dark rounded-lg font-medium hover:bg-opacity-80 transition duration-300">
                          Enable 2FA
                        </button>
                      </div>
                    </div>

                    {/* Login Activity */}
                    <div className="pt-8 border-t">
                      <h3 className="text-xl font-bold text-dark mb-4">Recent Login Activity</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-dark">Successful login</p>
                              <p className="text-gray-600 text-sm">New York, USA • Today, 10:30 AM</p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-dark">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;