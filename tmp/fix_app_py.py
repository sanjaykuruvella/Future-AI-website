import os

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\backend\app.py"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the register endpoint and update validation
for i in range(len(lines)):
    if "if not is_valid_email(email):" in lines[i]:
        print(f"Found match on line {i+1}")
        
        # Replace lines 99-103
        # lines[i-3] to lines[i] contain the old checks
        # lines[i-3] is "if not email:"
        # lines[i-2] is "return ..."
        # lines[i-1] is blank
        # lines[i] is "if not is_valid_email(email):"
        # lines[i+1] is "return ..."
        
        # Update the block
        lines[i-3] = """        if not name or not email or not password:
            return jsonify({"message": "Please fill in all fields"}), 400

        email_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        if not re.match(email_pattern, email.strip()):
            return jsonify({"message": "Enter a valid email address"}), 400
"""
        # Clear out the old lines to match structure
        lines[i-2] = ""
        lines[i-1] = ""
        lines[i] = ""
        lines[i+1] = ""
        break

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Success")
