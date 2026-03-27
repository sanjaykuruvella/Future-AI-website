from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)

print("Testing Port 465 with SSL...")

# Alternate configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'sanjaykuruvella112@gmail.com'
app.config['MAIL_PASSWORD'] = 'uugv cphg exqe lwkz'
app.config['MAIL_DEFAULT_SENDER'] = 'sanjaykuruvella112@gmail.com'

mail = Mail(app)

with app.app_context():
    try:
        msg = Message(
            subject="Test Port 465 Support",
            recipients=[app.config['MAIL_USERNAME']]
        )
        msg.body = "This is a test supports email on port 465."
        mail.send(msg)
        print("SUCCESS: Email sent successfully with SSL (465)!")
    except Exception as e:
        print("FAILURE on SSL (465).")
        print(f"Error: {type(e).__name__} - {str(e)}")
