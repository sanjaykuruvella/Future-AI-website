import { useState, useRef, useEffect } from 'react';
import { WebLayout } from '../../components/WebLayout';
import { Send, Sparkles, Brain, Lightbulb, TrendingUp, BarChart3 } from 'lucide-react';
import { chatAssistant } from '../../api/prediction';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  suggestions?: string[];
}

export default function AIAssistantChatScreenWeb() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I\'m your AI Decision Assistant powered by advanced machine learning. I can help you analyze life decisions, explore outcomes, and provide personalized insights across career, finance, education, and personal development.',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Help me decide on a career change',
        'Should I invest in real estate?',
        'Analyze my education options'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (message.trim()) {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : { user_id: 1 };

      const newMessage: Message = {
        id: Date.now(),
        text: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages([...messages, newMessage]);
      setMessage('');

      try {
        const response = await chatAssistant(user.user_id, message);

        const aiResponse: Message = {
          id: Date.now() + 1,
          text: response.reply,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          suggestions: [
            'Tell me more',
            'Create simulation',
            'Show alternatives',
            'Analyze risks'
          ]
        };
        setMessages(prev => [...prev, aiResponse]);
      } catch (error) {
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: "I'm having a bit of trouble connecting to my brain right now. Please make sure the backend is running!",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  const quickActions = [
    {
      icon: TrendingUp,
      label: 'Career Analysis',
      description: 'Evaluate career moves',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      label: 'Financial Planning',
      description: 'Investment decisions',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Brain,
      label: 'Life Balance',
      description: 'Personal goals',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Lightbulb,
      label: 'Quick Insights',
      description: 'Get instant advice',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <WebLayout maxWidth="full">
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)]">
        {/* Left Sidebar - Quick Actions */}
        <div className="col-span-3 space-y-4">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Quick Actions</span>
            </h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="w-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 rounded-xl p-4 text-left transition-all hover:shadow-lg border border-gray-200/50"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-800">{action.label}</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl border border-blue-200/50 p-6">
            <h3 className="font-semibold text-gray-800 mb-3">💡 Pro Tip</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Be specific with your questions. Include context like your current situation, goals, and timeline for better AI insights.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
            <h3 className="font-semibold text-gray-800 mb-3">📊 Today's Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Messages</span>
                <span className="font-semibold text-gray-800">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Insights</span>
                <span className="font-semibold text-gray-800">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Simulations</span>
                <span className="font-semibold text-gray-800">5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="col-span-9 flex flex-col bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 overflow-hidden">
          {/* Chat Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">AI Decision Assistant</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm text-gray-600">Online • Ready to help</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 px-8 py-6 space-y-6 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    {msg.sender === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">AI Assistant</span>
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                      </div>
                    )}
                    {msg.sender === 'user' && (
                      <div className="flex items-center justify-end space-x-2 mb-2">
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        <span className="text-sm font-medium text-gray-700">You</span>
                      </div>
                    )}
                    <div
                      className={`px-6 py-4 rounded-2xl ${msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 border border-gray-200'
                        }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                    </div>

                    {/* Suggestions */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 bg-white/70 border border-blue-200 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-all"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-8 py-6 bg-gradient-to-r from-gray-50/50 to-gray-100/50 border-t border-gray-200/50">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={3}
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  placeholder="Ask me anything about your decisions, goals, or life choices..."
                />
                <p className="text-xs text-gray-500 mt-2 px-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </WebLayout>
  );
}
