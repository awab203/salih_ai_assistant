import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const LessonViewer = ({ subject, onBack }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const lessons = [
    {
      id: 1,
      title: "Introduction to Quadratic Equations",
      description: "Learn the fundamentals of quadratic equations and their standard form",
      duration: "15 min",
      difficulty: "Intermediate",
      steps: [
        {
          id: 1,
          type: "video",
          title: "What are Quadratic Equations?",
          content: "Understanding the basic form ax² + bx + c = 0",
          duration: "5 min"
        },
        {
          id: 2,
          type: "theory",
          title: "Standard Form and Components",
          content: `A quadratic equation is a polynomial equation of degree 2. The standard form is:

ax² + bx + c = 0

Where:
• a, b, and c are constants (a ≠ 0)
• x is the variable
• a is the coefficient of x²
• b is the coefficient of x  
• c is the constant term

Examples:
• x² + 5x + 6 = 0 (a=1, b=5, c=6)
• 2x² - 3x + 1 = 0 (a=2, b=-3, c=1)
• x² - 4 = 0 (a=1, b=0, c=-4)`,
          duration: "3 min"
        },
        {
          id: 3,
          type: "practice",
          title: "Identify Components",
          content: "Practice identifying a, b, and c values in different quadratic equations",
          duration: "7 min"
        }
      ],
      prerequisites: ["Basic Algebra", "Polynomial Operations"],
      learningObjectives: [
        "Identify quadratic equations",
        "Understand standard form",
        "Recognize coefficients and constants"
      ]
    },
    {
      id: 2,
      title: "Solving by Factoring",
      description: "Master the factoring method for solving quadratic equations",
      duration: "20 min",
      difficulty: "Intermediate",
      steps: [
        {
          id: 1,
          type: "video",
          title: "Factoring Method Overview",
          content: "Introduction to solving quadratics by factoring",
          duration: "6 min"
        },
        {
          id: 2,
          type: "theory",
          title: "Zero Product Property",
          content: `The Zero Product Property states that if ab = 0, then either a = 0 or b = 0 (or both).

This is the foundation for solving quadratic equations by factoring.

Steps to solve by factoring:
1. Write the equation in standard form (ax² + bx + c = 0)
2. Factor the left side into two binomials
3. Set each factor equal to zero
4. Solve each linear equation

Example: x² + 5x + 6 = 0
1. Factor: (x + 2)(x + 3) = 0
2. Set factors to zero: x + 2 = 0 or x + 3 = 0
3. Solve: x = -2 or x = -3`,
          duration: "8 min"
        },
        {
          id: 3,
          type: "practice",
          title: "Factoring Practice",
          content: "Solve various quadratic equations using the factoring method",
          duration: "6 min"
        }
      ],
      prerequisites: ["Quadratic Basics", "Factoring Polynomials"],
      learningObjectives: [
        "Apply zero product property",
        "Factor quadratic expressions",
        "Solve quadratic equations by factoring"
      ]
    }
  ];

  const currentLessonData = lessons[currentLesson];
  const [currentStep, setCurrentStep] = useState(0);
  const currentStepData = currentLessonData.steps[currentStep];

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStepData.id]));
    if (currentStep < currentLessonData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setCurrentStep(0);
      setCompletedSteps(new Set());
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setCurrentStep(0);
      setCompletedSteps(new Set());
    }
  };

  const getStepIcon = (type) => {
    switch (type) {
      case 'video': return 'Play';
      case 'theory': return 'BookOpen';
      case 'practice': return 'Target';
      default: return 'Circle';
    }
  };

  const getStepColor = (type) => {
    switch (type) {
      case 'video': return 'primary';
      case 'theory': return 'secondary';
      case 'practice': return 'accent';
      default: return 'text-secondary';
    }
  };

  const lessonProgress = ((currentStep + 1) / currentLessonData.steps.length) * 100;
  const overallProgress = ((currentLesson + 1) / lessons.length) * 100;

  return (
    <div className="p-6 max-w-6xl mx-auto">
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
            <h1 className="text-2xl font-bold text-text-primary">{currentLessonData.title}</h1>
            <p className="text-text-secondary">{subject?.name || 'Study Session'}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-text-secondary">Lesson {currentLesson + 1} of {lessons.length}</p>
          <p className="text-xs text-text-tertiary">{currentLessonData.duration} • {currentLessonData.difficulty}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Lesson Progress</span>
          <span className="text-sm font-medium text-text-primary">{Math.round(lessonProgress)}%</span>
        </div>
        <div className="w-full bg-surface-lighter rounded-full h-2 mb-1">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${lessonProgress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <span>Step {currentStep + 1} of {currentLessonData.steps.length}</span>
          <span>Overall: {Math.round(overallProgress)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lesson Steps Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-surface rounded-xl p-4 border border-white/10 sticky top-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Lesson Steps</h3>
            <div className="space-y-2">
              {currentLessonData.steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-150 ${
                    index === currentStep 
                      ? `bg-${getStepColor(step.type)}/20 text-${getStepColor(step.type)} border border-${getStepColor(step.type)}/30`
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    completedSteps.has(step.id) 
                      ? 'bg-accent text-white' 
                      : index === currentStep 
                        ? `bg-${getStepColor(step.type)}/20` 
                        : 'bg-surface-lighter'
                  }`}>
                    {completedSteps.has(step.id) ? (
                      <Icon name="Check" size={16} strokeWidth={2} />
                    ) : (
                      <Icon name={getStepIcon(step.type)} size={16} strokeWidth={2} />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs opacity-70">{step.duration}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Learning Objectives */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-text-primary mb-2">Learning Objectives</h4>
              <ul className="space-y-1">
                {currentLessonData.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="Target" size={12} strokeWidth={2} />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-surface rounded-xl border border-white/10 overflow-hidden">
            {/* Step Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl bg-${getStepColor(currentStepData.type)}/20 flex items-center justify-center`}>
                    <Icon name={getStepIcon(currentStepData.type)} size={20} className={`text-${getStepColor(currentStepData.type)}`} strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">{currentStepData.title}</h2>
                    <p className="text-sm text-text-secondary capitalize">{currentStepData.type} • {currentStepData.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150">
                    <Icon name="Bookmark" size={16} strokeWidth={2} />
                  </button>
                  <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150">
                    <Icon name="Share" size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6">
              {currentStepData.type === 'video' && (
                <div className="mb-6">
                  <div className="relative bg-surface-light rounded-xl overflow-hidden aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        className="w-16 h-16 bg-primary hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-150 shadow-glow-primary"
                      >
                        <Icon name={isVideoPlaying ? "Pause" : "Play"} size={24} color="white" strokeWidth={2} />
                      </button>
                    </div>
                    {isVideoPlaying && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/50 rounded-lg p-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-full bg-white/20 rounded-full h-1">
                              <div className="bg-primary h-1 rounded-full w-1/3"></div>
                            </div>
                            <span className="text-white text-xs">1:23 / 5:00</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="prose prose-lg max-w-none text-text-primary">
                <div className="whitespace-pre-line">{currentStepData.content}</div>
              </div>

              {currentStepData.type === 'practice' && (
                <div className="mt-6 p-4 bg-surface-light rounded-lg border border-white/10">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Target" size={20} className="text-accent" strokeWidth={2} />
                    <h3 className="text-lg font-semibold text-text-primary">Practice Exercise</h3>
                  </div>
                  <p className="text-text-secondary mb-4">Complete the interactive exercises to test your understanding.</p>
                  <button className="px-4 py-2 bg-accent hover:bg-accent-600 text-white rounded-lg transition-colors duration-150">
                    Start Practice
                  </button>
                </div>
              )}
            </div>

            {/* Step Actions */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2 px-4 py-2 bg-surface-light hover:bg-surface-lighter text-text-secondary rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="ChevronLeft" size={16} strokeWidth={2} />
                  <span className="text-sm font-medium">Previous</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150">
                    <Icon name="MessageCircle" size={16} strokeWidth={2} />
                  </button>
                  <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150">
                    <Icon name="HelpCircle" size={16} strokeWidth={2} />
                  </button>
                </div>

                {currentStep === currentLessonData.steps.length - 1 ? (
                  <button
                    onClick={handleNextLesson}
                    disabled={currentLesson === lessons.length - 1}
                    className="flex items-center space-x-2 px-4 py-2 bg-accent hover:bg-accent-600 text-white rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-sm font-medium">Next Lesson</span>
                    <Icon name="ChevronRight" size={16} strokeWidth={2} />
                  </button>
                ) : (
                  <button
                    onClick={handleStepComplete}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors duration-150"
                  >
                    <span className="text-sm font-medium">Continue</span>
                    <Icon name="ChevronRight" size={16} strokeWidth={2} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;