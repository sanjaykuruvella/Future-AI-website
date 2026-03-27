with open(r"c:\xampp\htdocs\FUTURE AI WEBSITE\backend\app.py", 'r', encoding='utf-8') as f:
    routes = []
    for i, line in enumerate(f):
        if "@app.route" in line:
            routes.append(f"Line {i+1}: {line.strip()}")

with open("routes.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(routes))
print("Done")
