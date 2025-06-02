import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const FlashcardViewer = ({ subject, onBack }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState(new Set());
  const [difficulty, setDifficulty] = useState(null);

  const flashcards = [
    {
      id: 1,
      front: "What is the quadratic formula?",
      back: `The quadratic formula is: x = (-b ± √(b² - 4ac)) / 2a

This formula is used to solve quadratic equations of the form ax² + bx + c = 0, where a ≠ 0.

The discriminant (b² - 4ac) determines the nature of the roots:
• If > 0: Two distinct real roots
• If = 0: One repeated real root  
• If < 0: Two complex conjugate roots`,
      subject: 'Mathematics',
      difficulty: 'intermediate',
      tags: ['algebra', 'quadratic', 'formula']
    },
    {
      id: 2,
      front: "Define the term \'metaphor\' and provide an example",
      back: `A metaphor is a figure of speech that makes an implicit comparison between two unlike things by stating that one thing IS another thing.

Example: "Life is a journey"
This compares life to a journey without using 'like' or 'as'.

Key differences from simile:
• Metaphor: Direct comparison (is/are)
• Simile: Uses 'like' or 'as' for comparison

Metaphors create vivid imagery and help readers understand complex concepts through familiar comparisons.`,
      subject: 'English',
      difficulty: 'beginner',
      tags: ['literature', 'figurative language', 'metaphor']
    },
    {
      id: 3,
      front: "What is the derivative of sin(x)?",
      back: `The derivative of sin(x) is cos(x).

d/dx[sin(x)] = cos(x)

This is one of the fundamental trigonometric derivatives. Other important ones include:
• d/dx[cos(x)] = -sin(x)
• d/dx[tan(x)] = sec²(x)
• d/dx[sec(x)] = sec(x)tan(x)

These derivatives are essential for calculus problems involving trigonometric functions.`,
      subject: 'Mathematics',
      difficulty: 'intermediate',
      tags: ['calculus', 'derivatives', 'trigonometry']
    }
  ];

  const handleNext = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
      setDifficulty(null);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
      setDifficulty(null);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setStudiedCards(prev => new Set([...prev, flashcards[currentCard].id]));
    
    // Auto-advance after difficulty selection
    setTimeout(() => {
      if (currentCard < flashcards.length - 1) {
        handleNext();
      }
    }, 1000);
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'easy': return 'accent';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'text-secondary';
    }
  };

  const progress = ((currentCard + 1) / flashcards.length) * 100;
  const studiedProgress = (studiedCards.size / flashcards.length) * 100;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150"
          >
            <Icon name="ArrowLeft" size={20} strokeWidth={2} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Flashcards</h1>
            <p className="text-text-secondary">{subject?.name || 'Study Session'}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-text-secondary">Card {currentCard + 1} of {flashcards.length}</p>
          <p className="text-xs text-text-tertiary">{studiedCards.size} studied</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Session Progress</span>
          <span className="text-sm font-medium text-text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-surface-lighter rounded-full h-2 mb-1">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="w-full bg-surface-lighter rounded-full h-1">
          <div 
            className="bg-accent h-1 rounded-full transition-all duration-300"
            style={{ width: `${studiedProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="mb-6">
        <div 
          className={`relative w-full h-96 cursor-pointer transition-transform duration-500 preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="w-full h-full bg-surface rounded-xl border border-white/10 p-8 flex flex-col justify-center items-center text-center shadow-elevation-2">
              <div className="mb-4">
                <Icon name="HelpCircle" size={32} className="text-primary mx-auto mb-2" strokeWidth={2} />
                <p className="text-sm text-text-secondary">Question</p>
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                {flashcards[currentCard].front}
              </h2>
              <div className="flex items-center space-x-2 mt-auto">
                {flashcards[currentCard].tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-text-tertiary mt-2">Click to reveal answer</p>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="w-full h-full bg-surface rounded-xl border border-white/10 p-8 flex flex-col justify-center shadow-elevation-2">
              <div className="mb-4 text-center">
                <Icon name="CheckCircle" size={32} className="text-accent mx-auto mb-2" strokeWidth={2} />
                <p className="text-sm text-text-secondary">Answer</p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-text-primary whitespace-pre-line">
                    {flashcards[currentCard].back}
                  </div>
                </div>
              </div>
              <p className="text-xs text-text-tertiary text-center mt-4">How difficult was this?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Selection (shown when card is flipped) */}
      {isFlipped && !difficulty && (
        <div className="mb-6">
          <p className="text-center text-text-secondary mb-3">How difficult was this card?</p>
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={() => handleDifficultySelect('easy')}
              className="flex items-center space-x-2 px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg transition-colors duration-150"
            >
              <Icon name="ThumbsUp" size={16} strokeWidth={2} />
              <span className="text-sm font-medium">Easy</span>
            </button>
            <button
              onClick={() => handleDifficultySelect('medium')}
              className="flex items-center space-x-2 px-4 py-2 bg-warning/20 hover:bg-warning/30 text-warning rounded-lg transition-colors duration-150"
            >
              <Icon name="Minus" size={16} strokeWidth={2} />
              <span className="text-sm font-medium">Medium</span>
            </button>
            <button
              onClick={() => handleDifficultySelect('hard')}
              className="flex items-center space-x-2 px-4 py-2 bg-error/20 hover:bg-error/30 text-error rounded-lg transition-colors duration-150"
            >
              <Icon name="ThumbsDown" size={16} strokeWidth={2} />
              <span className="text-sm font-medium">Hard</span>
            </button>
          </div>
        </div>
      )}

      {/* Difficulty Feedback */}
      {difficulty && (
        <div className="mb-6 text-center">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-${getDifficultyColor(difficulty)}/20 text-${getDifficultyColor(difficulty)} rounded-lg`}>
            <Icon name="CheckCircle" size={16} strokeWidth={2} />
            <span className="text-sm font-medium">Marked as {difficulty}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentCard === 0}
          className="flex items-center space-x-2 px-4 py-2 bg-surface-light hover:bg-surface-lighter text-text-secondary rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="ChevronLeft" size={16} strokeWidth={2} />
          <span className="text-sm font-medium">Previous</span>
        </button>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150">
            <Icon name="Shuffle" size={16} strokeWidth={2} />
          </button>
          <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150">
            <Icon name="RotateCcw" size={16} strokeWidth={2} />
          </button>
          <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150">
            <Icon name="Settings" size={16} strokeWidth={2} />
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentCard === flashcards.length - 1}
          className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-sm font-medium">Next</span>
          <Icon name="ChevronRight" size={16} strokeWidth={2} />
        </button>
      </div>

      {/* Session Complete */}
      {currentCard === flashcards.length - 1 && studiedCards.size === flashcards.length && (
        <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/30 text-center">
          <Icon name="Trophy" size={32} className="text-accent mx-auto mb-2" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-accent mb-1">Session Complete!</h3>
          <p className="text-sm text-text-secondary mb-3">You've studied all {flashcards.length} cards</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-accent hover:bg-accent-600 text-white rounded-lg transition-colors duration-150"
          >
            Return to Hub
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardViewer;