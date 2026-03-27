import MySQLdb

try:
    db = MySQLdb.connect(host="localhost", user="root", passwd="", db="futureai")
    cursor = db.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS support_tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        subject VARCHAR(255),
        message TEXT,
        category VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    db.commit()
    print("Table support_tickets created successfully")
    db.close()
except Exception as e:
    print(f"Error: {e}")
