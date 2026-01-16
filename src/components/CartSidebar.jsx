import React from 'react';

const CartSidebar = ({ isOpen, closeCart, cartItems, updateQuantity, removeFromCart, cartTotal, navigateTo }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={closeCart}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-1/3 bg-white shadow-xl z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-dark">Your Cart</h2>
            <button 
              onClick={closeCart}
              className="text-dark hover:text-accent"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🛒</div>
                <p className="text-dark">Your cart is empty</p>
                <button 
                  onClick={() => { closeCart(); navigateTo('products'); }}
                  className="mt-4 text-accent font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center border-b pb-4">
                    <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23F8E5E5'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dy='.3em' fill='%23A5B4CB'%3E✨%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      ) : (
                        <div className="text-2xl text-secondary">✨</div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-dark">{item.name}</h3>
                      <p className="text-accent font-bold">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-dark hover:text-accent"
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-dark hover:text-accent"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-dark hover:text-red-500"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6">
              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total:</span>
                <span className="text-accent">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => { closeCart(); navigateTo('cart'); }}
                  className="w-full bg-dark text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition duration-300"
                >
                  View Cart
                </button>
                
                <button 
                  onClick={() => { closeCart(); navigateTo('checkout'); }}
                  className="w-full bg-accent text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition duration-300"
                >
                  Checkout
                </button>
                
                <button 
                  onClick={() => { closeCart(); navigateTo('products'); }}
                  className="w-full text-dark py-3 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;