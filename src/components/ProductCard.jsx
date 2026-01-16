import React from 'react';

const ProductCard = ({ product, addToCart, openProductDetail }) => {
  const { id, name, price, image, category, skinType, rating } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* Product Image */}
      <div 
        className="h-64 relative overflow-hidden cursor-pointer group"
        onClick={() => openProductDetail(product)}
      >
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23F8E5E5'/%3E%3Ctext x='50%25' y='50%25' font-size='48' text-anchor='middle' dy='.3em' fill='%23A5B4CB'%3E✨%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300"></div>
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-secondary uppercase tracking-wide">
              {category}
            </span>
            <h3 
              className="text-lg font-semibold text-dark mt-1 cursor-pointer hover:text-accent transition duration-300"
              onClick={() => openProductDetail(product)}
            >
              {name}
            </h3>
          </div>
          <span className="text-accent font-bold text-xl">${price.toFixed(2)}</span>
        </div>
        
        {/* Skin Type and Rating */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <span className="text-xs bg-primary text-dark px-2 py-1 rounded">
              {skinType}
            </span>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-6 bg-accent text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;