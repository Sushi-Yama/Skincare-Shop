import React, { useState } from 'react';

const SkinTypes = ({ navigateTo }) => {
  const [selectedType, setSelectedType] = useState('all');
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const skinTypes = [
    {
      id: 'dry',
      name: 'Dry Skin',
      description: 'Characterized by a lack of moisture and natural oils. Often feels tight, flaky, or rough.',
      concerns: ['Flakiness', 'Redness', 'Fine lines', 'Tightness'],
      recommendations: [
        'Cream-based cleansers',
        'Hyaluronic acid serums',
        'Rich moisturizers',
        'Face oils'
      ],
      icon: '💧',
      color: 'from-blue-100 to-blue-200',
      textColor: 'text-blue-800'
    },
    {
      id: 'oily',
      name: 'Oily Skin',
      description: 'Produces excess sebum, leading to a shiny appearance and larger pores.',
      concerns: ['Shininess', 'Enlarged pores', 'Blackheads', 'Acne'],
      recommendations: [
        'Gel or foam cleansers',
        'Salicylic acid treatments',
        'Oil-free moisturizers',
        'Clay masks'
      ],
      icon: '⚡',
      color: 'from-green-100 to-green-200',
      textColor: 'text-green-800'
    },
    {
      id: 'combination',
      name: 'Combination Skin',
      description: 'Has both oily areas (typically T-zone) and dry or normal areas.',
      concerns: ['Oily T-zone', 'Dry cheeks', 'Uneven texture', 'Pores'],
      recommendations: [
        'Balancing cleansers',
        'Niacinamide serums',
        'Lightweight moisturizers',
        'Multi-masking'
      ],
      icon: '🔄',
      color: 'from-purple-100 to-purple-200',
      textColor: 'text-purple-800'
    },
    {
      id: 'sensitive',
      name: 'Sensitive Skin',
      description: 'Reacts easily to products, environmental factors, or stress.',
      concerns: ['Redness', 'Irritation', 'Burning sensation', 'Rashes'],
      recommendations: [
        'Fragrance-free products',
        'Calming ingredients',
        'Gentle cleansers',
        'Soothing moisturizers'
      ],
      icon: '🌿',
      color: 'from-pink-100 to-pink-200',
      textColor: 'text-pink-800'
    },
    {
      id: 'normal',
      name: 'Normal Skin',
      description: 'Well-balanced skin with minimal imperfections and good elasticity.',
      concerns: ['Maintenance', 'Prevention', 'General care', 'Aging'],
      recommendations: [
        'Gentle cleansers',
        'Vitamin C serums',
        'Balanced moisturizers',
        'Regular sunscreen'
      ],
      icon: '✨',
      color: 'from-yellow-100 to-yellow-200',
      textColor: 'text-yellow-800'
    },
    {
      id: 'acne-prone',
      name: 'Acne-Prone Skin',
      description: 'Prone to breakouts, blackheads, and whiteheads frequently.',
      concerns: ['Breakouts', 'Scarring', 'Inflammation', 'Oiliness'],
      recommendations: [
        'Salicylic acid cleansers',
        'Benzoyl peroxide treatments',
        'Non-comedogenic products',
        'Exfoliating acids'
      ],
      icon: '🎯',
      color: 'from-red-100 to-red-200',
      textColor: 'text-red-800'
    }
  ];

  const skinCareConcerns = [
    { id: 'aging', name: 'Anti-Aging', icon: '⏳' },
    { id: 'hydration', name: 'Hydration', icon: '💦' },
    { id: 'brightening', name: 'Brightening', icon: '☀️' },
    { id: 'pores', name: 'Pore Minimizing', icon: '🔍' },
    { id: 'redness', name: 'Redness Relief', icon: '🌡️' },
    { id: 'barrier', name: 'Barrier Repair', icon: '🛡️' }
  ];

  const quizQuestions = [
    {
      question: "How does your skin feel a few hours after cleansing?",
      options: [
        { text: "Tight and dry", type: 'dry' },
        { text: "Shiny and oily", type: 'oily' },
        { text: "Oily in T-zone, normal elsewhere", type: 'combination' },
        { text: "Comfortable and balanced", type: 'normal' }
      ]
    },
    {
      question: "How often do you experience breakouts?",
      options: [
        { text: "Rarely or never", type: 'dry' },
        { text: "Frequently, especially in oily areas", type: 'oily' },
        { text: "Occasionally, usually in T-zone", type: 'combination' },
        { text: "Often, and they're inflamed", type: 'acne-prone' }
      ]
    },
    {
      question: "How does your skin react to new products?",
      options: [
        { text: "Usually fine, no reaction", type: 'normal' },
        { text: "Sometimes gets irritated or red", type: 'sensitive' },
        { text: "Can get dry or flaky", type: 'dry' },
        { text: "May cause breakouts", type: 'acne-prone' }
      ]
    },
    {
      question: "What is the appearance of your pores?",
      options: [
        { text: "Small and barely visible", type: 'dry' },
        { text: "Large and noticeable", type: 'oily' },
        { text: "Large on nose/forehead, small elsewhere", type: 'combination' },
        { text: "Normal sized", type: 'normal' }
      ]
    }
  ];

  const productsForSkinType = (typeId) => {
    const productCategories = {
      'dry': ['Moisturizers', 'Face Oils', 'Cream Cleansers', 'Hydrating Masks'],
      'oily': ['Gel Cleansers', 'Toners', 'Clay Masks', 'Oil-Free Moisturizers'],
      'combination': ['Balancing Toners', 'Lightweight Serums', 'Multi-Masking', 'Exfoliators'],
      'sensitive': ['Fragrance-Free', 'Calming Creams', 'Gentle Cleansers', 'Mineral Sunscreens'],
      'normal': ['Vitamin C Serums', 'Antioxidants', 'Sunscreens', 'Exfoliating Acids'],
      'acne-prone': ['Salicylic Acid', 'Benzoyl Peroxide', 'Oil-Control', 'Healing Balms']
    };
    return productCategories[typeId] || [];
  };

  const handleQuizAnswer = (answerType) => {
    const newAnswers = [...quizAnswers, answerType];
    setQuizAnswers(newAnswers);
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate result
      const typeCount = newAnswers.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});
      
      const resultType = Object.keys(typeCount).reduce((a, b) => 
        typeCount[a] > typeCount[b] ? a : b
      );
      
      setSelectedType(resultType);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
  };

  const handleViewProducts = (skinType) => {
    navigateTo('products');
    // In a real app, you might pass filter state to the products page
    localStorage.setItem('skinTypeFilter', skinType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
              Find Your Perfect Skin Type Match
            </h1>
            <p className="text-xl text-dark mb-8">
              Understanding your skin type is the first step toward achieving healthy, glowing skin.
            </p>
            <button 
              onClick={() => {
                document.getElementById('skin-types').scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg"
            >
              Discover Your Type
            </button>
          </div>
        </div>
      </section>

      {/* Skin Type Quiz */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-dark text-center mb-8">
              {quizStep < quizQuestions.length ? 'Skin Type Quiz' : 'Your Results!'}
            </h2>
            
            {quizStep < quizQuestions.length ? (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 mb-4">
                    {Array.from({ length: quizQuestions.length }).map((_, i) => (
                      <div 
                        key={i}
                        className={`w-3 h-3 rounded-full ${i <= quizStep ? 'bg-accent' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-4">
                    Question {quizStep + 1} of {quizQuestions.length}
                  </h3>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="text-xl font-semibold text-dark mb-6 text-center">
                    {quizQuestions[quizStep].question}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizQuestions[quizStep].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(option.type)}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-accent hover:bg-accent/5 transition duration-300 text-left"
                      >
                        <div className="flex items-center">
                          <span className="w-8 h-8 flex items-center justify-center bg-primary rounded-full text-dark font-bold mr-3">
                            {index + 1}
                          </span>
                          <span className="font-medium text-dark">{option.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-4xl">
                  {skinTypes.find(t => t.id === selectedType)?.icon || '✨'}
                </div>
                <h3 className="text-2xl font-bold text-dark mb-2">
                  Your Skin Type: {skinTypes.find(t => t.id === selectedType)?.name}
                </h3>
                <p className="text-dark mb-6 max-w-md mx-auto">
                  {skinTypes.find(t => t.id === selectedType)?.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setSelectedType(selectedType)}
                    className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
                  >
                    View Recommendations
                  </button>
                  <button 
                    onClick={resetQuiz}
                    className="bg-white text-dark px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition duration-300 border"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* All Skin Types */}
      <section id="skin-types" className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">
            Understanding Different Skin Types
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skinTypes.map((type) => (
              <div 
                key={type.id}
                className={`bg-gradient-to-br ${type.color} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer ${
                  selectedType === type.id ? 'ring-2 ring-accent' : ''
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-4xl mb-2">{type.icon}</div>
                      <h3 className={`text-2xl font-bold ${type.textColor} mb-2`}>{type.name}</h3>
                    </div>
                    {selectedType === type.id && (
                      <span className="bg-white text-dark px-3 py-1 rounded-full text-sm font-medium">
                        Selected
                      </span>
                    )}
                  </div>
                  
                  <p className="text-dark mb-6">{type.description}</p>
                  
                  <div className="mb-6">
                    <h4 className={`font-semibold ${type.textColor} mb-3`}>Common Concerns:</h4>
                    <div className="flex flex-wrap gap-2">
                      {type.concerns.map((concern, index) => (
                        <span key={index} className="px-3 py-1 bg-white/50 rounded-full text-sm text-dark">
                          {concern}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className={`font-semibold ${type.textColor} mb-3`}>Recommended Products:</h4>
                    <ul className="space-y-2">
                      {type.recommendations.map((item, index) => (
                        <li key={index} className="flex items-center text-dark">
                          <span className="w-2 h-2 bg-current rounded-full mr-3"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProducts(type.id);
                    }}
                    className={`w-full bg-white ${type.textColor} py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300`}
                  >
                    Shop Products for {type.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Skin Type Details */}
      {selectedType && selectedType !== 'all' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-dark mb-4">
                    {skinTypes.find(t => t.id === selectedType)?.name} Routine Guide
                  </h2>
                  <p className="text-dark max-w-2xl">
                    Follow this simple routine specifically designed for {skinTypes.find(t => t.id === selectedType)?.name.toLowerCase()}.
                  </p>
                </div>
                <div className="mt-6 lg:mt-0 flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${skinTypes.find(t => t.id === selectedType)?.color} flex items-center justify-center text-3xl`}>
                    {skinTypes.find(t => t.id === selectedType)?.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Your Selected Type</div>
                    <div className="text-xl font-bold text-dark">{skinTypes.find(t => t.id === selectedType)?.name}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Morning Routine */}
                <div className="bg-light rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-dark mb-6">Morning Routine</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-dark font-bold mr-4 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark mb-2">Gentle Cleanser</h4>
                        <p className="text-dark">Start with a gentle, pH-balanced cleanser to remove overnight buildup.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-dark font-bold mr-4 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark mb-2">Toner/Essence</h4>
                        <p className="text-dark">Apply a hydrating toner to balance skin's pH and prep for treatment.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-dark font-bold mr-4 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark mb-2">Treatment Serum</h4>
                        <p className="text-dark">Use targeted serums for your specific concerns (hydration, brightening, etc.).</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-dark font-bold mr-4 flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark mb-2">Moisturizer</h4>
                        <p className="text-dark">Lock in hydration with a moisturizer suited for your skin type.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-dark font-bold mr-4 flex-shrink-0">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark mb-2">Sunscreen</h4>
                        <p className="text-dark">Always finish with broad-spectrum SPF 30+ to protect from UV damage.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Evening Routine */}
                <div className="bg-gradient-to-br from-gray-900 to-dark text-white rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6">Evening Routine</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Double Cleanse</h4>
                        <p>Start with an oil-based cleanser to remove makeup/sunscreen, then water-based cleanser.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Treatment Step</h4>
                        <p>Apply actives like retinol, exfoliating acids, or treatment masks (2-3 times weekly).</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Hydrating Serum</h4>
                        <p>Use hyaluronic acid or other hydrating serums to replenish moisture.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Night Cream</h4>
                        <p>Apply a richer moisturizer or face oil to nourish skin overnight.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Eye Cream</h4>
                        <p>Gently tap eye cream around orbital bone to address specific eye area concerns.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skincare Concerns */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">
            Common Skincare Concerns
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skinCareConcerns.map((concern) => (
              <div 
                key={concern.id}
                className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition duration-300 cursor-pointer group"
                onClick={() => navigateTo('products')}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">{concern.icon}</div>
                <h4 className="font-semibold text-dark group-hover:text-accent transition duration-300">
                  {concern.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent to-accent/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Skin?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Now that you understand your skin type, discover products specifically formulated for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigateTo('products')}
              className="bg-white text-dark px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg"
            >
              Shop All Products
            </button>
            <button 
              onClick={() => navigateTo('routines')}
              className="bg-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
            >
              View Routines
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkinTypes;