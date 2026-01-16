import React, { useState } from 'react';

const SkinQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "What is your main skin concern?",
      options: [
        { id: 'a', text: 'Dryness & Flakiness', type: 'dry' },
        { id: 'b', text: 'Oiliness & Shine', type: 'oily' },
        { id: 'c', text: 'Aging & Wrinkles', type: 'aging' },
        { id: 'd', text: 'Acne & Breakouts', type: 'acne' },
        { id: 'e', text: 'Redness & Sensitivity', type: 'sensitive' },
      ]
    },
    {
      id: 2,
      question: "How does your skin feel during the day?",
      options: [
        { id: 'a', text: 'Tight and dry', type: 'dry' },
        { id: 'b', text: 'Oily and shiny', type: 'oily' },
        { id: 'c', text: 'Comfortable and balanced', type: 'normal' },
        { id: 'd', text: 'Uneven with some dry/oily patches', type: 'combination' },
      ]
    },
    {
      id: 3,
      question: "How often do you experience breakouts?",
      options: [
        { id: 'a', text: 'Rarely or never', type: 'normal/dry' },
        { id: 'b', text: 'Occasionally (around my period)', type: 'combination' },
        { id: 'c', text: 'Frequently', type: 'oily/acne' },
      ]
    },
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate skin type based on answers
      const skinType = determineSkinType();
      alert(`Based on your answers, your skin type appears to be: ${skinType.toUpperCase()}!\n\nWe recommend checking our products filtered for your skin type.`);
      setCurrentStep(0);
      setAnswers({});
    }
  };

  const determineSkinType = () => {
    const answerTypes = Object.values(answers).map(a => a.type);
    const typeCount = {};
    
    answerTypes.forEach(type => {
      typeCount[type] = (typeCount[type] || 0) + 1;
    });
    
    // Return most common type
    return Object.keys(typeCount).reduce((a, b) => 
      typeCount[a] > typeCount[b] ? a : b
    );
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark mb-4">Find Your Perfect Skincare Match</h2>
            <p className="text-dark">
              Take our quick 3-question quiz to discover products tailored to your unique skin needs.
            </p>
          </div>
          
          <div className="mb-8">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-accent h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-dark">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>
          
          {/* Current Question */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-dark mb-6">
              {questions[currentStep].question}
            </h3>
            
            <div className="space-y-4">
              {questions[currentStep].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(questions[currentStep].id, option)}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-accent hover:bg-primary transition duration-300"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full border border-accent flex items-center justify-center mr-3">
                      <span className="font-semibold text-dark">{option.id}</span>
                    </div>
                    <span className="font-medium text-dark">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 border border-dark text-dark rounded-lg hover:bg-dark hover:text-white transition duration-300"
              >
                Back
              </button>
            )}
            
            <button
              onClick={() => {
                setCurrentStep(0);
                setAnswers({});
              }}
              className="px-6 py-3 text-accent font-medium hover:text-opacity-80 transition duration-300"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkinQuiz;