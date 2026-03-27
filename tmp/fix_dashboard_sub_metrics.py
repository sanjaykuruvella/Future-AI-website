import os

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\home\HomeDashboardWeb.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Active Goals Card Sub-metrics
old_goals_sub = """              <div className="space-y-3 mt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-medium">Path Completion</span>
                    <span className="text-emerald-600 font-bold">75%</span>
                  </div>
                  <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <p className="text-xs text-gray-500">8 goals on track • 4 need attention</p>
              </div>"""

new_goals_sub = """              <div className="space-y-3 mt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-medium">Path Completion</span>
                    <span className="text-emerald-600 font-bold">{stats.active_goals > 0 ? stats.future_score : 0}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats.active_goals > 0 ? stats.future_score : 0}%` }} />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {stats.active_goals === 0 ? "No active goals yet" : `${stats.active_goals} goals tracking your path`}
                </p>
              </div>"""

if old_goals_sub in content:
    content = content.replace(old_goals_sub, new_goals_sub)
    print("Goals sub-metrics updated")

# 2. Update Growth Opportunities side-bar card
old_sidebar_map = """                {[
                  { label: 'Market Readiness', value: 85, color: 'blue' },
                  { label: 'Risk Mitigation', value: 72, color: 'purple' },
                  { label: 'Goal Alignment', value: 94, color: 'emerald' }
                ].map((m, i) => ("""

new_sidebar_map = """                {[
                  { label: 'Market Readiness', value: stats.career || 0, color: 'blue' },
                  { label: 'Risk Mitigation', value: stats.finance || 0, color: 'purple' },
                  { label: 'Goal Alignment', value: stats.balance || 0, color: 'emerald' }
                ].map((m, i) => ("""

if old_sidebar_map in content:
    content = content.replace(old_sidebar_map, new_sidebar_map)
    print("Sidebar metrics updated")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
