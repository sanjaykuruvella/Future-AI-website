import re

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\backend\app.py"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r"@app\.route\((.*?)\)", content)
with open(r"c:\xampp\htdocs\FUTURE AI WEBSITE\tmp\list_routes.txt", 'w', encoding='utf-8') as f:
    for m in matches:
        f.write(m + "\n")

print("Found", len(matches), "routes")
print("Done")
