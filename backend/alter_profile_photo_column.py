import MySQLdb

try:
    db = MySQLdb.connect(host="localhost", user="root", passwd="", db="futureai")
    cursor = db.cursor()

    # Alter the profile_photo column to TEXT to handle large base64 images
    cursor.execute("""
    ALTER TABLE users MODIFY COLUMN profile_photo LONGTEXT;
    """)

    db.commit()
    print("Profile photo column altered to LONGTEXT successfully")
    db.close()
except Exception as e:
    print(f"Error: {e}")
