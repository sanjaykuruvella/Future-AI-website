import MySQLdb

conn = MySQLdb.connect(host='localhost', user='root', passwd='', db='futureai')
cur = conn.cursor(MySQLdb.cursors.DictCursor)
cur.execute('SELECT user_id,email,LENGTH(profile_photo) AS len,SUBSTRING(profile_photo,1,250) AS sample FROM users LIMIT 5')
for r in cur.fetchall():
    print(r)
cur.close()
conn.close()
