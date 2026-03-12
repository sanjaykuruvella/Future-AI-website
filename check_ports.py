import urllib.request
import json
import socket

def check_port(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

ports = [80, 3000, 5000, 5173]
results = {}

for port in ports:
    active = check_port(port)
    results[port] = {"active": active}
    if active:
        try:
            with urllib.request.urlopen(f"http://localhost:{port}", timeout=2) as r:
                results[port]["status_code"] = r.getcode()
                results[port]["text_start"] = r.read(100).decode('utf-8', errors='ignore')
        except Exception as e:
            results[port]["error"] = str(e)

print(json.dumps(results, indent=2))
