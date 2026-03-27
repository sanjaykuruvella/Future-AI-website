import os

path_goals = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\analysis\GoalsScreenWeb.tsx"
path_growth = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\analysis\GrowthMetricsScreenWeb.tsx"
path_trend = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\analysis\TrendAnalysisScreenWeb.tsx"

# 1. GoalsScreenWeb.tsx
with open(path_goals, 'r', encoding='utf-8') as f:
    goals_content = f.read()

placeholder_goals = """  if (!history || history.length === 0) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 bg-white border border-dashed border-gray-200 rounded-3xl shadow-xl max-w-md mx-auto">
             <Target className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
             <h2 className="text-2xl font-black text-gray-800 mb-2">No Goals Set Yet</h2>
             <p className="text-sm text-gray-500 mb-6 font-medium">Run your first AI simulation to set objective milestones for your path updates.</p>
             <button onClick={() => navigate('/simulation-intro')} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/25 transition-all">Start Simulation</button>
          </div>
        </div>
      </WebLayout>
    );
  }"""

if "const completedCount" in goals_content:
    if "if (!history || history.length === 0)" not in goals_content:
         parts = goals_content.split("return (\n    <WebLayout>")
         if len(parts) == 2:
              goals_content = parts[0] + placeholder_goals + "\n\n  return (\n    <WebLayout>" + parts[1]
              print("Goals placeholder added")

with open(path_goals, 'w', encoding='utf-8') as f:
    f.write(goals_content)


# 2. GrowthMetricsScreenWeb.tsx
with open(path_growth, 'r', encoding='utf-8') as f:
    growth_content = f.read()

placeholder_growth = """  if (!history || history.length === 0) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 bg-white border border-dashed border-gray-200 rounded-3xl shadow-xl max-w-md mx-auto">
             <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
             <h2 className="text-2xl font-black text-gray-800 mb-2">No Growth Metrics</h2>
             <p className="text-sm text-gray-500 mb-6 font-medium">Run your first simulation to accurately evaluate live alignment setups.</p>
             <button onClick={() => navigate('/simulation-intro')} className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-green-500/25 transition-all">Start Simulation</button>
          </div>
        </div>
      </WebLayout>
    );
  }"""

if "const getStat" in growth_content:
    if "if (!history || history.length === 0)" not in growth_content:
         parts = growth_content.split("return (\n    <WebLayout maxWidth=\"full\">")
         if len(parts) == 2:
              growth_content = parts[0] + placeholder_growth + "\n\n  return (\n    <WebLayout maxWidth=\"full\">" + parts[1]
              print("Growth placeholder added")

with open(path_growth, 'w', encoding='utf-8') as f:
    f.write(growth_content)


# 3. TrendAnalysisScreenWeb.tsx (Injects useEffect Fetching then placeholder checks)
with open(path_trend, 'r', encoding='utf-8') as f:
    trend_content = f.read()

# Add imports for useEffect and prediction api
if "import { useState } from 'react';" in trend_content:
    trend_content = trend_content.replace(
         "import { useState } from 'react';",
         "import { useState, useEffect } from 'react';\nimport { getPredictionsHistory } from '../../api/prediction';"
    )

# Add states inside component def
hook_inject = """  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const userStr = localStorage.getItem('user');
      if (!userStr) { navigate('/login'); return; }
      const user = JSON.parse(userStr);
      try {
         const data = await getPredictionsHistory(user.user_id);
         setHistory(data);
      } catch (e) {} finally { setIsLoading(false); }
    };
    fetchHistory();
  }, [navigate]);"""

# Insert hook right after component init
if "const [chartType, setChartType] = useState<ChartType>('area');" in trend_content:
    trend_content = trend_content.replace(
         "const [chartType, setChartType] = useState<ChartType>('area');",
         "const [chartType, setChartType] = useState<ChartType>('area');\n\n" + hook_inject
    )

placeholder_trend = """  if (isLoading) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      </WebLayout>
    );
  }

  if (!history || history.length === 0) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 bg-white border border-dashed border-gray-200 rounded-3xl shadow-xl max-w-md mx-auto">
             <LineChart className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
             <h2 className="text-2xl font-black text-gray-800 mb-2">No Trend Analysis</h2>
             <p className="text-sm text-gray-500 mb-6 font-medium">Run your first simulation to generate trending decision trajectories properly.</p>
             <button onClick={() => navigate('/simulation-intro')} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/25 transition-all">Start Simulation</button>
          </div>
        </div>
      </WebLayout>
    );
  }"""

if "getCurrentData = () =>" in trend_content:
    if "if (!history || history.length === 0)" not in trend_content:
         parts = trend_content.split("return (\n    <WebLayout maxWidth=\"full\">")
         if len(parts) == 2:
              trend_content = parts[0] + placeholder_trend + "\n\n  return (\n    <WebLayout maxWidth=\"full\">" + parts[1]
              print("Trend placeholder added")

with open(path_trend, 'w', encoding='utf-8') as f:
    f.write(trend_content)

print("Success")
