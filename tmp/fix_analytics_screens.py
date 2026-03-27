import os

path_analytics = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\analysis\AnalyticsDashboardWeb.tsx"
path_alternate = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\analysis\AlternateScenarioScreenWeb.tsx"
path_compare = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\analysis\CompareFuturesScreenWeb.tsx"

# 1. AnalyticsDashboardWeb.tsx
with open(path_analytics, 'r', encoding='utf-8') as f:
    analytics_content = f.read()

placeholder_analytics = """  if (!hasHistory) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 bg-white border border-dashed border-gray-200 rounded-[2.5rem] shadow-xl max-w-md mx-auto">
             <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
             <h2 className="text-2xl font-black text-gray-800 mb-2">No Simulation Data Yet</h2>
             <p className="text-sm text-gray-500 mb-6 font-medium">Run your first AI simulation to see live analytics and trends updates regarding your pathing.</p>
             <button onClick={() => navigate('/simulation-intro')} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/25 transition-all">Start Simulation</button>
          </div>
        </div>
      </WebLayout>
    );
  }"""

if "displayHistory.slice(0, 7).reverse();" in analytics_content:
    if "if (!hasHistory)" not in analytics_content:
         # insert right before `return (`
         parts = analytics_content.split("return (\n    <WebLayout maxWidth=\"full\">")
         if len(parts) == 2:
              new_analytics = parts[0] + placeholder_analytics + "\n\n  return (\n    <WebLayout maxWidth=\"full\">" + parts[1]
              analytics_content = new_analytics
              print("Analytics placeholder added")

with open(path_analytics, 'w', encoding='utf-8') as f:
    f.write(analytics_content)


# 2. AlternateScenarioScreenWeb.tsx
with open(path_alternate, 'r', encoding='utf-8') as f:
    alternate_content = f.read()

placeholder_alternate = """    if (scenarios.length === 0) {
        return (
            <WebLayout maxWidth="full">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center p-8 bg-slate-900 border border-dashed border-slate-800 rounded-3xl shadow-xl max-w-md mx-auto">
                        <GitBranch className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-pulse" />
                        <h2 className="text-xl font-bold text-slate-100 mb-2">No alternate scenarios</h2>
                        <p className="text-xs text-slate-400 mb-6 font-medium">Explore alternative options by running simulations setup first paths.</p>
                        <button onClick={() => navigate('/simulation-intro')} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-xs shadow-md">Start Simulation</button>
                    </div>
                </div>
            </WebLayout>
        );
    }"""

if "if (isLoading)" in alternate_content:
    if "if (scenarios.length === 0)" not in alternate_content:
         parts = alternate_content.split("return (\n        <WebLayout maxWidth=\"full\">")
         if len(parts) == 2:
              new_alternate = parts[0] + placeholder_alternate + "\n\n    return (\n        <WebLayout maxWidth=\"full\">" + parts[1]
              alternate_content = new_alternate
              print("Alternate placeholder added")

with open(path_alternate, 'w', encoding='utf-8') as f:
    f.write(alternate_content)


# 3. CompareFuturesScreenWeb.tsx
with open(path_compare, 'r', encoding='utf-8') as f:
    compare_content = f.read()

# Fix text transparency issue in header title
compare_content = compare_content.replace(
    'className="text-3xl font-black text-gray-900 tracking-tight text-center bg-gradient-to-r from-gray-900 via-slate-800 to-indigo-950 bg-clip-text text-transparent"',
    'className="text-3xl font-black text-gray-900 tracking-tight text-center"'
)

placeholder_compare = """    if (!compareData || (compareData.rows && compareData.rows.length === 0)) {
        return (
            <WebLayout maxWidth="full">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center p-8 bg-white border border-dashed border-gray-200 rounded-3xl shadow-xl max-w-md mx-auto">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ArrowRight className="w-8 h-8 text-gray-400 rotate-45" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">No Comparisons Yet</h2>
                        <p className="text-sm text-gray-500 mb-6 font-medium">Run your first AI simulation to see side-by-side decision updates comparing your pathways.</p>
                        <button onClick={() => navigate('/simulation-intro')} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/25 transition-all">Start Simulation</button>
                    </div>
                </div>
            </WebLayout>
        );
    }"""

if "if (isLoading)" in compare_content:
    if "if (!compareData" not in compare_content:
         parts = compare_content.split("return (\n        <WebLayout maxWidth=\"full\">")
         if len(parts) == 2:
              new_compare = parts[0] + placeholder_compare + "\n\n    return (\n        <WebLayout maxWidth=\"full\">" + parts[1]
              compare_content = new_compare
              print("Compare placeholder added")

with open(path_compare, 'w', encoding='utf-8') as f:
    f.write(compare_content)

print("Success")
