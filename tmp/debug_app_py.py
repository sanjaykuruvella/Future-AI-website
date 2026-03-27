filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\backend\app.py"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

if "@app.route('/compare_futures" in content:
    print("FOUND AT INDEX:", content.index("@app.route('/compare_futures"))
    print("SUBSTRING:", content[content.index("@app.route('/compare_futures"):content.index("@app.route('/compare_futures")+100])
else:
    print("NOT FOUND AT ALL IN FILE")
