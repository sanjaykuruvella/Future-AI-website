filepath = r"c:\xampp\htdocs\FUTURE AI WEBSITE\backend\app.py"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

endpoints_code = """
@app.route('/compare_futures/<int:user_id>', methods=['GET'])
def get_compare_futures(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            "SELECT * FROM predictions WHERE user_id=%s ORDER BY created_at DESC LIMIT 2",
            (user_id,)
        )
        preds = cursor.fetchall()
        cursor.close()

        if len(preds) == 0:
            return jsonify({
                "optionA": "Optimized Path", "optionB": "Baseline",
                "scoreA": 0, "scoreB": 0, "rows": []
            })
        
        p1 = preds[0]
        p2 = preds[1] if len(preds) > 1 else {
            "decision_input": "Historical Baseline Setup",
            "success_probability": 55.0,
            "financial_impact": 40.0,
            "life_satisfaction": 50.0
        }

        diff_prob = p1['success_probability'] - p2['success_probability']
        diff_fin = p1['financial_impact'] - p2['financial_impact']
        diff_sat = p1['life_satisfaction'] - p2['life_satisfaction']

        rows = [
            {
                "metric": "Success Probability",
                "a": round(p1['success_probability'], 1),
                "b": round(p2['success_probability'], 1),
                "diff": f"+{round(diff_prob,1)}%" if diff_prob >= 0 else f"{round(diff_prob,1)}%"
            },
            {
                "metric": "Financial impact Rate",
                "a": round(p1['financial_impact'], 1),
                "b": round(p2['financial_impact'], 1),
                "diff": f"+{round(diff_fin,1)}K" if diff_fin >= 0 else f"{round(diff_fin,1)}K"
            },
            {
                "metric": "Life Satisfaction Factor",
                "a": round(p1['life_satisfaction'], 1),
                "b": round(p2['life_satisfaction'], 1),
                "diff": f"+{round(diff_sat,1)}% change" if diff_sat >= 0 else f"{round(diff_sat,1)}% change"
            }
        ]

        return jsonify({
            "optionA": p1['decision_input'].split(':')[0] if ':' in p1['decision_input'] else p1['decision_input'],
            "optionB": p2['decision_input'].split(':')[0] if ':' in p2['decision_input'] else p2['decision_input'],
            "scoreA": round(p1['success_probability'], 1),
            "scoreB": round(p2['success_probability'], 1),
            "rows": rows
        })

    except Exception as e:
        print("COMPARE FUTURES GET ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/alternate_scenarios/<int:user_id>', methods=['GET'])
def get_alternate_scenarios(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            "SELECT * FROM predictions WHERE user_id=%s ORDER BY created_at DESC LIMIT 1",
            (user_id,)
        )
        preds = cursor.fetchall()
        cursor.close()

        if len(preds) == 0:
            return jsonify([])

        p1 = preds[0]
        import random

        alternates = [
            {
                "id": 1,
                "title": f"High Effort Outcome for {p1['decision_input'].split(':')[-1].strip() if ':' in p1['decision_input'] else 'Path'}",
                "success_probability": min(p1['success_probability'] + random.uniform(5.0, 12.0), 98.0),
                "timeline": "3-6 months",
                "financial_impact": p1['financial_impact'] + random.uniform(5.0, 15.0),
                "life_satisfaction": p1['life_satisfaction'] + random.uniform(-5.0, 5.0),
                "description": "Short timelines intensive effort optimal node."
            },
            {
                "id": 2,
                "title": f"Conservative Risk Setup for {p1['decision_input'].split(':')[-1].strip() if ':' in p1['decision_input'] else 'Path'}",
                "success_probability": max(p1['success_probability'] - random.uniform(2.0, 8.0), 40.0),
                "timeline": "6-12 months",
                "financial_impact": p1['financial_impact'] - random.uniform(2.0, 8.0),
                "life_satisfaction": p1['life_satisfaction'] + random.uniform(5.0, 10.0),
                "description": "Lower risk higher balance node metrics setup."
            }
        ]
        return jsonify(alternates)

    except Exception as e:
        print("ALTERNATE SCENARIOS GET ERROR:", e)
        return jsonify({"error": str(e)}), 500
"""

pivot = "@app.route('/chat_assistant', methods=['POST'])"
if "@app.route('/compare_futures" not in content:
    if pivot in content:
        index = content.index(pivot)
        content = content[:index] + endpoints_code + "\n" + content[index:]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Backend endpoints comparison appended perfectly.")
    else:
        print("Pivot not found rigorously.")
else:
    print("Backend endpoints already appended.")
