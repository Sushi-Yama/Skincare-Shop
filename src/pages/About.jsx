import React from 'react';

const About = ({ navigateTo }) => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Founder & Dermatologist",
      bio: "Board-certified dermatologist with 15+ years of experience in cosmetic dermatology.",
      image: "https://i.pinimg.com/1200x/3f/6d/a1/3f6da128903bd6e22cd1600dc3678d3f.jpg"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Head Formulator",
      bio: "PhD in Cosmetic Science with expertise in clean, effective ingredient formulations.",
      image: "https://i.pinimg.com/1200x/c0/72/c8/c072c88bfc6523eb2e93952c7dae508d.jpg"
    },
    {
      id: 3,
      name: "Emma Johnson",
      role: "Customer Experience Director",
      bio: "Skincare enthusiast dedicated to creating personalized routines for every skin type.",
      image: "https://i.pinimg.com/736x/fb/24/90/fb249057bcad39d933780bf4c1281ebb.jpg"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Sustainability Lead",
      bio: "Environmental scientist focused on sustainable packaging and ethical sourcing.",
      image: "https://i.pinimg.com/1200x/f2/a8/61/f2a861e092c86ad1e1f3ee0f59699457.jpg"
    }
  ];

  const values = [
    {
      title: "Science-Backed Formulas",
      description: "Every product is developed with clinical research and dermatologist input.",
      icon: "🔬"
    },
    {
      title: "Clean Ingredients",
      description: "No parabens, sulfates, phthalates, or synthetic fragrances. Ever.",
      icon: "🌿"
    },
    {
      title: "Sustainability",
      description: "Recyclable packaging and carbon-neutral shipping across our supply chain.",
      icon: "♻️"
    },
    {
      title: "Transparency",
      description: "Full ingredient disclosure and honest marketing about what our products can do.",
      icon: "📋"
    }
  ];

  // Function to handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23F8E5E5'/%3E%3Ctext x='50%25' y='50%25' font-size='48' text-anchor='middle' dy='.3em' fill='%23A5B4CB'%3E✨%3C/text%3E%3C/svg%3E";
  };

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
              Our Story: Beyond Skin Deep
            </h1>
            <p className="text-xl text-dark mb-8">
              We believe skincare should be effective, accessible, and backed by science—not marketing hype.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-6">How It All Began</h2>
              <p className="text-dark mb-4 leading-relaxed">
                Sophia Skincare was founded in 2018 by Dr. Sarah Chen, a board-certified dermatologist frustrated by the lack of transparency in the skincare industry. She noticed patients were spending thousands on products filled with marketing claims but little scientific backing.
              </p>
              <p className="text-dark mb-4 leading-relaxed">
                What started as a small clinic in San Francisco has grown into a community of over 500,000 skincare enthusiasts. We've helped countless people achieve their skin goals through education, personalized routines, and products that actually work.
              </p>
              <p className="text-dark leading-relaxed">
                Today, we're proud to be a certified B Corporation, meeting the highest standards of social and environmental performance.
              </p>
            </div>
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://i.pinimg.com/1200x/53/a2/2e/53a22e8c10700987891fef7c48e15f58.jpg" 
                alt="Our skincare laboratory"
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-dark mb-3">{value.title}</h3>
                <p className="text-dark">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">Meet Our Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-light rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={handleImageError}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-dark mb-1">{member.name}</h3>
                  <p className="text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-dark text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-accent mb-3">50K+</div>
              <h3 className="text-xl font-semibold text-dark mb-2">Products Donated</h3>
              <p className="text-dark">To shelters and communities in need through our Giving Program</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-accent mb-3">98%</div>
              <h3 className="text-xl font-semibold text-dark mb-2">Recycled Packaging</h3>
              <p className="text-dark">Of our packaging materials are made from recycled or biodegradable materials</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-accent mb-3">250K+</div>
              <h3 className="text-xl font-semibold text-dark mb-2">Skin Quizzes Taken</h3>
              <p className="text-dark">Helping people discover their perfect skincare routine</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Skincare Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands who have transformed their skin with our science-backed formulas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigateTo('products')}
              className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
            >
              Shop Products
            </button>
            <button 
              onClick={() => navigateTo('contact')}
              className="bg-white text-dark px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;