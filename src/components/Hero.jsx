import React, { useState, useEffect } from 'react';

const Hero = ({ navigateTo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  const slides = [
    {
      id: 1,
      title: "Personalized Skincare Solutions",
      description: "Get a custom skincare routine based on your unique skin type and concerns. Our AI-powered quiz matches you with perfect products.",
      button1: "Take Skin Quiz",
      button2: "Shop All Products",
      color: "from-primary/90 to-accent/30",
      image: "https://i.pinimg.com/736x/c6/05/5f/c6055f7c81f619415e33718cfbaf024a.jpg",
      imageAlt: "Woman with glowing skin"
    },
    {
      id: 2,
      title: "Clinically-Proven Results",
      description: "Our formulations are developed with dermatologists and backed by science. See visible improvements in just 4 weeks.",
      button1: "View Clinical Studies",
      button2: "Shop Best Sellers",
      color: "from-accent/30 to-secondary/90",
      image: "https://i.pinimg.com/1200x/82/13/87/8213874767613a3fcca860c51ef2f4f1.jpg",
      imageAlt: "Man applying skincare product"
    },
    {
      id: 3,
      title: "Clean & Sustainable Beauty",
      description: "100% vegan, cruelty-free, and environmentally conscious. Good for your skin and the planet.",
      button1: "Learn About Ingredients",
      button2: "Shop Clean Beauty",
      color: "from-secondary/80 to-primary/80",
      image: "https://i.pinimg.com/1200x/7c/7f/c5/7c7fc5bc7f619200e227ea375b87cc59.jpg",
      imageAlt: "Woman holding skincare products"
    }
  ];

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [autoplay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-[600px] md:h-[700px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0 z-10' 
                : index < currentSlide 
                  ? '-translate-x-full opacity-0 z-0' 
                  : 'translate-x-full opacity-0 z-0'
            }`}
          >
            {/* Background with dynamic gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`}></div>
            
            {/* Main Content Container */}
            <div className="container mx-auto px-4 h-full flex items-center relative z-20">
              {/* Text Content - Left Side */}
              <div className="w-full lg:w-1/2 pr-0 lg:pr-12">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
                    <span className="text-sm font-semibold">NEW</span>
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 text-dark">
                    {slide.title}
                  </h1>
                  
                  {/* Description */}
                  <p className="text-xl mb-8 text-dark/90 leading-relaxed">
                    {slide.description}
                  </p>
                  
                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => navigateTo('products')}
                      className="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                    >
                      {slide.button1}
                    </button>
                    <button 
                      onClick={() => navigateTo('products')}
                      className="bg-white/90 backdrop-blur-sm text-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg transform border border-white/20"
                    >
                      {slide.button2}
                    </button>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex mt-12 space-x-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">98%</div>
                      <div className="text-dark text-sm">Satisfaction Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">4+</div>
                      <div className="text-dark text-sm">Visible Results</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">1M+</div>
                      <div className="text-dark text-sm">Happy Customers</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Content - Right Side */}
              <div className="hidden lg:block lg:w-1/2 pl-12">
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={slide.image} 
                      alt={slide.imageAlt}
                      className="w-full h-[500px] object-cover transform transition-transform duration-1000 hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    
                    {/* Image Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <div className="text-sm text-dark font-semibold">Recommended by dermatologists</div>
                    </div>
                  </div>
                  
                  {/* Decorative Elements around image */}
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/10 rounded-full animate-pulse-slow"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/10 rounded-full animate-pulse-slower"></div>
                </div>
              </div>
            </div>
            
            {/* Floating decorative elements for background */}
            <div className="absolute top-10 right-1/4 w-48 h-48 bg-accent/5 rounded-full animate-float-slow"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-secondary/5 rounded-full animate-float-slower"></div>
          </div>
        ))}
      </div>

      {/* Mobile Image (Shown only on small screens) */}
      <div className="lg:hidden container mx-auto px-4 -mt-8 relative z-20">
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <img 
            src={slides[currentSlide].image} 
            alt={slides[currentSlide].imageAlt}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative flex flex-col items-center transition-all duration-300 ${
              index === currentSlide ? 'text-accent' : 'text-white/50 hover:text-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-accent w-8' 
                : 'bg-white/30 group-hover:bg-white/50'
            }`}></div>
            <span className="text-xs mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              0{index + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-4 md:left-8 right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 flex justify-between">
        <button 
          onClick={prevSlide}
          className="bg-white/20 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 transform group"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextSlide}
          className="bg-white/20 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 transform group"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Control Panel */}
      <div className="absolute top-8 right-8 z-20 flex items-center space-x-4">
        {/* Slide Indicator */}
        <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
          <span className="text-accent font-bold">{currentSlide + 1}</span>
          <span className="mx-1">/</span>
          <span>{slides.length}</span>
        </div>
        
        {/* Play/Pause Button */}
        <button
          onClick={() => setAutoplay(!autoplay)}
          className="bg-white/20 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 transform"
          title={autoplay ? "Pause slideshow" : "Play slideshow"}
        >
          {autoplay ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          )}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div 
          className="h-full bg-accent transition-all duration-100 ease-linear"
          style={{ 
            width: autoplay ? `${(currentSlide + 1) * (100 / slides.length)}%` : '0%' 
          }}
        ></div>
      </div>
    </section>
  );
};


export default Hero;