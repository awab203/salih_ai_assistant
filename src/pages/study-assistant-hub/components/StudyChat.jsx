import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const StudyChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const initialMessages = [
    {
      id: 1,
      type: 'ai',
      content: "Hello! I\'m your AI study assistant. I can help you with questions about your current lessons, provide explanations, or suggest study strategies. What would you like to work on?",
      timestamp: new Date(Date.now() - 300000)
    }
  ];

  const quickActions = [
    { label: 'Explain concept', icon: 'HelpCircle' },
    { label: 'Practice problems', icon: 'Target' },
    { label: 'Study tips', icon: 'Lightbulb' },
    { label: 'Review notes', icon: 'FileText' }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('quadratic')) {
      return `Great question about quadratic equations! 

The quadratic formula x = (-b ± √(b² - 4ac)) / 2a is used to solve equations of the form ax² + bx + c = 0.

Here's a step-by-step approach:
1. Identify coefficients a, b, and c
2. Calculate the discriminant (b² - 4ac)
3. Apply the formula
4. Simplify your answer

Would you like me to walk through a specific example?`;
    }
    
    if (input.includes('help') || input.includes('stuck')) {
      return `I'm here to help! Here are some strategies when you're stuck:

1. **Break it down**: Divide the problem into smaller parts
2. **Review basics**: Go back to fundamental concepts
3. **Practice similar problems**: Start with easier examples
4. **Ask specific questions**: What exactly is confusing you?

What specific topic or problem are you working on?`;
    }
    
    if (input.includes('study') || input.includes('tips')) {
      return `Here are some effective study techniques:

**Active Learning:**
• Summarize concepts in your own words
• Teach the material to someone else
• Create mind maps or diagrams

**Spaced Repetition:**
• Review material at increasing intervals
• Use flashcards for key concepts
• Practice problems regularly

**Focus Techniques:**
• Use the Pomodoro Technique (25 min focus + 5 min break)
• Eliminate distractions
• Set specific learning goals

Which subject are you focusing on today?`;
    }
    
    return `I understand you're asking about "${userInput}". Let me help you with that.

Based on your current study progress, I recommend:
• Reviewing the relevant lesson materials
• Practicing with similar examples
• Breaking down complex concepts into smaller parts

Could you provide more specific details about what you'd like to understand better?`;
  };

  const handleQuickAction = (action) => {
    setInputValue(action.label);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-surface-light rounded-xl border border-white/10 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon name="MessageCircle" size={16} className="text-primary" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">AI Study Assistant</h3>
            <p className="text-xs text-text-secondary">Always ready to help</p>
          </div>
          <div className="ml-auto">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${
              message.type === 'user' ?'bg-primary text-white' :'bg-surface text-text-primary'
            } rounded-lg p-3`}>
              <div className="whitespace-pre-line text-sm">{message.content}</div>
              <p className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-primary-100' : 'text-text-tertiary'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-surface text-text-primary rounded-lg p-3">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              className="flex items-center space-x-2 p-2 bg-surface hover:bg-surface-lighter rounded-lg transition-colors duration-150"
            >
              <Icon name={action.icon} size={12} className="text-text-secondary" strokeWidth={2} />
              <span className="text-xs text-text-secondary">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 bg-surface border border-white/10 rounded-lg text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="p-2 bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-150"
          >
            <Icon name="Send" size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyChat;