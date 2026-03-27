import os

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\auth\SignUpScreenWeb.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the email input field and add validations
for i in range(len(lines)):
    if 'type="email"' in lines[i] and 'formData.email' in lines[i+1]:
        print(f"Found input field on line {i+1}")
        
        # We need to replace the input line with conditional classes and add message below
        lines[i+3] = "                  className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border ${formData.email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email) ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-900`}\n"
        
        # After input closing tag and div closing tag, insert the info item
        # We find the next </div>
        next_div_idx = -1
        for j in range(i, i+10):
            if "</div>" in lines[j]:
                next_div_idx = j
                break
        
        if next_div_idx != -1:
             lines[next_div_idx] = """              </div>
              {formData.email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email) && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  Please enter a valid email address
                </p>
              )}
"""
        break

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Success")
