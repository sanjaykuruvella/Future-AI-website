import { useState, useEffect } from 'react';
import { apiRequest } from '../../api/config';
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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
       const userStr = localStorage.getItem('user');
       if (!userStr) return;
       const user = JSON.parse(userStr);
       try {
           setIsLoading(true);
           const res = await apiRequest<any[]>(`/predictions/${user.user_id}`, 'GET');
           const mapped = (res || []).map((p: any, i: number) => {
                const isCareer = p.category?.toLowerCase() === 'career';
                return {
                    id: p.prediction_id,
                    type: 'insight',
                    category: p.category?.toLowerCase() || 'general',
                    icon: Sparkles,
                    color: isCareer ? 'text-blue-600' : 'text-green-600',
                    bgColor: isCareer ? 'bg-blue-100' : 'bg-green-100',
                    title: `Simulation: ${p.decision_input || 'New Prediction'}`,
                    message: `Growth Rating: ${p.success_probability}%. Timeline: ${p.timeline || 'Immediate'}. AI Analysis shows optimal paths.`,
                    time: new Date(p.created_at).toLocaleDateString(),
                    timestamp: new Date(p.created_at),
                    read: false,
                    actionable: true,
                    actionText: 'View Details',
                    actionRoute: '/analytics',
                    priority: 'medium'
                };
           });
           setNotifications(mapped);
       } catch (e) {
       } finally { 
           setIsLoading(false); 
       }
    };
    fetchNotifications();
  }, []);

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

  if (isLoading) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      </WebLayout>
    );
  }

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
