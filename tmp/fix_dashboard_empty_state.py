import os

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\home\HomeDashboardWeb.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace "48 predictions" text in Analytics card
old_predictions_text = """<p className="text-xs text-gray-500 mt-1">48 predictions</p>"""
new_predictions_text = """<p className="text-xs text-gray-500 mt-1">{stats.simulation_count} predictions</p>"""
content = content.replace(old_predictions_text, new_predictions_text)

# 2. Update Recent Simulations to show empty placeholder when count is 0
old_simulations_map_start = """              <div className="space-y-4">
                {[
                  {"""

# To insert condition safely
new_simulations_map_start = """              <div className="space-y-4">
                {stats.simulation_count === 0 ? (
                  <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                    <Zap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="font-bold text-gray-800 mb-1">No Simulations Yet</p>
                    <p className="text-xs text-gray-500 mb-4">Start a simulation to see predictions and insights.</p>
                    <button onClick={() => navigate('/simulation-intro')} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-xs shadow-md">
                      Start First Simulation
                    </button>
                  </div>
                ) : (
                [
                  {"""

old_simulations_map_end = """                  </WebCard>
                ))}
              </div>"""

new_simulations_map_end = """                  </WebCard>
                ))}
                )}
              </div>"""

if old_simulations_map_start in content:
    content = content.replace(old_simulations_map_start, new_simulations_map_start)
    print("Map start replaced")

# Make sure we insert ending closing bracket correctly right after map ends
# Let's find end block where `}))` is before `</div>`
# content.replace is safer if exact. 
# Let's look at the mapping block carefully.
# lines 329-331 was:
# 329:                 ].map((sim, i) => (
# 330:                   <WebCard key={i} ...
# ...
# Wait, and ends with `</WebCard>` and `))}`.
# Let's write script to find the exact position or split lines to append `)` safely.

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Pre-update Success")
# Now we'll do the split lines method to solve the end tag safely so it parses.
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(len(lines)):
    if "].map((sim, i) => (" in lines[i]:
        # find the end of the map
        for j in range(i, len(lines)):
            if "               </WebCard>" in lines[j] and "                ))}" in lines[j+1]:
                 print(f"Found end at line {j+1}")
                 # insert the closing parenthesis `)` for the condition `{stats... ? (...) : (...)}`
                 # Lines list: j+1 contains `                ))}`
                 # We need to insert `                )}` inside or before `</div>`
                 # The end structure is usually:
                 # lines[j+1]: `                ))}`
                 # lines[j+2]: `              </div>`
                 lines[j+1] = "                ))}\n                )\n"
                 break

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Done")
