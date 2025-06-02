import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import TopNavigation from 'components/ui/TopNavigation';
import ContextualSidebar from 'components/ui/ContextualSidebar';
import AIAssistantWidget from 'components/ui/AIAssistantWidget';
import StudyTimer from './components/StudyTimer';
import SubjectCard from './components/SubjectCard';
import FlashcardViewer from './components/FlashcardViewer';
import LessonViewer from './components/LessonViewer';
import ProgressTracker from './components/ProgressTracker';
import FocusMode from './components/FocusMode';
import StudyChat from './components/StudyChat';

const StudyAssistantHub = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [studyStreak, setStudyStreak] = useState(7);
  const [totalXP, setTotalXP] = useState(2450);
  const [isStudySessionActive, setIsStudySessionActive] = useState(false);

  const subjects = [
    {
      id: 'edexcel-maths',
      name: 'Edexcel Mathematics',
      icon: 'Calculator',
      progress: 68,
      totalLessons: 45,
      completedLessons: 31,
      nextLesson: 'Quadratic Equations',
      difficulty: 'Intermediate',
      color: 'primary',
      recentActivity: '2 hours ago'
    },
    {
      id: 'aqa-english',
      name: 'AQA English Literature',
      icon: 'BookOpen',
      progress: 42,
      totalLessons: 38,
      completedLessons: 16,
      nextLesson: 'Macbeth Analysis',
      difficulty: 'Advanced',
      color: 'secondary',
      recentActivity: '1 day ago'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'lesson',
      subject: 'Mathematics',
      title: 'Completed: Trigonometry Basics',
      time: '2 hours ago',
      xpGained: 50,
      icon: 'CheckCircle'
    },
    {
      id: 2,
      type: 'flashcard',
      subject: 'English',
      title: 'Reviewed: Shakespeare Quotes',
      time: '1 day ago',
      xpGained: 25,
      icon: 'Brain'
    },
    {
      id: 3,
      type: 'practice',
      subject: 'Mathematics',
      title: 'Practice Test: Algebra',
      time: '2 days ago',
      xpGained: 75,
      icon: 'Target'
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Unit 3 Assessment',
      dueDate: '2024-01-15',
      priority: 'high',
      daysLeft: 3
    },
    {
      id: 2,
      subject: 'English',
      title: 'Essay: Macbeth Themes',
      dueDate: '2024-01-20',
      priority: 'medium',
      daysLeft: 8
    }
  ];

  const studyGoals = [
    {
      id: 1,
      title: 'Complete 5 Math Lessons',
      progress: 80,
      target: 5,
      current: 4,
      deadline: '2024-01-14'
    },
    {
      id: 2,
      title: 'Review 50 Flashcards',
      progress: 60,
      target: 50,
      current: 30,
      deadline: '2024-01-16'
    }
  ];

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setActiveView('lessons');
  };

  const handleStartStudySession = () => {
    setIsStudySessionActive(true);
  };

  const handleEndStudySession = () => {
    setIsStudySessionActive(false);
  };

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'lessons':
        return <LessonViewer subject={selectedSubject} onBack={() => setActiveView('dashboard')} />;
      case 'flashcards':
        return <FlashcardViewer subject={selectedSubject} onBack={() => setActiveView('dashboard')} />;
      case 'practice':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Practice Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjects.map((subject) => (
                <div key={subject.id} className="bg-surface rounded-xl p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-${subject.color}/20 flex items-center justify-center`}>
                      <Icon name={subject.icon} size={24} className={`text-${subject.color}`} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{subject.name}</h3>
                      <p className="text-sm text-text-secondary">Practice Tests Available</p>
                    </div>
                  </div>
                  <button className="w-full bg-primary/20 hover:bg-primary/30 text-primary rounded-lg py-3 transition-colors duration-150">
                    Start Practice Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gradient-primary mb-2">Study Assistant Hub</h1>
                  <p className="text-text-secondary">Your AI-powered learning companion for academic excellence</p>
                </div>
                <button
                  onClick={toggleFocusMode}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-150 ${
                    isFocusMode 
                      ? 'bg-accent/20 text-accent border border-accent/30' :'bg-surface-light hover:bg-surface-lighter text-text-secondary'
                  }`}
                >
                  <Icon name="Focus" size={18} strokeWidth={2} />
                  <span className="text-sm font-medium">Focus Mode</span>
                </button>
              </div>
              
              {/* Study Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-surface rounded-xl p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Icon name="Flame" size={20} className="text-accent" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-text-primary">{studyStreak}</p>
                      <p className="text-sm text-text-secondary">Day Streak</p>
                    </div>
                  </div>
                </div>
                <div className="bg-surface rounded-xl p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon name="Star" size={20} className="text-primary" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-text-primary">{totalXP.toLocaleString()}</p>
                      <p className="text-sm text-text-secondary">Total XP</p>
                    </div>
                  </div>
                </div>
                <div className="bg-surface rounded-xl p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <Icon name="Clock" size={20} className="text-secondary" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-text-primary">4.2h</p>
                      <p className="text-sm text-text-secondary">Today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects Grid */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Your Subjects</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {subjects.map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    onSelect={handleSubjectSelect}
                    onStartLesson={() => {
                      setSelectedSubject(subject);
                      setActiveView('lessons');
                    }}
                    onStartFlashcards={() => {
                      setSelectedSubject(subject);
                      setActiveView('flashcards');
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveView('flashcards')}
                  className="flex flex-col items-center space-y-2 p-4 bg-surface hover:bg-surface-light rounded-xl border border-white/10 transition-colors duration-150"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Icon name="Brain" size={24} className="text-primary" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Flashcards</span>
                </button>
                <button
                  onClick={() => setActiveView('practice')}
                  className="flex flex-col items-center space-y-2 p-4 bg-surface hover:bg-surface-light rounded-xl border border-white/10 transition-colors duration-150"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Icon name="Target" size={24} className="text-secondary" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Practice</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-4 bg-surface hover:bg-surface-light rounded-xl border border-white/10 transition-colors duration-150">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Icon name="FileText" size={24} className="text-accent" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Notes</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-4 bg-surface hover:bg-surface-light rounded-xl border border-white/10 transition-colors duration-150">
                  <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                    <Icon name="Calendar" size={24} className="text-warning" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Schedule</span>
                </button>
              </div>
            </div>

            {/* Recent Activity & Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-surface rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 bg-surface-light rounded-lg">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Icon name={activity.icon} size={16} className="text-primary" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{activity.title}</p>
                        <p className="text-xs text-text-secondary">{activity.subject} • {activity.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-accent">+{activity.xpGained} XP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Goals */}
              <div className="bg-surface rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Study Goals</h3>
                <div className="space-y-4">
                  {studyGoals.map((goal) => (
                    <div key={goal.id} className="p-3 bg-surface-light rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-text-primary">{goal.title}</p>
                        <p className="text-xs text-text-secondary">{goal.current}/{goal.target}</p>
                      </div>
                      <div className="w-full bg-surface-lighter rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-text-tertiary">Due: {new Date(goal.deadline).toLocaleDateString('en-GB')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <ContextualSidebar />
      
      {/* Focus Mode Overlay */}
      {isFocusMode && <FocusMode onExit={() => setIsFocusMode(false)} />}
      
      <div className="flex">
        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 ${
          isFocusMode ? 'ml-0' : 'lg:ml-64'
        } mt-16`}>
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Center Content */}
            <div className="flex-1 overflow-y-auto">
              {renderMainContent()}
            </div>

            {/* Right Sidebar */}
            <aside className="w-80 bg-surface border-l border-white/10 overflow-y-auto hidden xl:block">
              <div className="p-6">
                {/* Study Timer */}
                <StudyTimer 
                  isActive={isStudySessionActive}
                  onStart={handleStartStudySession}
                  onStop={handleEndStudySession}
                />

                {/* Upcoming Deadlines */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Upcoming Deadlines</h3>
                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline) => (
                      <div key={deadline.id} className="p-3 bg-surface-light rounded-lg border-l-4 border-error">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-text-primary">{deadline.title}</p>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            deadline.priority === 'high' ? 'bg-error/20 text-error' :
                            deadline.priority === 'medium'? 'bg-warning/20 text-warning' : 'bg-accent/20 text-accent'
                          }`}>
                            {deadline.daysLeft} days
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary">{deadline.subject}</p>
                        <p className="text-xs text-text-tertiary">Due: {new Date(deadline.dueDate).toLocaleDateString('en-GB')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Tracker */}
                <ProgressTracker />

                {/* AI Study Chat */}
                <StudyChat />
              </div>
            </aside>
          </div>
        </main>
      </div>

      <AIAssistantWidget />
    </div>
  );
};

export default StudyAssistantHub;