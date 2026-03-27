import os

filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\backend\app.py"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find get_home_data function
old_block = """@app.route('/home_data/<int:user_id>', methods=['GET'])
def get_home_data(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            "SELECT success_probability, financial_impact, life_satisfaction FROM predictions WHERE user_id=%s ORDER BY created_at DESC LIMIT 1",
            (user_id,)
        )
        latest = cursor.fetchone()
        
        if not latest:
            cursor.close()
            return jsonify({
                "future_score": 0,
                "trend": "+0 this week",
                "career": 0,
                "finance": 0,
                "balance": 0
            })
            
        future_score = int(float(latest['success_probability'] or 0))
        career_score = future_score
        finance_score = int(float(latest['financial_impact'] or 0))
        balance_score = int(float(latest['life_satisfaction'] or 0))"""

# We can find standard strings
new_block = """@app.route('/home_data/<int:user_id>', methods=['GET'])
def get_home_data(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        
        # Get Stats Counts
        cursor.execute("SELECT COUNT(*) as count FROM goals WHERE user_id=%s", (user_id,))
        active_goals = cursor.fetchone()['count']
        
        cursor.execute("SELECT COUNT(*) as count FROM simulations WHERE user_id=%s", (user_id,))
        simulation_count = cursor.fetchone()['count']
        
        cursor.execute("SELECT COUNT(*) as count FROM journal WHERE user_id=%s", (user_id,))
        ai_insights = cursor.fetchone()['count']

        cursor.execute(
            "SELECT success_probability, financial_impact, life_satisfaction FROM predictions WHERE user_id=%s ORDER BY created_at DESC LIMIT 1",
            (user_id,)
        )
        latest = cursor.fetchone()
        
        if not latest:
            cursor.close()
            return jsonify({
                "future_score": 0,
                "trend": "+0 this week",
                "career": 0,
                "finance": 0,
                "balance": 0,
                "active_goals": active_goals,
                "simulation_count": simulation_count,
                "ai_insights": ai_insights
            })
            
        future_score = int(float(latest['success_probability'] or 0))
        career_score = future_score
        finance_score = int(float(latest['financial_impact'] or 0))
        balance_score = int(float(latest['life_satisfaction'] or 0))"""

if old_block.replace("\r\n", "\n") in content.replace("\r\n", "\n"):
    content = content.replace(old_block, new_block)
    print("Replace block match successful")

# We ALSO need to update the final return dict at the bottom of the function to include these three figures.
old_return = """        return jsonify({
            "future_score": future_score,
            "trend": trend,
            "career": career_score,
            "finance": finance_score,
            "balance": balance_score
        })"""

new_return = """        return jsonify({
            "future_score": future_score,
            "trend": trend,
            "career": career_score,
            "finance": finance_score,
            "balance": balance_score,
            "active_goals": active_goals,
            "simulation_count": simulation_count,
            "ai_insights": ai_insights
        })"""

if old_return.replace("\r\n", "\n") in content.replace("\r\n", "\n"):
    content = content.replace(old_return, new_return)
    print("Return block match successful")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
