import os

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\src\screens\home\HomeDashboardWeb.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# The incorrect structure
old_block = """                ))}
                )"""

new_block = """                ))
                )}"""

if old_block in content:
    content = content.replace(old_block, new_block)
    print("Match 1 Success")
elif old_block.replace("\r\n", "\n") in content.replace("\r\n", "\n"):
    # Split content logic
    lines = content.split("\n")
    for i in range(len(lines)):
        if "                ))}" in lines[i] and "                )" in lines[i+1]:
            print(f"Found error at lines {i+1}-{i+2}")
            lines[i] = "                ))"
            lines[i+1] = "                )}"
            break
    content = "\n".join(lines)
    print("Match 2 Success")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement done")
