import os

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\home\HomeDashboardWeb.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Imports
old_imports = """import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';"""

new_imports = """import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { apiRequest } from '../../api/config';"""

if old_imports in content:
    content = content.replace(old_imports, new_imports)

# State and Effect Logic inside HomeDashboardWeb
old_inner = """export default function HomeDashboardWeb() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { name: 'User' };

  // Mock data for mini-charts"""

new_inner = """export default function HomeDashboardWeb() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { name: 'User' };

  const [stats, setStats] = useState({
    future_score: 0,
    active_goals: 0,
    simulation_count: 0,
    ai_insights: 0,
    trend: '+0 this week'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
         const data = await apiRequest<any>(`/home_data/${user.user_id}`);
         if (data && !data.error) {
             setStats(data);
         }
      } catch (err) {
         console.error(err);
      } finally {
         setIsLoading(false);
      }
    };
    if (user && user.user_id) {
         fetchStats();
    }
  }, [user.user_id]);

  // Mock data for mini-charts"""

if old_inner in content:
    content = content.replace(old_inner, new_inner)

# Replace stats values in JSX

# 1. Future Score:
old_score = """<span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">87</span>"""
new_score = """<span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stats.future_score}</span>"""
content = content.replace(old_score, new_score)

# 2. Trend:
old_trend = """<span>+5.2% trend improvement</span>"""
new_trend = """<span>{stats.trend}</span>"""
content = content.replace(old_trend, new_trend)

# 3. Active Goals:
old_goals = """<span className="text-4xl font-bold text-emerald-600">12</span>"""
new_goals = """<span className="text-4xl font-bold text-emerald-600">{stats.active_goals}</span>"""
content = content.replace(old_goals, new_goals)

# 4. Simulations:
old_sims = """<span className="text-4xl font-bold text-orange-600">48</span>"""
new_sims = """<span className="text-4xl font-bold text-orange-600">{stats.simulation_count}</span>"""
content = content.replace(old_sims, new_sims)

# 5. Insights:
old_insights = """<span className="text-4xl font-bold text-purple-600">156</span>"""
new_insights = """<span className="text-4xl font-bold text-purple-600">{stats.ai_insights}</span>"""
content = content.replace(old_insights, new_insights)

# 6. Adjust Insights summary text below:
old_sum_ins = """<p className="text-xs text-gray-500 mt-2">Generated from 48 simulations</p>"""
new_sum_ins = """<p className="text-xs text-gray-500 mt-2">Generated from {stats.simulation_count} simulations</p>"""
content = content.replace(old_sum_ins, new_sum_ins)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
