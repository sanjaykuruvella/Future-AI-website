import requests

url = "http://127.0.0.1:5000/chat_assistant"

try:
    # Test chat Assistant trigger
    r = requests.post(url, json={"user_id": 1, "message": "hello helper"}, timeout=5)
    print("Response Status:", r.status_code)
    print("Response JSON:", r.text)
except Exception as e:
    print("Error:", e)
