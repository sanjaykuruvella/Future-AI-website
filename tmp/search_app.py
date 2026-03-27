with open(r'c:\xampp\htdocs\FUTURE AI WEBSITE\backend\app.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "'/goals" in line or "/goals/" in line:
        print(f"{i+1}: {line.strip()}")
