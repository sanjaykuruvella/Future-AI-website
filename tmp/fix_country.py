import os

files = [
    r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\simulation\FinanceDecisionScreenWeb.tsx",
    r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\simulation\EducationDecisionScreen.tsx",
    r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\simulation\EducationDecisionScreenWeb.tsx",
    r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\simulation\DecisionSimulationScreenWeb.tsx",
    r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\simulation\CareerDecisionScreenWeb.tsx",
    r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\simulation\CareerDecisionScreen.tsx"
]

for fpath in files:
    if not os.path.exists(fpath):
        print(f"File missing: {fpath}")
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace states
    if 'useState(\'USA\')' in content:
        content = content.replace("useState('USA')", "useState('India')")
        print(f"Replaced USA in {os.path.basename(fpath)}")
        
    if 'country: \'United-States\'' in content:
        content = content.replace("country: 'United-States'", "country: 'India'")
        print(f"Replaced United-States in {os.path.basename(fpath)}")
        
    if 'Country: \'United-States\'' in content:
        content = content.replace("Country: 'United-States'", "Country: 'India'")
        print(f"Replaced Capital Country in {os.path.basename(fpath)}")

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done")
