import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, openProductDetail, addToCart }) => { // Add addToCart prop
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">😔</div>
        <h3 className="text-xl font-semibold text-dark mb-2">No products found</h3>
        <p className="text-dark">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          openProductDetail={openProductDetail}
          addToCart={addToCart} // Pass addToCart prop
        />
      ))}
    </div>
  );
};

export default ProductGrid;