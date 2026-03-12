import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { BookOpen, Plus } from 'lucide-react';

export default function ReflectionJournalScreen() {
  const navigate = useNavigate();
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [entry, setEntry] = useState('');

  const entries = [
    {
      id: 1,
      date: 'Feb 13, 2026',
      title: 'Thoughts on Career Change',
      preview: 'Feeling excited but nervous about the startup opportunity...',
      mood: '😊',
    },
    {
      id: 2,
      date: 'Feb 10, 2026',
      title: 'Investment Decision Reflection',
      preview: 'Glad I waited for more data before investing...',
      mood: '🤔',
    },
    {
      id: 3,
      date: 'Feb 5, 2026',
      title: 'Education Goals',
      preview: "The master's program decision feels right...",
      mood: '🎯',
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/profile')}>
      <div className="min-h-screen px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Reflection Journal</h1>
            <p className="text-gray-600">Document your decision journey</p>
          </div>
          <button
            onClick={() => setShowNewEntry(!showNewEntry)}
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>

        {showNewEntry && (
          <GlassCard className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">New Entry</h3>
            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="w-full h-32 px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3"
              placeholder="Write your thoughts and reflections..."
            />
            <div className="flex space-x-2">
              <Button onClick={() => setShowNewEntry(false)} className="flex-1">
                Save Entry
              </Button>
              <Button onClick={() => setShowNewEntry(false)} variant="ghost">
                Cancel
              </Button>
            </div>
          </GlassCard>
        )}

        <div className="space-y-3">
          {entries.map((entry) => (
            <GlassCard key={entry.id} className="cursor-pointer hover:bg-white/80">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                    <span className="text-xl">{entry.mood}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{entry.preview}</p>
                  <p className="text-xs text-gray-500">{entry.date}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-6 bg-blue-50/50">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-semibold text-gray-800">{entries.length} Entries</p>
              <p className="text-sm text-gray-600">Keep journaling for better self-awareness</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
