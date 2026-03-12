import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { 
  Sparkles, TrendingUp, AlertTriangle, Target, CheckCircle2, 
  Clock, Filter, Archive, Trash2, Bell, BellOff, TrendingDown,
  Calendar, DollarSign, Briefcase, GraduationCap, Heart, Shield
} from 'lucide-react';

type NotificationType = 'all' | 'insight' | 'opportunity' | 'alert' | 'goal' | 'system';

interface Notification {
  id: number;
  type: NotificationType;
  category: 'career' | 'finance' | 'education' | 'health' | 'general';
  icon: typeof Sparkles;
  color: string;
  bgColor: string;
  title: string;
  message: string;
  time: string;
  timestamp: Date;
  read: boolean;
  actionable: boolean;
  actionText?: string;
  actionRoute?: string;
  priority: 'low' | 'medium' | 'high';
}

export default function NotificationsScreenWeb() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<NotificationType>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'insight',
      category: 'general',
      icon: Sparkles,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      title: 'New Daily Insight Available',
      message: 'Your AI has generated today\'s prediction based on recent activity patterns. 87% confidence in career growth trajectory.',
      time: '5 minutes ago',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      actionable: true,
      actionText: 'View Insight',
      actionRoute: '/analytics',
      priority: 'high'
    },
    {
      id: 2,
      type: 'opportunity',
      category: 'career',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      title: 'High-Probability Opportunity Detected',
      message: 'Career decision window for "Senior Developer Role" is closing in 2 days. AI suggests 92% success probability if acted upon within 48 hours.',
      time: '2 hours ago',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionable: true,
      actionText: 'Review Opportunity',
      actionRoute: '/opportunity-highlights',
      priority: 'high'
    },
    {
      id: 3,
      type: 'alert',
      category: 'finance',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      title: 'Risk Alert: Financial Decision',
      message: 'Your recent investment simulation shows 35% risk factor. Market conditions have changed since your last analysis. Recommend re-evaluation.',
      time: '5 hours ago',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false,
      actionable: true,
      actionText: 'Re-analyze',
      actionRoute: '/analytics',
      priority: 'high'
    },
    {
      id: 4,
      type: 'goal',
      category: 'career',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      title: 'Goal Progress Milestone Reached',
      message: 'You\'re 75% towards your career goal "Become Tech Lead". You\'ve completed 3 out of 4 key milestones ahead of schedule!',
      time: '1 day ago',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      actionable: true,
      actionText: 'View Progress',
      actionRoute: '/analysis/growth',
      priority: 'medium'
    },
    {
      id: 5,
      type: 'insight',
      category: 'education',
      icon: Sparkles,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      title: 'Learning Pattern Insight',
      message: 'AI detected optimal learning time between 6-8 AM. Your comprehension rate is 40% higher during these hours based on simulation data.',
      time: '1 day ago',
      timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000),
      read: true,
      actionable: false,
      priority: 'low'
    },
    {
      id: 6,
      type: 'alert',
      category: 'finance',
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      title: 'Budget Alert',
      message: 'Monthly spending on "Entertainment" exceeded budget by ₹3,500. This may impact your savings goal for Q2 2026.',
      time: '2 days ago',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      actionable: true,
      actionText: 'View Analytics',
      actionRoute: '/analytics',
      priority: 'medium'
    },
    {
      id: 7,
      type: 'system',
      category: 'general',
      icon: Bell,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      title: 'Weekly Summary Ready',
      message: 'Your personalized weekly summary report is now available. Review your decisions, insights, and upcoming opportunities.',
      time: '3 days ago',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true,
      actionable: true,
      actionText: 'View Summary',
      actionRoute: '/analytics',
      priority: 'low'
    },
    {
      id: 8,
      type: 'opportunity',
      category: 'education',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      title: 'Skill Development Opportunity',
      message: 'Based on career trajectory, learning "Cloud Architecture" now could increase your market value by ₹8-12 LPA within 18 months.',
      time: '4 days ago',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      read: true,
      actionable: true,
      actionText: 'Explore Path',
      actionRoute: '/quick-simulation',
      priority: 'medium'
    },
    {
      id: 9,
      type: 'goal',
      category: 'finance',
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      title: 'Savings Goal Achieved',
      message: 'Congratulations! You\'ve reached your Q1 2026 savings target of ₹2,50,000 two weeks ahead of schedule.',
      time: '5 days ago',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      read: true,
      actionable: false,
      priority: 'low'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications
    .filter(n => filter === 'all' || n.type === filter)
    .filter(n => !showUnreadOnly || !n.read)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'career': return Briefcase;
      case 'finance': return DollarSign;
      case 'education': return GraduationCap;
      case 'health': return Heart;
      default: return Bell;
    }
  };

  const filterOptions: { value: NotificationType; label: string; icon: typeof Bell; color: string }[] = [
    { value: 'all', label: 'All', icon: Bell, color: 'text-gray-600' },
    { value: 'insight', label: 'Insights', icon: Sparkles, color: 'text-blue-600' },
    { value: 'opportunity', label: 'Opportunities', icon: TrendingUp, color: 'text-green-600' },
    { value: 'alert', label: 'Alerts', icon: AlertTriangle, color: 'text-yellow-600' },
    { value: 'goal', label: 'Goals', icon: Target, color: 'text-purple-600' },
    { value: 'system', label: 'System', icon: Bell, color: 'text-gray-600' }
  ];

  return (
    <WebLayout maxWidth="full">
      <div className="space-y-6 max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated on insights, opportunities, and alerts</p>
          </div>
          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium">Mark all read</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">{notifications.length}</span>
            </div>
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <BellOff className="w-5 h-5 text-red-600" />
              <span className="text-2xl font-bold text-red-600">{unreadCount}</span>
            </div>
            <p className="text-sm text-gray-600">Unread</p>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-600">
                {notifications.filter(n => n.priority === 'high' && !n.read).length}
              </span>
            </div>
            <p className="text-sm text-gray-600">High Priority</p>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">
                {notifications.filter(n => n.actionable && !n.read).length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Actionable</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 text-gray-700">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                    filter === option.value
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <option.icon className={`w-4 h-4 ${filter === option.value ? 'text-white' : option.color}`} />
                  <span className="font-medium">{option.label}</span>
                  {option.value !== 'all' && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      filter === option.value ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      {notifications.filter(n => n.type === option.value).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center space-x-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Unread only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-12 text-center">
              <BellOff className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No notifications</h3>
              <p className="text-gray-600">
                {showUnreadOnly ? 'All caught up! No unread notifications.' : 'You don\'t have any notifications yet.'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const CategoryIcon = getCategoryIcon(notification.category);
              return (
                <div
                  key={notification.id}
                  className={`bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-5 transition-all hover:shadow-lg ${
                    !notification.read ? 'ring-2 ring-blue-500/20' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 ${notification.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <notification.icon className={`w-7 h-7 ${notification.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2 flex-1">
                          <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                          <CategoryIcon className="w-4 h-4 text-gray-400" />
                          {notification.priority === 'high' && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                              High Priority
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{notification.message}</p>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        {notification.actionable && (
                          <button
                            onClick={() => notification.actionRoute && navigate(notification.actionRoute)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium"
                          >
                            <span>{notification.actionText}</span>
                          </button>
                        )}
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all text-sm font-medium"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Mark read</span>
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </WebLayout>
  );
}
