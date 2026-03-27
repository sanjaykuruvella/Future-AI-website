import socket

def test_port(host, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(5)
    try:
        s.connect((host, port))
        print(f"SUCCESS: Connection to {host}:{port} was successful!")
        s.close()
    except Exception as e:
        print(f"FAILURE: Cannot connect to {host}:{port}")
        print(f"Error: {e}")

print("Testing Port 587 (TLS)...")
test_port("smtp.gmail.com", 587)

print("Testing Port 465 (SSL)...")
test_port("smtp.gmail.com", 465)
