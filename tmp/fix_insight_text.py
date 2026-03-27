import os

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\home\HomeDashboardWeb.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

old_insight_text = """                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    "Your current focus on <span className="text-purple-700 font-bold">financial upskilling</span> has reduced your long-term risk profile by 12% this month. Keep going."
                  </p>"""

new_insight_text = """                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    {stats.simulation_count === 0 
                      ? "Welcome to FutureVision AI! Run your first simulation to generate actionable insights for your balance path."
                      : `"Your focus on personal data simulations and strategy updates is building momentum. Keep exploring scenarios for optimal results."`}
                  </p>"""

if old_insight_text in content:
    content = content.replace(old_insight_text, new_insight_text)
    print("Insight text updated")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
