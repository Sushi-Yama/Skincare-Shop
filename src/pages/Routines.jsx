import React, { useState } from 'react';

const Routines = ({ navigateTo }) => {
  const [activeRoutine, setActiveRoutine] = useState('morning');
  const [selectedSkinType, setSelectedSkinType] = useState('all');

  const skinTypes = [
    { id: 'all', name: 'All Skin Types', icon: '🌟' },
    { id: 'dry', name: 'Dry Skin', icon: '💧' },
    { id: 'oily', name: 'Oily Skin', icon: '⚡' },
    { id: 'combination', name: 'Combination', icon: '🔄' },
    { id: 'sensitive', name: 'Sensitive', icon: '🌿' }
  ];

  const routines = {
    morning: {
      title: 'Morning Skincare Routine',
      description: 'Start your day right with this essential morning routine to protect and prep your skin.',
      steps: [
        {
          step: 1,
          title: 'Cleanser',
          description: 'Gently cleanse to remove overnight impurities and excess oil.',
          time: '1-2 minutes',
          tips: 'Use lukewarm water, not hot. Pat dry, don\'t rub.',
          products: ['Gentle Foam Cleanser', 'Micellar Water', 'Cream Cleanser'],
          icon: '🧼'
        },
        {
          step: 2,
          title: 'Toner',
          description: 'Balance skin\'s pH and prepare it for better absorption of subsequent products.',
          time: '30 seconds',
          tips: 'Apply with cotton pad or gently pat into skin with hands.',
          products: ['Hydrating Toner', 'pH Balancing Toner', 'Exfoliating Toner'],
          icon: '💧'
        },
        {
          step: 3,
          title: 'Vitamin C Serum',
          description: 'Protect against environmental damage and brighten complexion.',
          time: '1 minute',
          tips: 'Apply to damp skin for better absorption. Wait 1-2 minutes before next step.',
          products: ['Vitamin C Serum', 'Antioxidant Serum', 'Brightening Serum'],
          icon: '🍊'
        },
        {
          step: 4,
          title: 'Eye Cream',
          description: 'Address specific concerns around the delicate eye area.',
          time: '30 seconds',
          tips: 'Pat gently with ring finger, don\'t rub or pull.',
          products: ['Caffeine Eye Cream', 'Hydrating Eye Gel', 'Anti-Aging Eye Serum'],
          icon: '👁️'
        },
        {
          step: 5,
          title: 'Moisturizer',
          description: 'Hydrate and create a protective barrier for your skin.',
          time: '1 minute',
          tips: 'Warm between palms before applying for better absorption.',
          products: ['Lightweight Moisturizer', 'Gel Cream', 'Hydrating Lotion'],
          icon: '💆‍♀️'
        },
        {
          step: 6,
          title: 'Sunscreen',
          description: 'Essential protection against UV damage and premature aging.',
          time: '1 minute',
          tips: 'Apply generously. Reapply every 2 hours if outdoors.',
          products: ['SPF 50+ Sunscreen', 'Mineral Sunscreen', 'Tinted Sunscreen'],
          icon: '☀️'
        }
      ],
      benefits: [
        'Protects from UV damage',
        'Prevents premature aging',
        'Controls excess oil',
        'Prepares skin for makeup'
      ]
    },
    evening: {
      title: 'Evening Skincare Routine',
      description: 'Nighttime is for repair and regeneration. This routine helps your skin recover.',
      steps: [
        {
          step: 1,
          title: 'Double Cleanse',
          description: 'First cleanse removes makeup and sunscreen, second cleanse cleans skin.',
          time: '3-4 minutes',
          tips: 'Start with oil-based cleanser, follow with water-based.',
          products: ['Cleansing Balm', 'Micellar Water', 'Gentle Foam Cleanser'],
          icon: '✨'
        },
        {
          step: 2,
          title: 'Exfoliate (2-3x weekly)',
          description: 'Remove dead skin cells and promote cell turnover.',
          time: '1-2 minutes',
          tips: 'Be gentle. Avoid on sensitive or irritated skin.',
          products: ['Chemical Exfoliant', 'Gentle Scrub', 'Exfoliating Toner'],
          icon: '🌀'
        },
        {
          step: 3,
          title: 'Treatment Serum',
          description: 'Target specific concerns like acne, aging, or hyperpigmentation.',
          time: '1 minute',
          tips: 'Apply to completely dry skin to avoid irritation.',
          products: ['Retinol Serum', 'Niacinamide Serum', 'AHA/BHA Treatment'],
          icon: '⚗️'
        },
        {
          step: 4,
          title: 'Sheet Mask (1-2x weekly)',
          description: 'Intensive treatment for hydration and specific concerns.',
          time: '15-20 minutes',
          tips: 'Relax while masking. Store extra serum in fridge.',
          products: ['Hydrating Sheet Mask', 'Brightening Mask', 'Calming Mask'],
          icon: '🎭'
        },
        {
          step: 5,
          title: 'Eye Cream',
          description: 'Night repair for delicate eye area.',
          time: '30 seconds',
          tips: 'Use richer formula than morning.',
          products: ['Retinol Eye Cream', 'Repair Eye Cream', 'Hydrating Eye Mask'],
          icon: '👁️'
        },
        {
          step: 6,
          title: 'Night Cream/Moisturizer',
          description: 'Rich moisturizer to nourish and repair skin overnight.',
          time: '1 minute',
          tips: 'Apply slightly more than morning moisturizer.',
          products: ['Night Cream', 'Sleeping Mask', 'Face Oil'],
          icon: '🌙'
        }
      ],
      benefits: [
        'Repairs daily damage',
        'Boosts cell regeneration',
        'Deep hydration',
        'Targets specific concerns'
      ]
    },
    weekly: {
      title: 'Weekly Treatments',
      description: 'Special treatments to boost your regular routine and address specific concerns.',
      steps: [
        {
          step: 1,
          title: 'Exfoliation',
          description: 'Chemical or physical exfoliation 1-3 times weekly.',
          frequency: '1-3 times weekly',
          tips: 'Start with once weekly, increase gradually.',
          products: ['AHA/BHA Exfoliant', 'Gentle Scrub', 'Exfoliating Mask'],
          icon: '🌀'
        },
        {
          step: 2,
          title: 'Clay Mask',
          description: 'Deep cleansing to draw out impurities and control oil.',
          frequency: '1-2 times weekly',
          tips: 'Focus on oily areas. Don\'t let it fully dry.',
          products: ['Purifying Clay Mask', 'Charcoal Mask', 'Mud Mask'],
          icon: '🧖‍♀️'
        },
        {
          step: 3,
          title: 'Hydrating Mask',
          description: 'Intense moisture boost for dry or dehydrated skin.',
          frequency: '1-3 times weekly',
          tips: 'Great after exfoliation or travel.',
          products: ['Sheet Mask', 'Sleeping Mask', 'Hydrating Gel Mask'],
          icon: '💦'
        },
        {
          step: 4,
          title: 'Face Massage',
          description: 'Improve circulation and product absorption with gua sha or rollers.',
          frequency: '2-3 times weekly',
          tips: 'Use upward and outward motions with light pressure.',
          products: ['Facial Oil', 'Gua Sha Tool', 'Jade Roller'],
          icon: '💆‍♀️'
        }
      ],
      benefits: [
        'Deep cleansing',
        'Enhanced results',
        'Skin detox',
        'Relaxation'
      ]
    }
  };

  const routineTypes = [
    { id: 'morning', name: 'Morning', icon: '🌅' },
    { id: 'evening', name: 'Evening', icon: '🌙' },
    { id: 'weekly', name: 'Weekly', icon: '📅' }
  ];

  const handleRoutineSelect = (routineId) => {
    setActiveRoutine(routineId);
    // Smooth scroll to routine section
    document.getElementById('routine-details').scrollIntoView({ behavior: 'smooth' });
  };

  const handleProductNavigation = (productType) => {
    navigateTo('products');
    // Could set filter state for product type
    localStorage.setItem('productFilter', productType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
              Your Guide to Perfect Skincare Routines
            </h1>
            <p className="text-xl text-dark mb-8">
              Building an effective skincare routine is simpler than you think. Follow our step-by-step guides for glowing, healthy skin.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => navigateTo('skin-types')}
                className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
              >
                Find Your Skin Type
              </button>
              <button 
                onClick={() => navigateTo('products')}
                className="bg-white text-dark px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition duration-300 border"
              >
                Shop Routine Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Routine Type Selection */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-8">
            Choose Your Routine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {routineTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleRoutineSelect(type.id)}
                className={`p-6 rounded-xl transition duration-300 transform hover:-translate-y-1 ${
                  activeRoutine === type.id
                    ? 'bg-gradient-to-r from-accent to-accent/80 text-white shadow-xl'
                    : 'bg-light text-dark hover:shadow-lg'
                }`}
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold mb-2">{type.name}</h3>
                <p className="text-sm opacity-90">
                  {type.id === 'morning' && 'Start your day right'}
                  {type.id === 'evening' && 'Night repair & recovery'}
                  {type.id === 'weekly' && 'Weekly boost treatments'}
                </p>
                {activeRoutine === type.id && (
                  <div className="mt-4">
                    <div className="w-full bg-white/30 h-1 rounded-full">
                      <div className="bg-white h-1 rounded-full w-3/4"></div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Skin Type Filter */}
      <section className="py-8 bg-light">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-bold text-dark text-center mb-6">
            Filter by Skin Type
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skinTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedSkinType(type.id)}
                className={`px-4 py-2 rounded-full transition duration-300 flex items-center ${
                  selectedSkinType === type.id
                    ? 'bg-dark text-white'
                    : 'bg-white text-dark hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{type.icon}</span>
                {type.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Routine Details */}
      <section id="routine-details" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Routine Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                {routines[activeRoutine].title}
              </h2>
              <p className="text-xl text-dark max-w-3xl mx-auto">
                {routines[activeRoutine].description}
              </p>
            </div>

            {/* Routine Steps */}
            <div className="space-y-8 mb-16">
              {routines[activeRoutine].steps.map((step) => (
                <div 
                  key={step.step}
                  className="bg-light rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="flex flex-col md:flex-row items-start">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex flex-col items-center justify-center">
                        <div className="text-2xl">{step.icon}</div>
                        <div className="text-2xl font-bold text-dark mt-1">{step.step}</div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-grow">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-grow">
                          <h3 className="text-2xl font-bold text-dark mb-3">{step.title}</h3>
                          <p className="text-dark mb-4">{step.description}</p>
                          
                          {/* Time/Frequency */}
                          <div className="flex items-center mb-4">
                            <div className="flex items-center text-dark mr-6">
                              <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2">
                                ⏱️
                              </span>
                              <span className="font-medium">
                                {activeRoutine === 'weekly' ? 'Frequency: ' : 'Time: '}
                                {activeRoutine === 'weekly' ? step.frequency : step.time}
                              </span>
                            </div>
                          </div>

                          {/* Tips */}
                          {step.tips && (
                            <div className="mb-4 p-4 bg-white rounded-lg border-l-4 border-accent">
                              <div className="flex items-start">
                                <span className="text-accent mr-2">💡</span>
                                <p className="text-dark"><strong>Tip:</strong> {step.tips}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Products */}
                        <div className="lg:w-1/3 lg:pl-8 mt-6 lg:mt-0">
                          <h4 className="font-bold text-dark mb-3">Recommended Products:</h4>
                          <div className="space-y-2">
                            {step.products.map((product, index) => (
                              <button
                                key={index}
                                onClick={() => handleProductNavigation(product)}
                                className="w-full text-left p-3 bg-white rounded-lg hover:bg-primary transition duration-300 group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-dark group-hover:text-accent transition duration-300">
                                    {product}
                                  </span>
                                  <span className="text-gray-400 group-hover:text-accent transition duration-300">
                                    →
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Routine Benefits */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                Benefits of This Routine
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {routines[activeRoutine].benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-accent text-xl">✓</span>
                    </div>
                    <p className="font-medium text-dark">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Routine Tips */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">
            Pro Skincare Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">🕒</div>
              <h3 className="text-xl font-bold text-dark mb-3">Timing Matters</h3>
              <p className="text-dark">
                Wait 1-2 minutes between applying different products to allow proper absorption.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">🧪</div>
              <h3 className="text-xl font-bold text-dark mb-3">Patch Test First</h3>
              <p className="text-dark">
                Always patch test new products on your inner arm before applying to your face.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-dark mb-3">Consistency is Key</h3>
              <p className="text-dark">
                Stick with a routine for at least 4-6 weeks to see noticeable results.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">💧</div>
              <h3 className="text-xl font-bold text-dark mb-3">Hydrate Inside Out</h3>
              <p className="text-dark">
                Drink plenty of water and use hydrating products for plump, healthy skin.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">☀️</div>
              <h3 className="text-xl font-bold text-dark mb-3">Sunscreen Daily</h3>
              <p className="text-dark">
                Apply sunscreen every single day, even when indoors or cloudy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">🛌</div>
              <h3 className="text-xl font-bold text-dark mb-3">Sleep Well</h3>
              <p className="text-dark">
                Quality sleep is essential for skin repair and regeneration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Routine Builder CTA */}
      <section className="py-16 bg-gradient-to-r from-dark to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Build Your Perfect Routine?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Take our skin quiz to get a personalized routine based on your skin type and concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigateTo('skin-types')}
                className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg"
              >
                Take Skin Quiz
              </button>
              <button 
                onClick={() => navigateTo('products')}
                className="bg-white text-dark px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
              >
                Shop All Products
              </button>
              <button 
                onClick={() => navigateTo('contact')}
                className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-dark transition duration-300"
              >
                Get Personal Advice
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How long should I wait between skincare steps?",
                a: "Wait 30-60 seconds between light products (toners, serums) and 1-2 minutes for heavier products. This allows each product to absorb properly."
              },
              {
                q: "Can I skip steps if I'm in a hurry?",
                a: "The bare minimum should be cleanser, moisturizer, and sunscreen in the morning. At night, double cleansing and moisturizer are essential."
              },
              {
                q: "How do I know if a product is working?",
                a: "Give products 4-6 weeks. Look for improvements in texture, hydration, and your specific concerns. Stop if you experience irritation."
              },
              {
                q: "Can I mix different brands?",
                a: "Yes, you can mix brands as long as the ingredients are compatible. Avoid mixing certain actives like vitamin C and retinol in the same routine."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-accent transition duration-300">
                <h3 className="text-xl font-bold text-dark mb-3">Q: {faq.q}</h3>
                <p className="text-dark">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Routines;