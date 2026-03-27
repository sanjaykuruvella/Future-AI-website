filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\backend\app.py"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

index = content.index("@app.route('/compare_futures")
line_num = content[:index].count('\n') + 1
print("FOUND AT LINE:", line_num)
print(content[index:index+1500])
