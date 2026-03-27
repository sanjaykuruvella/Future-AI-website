with open(r'c:\xampp\htdocs\FUTURE AI WEBSITE\backend\app.py', 'r', encoding='utf-8') as f:
    content = f.read()

import re
match = re.search(r"@app\.route\('/goals', methods=\['POST'\]\).*?def\s+\w+\(.*?\):(.*?)@app\.route\(", content, re.DOTALL)

if match:
    print(match.group(1).strip())
else:
    print("Could not find goals snippet body")
