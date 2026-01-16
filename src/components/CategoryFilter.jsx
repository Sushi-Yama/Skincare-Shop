import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
            selectedCategory === category
              ? 'bg-accent text-white'
              : 'bg-white text-dark border border-gray-200 hover:border-accent'
          }`}
        >
          {category === 'all' ? 'All Products' : category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;