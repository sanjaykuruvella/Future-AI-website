import MySQLdb

try:
    db = MySQLdb.connect(
        host="localhost",
        user="root",
        passwd="",
        db="futureai"
    )
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM predictions ORDER BY created_at DESC LIMIT 5")
    rows = cursor.fetchall()
    for r in rows:
        print(f"ID: {r['id']}, Decision: {r['decision_input']}, Success: {r['success_probability']}, Financial: {r['financial_impact']}")
    cursor.close()
    db.close()
except Exception as e:
    print("DB Error:", e)
