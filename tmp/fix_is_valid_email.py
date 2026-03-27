import os

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\backend\app.py"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(len(lines)):
    if "def is_valid_email(email):" in lines[i]:
        print(f"Found function definition on line {i+1}")
        
        # Replace the function body
        lines[i+1] = "    if not email:\n"
        lines[i+2] = "        return False\n"
        lines[i+3] = "    email_pattern = r\"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\"\n"
        lines[i+4] = "    return bool(re.match(email_pattern, email.strip()))\n"
        
        # Clear out original lines
        lines[i+5] = "" # Originally contained return False
        break

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Success")
