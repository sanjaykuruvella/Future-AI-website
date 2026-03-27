import urllib.request
import json

url = "http://127.0.0.1:5000/chat_assistant"

try:
    data = json.dumps({"user_id": 1, "message": "hello helper"}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    
    with urllib.request.urlopen(req) as response:
        print("Status Code:", response.getcode())
        print("Response:", response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
