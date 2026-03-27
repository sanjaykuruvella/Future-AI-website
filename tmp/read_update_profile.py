import os

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\backend\app.py"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "update_profile" in line:
        print(f"--- Line {i+1} ---")
        for j in range(max(0, i-2), min(len(lines), i+30)):
            print(f"{j+1}: {lines[j]}", end="")
        print("\n----------------")
