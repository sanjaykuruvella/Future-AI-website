from flask import Flask, request, jsonify, send_from_directory
from flask_mysqldb import MySQL
from flask_cors import CORS
from email_validator import validate_email, EmailNotValidError
import MySQLdb.cursors
import hashlib
import numpy as np
import joblib
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from flask_mail import Mail, Message
import os
import base64
from itsdangerous import URLSafeTimedSerializer
import random
import re
from urllib.parse import unquote


# ---------------------------------
# APP INITIALIZATION
# ---------------------------------
app = Flask(__name__, static_folder='../dist', static_url_path='/')
app.config['SECRET_KEY'] = 'this_is_secret_key_change_it'
app.config['BASE_URL'] = 'http://180.235.121.253:8142/'  # 👈 Change this if using ngrok
serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
CORS(app)


def normalize_profile_photo(profile_photo):
    """Convert DB photo value to data URL for frontend rendering."""
    if not profile_photo:
        return ""

    if isinstance(profile_photo, bytes):
        profile_photo = profile_photo.decode('utf-8', errors='ignore')

    photo_str = str(profile_photo).strip()
    if not photo_str:
        return ""

    if photo_str.startswith('data:image/'):
        return photo_str

    # Plain base64 stored in DB -> return as JPEG data URL.
    compact_photo = re.sub(r'\s+', '', photo_str)
    if re.fullmatch(r'[A-Za-z0-9+/=]+', compact_photo):
        return f'data:image/jpeg;base64,{compact_photo}'

    return photo_str


def normalize_profile_photo_for_db(profile_photo):
    """Normalize incoming photo for database storage as plain base64."""
    if not profile_photo:
        return None

    if isinstance(profile_photo, bytes):
        profile_photo = profile_photo.decode('utf-8', errors='ignore')

    photo_str = str(profile_photo).strip()
    if not photo_str:
        return None

    if photo_str.startswith('data:image/'):
        # Strip data URI prefix:
        idx = photo_str.find('base64,')
        if idx != -1:
            return photo_str[idx + len('base64,'):]

    # If already base64 string, keep clean form. Otherwise keep as-is if it's URL.
    compact_photo = re.sub(r'\s+', '', photo_str)
    if re.fullmatch(r'[A-Za-z0-9+/=]+', compact_photo):
        return compact_photo

    return photo_str

# Email validation helper (real-world valid emails beyond regex)
def is_valid_email(email):
    if not email:
        return False
    email_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(email_pattern, email.strip()))

# Load chatbot model
try:
    chat_model = SentenceTransformer('all-MiniLM-L6-v2')
    print("Model loaded successfully")
    chat_embeddings = joblib.load("embeddings.pkl")
    chat_data = joblib.load("chat_data.pkl")
    model_loaded = True
except Exception as e:
    print("Model loading failed:", e)
    chat_model = None
    chat_embeddings = None
    chat_data = None
    model_loaded = False

# ---------------------------------
# EMAIL CONFIGURATION (GMAIL)
# ---------------------------------
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

app.config['MAIL_USERNAME'] = 'sanjaykuruvella112@gmail.com'
app.config['MAIL_PASSWORD'] = 'uugvcphgexqelwkz'
app.config['MAIL_DEFAULT_SENDER'] = 'sanjaykuruvella112@gmail.com'

mail = Mail(app)

# ---------------------------------
# DATABASE CONFIG (XAMPP)
# ---------------------------------
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'futureai'
mysql = MySQL(app)

# ---------------------------------
# LOAD MODEL
# ---------------------------------
model = None
try:
    model = joblib.load("future_ai_simulator.pkl")
except FileNotFoundError:
    print("Model file not found. Please train the model using /retrain_model endpoint.")

# ---------------------------------
# HOME ROUTE
# ---------------------------------
@app.route('/')
def home():
    return "FutureAI Backend Running Successfully"

@app.route('/db_status')
def db_status():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT 1")
        cursor.close()
        return jsonify({"status": "Connected", "database": app.config['MYSQL_DB']})
    except Exception as e:
        return jsonify({"status": "Error", "error": str(e)}), 500

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return jsonify({"message": "Please fill in all fields"}), 400

        name_pattern = r"^[a-zA-Z\s]+$"
        if not re.match(name_pattern, name):
            return jsonify({"message": "Full Name must contain only letters and spaces"}), 400

        email_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        if not re.match(email_pattern, email.strip()):
            return jsonify({"message": "Enter a valid email address"}), 400

        cursor = mysql.connection.cursor()

        # check email exists
        cursor.execute("SELECT user_id FROM users WHERE email=%s", (email,))
        if cursor.fetchone():
            cursor.close()
            return jsonify({"message": "Email already exists"}), 400

        # insert user
        cursor.execute(
            "INSERT INTO users(name,email,password,created_at) VALUES(%s,%s,%s,NOW())",
            (name, email, password)
        )

        mysql.connection.commit()   # ⭐ VERY IMPORTANT

        user_id = cursor.lastrowid

        cursor.close()

        return jsonify({
            "status": True,
            "message": "Registration Successful",
            "user": {
                "user_id": user_id,
                "name": name,
                "email": email
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            "SELECT user_id,name,email,password,profile_photo,created_at FROM users WHERE email=%s",
            (email,)
        )

        user = cursor.fetchone()
        cursor.close()

        if not user:
            return jsonify({
                "status": False,
                "message": "Email not found"
            }), 401

        if user["password"] != password:
            return jsonify({
                "status": False,
                "message": "password is invalid"
            }), 401

        # Clear previous chat history for a fresh login session (commented out to preserve sync between devices)
        # delete_cursor = mysql.connection.cursor()
        # delete_cursor.execute("DELETE FROM chat_messages WHERE user_id=%s", (user["user_id"],))
        # mysql.connection.commit()
        # delete_cursor.close()

        user["profile_photo"] = normalize_profile_photo(user.get("profile_photo"))
        user.pop("password")

        return jsonify({
            "status": True,
            "message": "Login Successful",
            "user": user
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------------------------
# UPDATE PROFILE
# ---------------------------------
@app.route('/update_profile/<int:user_id>', methods=['PUT'])
def update_profile(user_id):
    try:
        data = request.get_json() or {}

        name = data.get('name')
        email = data.get('email')
        profile_photo_raw = normalize_profile_photo_for_db(data.get('profile_photo'))

        # Safety cap: do not allow extremely large images to exceed DB constraints.
        if profile_photo_raw and len(profile_photo_raw) > 5 * 1024 * 1024:  # 5MB base64 max
            return jsonify({"status": False, "error": "Profile photo is too large"}), 413

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute("""
            UPDATE users
            SET name=%s,email=%s,profile_photo=%s
            WHERE user_id=%s
        """, (name, email, profile_photo_raw, user_id))

        mysql.connection.commit()

        cursor.execute(
            "SELECT user_id,name,email,profile_photo,created_at FROM users WHERE user_id=%s",
            (user_id,)
        )
        user = cursor.fetchone()
        cursor.close()

        if user:
            user['profile_photo'] = normalize_profile_photo(user.get('profile_photo'))

        return jsonify({
            "status": True,
            "message": "Profile Updated Successfully",
            "user": user,
        })
    except Exception as e:
        print("UPDATE PROFILE ERROR:", str(e))
        return jsonify({"status": False, "error": str(e)}), 500


@app.route('/update-email', methods=['PUT'])
def update_email():
    data = request.get_json() or {}
    email = data.get('email')
    new_email = data.get('new_email')

    if not email or not new_email:
        return jsonify({"error": "Email and new_email are required"}), 400

    if not is_valid_email(email) or not is_valid_email(new_email):
        return jsonify({"error": "Invalid email format"}), 400

    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE users SET email=%s WHERE email=%s", (new_email, email))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Email updated successfully"}), 200


# ---------------------------------
# UPDATE PROFILE PHOTO
# ---------------------------------
@app.route('/update-profile-photo', methods=['POST'])
def update_profile_photo():
    data = request.get_json() or {}

    email = data.get("email")
    profile_photo_raw = normalize_profile_photo_for_db(data.get("profile_photo"))

    if not email:
        return jsonify({"status": "error", "message": "Email is required"}), 400

    if profile_photo_raw and len(profile_photo_raw) > 5 * 1024 * 1024:
        return jsonify({"status": "error", "message": "Profile photo too large"}), 413

    cur = mysql.connection.cursor()

    cur.execute(
        "UPDATE users SET profile_photo=%s WHERE email=%s",
        (profile_photo_raw, email)
    )

    mysql.connection.commit()
    cur.close()

    return jsonify({"status": "success"})


# ---------------------------------
# UPLOAD PROFILE PHOTO
# ---------------------------------
@app.route('/upload-profile-photo', methods=['POST'])
def upload_profile_photo():
    try:
        data = request.json or {}
        email = data.get("email")
        profile_photo_raw = normalize_profile_photo_for_db(data.get("profile_photo"))

        if not email:
            return jsonify({"error": "Email is required"}), 400

        if profile_photo_raw and len(profile_photo_raw) > 5 * 1024 * 1024:
            return jsonify({"error": "Profile photo too large"}), 413

        cursor = mysql.connection.cursor()

        query = "UPDATE users SET profile_photo=%s WHERE email=%s"
        cursor.execute(query, (profile_photo_raw, email))
        mysql.connection.commit()

        return jsonify({
            "status": "success",
            "message": "Profile photo updated successfully"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------------------------
# GET PROFILE PHOTO
# ---------------------------------
@app.route('/get-profile-photo/<email>', methods=['GET'])
def get_profile_photo(email):
    try:
        email = unquote(email)
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        query = "SELECT name,email,profile_photo FROM users WHERE email=%s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        cursor.close()

        if user:
            photo_path = user["profile_photo"]
            # Verify file exists if it's not base64 or empty
            if photo_path and not photo_path.startswith('data:') and '.' in str(photo_path):
                full_path = os.path.join(app.root_path, '..', photo_path)
                if not os.path.exists(full_path):
                    # If file doesn't exist, maybe it's in a different relative path
                    alt_path = os.path.join(app.root_path, photo_path)
                    if not os.path.exists(alt_path):
                        user["profile_photo"] = "" # Reset to empty if file not found
            
            return jsonify({
                "status": "success",
                "name": user["name"],
                "email": user["email"],
                "profile_photo": normalize_profile_photo(user["profile_photo"])
            })
        else:
            return jsonify({
                "status": "success",
                "name": "User",
                "email": email,
                "profile_photo": ""
            }) # Changed from 404 to success with empty photo for stability

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------------------------
# GET PROFILE
# ---------------------------------
@app.route('/get-profile/<email>', methods=['GET'])
def get_profile(email):
    email = unquote(email)

    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cur.execute(
        "SELECT name,email,profile_photo FROM users WHERE email=%s",
        (email,)
    )

    user = cur.fetchone()
    cur.close()

    if user:
        user["profile_photo"] = normalize_profile_photo(user.get("profile_photo"))

    return jsonify(user)


# ---------------------------------
# FORGOT PASSWORD
# ---------------------------------
@app.route('/forgot_password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json() or {}

        email = data.get("email")
        new_password = data.get("new_password")

        if not email or not new_password:
            return jsonify({"error": "Email and new_password are required"}), 400

        if not is_valid_email(email):
            return jsonify({"error": "Invalid email format"}), 400

        cursor = mysql.connection.cursor()

        cursor.execute(
            "UPDATE users SET password=%s WHERE email=%s",
            (new_password, email)
        )

        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Password Updated Successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/forgot-password', methods=['POST'])
def forgot_password_api():
    data = request.get_json() or {}
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    if not is_valid_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    # TODO: send password reset link via email, or integrate with existing forgot_password_email logic
    return jsonify({"message": "Password reset link sent"}), 200


@app.route('/reset-password', methods=['POST'])
def reset_password_api():
    data = request.get_json() or {}
    email = data.get('email')
    new_password = data.get('password')

    if not email or not new_password:
        return jsonify({"error": "Email and password required"}), 400

    if not is_valid_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE users SET password=%s WHERE email=%s", (new_password, email))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Password updated successfully"}), 200


# ---------------------------------
# SEND RESET LINK TO EMAIL
# ---------------------------------
@app.route('/forgot_password_email', methods=['POST'])
def forgot_password_email():
    try:
        data = request.get_json()
        email = data.get("email")

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT name FROM users WHERE email=%s", (email,))
        user = cursor.fetchone()
        cursor.close()

        if not user:
            return jsonify({"status": False, "message": "Email not found"}), 404

        # Generate secure token
        token = serializer.dumps(email, salt='reset-password')

        # 🔗 Reset link (uses app config BASE_URL)
        reset_link = f"{app.config.get('BASE_URL', 'http://180.235.121.253:8142/')}/reset_password/{token}"

        msg = Message(
            subject="Reset Your Password",
            recipients=[email]
        )

        msg.body = f"""
Hello {user['name']},

Click the link below to reset your password:

{reset_link}

This link will expire in 10 minutes.

FutureAI Team
"""

        mail.send(msg)

        return jsonify({
            "status": True,
            "message": "Reset link sent to your email"
        })

    except Exception as e:
        return jsonify({"status": False, "error": str(e)}), 500


# ---------------------------------
# RESET PASSWORD PAGE + UPDATE
# ---------------------------------
@app.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    try:
        if request.method == 'GET':
            return f"""
            <html>
            <body style="text-align:center;margin-top:100px;font-family:sans-serif;">
                <h2>Reset Your Password</h2>
                <form method="POST">
                    <input type="password" name="new_password" placeholder="Enter new password" required
                    style="padding:10px;width:250px;"><br><br>
                    <button type="submit" style="padding:10px 20px;">Reset Password</button>
                </form>
            </body>
            </html>
            """

        # POST → update password
        new_password = request.form.get("new_password")

        email = serializer.loads(token, salt='reset-password', max_age=600)

        cursor = mysql.connection.cursor()
        cursor.execute(
            "UPDATE users SET password=%s WHERE email=%s",
            (new_password, email)
        )
        mysql.connection.commit()
        cursor.close()

        return "<h3>Password updated successfully ✅</h3>"

    except Exception as e:
        return "<h3>Invalid or expired link ❌</h3>"





# ---------------------------------
# SAVE PREDICTION
# ---------------------------------
@app.route('/prediction', methods=['POST'])
def save_prediction():

    data = request.json

    cursor = mysql.connection.cursor()

    cursor.execute("""
        INSERT INTO predictions
        (user_id,input_data,forecast_result,risk_level)
        VALUES(%s,%s,%s,%s)
    """, (
        data['user_id'],
        data['input_data'],
        data['forecast_result'],
        data['risk_level']
    ))

    mysql.connection.commit()
    cursor.close()
    return jsonify({"message": "Prediction Saved"})


# ---------------------------------
# FUTURE PREDICTION ROUTE
# ---------------------------------
@app.route('/predict', methods=['POST'])
def predict():

    data = request.get_json()

    category = data.get("category")
    decision = data.get("decision")   # user decision from frontend

    # AI Better Suggestions
    if category == "career":
        better_option = "Upgrade skills in AI / Data Science and switch to a higher paying role"

    elif category == "finance":
        better_option = "Invest in diversified mutual funds with long term SIP strategy"

    elif category == "education":
        better_option = "Pursue higher education with industry certifications"

    else:
        better_option = "Improve skills and explore better opportunities"

    result = {
        "category": category,
        "success_probability": 85,
        "timeline": "6-12 months",
        "financial_impact": "+₹30K potential growth",
        "life_satisfaction": "+25% improvement",

        "scenarios": [

            # OPTION A → AI Suggested Better Option
            {
                "option": "A",
                "title": "AI Suggested Better Choice",
                "decision": better_option,
                "score": 90
            },

            # OPTION B → User Selected Option
            {
                "option": "B",
                "title": "Your Selected Decision",
                "decision": decision,
                "score": 70
            }

        ]
    }

    return jsonify(result)


# ---------------------------------
# SAVE SIMULATION
# ---------------------------------
@app.route('/save-simulation', methods=['POST'])
def save_simulation():
    try:
        data = request.json

        user_id = data.get("user_id")
        role = data.get("role")
        decision = data.get("decision")
        success_probability = data.get("success_probability", 50)

        cursor = mysql.connection.cursor()

        # safe conversion (handles "57.35" issue)
        try:
            sp = float(success_probability)
        except:
            sp = 50.0

        sql = """
        INSERT INTO simulations (user_id, role, decision, success_probability)
        VALUES (%s, %s, %s, %s)
        """

        cursor.execute(sql, (user_id, role, decision, sp))
        mysql.connection.commit()
        cursor.close()

        return jsonify({
            "status": "success",
            "message": "Simulation saved"
        })

    except Exception as e:
        if 'cursor' in locals() and cursor: cursor.close()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ---------------------------------
# GET LATEST SIMULATION
# ---------------------------------
@app.route('/get-latest/<int:user_id>', methods=['GET'])
def get_latest(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        sql = """
        SELECT * FROM simulations
        WHERE user_id=%s
        ORDER BY id DESC
        LIMIT 1
        """

        cursor.execute(sql, (user_id,))
        result = cursor.fetchone()
        cursor.close()

        return jsonify({
            "status": "success",
            "data": result
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ---------------------------------
# GET TIMELINE (Uses Latest Simulation)
# ---------------------------------
@app.route('/get-timeline/<int:user_id>', methods=['GET'])
def get_timeline_new(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        sql = """
        SELECT success_probability FROM simulations
        WHERE user_id=%s
        ORDER BY id DESC
        LIMIT 1
        """

        cursor.execute(sql, (user_id,))
        last = cursor.fetchone()
        cursor.close()

        # fix decimal issue safely
        try:
            base_score = int(float(last.get('success_probability'))) if last else 50
        except:
            base_score = 50

        timeline = []

        for i in range(1, 7):
            timeline.append({
                "month": i,
                "probability": min(base_score + i * 4, 95)
            })

        return jsonify({
            "status": "success",
            "timeline": timeline
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ---------------------------------
# GET PREDICTION HISTORY (handled below)
# ---------------------------------


# ---------------------------------
# ADD JOURNAL
# ---------------------------------
@app.route('/journal', methods=['POST'])
def add_journal():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        user_id = data.get('user_id')
        entry_text = data.get('entry_text')
        mood = data.get('mood')

        if not user_id or not entry_text:
            return jsonify({"error": "Missing required fields"}), 400

        cursor = mysql.connection.cursor()

        cursor.execute(
            "INSERT INTO journal(user_id,entry_text,mood) VALUES(%s,%s,%s)",
            (user_id, entry_text, mood)
        )

        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Journal Saved", "status": True}), 201
    except Exception as e:
        if 'cursor' in locals() and cursor: cursor.close()
        return jsonify({"error": str(e), "status": False}), 500


# ---------------------------------
# GET JOURNALS
# ---------------------------------
@app.route('/journal/<int:user_id>', methods=['GET'])
def get_journal(user_id):

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        "SELECT * FROM journal WHERE user_id=%s ORDER BY created_at DESC",
        (user_id,)
    )

    journals = cursor.fetchall()
    cursor.close()

    return jsonify(journals)


# ---------------------------------
# UPDATE JOURNAL
# ---------------------------------
@app.route('/journal/<int:journal_id>', methods=['PUT'])
def update_journal(journal_id):

    data = request.json

    cursor = mysql.connection.cursor()

    cursor.execute("""
        UPDATE journal
        SET entry_text=%s,mood=%s
        WHERE journal_id=%s
    """, (data['entry_text'], data['mood'], journal_id))

    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Journal Updated"})


# ---------------------------------
# DELETE JOURNAL
# ---------------------------------
@app.route('/journal/<int:journal_id>', methods=['DELETE'])
def delete_journal(journal_id):
    try:
        cursor = mysql.connection.cursor()

        cursor.execute(
            "DELETE FROM journal WHERE journal_id=%s",
            (journal_id,)
        )

        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Journal Deleted Successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict_future', methods=['POST'])
def predict_future():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        # Features from Adult Dataset for simulation
        # Features from Adult Dataset for simulation
        required_fields = ["Age", "Workclass", "Education", "Education_Number", "Marital_Status", 
                           "Occupation", "Relationship", "Race", "Gender", "Capital_Gain", 
                           "Capital_Loss", "Hours_Per_Week"] # Excluded Country for safe fallback

        # Standardize for feature matrix matching title casing
        for key in list(data.keys()):
            if key.lower() in [f.lower() for f in required_fields] + ["country"]:
                # Title case mapping (e.g. hours_per_week -> Hours_Per_Week)
                mapped_key = key.replace("_", " ").title().replace(" ", "_")
                if mapped_key not in data:
                    data[mapped_key] = data[key]

        # Ensure required fields
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        # Fallback Country
        if "Country" not in data:
            data["Country"] = "India"

        user_id = data.get("user_id", 1)
        
        # Helpers for categorical encoding to match numeric training dataset
        def encode_val(fld, val):
            if isinstance(val, (int, float)): return val
            if str(val).isdigit(): return float(val)
            v = str(val).strip().lower()
            maps = {
                "Workclass": {"private": 1, "self-emp-not-inc": 2, "self-emp-inc": 3, "federal-gov": 4, "local-gov": 5, "state-gov": 6, "without-pay": 7, "never-worked": 8},
                "Education": {"bachelors": 1, "some-college": 2, "11th": 3, "hs-grad": 4, "prof-school": 5, "assoc-acdm": 6, "assoc-voc": 7, "9th": 8, "7th-8th": 9, "12th": 10, "masters": 11, "1st-4th": 12, "10th": 13, "doctorate": 14, "5th-6th": 15, "preschool": 16},
                "Marital_Status": {"married-civ-spouse": 1, "never-married": 2, "divorced": 3, "separated": 4, "widowed": 5, "married-spouse-absent": 6, "married-af-spouse": 7},
                "Occupation": {"tech-support": 1, "craft-repair": 2, "other-service": 3, "sales": 4, "exec-managerial": 5, "prof-specialty": 6, "handlers-cleaners": 7, "machine-op-inspct": 8, "adm-clerical": 9, "farming-fishing": 10, "transport-moving": 11, "priv-house-serv": 12, "protective-serv": 13, "armed-forces": 14},
                "Relationship": {"wife": 1, "own-child": 2, "husband": 3, "not-in-family": 4, "other-relative": 5, "unmarried": 6},
                "Race": {"white": 1, "asian-pac-islander": 2, "amer-indian-eskimo": 3, "other": 4, "black": 5},
                "Gender": {"female": 1, "male": 2},
                "Country": {"united-states": 1, "cambodia": 2, "england": 3, "puerto-rico": 4, "canada": 5, "germany": 6, "india": 8, "japan": 9, "greece": 10}
            }
            if fld in maps:
                return maps[fld].get(v, 1) # Fallback to 1
            return val

        # Prepare for model (exclude target 'Income')
        features = [[
            float(data['Age']),
            encode_val('Workclass', data['Workclass']),
            encode_val('Education', data['Education']),
            float(data['Education_Number']),
            encode_val('Marital_Status', data['Marital_Status']),
            encode_val('Occupation', data['Occupation']),
            encode_val('Relationship', data['Relationship']),
            encode_val('Race', data['Race']),
            encode_val('Gender', data['Gender']),
            float(data['Capital_Gain']),
            float(data['Capital_Loss']),
            float(data['Hours_Per_Week']),
            encode_val('Country', data['Country'])
        ]]

        prediction_val = 0
        model_prob = 0.5
        using_model = False

        if model:
            try:
                # Expecting a classifier (0 or 1)
                pred_result = model.predict(features)[0]
                prediction_val = int(pred_result)
                
                # Fetch exact probability if available
                if hasattr(model, "predict_proba"):
                    model_prob = model.predict_proba(features)[0][1] # Probability of class 1 (Income > 50K)
                else:
                    model_prob = 0.8 if prediction_val == 1 else 0.3
                using_model = True
            except Exception as e:
                print("Model Predict Error:", e)

        # Deterministic scoring using numeric inputs plus the user's written context.
        category = str(data.get("category", "Career")).lower()

        def clamp(value, low, high):
            return max(low, min(high, value))

        def normalize(value, low, high):
            if high == low:
                return 0.5
            return clamp((value - low) / (high - low), 0.0, 1.0)

        def text_hits(text, keywords):
            return sum(1 for word in keywords if word in text)

        age = float(data.get('Age', 30) or 30)
        edu_num = float(data.get('Education_Number', 12) or 12)
        hours = float(data.get('Hours_Per_Week', 40) or 40)
        cap_gain = float(data.get('Capital_Gain', 0) or 0)
        cap_loss = float(data.get('Capital_Loss', 0) or 0)
        risk = float(data.get("risk", 50) or 50)
        timeframe = float(data.get("timeframe", 50) or 50)
        effort = float(data.get("effort", 50) or 50)
        investment = float(data.get("investment", 50) or 50)

        selected_timeline = str(data.get("selected_timeline", "") or "").lower()
        input_text = str(data.get("input_text", "") or "").lower()
        current_situation = str(data.get("current_situation", "") or "").lower()
        desired_outcome = str(data.get("desired_outcome", "") or "").lower()
        combined_text = " ".join([input_text, current_situation, desired_outcome]).strip()

        structured_score = 45.0
        structured_score += normalize(edu_num, 8, 16) * 16.0
        structured_score += normalize(hours, 20, 60) * 8.0
        structured_score += normalize(effort, 10, 100) * 12.0
        structured_score += normalize(investment, 10, 100) * 6.0
        structured_score -= normalize(risk, 10, 100) * 10.0
        structured_score += normalize(cap_gain - cap_loss, -20000, 120000) * 12.0

        if 24 <= age <= 42:
            structured_score += 8.0
        elif 18 <= age <= 50:
            structured_score += 4.0

        occupation = str(data.get('Occupation', '')).lower()
        if occupation in ['exec-managerial', 'prof-specialty', 'tech-support', 'sales']:
            structured_score += 6.0

        category_positive = {
            "career": ["promotion", "switch", "career", "job", "salary", "leadership", "manager", "skills", "transition"],
            "finance": ["invest", "saving", "savings", "loan", "property", "returns", "profit", "fund", "equity", "market"],
            "education": ["course", "degree", "study", "learn", "certification", "college", "exam", "masters", "training"],
        }
        category_negative = {
            "career": ["burnout", "quit", "layoff", "stress", "stuck"],
            "finance": ["debt", "loss", "volatile", "crash", "liability"],
            "education": ["dropout", "delay", "expensive", "uncertain", "fail"],
        }

        positive_hits = text_hits(combined_text, category_positive.get(category, []))
        negative_hits = text_hits(combined_text, category_negative.get(category, []))
        general_positive_hits = text_hits(combined_text, ["growth", "improve", "stable", "plan", "goal", "better", "opportunity"])
        general_negative_hits = text_hits(combined_text, ["risk", "problem", "stress", "conflict", "loss", "fear"])

        specificity_bonus = 0.0
        if len(combined_text) >= 40:
            specificity_bonus += 4.0
        if any(ch.isdigit() for ch in combined_text):
            specificity_bonus += 3.0
        if desired_outcome:
            specificity_bonus += 3.0
        if current_situation:
            specificity_bonus += 2.0

        text_score = 48.0 + (positive_hits * 4.0) + (general_positive_hits * 2.0) - (negative_hits * 4.5) - (general_negative_hits * 1.5) + specificity_bonus
        text_score = clamp(text_score, 25.0, 90.0)

        if selected_timeline in ["3months", "6months"]:
            timeframe = 30
        elif selected_timeline in ["1year", "2years"]:
            timeframe = 55
        elif selected_timeline in ["5years", "10years"]:
            timeframe = 75

        readiness_score = 50.0 + ((effort - 50) * 0.22) + ((investment - 50) * 0.10) - ((risk - 50) * 0.18) - ((timeframe - 50) * 0.08)
        readiness_score = clamp(readiness_score, 20.0, 88.0)

        if using_model:
            model_score = clamp(model_prob * 100.0, 20.0, 95.0)
            success_prob = (model_score * 0.35) + (structured_score * 0.40) + (text_score * 0.15) + (readiness_score * 0.10)
        else:
            success_prob = (structured_score * 0.50) + (text_score * 0.30) + (readiness_score * 0.20)

        success_prob = round(clamp(success_prob, 15.0, 96.0), 2)

        fin_impact = 30.0 + (success_prob * 0.35) + normalize(cap_gain - cap_loss, -20000, 120000) * 28.0 + ((investment - 50) * 0.18) - ((risk - 50) * 0.12)
        if category == "finance":
            fin_impact += 8.0
        fin_impact = round(clamp(fin_impact, 5.0, 100.0), 2)

        life_sat = 35.0 + (success_prob * 0.30) + normalize(edu_num, 8, 16) * 12.0 + ((effort - 50) * 0.20) - ((hours - 45) * 0.22) - ((risk - 50) * 0.10)
        if category == "education":
            life_sat += 6.0
        life_sat = round(clamp(life_sat, 5.0, 100.0), 2)

        if selected_timeline == "3months":
            timeline = "1-3 months"
        elif selected_timeline == "6months":
            timeline = "3-6 months"
        elif selected_timeline == "1year":
            timeline = "6-12 months"
        elif selected_timeline == "2years":
            timeline = "12-24 months"
        elif selected_timeline in ["5years", "10years"]:
            timeline = "24+ months"
        elif effort > 70 and risk < 45:
            timeline = "3-6 months"
        elif success_prob >= 70:
            timeline = "6-12 months"
        elif success_prob >= 50:
            timeline = "12-18 months"
        else:
            timeline = "18-24 months"

        alt_scenario = 85.0 - success_prob + ((risk - 50) * 0.5)
        alt_scenario = min(max(alt_scenario, 5.0), 100.0)

        future_comp = (success_prob * 0.5) + (fin_impact * 0.25) + (life_sat * 0.25)
        future_comp = min(max(future_comp, 5.0), 100.0)

        # Save to DB
        cursor = mysql.connection.cursor()
        try:
            category = data.get("category", "Career")
            raw_input = data.get("input_text", "")
            decision_val = f"{category}: {raw_input}" if raw_input else f"{category} Simulation"
            cursor.execute("""
                INSERT INTO predictions(
                    user_id, decision_input, success_probability, timeline, 
                    financial_impact, life_satisfaction, alternative_scenario, future_comparison
                )
                VALUES(%s,%s,%s,%s,%s,%s,%s,%s)
            """, (
                user_id, decision_val, success_prob, timeline,
                fin_impact, life_sat, alt_scenario, future_comp
            ))
            
            # Backward compatibility sync with simulations table for dashboard streams
            cursor.execute("""
                INSERT INTO simulations (user_id, role, decision, success_probability)
                VALUES (%s, %s, %s, %s)
            """, (user_id, category, decision_val, success_prob))

            mysql.connection.commit()
            cursor.close()
        except Exception as db_err:
            print("DB SAVE ERROR:", db_err)
            cursor.close()
            return jsonify({"error": "Failed to save to database", "details": str(db_err)}), 500

        return jsonify({
            "message": "Prediction Success",
            "success_probability": success_prob,
            "timeline": timeline,
            "financial_impact": round(fin_impact, 2),
            "life_satisfaction": round(life_sat, 2),
            "alternative_scenario": round(max(alt_scenario, 0), 2),
            "future_comparison": round(future_comp, 2)
        }), 200

    except Exception as e:
        print("PREDICT ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/predictions/<int:user_id>', methods=['GET'])
def get_predictions_history(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            "SELECT * FROM predictions WHERE user_id=%s ORDER BY created_at DESC",
            (user_id,)
        )
        predictions = cursor.fetchall()
        cursor.close()

        return jsonify(predictions)
    except Exception as e:
        print("PREDICTIONS HISTORY GET ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/chat_assistant', methods=['POST'])
def chat_assistant():
    try:
        data = request.get_json()
        user_id = data.get("user_id", 1)
        raw_message = (data.get("message", "") or "").strip()
        user_msg = raw_message.lower()

        if not raw_message:
            return jsonify({"reply": "Please enter a clear message so I can respond properly."}), 400

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM predictions WHERE user_id=%s ORDER BY created_at DESC LIMIT 1", (user_id,))
        last_prediction = cursor.fetchone()
        cursor.close()

        context_data = {}
        if last_prediction:
            context_data = {
                "prob": last_prediction.get('success_probability', 'N/A'),
                "sat": last_prediction.get('life_satisfaction', 'N/A'),
                "impact": last_prediction.get('financial_impact', 'N/A'),
                "timeline": last_prediction.get('timeline', 'N/A'),
                "comp": last_prediction.get('future_comparison', 'N/A')
            }

        def build_context_summary():
            if not context_data:
                return ""
            return (
                f"\n\nLatest prediction context:"
                f"\n- Success probability: {context_data['prob']}%"
                f"\n- Timeline: {context_data['timeline']}"
                f"\n- Financial impact: {context_data['impact']}"
                f"\n- Life satisfaction: {context_data['sat']}"
            )

        def detect_topic(message_text):
            topic_keywords = {
                "career": ["career", "job", "work", "office", "engineer", "manager", "promotion", "switch", "role"],
                "finance": ["money", "finance", "investment", "rich", "salary", "pay", "wealth", "saving", "budget"],
                "education": ["education", "study", "degree", "college", "school", "learn", "course", "skill", "exam"],
                "prediction": ["predict", "future", "outcome", "happen", "result", "probability", "chance"],
                "ethics": ["right", "ethic", "rule", "law", "policy", "integrity", "privacy", "safe"],
            }
            for topic, keywords in topic_keywords.items():
                if any(word in message_text for word in keywords):
                    return topic
            return "general"

        def build_keyword_reply(topic):
            if topic == "career":
                reply_text = (
                    f"I understand you are asking about: \"{raw_message}\"."
                    f"\n\nFor a career decision, focus on:"
                    f"\n- The exact role you want"
                    f"\n- The skills you already have"
                    f"\n- The missing skills or experience"
                    f"\n- Salary, growth, and timeline"
                    f"\n- Whether the move improves long-term satisfaction"
                )
                if context_data:
                    reply_text += (
                        f"\n\nYour latest result shows {context_data['prob']}% success over {context_data['timeline']},"
                        f" so the best next step is improving the factor most affecting that result."
                    )
                return reply_text + "\n\nSend me the exact career move you are considering, and I will analyze it clearly."

            if topic == "finance":
                reply_text = (
                    f"I understand you are asking about: \"{raw_message}\"."
                    f"\n\nFor a finance decision, I would look at:"
                    f"\n- Risk level"
                    f"\n- Expected return"
                    f"\n- Time horizon"
                    f"\n- Cash flow impact"
                    f"\n- Worst-case downside"
                )
                if context_data:
                    reply_text += (
                        f"\n\nYour latest prediction shows {context_data['impact']} across {context_data['timeline']},"
                        f" so steady planning may matter more than quick gains."
                    )
                return reply_text + "\n\nTell me the exact money decision, and I will compare the likely benefits and risks."

            if topic == "education":
                reply_text = (
                    f"I understand you are asking about: \"{raw_message}\"."
                    f"\n\nFor an education choice, the main factors are:"
                    f"\n- What skill or qualification you want"
                    f"\n- How long it will take"
                    f"\n- The total cost"
                    f"\n- The return in career growth or income"
                    f"\n- Whether it fits your current schedule"
                )
                if context_data:
                    reply_text += (
                        f"\n\nYour current timeline suggests this could fit within {context_data['timeline']}"
                        f" if the plan is focused and practical."
                    )
                return reply_text + "\n\nTell me the course, degree, or skill you want to evaluate, and I will break it down."

            if topic == "prediction":
                if context_data:
                    return (
                        f"I understand you want clarity about: \"{raw_message}\"."
                        f"\n\nHere is what your latest prediction says:"
                        f"\n- Success probability: {context_data['prob']}%"
                        f"\n- Timeline: {context_data['timeline']}"
                        f"\n- Financial impact: {context_data['impact']}"
                        f"\n- Life satisfaction: {context_data['sat']}"
                        f"\n\nIf you want, send the exact decision and I will explain what these results mean."
                    )
                return (
                    f"I understand you want a prediction for: \"{raw_message}\"."
                    f"\n\nI do not see a recent simulation for your account yet."
                    f" Run a prediction first, and then I can explain the result properly."
                )

            if topic == "ethics":
                return (
                    f"I understand you are asking about: \"{raw_message}\"."
                    f"\n\nFutureAI should be clear, fair, private, and safe."
                    f" That means protecting your data, reducing bias, and giving you understandable results rather than confusing output."
                    f"\n\nIf you want, I can explain one of those parts in more detail."
                )

            return (
                f"I understand your message: \"{raw_message}\"."
                f"\n\nTo give you a better answer, I need the exact decision or problem you want analyzed."
                f"\n\nFor example, you can ask:"
                f"\n- Should I switch from my current job to a new role?"
                f"\n- Is this investment a good idea?"
                f"\n- Is this course worth it for my future?"
                f"{build_context_summary()}"
            )

        reply = None
        best_score = 0
        best_idx = -1
        if model_loaded:
            try:
                user_vec = chat_model.encode([user_msg])
                scores = cosine_similarity(user_vec, chat_embeddings)[0]
                best_idx = int(np.argmax(scores))
                best_score = scores[best_idx]
            except Exception as model_err:
                print("Semantic Search Model Error:", model_err)

        if best_score > 0.65:
            semantic_reply = str(chat_data.iloc[best_idx]["response"]).strip()
            reply = (
                f"I understand your message: \"{raw_message}\"."
                f"\n\nHere is the most relevant answer I found:"
                f"\n{semantic_reply}"
            )
            if context_data:
                reply += build_context_summary()
        else:
            reply = build_keyword_reply(detect_topic(user_msg))

        cursor = mysql.connection.cursor()
        try:
            cursor.execute(
                "INSERT INTO chat_messages (user_id, sender, message) VALUES (%s, %s, %s)",
                (user_id, 'user', data.get("message", ""))
            )
            cursor.execute(
                "INSERT INTO chat_messages (user_id, sender, message) VALUES (%s, %s, %s)",
                (user_id, 'ai', reply)
            )
            mysql.connection.commit()
            cursor.close()
        except Exception as db_err:
            print("CHAT DB SAVE ERROR:", db_err)
            if 'cursor' in locals():
                cursor.close()

        return jsonify({"reply": reply})

        # Try to get user's latest prediction to contextualize response
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM predictions WHERE user_id=%s ORDER BY created_at DESC LIMIT 1", (user_id,))
        last_prediction = cursor.fetchone()
        cursor.close()

        prediction_context = ""
        context_data = {}
        if last_prediction:
            context_data = {
                "prob": last_prediction['success_probability'],
                "sat": last_prediction['life_satisfaction'],
                "impact": last_prediction['financial_impact'],
                "timeline": last_prediction['timeline'],
                "comp": last_prediction['future_comparison']
            }
            prediction_context = f" With a {context_data['prob']}% success probability and a {context_data['timeline']} timeline,"

        # AI generating response based on trained AI model or keywords
        reply = None
        
        # 1. Try Trained AI Model (Semantic Search) First
        best_score = 0
        best_idx = -1
        if model_loaded:
            try:
                user_vec = chat_model.encode([user_msg])
                scores = cosine_similarity(user_vec, chat_embeddings)[0]
                best_idx = int(np.argmax(scores))
                best_score = scores[best_idx]
            except Exception as model_err:
                print("Semantic Search Model Error:", model_err)

        # High confidence match from trained dataset triggers response
        if best_score > 0.65:
            reply = chat_data.iloc[best_idx]["response"]
        
        else:
            replies = []
            if any(w in user_msg for w in ["predict", "future", "outcome", "happen"]):
                if last_prediction:
                    replies = [
                        f"My analysis shows {context_data['prob']}% probability of success.{prediction_context} things look optimistic if you maintain your current effort.",
                        f"The future looks dynamic!{prediction_context} Your life satisfaction score of {context_data['sat']} suggests this is a high-value path for you.",
                        f"Based on the AI model, your financial impact ({context_data['impact']}) is a strong driver. How do you feel about the {context_data['timeline']} timeline?"
                    ]
                else:
                    replies = ["I need more data! Please use the Future Predictor so I can analyze your specific situation.", "Run a simulation first, and I'll be able to tell you exactly how your future looks!"]
            
            elif any(w in user_msg for w in ["career", "job", "work", "office", "engineer", "manager"]):
                replies = [
                    f"Career growth is looking solid.{prediction_context} I recommend investing in new technical skills to push that satisfaction score higher than {context_data.get('sat', 'current levels')}.",
                    f"Your work profile shows potential for a {context_data.get('impact', 'significant')} financial impact. Are you satisfied with a {context_data.get('timeline', '9-12 month')} growth period?",
                    "The current job market favors specialists. Have you considered how increasing your weekly hours might change your outcome?",
                    f"Based on your data, exploring leadership roles or lateral moves could significantly boost your future comparison score of {context_data.get('comp', 'solid levels')}.",
                    "Networking is key. Connecting with mentors in your desired field can reduce the expected timeline and improve your overall success probability."
                ]
            
            elif any(w in user_msg for w in ["money", "finance", "investment", "rich", "salary", "pay", "wealth"]):
                replies = [
                    f"Financially, this path yields a score of {context_data.get('impact', '70')}.{prediction_context} Small adjustments in your risk levels could shift this drastically.",
                    f"Wealth building takes time. Your projected future comparison is {context_data.get('comp', '80')} points above baseline! That's impressive.",
                    "To maximize your financial impact, we should look at balancing your capital gains vs losses in the simulator.",
                    "Have you considered diversifying your portfolio? A balanced mix of conservative and aggressive assets often yields the best long-term stability.",
                    f"Your current trajectory suggests a {context_data.get('timeline', 'positive')} timeline for reaching significant financial milestones. Stay consistent with your savings!"
                ]

            elif any(w in user_msg for w in ["education", "study", "degree", "college", "school", "learn", "course", "skill"]):
                replies = [
                    f"Furthering your education almost always correlates with higher life satisfaction.{prediction_context} Are you considering a specific certification?",
                    "Taking on a new course could delay immediate earnings, but drastically increase your long-term success probability. It's a trade-off worth simulating.",
                    f"With a timeline of {context_data.get('timeline', '1-2 years')}, integrating part-time studies into your schedule is highly feasible.",
                    "Upskilling is the best way to future-proof your career. Online certifications are heavily valued in today's tech-driven market.",
                    "I recommend focusing on specialized skills rather than general degrees. It usually provides a much faster and noticeable financial impact."
                ]

            elif any(w in user_msg for w in ["right", "ethic", "rule", "law", "policy", "integrity"]):
                replies = [
                    "AI ethics is our priority. FutureAI is designed flat and bias-controlled, keeping simulated workspace outputs objective.",
                    "We respect data safety. Algorithms avoid manipulative trends. Your privacy framework details are in Settings > Privacy & Policy.",
                    "AI rights concern user control over predictive context. You decide what metrics to stress test and manage.",
                    "Ethical considerations ensure our trajectory mapping is conservative yet motivational, rather than overly speculative.",
                    "Your personal scenarios are confidential. Model weights are trained solely on broad public demographic vectors to ensure fairness."
                ]

            elif any(w in user_msg for w in ["hello", "hi", "hey", "help"]):
                replies = [
                    "Hello! I'm your FutureAI assistant. I can help you interpret your simulation results or guide your next career move.",
                    "Hey there! Ready to optimize your future? Ask me about your latest prediction or career paths.",
                    "Hi! I've been analyzing your data. We have some interesting trends to discuss!",
                    "Greetings! I'm here to provide actionable insights about your future. What category should we explore today?",
                    "Hello! Whether it's career, finance, or education, I'm ready to assist you."
                ]

            # Moderate confidence Semantic Search match fallback
            if not replies and best_score > 0.4:
                reply = chat_data.iloc[best_idx]["response"]

            if not reply and replies:
                reply = random.choice(replies)

            # Absolute final fallback if both model & keywords fail
            if not reply:
                if last_prediction:
                    reply = random.choice([
                        f"Interesting point!{prediction_context} I'm also seeing a {context_data['comp']} future comparison score. What do you think about this timeline?",
                        f"I've considered that.{prediction_context} The AI model suggests your life satisfaction ({context_data['sat']}) is the most important variable here.",
                        "That's a unique perspective. Let's look at how we can improve your success probability above the current level."
                    ])
                else:
                    reply = random.choice([
                        "That's a great question! I'd love to give you a specific answer—try running a Future Prediction first so I have your data.",
                        "Our goal is to use AI to navigate these complex life decisions. What specific part of your life should we simulate next?"
                    ])

        # Ensure chat reply references user input for clarity
        if raw_message:
            if "i understood" not in reply.lower() and "based on your" not in reply.lower():
                reply = f"Based on your message: \"{raw_message}\", {reply[0].lower() + reply[1:] if reply else ''}"

        # Save to DB
        cursor = mysql.connection.cursor()
        try:
            # Save User Message
            cursor.execute(
                "INSERT INTO chat_messages (user_id, sender, message) VALUES (%s, %s, %s)",
                (user_id, 'user', data.get("message", ""))
            )
            # Save AI Reply
            cursor.execute(
                "INSERT INTO chat_messages (user_id, sender, message) VALUES (%s, %s, %s)",
                (user_id, 'ai', reply)
            )
            mysql.connection.commit()
            cursor.close()
        except Exception as db_err:
            print("CHAT DB SAVE ERROR:", db_err)
            if 'cursor' in locals(): cursor.close()

        return jsonify({"reply": reply})

    except Exception as e:
        import traceback
        print("\n=== CHAT ASSISTANT EXCEPTION TRACEBACK ===")
        traceback.print_exc()
        raise e


@app.route('/chat_support', methods=['POST'])
def chat_support():
    try:
        data = request.get_json()
        user_msg = data.get("message", "").lower()
        
        # Support-focused trained responses
        if any(w in user_msg for w in ["password", "login", "locked", "signin"]):
            reply = "To reset your password, go to the Login screen and tap 'Forgot Password'. We'll send a recovery email to your registered address."
        elif any(w in user_msg for w in ["photo", "avatar", "picture", "profile"]):
            reply = "You can update your profile photo from the 'Edit Profile' section. Just tap on your current avatar to upload a new one!"
        elif any(w in user_msg for w in ["delete", "remove", "account", "history"]):
            reply = "You can manage your data and delete simulation history from Settings > Privacy & Policy. Be careful, this action cannot be undone."
        elif any(w in user_msg for w in ["accurate", "correct", "wrong", "true", "prediction"]):
            reply = "Our AI uses probabilistic models based on your input. Accuracy improves as you provide more details through journaling and goal setting."
        elif any(w in user_msg for w in ["help", "human", "contact", "support", "call", "email"]):
            reply = "I'm your AI support assistant! If I can't help, you can email us at support@futureai.com or use the 'Contact Support' button in the Help Center."
        elif any(w in user_msg for w in ["slow", "bug", "error", "working", "crash"]):
            reply = "We're sorry to hear that. Please try clearing the app cache or restarting. If the issue persists, let us know the exact error message."
        elif any(w in user_msg for w in ["goal", "target", "career", "finance"]):
            reply = "You can explore career and finance simulations using the Future Predictor. Our AI will help analyze different scenarios for you."
        elif any(w in user_msg for w in ["right", "ethic", "rule", "law", "policy", "integrity"]):
            reply = "We prioritse AI ethics and user safety. FutureAI ensures predictive models remain secure, objective, and unbiased."
        elif any(w in user_msg for w in ["hello", "hi", "hey"]):
            reply = "Hello! I'm the FutureAI Support Assistant. How can I help you with the app today?"
        else:
            # Semantic search fallback
            try:
                user_vec = chat_model.encode([user_msg])
                scores = cosine_similarity(user_vec, chat_embeddings)[0]
                best_idx = int(np.argmax(scores))
                
                if scores[best_idx] > 0.6: # High confidence match
                    reply = chat_data.iloc[best_idx]["response"]
                elif scores[best_idx] > 0.4: # Moderate confidence, reframe correctly
                    reply = f"Based on our general knowledge: " + chat_data.iloc[best_idx]["response"]
                else:
                    reply = "That's an interesting question! While I focus on app support, you might find specific insights by running a new Future Simulation."
            except Exception as model_err:
                print("Support chat model error:", model_err)
                reply = "I'm here to help with any app-related questions! Could you please clarify your request?"

        return jsonify({"reply": reply})

    except Exception as e:
        print("SUPPORT CHAT ERROR:", e)
        return jsonify({"reply": "I'm having trouble connecting to support. Please try again later."}), 500


@app.route('/chat_history/<int:user_id>', methods=['GET'])
def get_chat_history(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            "SELECT sender, message, created_at FROM chat_messages WHERE user_id=%s ORDER BY created_at ASC",
            (user_id,)
        )
        history = cursor.fetchall()
        cursor.close()
        return jsonify(list(history))
    except Exception as e:
        print("CHAT HISTORY ERROR:", e)
        return jsonify({"error": str(e)}), 500


# ---------------------------------
# AI CHATBOT (NO API)
# ---------------------------------
@app.route('/chat_ai', methods=['POST'])
def chat_ai():
    try:
        data = request.get_json()
        user_msg = data.get("message")

        if not user_msg:
            return jsonify({"reply": "Please enter a message"}), 400

        # Convert user message → vector
        user_vec = chat_model.encode([user_msg])

        # Compare with dataset
        scores = cosine_similarity(user_vec, chat_embeddings)[0]

        # Get best match
        best_idx = int(np.argmax(scores))

        reply = chat_data.iloc[best_idx]["response"]
        category = chat_data.iloc[best_idx]["category"]

        return jsonify({
            "reply": reply,
            "category": category
        })

    except Exception as e:
        print("CHAT ERROR:", e)
        return jsonify({
            "reply": "Something went wrong"
        }), 500


# -------------------- AI CHATBOT ROUTE --------------------

chat_history = []

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()

        message = data.get("message")
        role = data.get("role", "General")

        if not message:
            return jsonify({"error": "Message is required"}), 400

        # Role-based AI logic
        if role == "Entrepreneur":
            reply = f"As an Entrepreneur, you should evaluate risks, investment, and scalability for: {message}"
        elif role == "Student":
            reply = f"As a Student, focus on learning and growth before deciding: {message}"
        elif role == "Doctor":
            reply = f"As a Doctor, consider health and safety aspects of: {message}"
        else:
            reply = f"AI Response: {message}"

        # Save chat history (optional)
        chat_history.append({
            "message": message,
            "role": role,
            "reply": reply
        })

        return jsonify({
            "status": "success",
            "role": role,
            "user_message": message,
            "reply": reply
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------------------------
# RETRAIN MODEL
# ---------------------------------
@app.route('/retrain_model', methods=['POST'])
def retrain_model():
    global model
    try:
        import pandas as pd
        from sklearn.model_selection import train_test_split
        from sklearn.ensemble import RandomForestClassifier

        csv_path = "dataset.csv"
        if not os.path.exists(csv_path):
            # Try searching in parent or subfolders
            csv_path = "c:/Users/HP Personal/AndroidStudioProjects/FutureAI/dataset.csv"

        if not os.path.exists(csv_path):
            return jsonify({"status": False, "message": "dataset.csv not found"}), 404

        df = pd.read_csv(csv_path)
        df = df.drop(columns=['Final_Weight'], errors='ignore')
        
        y = df['Income']
        X = df.drop(columns=['Income'])

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        new_model = RandomForestClassifier()
        new_model.fit(X_train, y_train)

        joblib.dump(new_model, "future_ai_simulator.pkl")
        joblib.dump(new_model, "model.pkl")
        
        model = new_model
        return jsonify({"status": True, "message": "Model Retrained Successfully"})

    except Exception as e:
        return jsonify({"status": False, "message": str(e)}), 500

# ---------------------------------
# PREDICTION INSIGHTS (ALERTS, SUMMARY, FORECAST)
# ---------------------------------
@app.route('/prediction_insights/<int:user_id>', methods=['GET'])
def prediction_insights(user_id):
    try:
        import traceback
        from datetime import datetime, timedelta
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        
        # 1. Fetch all predictions for this user
        cursor.execute("SELECT * FROM predictions WHERE user_id=%s ORDER BY created_at DESC", (user_id,))
        history = list(cursor.fetchall()) # Convert to list to avoid tuple issues
        
        if not history:
            return jsonify({
                "alerts": [],
                "weekly_summary": {
                    "count": 0,
                    "avg_success": 0,
                    "status": "No data yet",
                    "date_range": "Start your first simulation!"
                },
                "forecast": {
                    "trajectory": "+0%",
                    "message": "Start simulations to see your future growth trajectory.",
                    "years": [2026, 2027, 2028, 2029, 2030],
                    "career_score": 0,
                    "finance_score": 0,
                    "life_balance_score": 0
                }
            })

        latest = history[0]
        
        # Ensure latest has all needed keys with defaults if missing
        latest_success = float(latest.get('success_probability') or 50)
        latest_fin = float(latest.get('financial_impact') or 50)
        latest_life = float(latest.get('life_satisfaction') or 50)

        # --- ALERTS GENERATION ---
        alerts = []
        if latest_success < 45:
            alerts.append({
                "title": "Low Success Probability",
                "message": f"Your latest simulation shows only {latest_success}% success. Consider adjusting your variables.",
                "type": "risk",
                "recommendation": "Try increasing your education level or capital gains."
            })
        
        if latest_fin < 30:
            alerts.append({
                "title": "Financial Risk",
                "message": "Predicted financial impact is low. This path may not yield the expected wealth.",
                "type": "warning",
                "recommendation": "Review your investment strategy."
            })
            
        if latest_life < 50:
            alerts.append({
                "title": "Burnout Warning",
                "message": "Life satisfaction is dipping. Your balance between work and personal life needs attention.",
                "type": "wellbeing",
                "recommendation": "Reduce hours per week in the next simulation."
            })
            
        # --- High Alternate Risk Alert ---
        latest_alt = float(latest.get('alternative_scenario') or 0)
        if latest_alt >= 70:
            alerts.append({
                "title": "High Alternate Risk",
                "message": f"Your latest simulation carries a ({round(latest_alt,1)}%) alternate risk failure. Consider adjusting your variables.",
                "type": "risk",
                "recommendation": "Try reducing your risk factor or increasing capital gains."
            })
        if not alerts:
            alerts.append({
                "title": "On the Right Track",
                "message": "Your current trajectory is stable and shows consistent growth.",
                "type": "info",
                "recommendation": "Keep up the consistent effort!"
            })



        # --- WEEKLY SUMMARY ---
        seven_days_ago = datetime.now() - timedelta(days=7)
        weekly_data = []
        for p in history:
            ts = p['created_at']
            if isinstance(ts, str):
                try:
                    ts = datetime.strptime(ts, "%Y-%m-%d %H:%M:%S")
                except:
                    continue
            if ts >= seven_days_ago:
                weekly_data.append(p)
        
        if weekly_data:
            avg_success = sum(float(p.get('success_probability') or 50) for p in weekly_data) / len(weekly_data)
            weekly_summary = {
                "count": len(weekly_data),
                "avg_success": round(avg_success, 1),
                "status": "Positive Trending" if avg_success > 60 else "Review Needed",
                "date_range": f"{seven_days_ago.strftime('%b %d')} - {datetime.now().strftime('%b %d, %Y')}"
            }
        else:
            weekly_summary = {
                "count": 0,
                "avg_success": 0,
                "status": "No activity this week",
                "date_range": "Past 7 Days"
            }

        # --- LONG TERM FORECAST ---
        base_growth = (latest_success / 100) * 20
        forecast = {
            "trajectory": f"+{round(base_growth, 1)}%",
            "message": f"Based on your current {latest_success}% success rate, your 5-year outlook is strong.",
            "years": [datetime.now().year + i for i in range(5)],
            "career_score": int(latest_success),
            "finance_score": int(latest_fin),
            "life_balance_score": int(latest_life)
        }

        cursor.close()
        return jsonify({
            "alerts": alerts,
            "weekly_summary": weekly_summary,
            "forecast": forecast
        })

    except Exception as e:
        import traceback
        err_msg = traceback.format_exc()
        print("INSIGHTS ERROR:", err_msg)
        return jsonify({"error": str(e), "trace": err_msg}), 500

# ---------------------------------
# GET TIMELINE
# ---------------------------------
@app.route('/get_timeline/<int:user_id>', methods=['GET'])
def get_timeline(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM predictions WHERE user_id=%s ORDER BY created_at DESC LIMIT 1", (user_id,))
        last = cursor.fetchone()
        cursor.close()

        score = int(float(last.get('success_probability') or 50)) if last else 50
        input_dec = str(last.get('decision_input') or "career").lower() if last else "career"

        if "edu" in input_dec and not "work" in input_dec:
            nodes = [
                {"title": "Begin Program", "date": "Month 1", "desc": "Enroll in advanced degree", "active": True},
                {"title": "First Milestone", "date": "Month 6", "desc": "Complete foundational courses", "active": score > 40},
                {"title": "Skill Application", "date": "Month 12", "desc": "Start practical projects", "active": score > 50},
                {"title": "Networking", "date": "Month 18", "desc": "Connect with industry leaders", "active": score > 60},
                {"title": "Graduation", "date": "Month 24", "desc": "Receive credentials", "active": score > 70},
                {"title": "Job Placement", "date": "Month 26", "desc": "Secure higher-paying role", "active": score > 80}
            ]
        elif "finance" in input_dec or "cap" in input_dec:
            nodes = [
                {"title": "Initial Investment", "date": "Month 1", "desc": "Setup diversified portfolio", "active": True},
                {"title": "Market Adjustment", "date": "Month 3", "desc": "Rebalance assets based on risk", "active": score > 40},
                {"title": "First Returns", "date": "Month 6", "desc": "Observe initial growth", "active": score > 50},
                {"title": "Compound Interest", "date": "Month 12", "desc": "Reinvest dividends", "active": score > 60},
                {"title": "Portfolio Maturity", "date": "Month 24", "desc": "Achieve stable yield", "active": score > 70},
                {"title": "Wealth Milestone", "date": "Month 36+", "desc": "Hit financial independence goal", "active": score > 80}
            ]
        else:
            nodes = [
                {"title": "Skill Acquisition", "date": "Month 1", "desc": "Start learning modern tech", "active": True},
                {"title": "Certification", "date": "Month 3", "desc": "Pass industry exams", "active": score > 40},
                {"title": "Pivot Strategy", "date": "Month 6", "desc": "Apply for tech roles", "active": score > 50},
                {"title": "First Offer", "date": "Month 9", "desc": "Receive competitive salary", "active": score > 60},
                {"title": "Promotion", "date": "Month 18", "desc": "Move to senior position", "active": score > 70},
                {"title": "Leadership", "date": "Month 36+", "desc": "Lead projects and teams", "active": score > 80}
            ]

        return jsonify(nodes)
    except Exception as e:
        import traceback
        err = traceback.format_exc()
        print("TIMELINE ERROR:", err)
        return jsonify([{"title": "Backend Error", "date": "N/A", "desc": str(e), "active": False}])


# ---------------------------------
# GET PROFILE STATS
# ---------------------------------
@app.route('/profile-stats/<email>', methods=['GET'])
def profile_stats(email):

    cursor = mysql.connection.cursor()

    # total predictions
    cursor.execute("SELECT COUNT(*) FROM simulations WHERE user_email=%s", (email,))
    predictions = cursor.fetchone()[0]

    # average score
    cursor.execute("SELECT AVG(score) FROM simulations WHERE user_email=%s", (email,))
    avg_score = cursor.fetchone()[0]

    # days active
    cursor.execute("SELECT COUNT(DISTINCT created_at) FROM simulations WHERE user_email=%s", (email,))
    days_active = cursor.fetchone()[0]

    cursor.close()

    return jsonify({
        "avg_score": round(avg_score,2) if avg_score else 0,
        "predictions": predictions,
        "days_active": days_active
    })

# ---------------------------------
# GET USER STATS (Retrofit)
# ---------------------------------
@app.route('/user-stats/<int:user_id>', methods=['GET'])
def user_stats(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        
        # user details
        cursor.execute("SELECT name, email, profile_photo FROM users WHERE user_id=%s", (user_id,))
        user_info = cursor.fetchone()
        
        if not user_info:
            cursor.close()
            return jsonify({"error": "User not found"}), 404
            
        # stats
        cursor.execute(
            "SELECT COUNT(*) as total_predictions, AVG(success_probability) as avg_score, COUNT(DISTINCT DATE(created_at)) as days_active FROM predictions WHERE user_id=%s", 
            (user_id,)
        )
        stats = cursor.fetchone()
        cursor.close()
        
        return jsonify({
            "avg_score": round(float(stats['avg_score'] or 0.0), 2),
            "total_predictions": stats['total_predictions'] or 0,
            "days_active": stats['days_active'] or 0,
            "name": user_info['name'],
            "email": user_info['email'],
            "profile_photo": normalize_profile_photo(user_info['profile_photo'])
        })
    except Exception as e:
        print("USER STATS ERROR:", e)
        return jsonify({"error": str(e)}), 500


# ---------------------------------
# ALTERNATE SCENARIOS
# ---------------------------------
@app.route('/alternate_scenarios/<int:user_id>', methods=['GET'])
def alternate_scenarios(user_id):
    try:
        # Generate some contextual scenarios
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT decision_input, success_probability FROM predictions WHERE user_id=%s ORDER BY created_at DESC LIMIT 1", (user_id,))
        last_prediction = cursor.fetchone()
        cursor.close()

        base_score = int(float(last_prediction.get('success_probability') or 50)) if last_prediction else 50
        
        # Decide category based on input text if possible, else generic
        input_text = last_prediction['decision_input'].lower() if last_prediction else "career"
        if "edu" in input_text and not "work" in input_text:
            if base_score <= 50:
                scenarios = [
                    {"title": "Pursue Advanced Degree", "score": min(100, base_score + 8), "pros": "Fundamental higher ceiling potential", "cons": "Heavy short-term tuition burden"},
                    {"title": "Bootcamp Certification", "score": min(100, base_score + 18), "pros": "Fast track to foundational skills", "cons": "Tight starting placement rate"},
                    {"title": "Self-Taught Portfolio", "score": min(100, base_score + 12), "pros": "No initial debt triggers", "cons": "High self-discipline failure rate"}
                ]
            elif base_score <= 75:
                scenarios = [
                    {"title": "Pursue Advanced Degree", "score": min(100, base_score + 15), "pros": "Respected credentials and backing", "cons": "Requires balancing standard hours"},
                    {"title": "Bootcamp Certification", "score": min(100, base_score + 10), "pros": "Immediate technical upskilling", "cons": "Moderate ceiling placement"},
                    {"title": "Self-Taught Portfolio", "score": min(100, base_score + 14), "pros": "Flexible execution timeline", "cons": "Lacks formal certification checks"}
                ]
            else:
                scenarios = [
                    {"title": "Pursue Advanced Degree", "score": min(100, base_score + 18), "pros": "Highly accelerates specialized growth", "cons": "Lengthy graduation timeline"},
                    {"title": "Bootcamp Certification", "score": min(100, base_score + 12), "pros": "Fast technical certification completion", "cons": "Competitive entry tier"},
                    {"title": "Self-Taught Portfolio", "score": min(100, base_score + 16), "pros": "Uncapped execution freedom", "cons": "Lacks institutional backing"}
                ]
        elif "cap" in input_text or "finance" in input_text:
            if base_score <= 50:
                scenarios = [
                    {"title": "Aggressive ETF Portfolio", "score": min(100, base_score + 10), "pros": "Broad index safe exposure setup", "cons": "Small direct returns yield"},
                    {"title": "Real Estate Re-investment", "score": min(100, base_score + 12), "pros": "Solid physical equity backing", "cons": "Delayed liquidity benchmarks"},
                    {"title": "Conservative Bonds & Savings", "score": min(100, base_score + 20), "pros": "Locked safety guarantees", "cons": "Fails to meet high inflation trends"}
                ]
            elif base_score <= 75:
                scenarios = [
                    {"title": "Aggressive ETF Portfolio", "score": min(100, base_score + 15), "pros": "Scalable composite growth", "cons": "Minor market drop panics"},
                    {"title": "Real Estate Re-investment", "score": min(100, base_score + 9), "pros": "Predictable rental yields", "cons": "Standard maintenance burdens"},
                    {"title": "Conservative Bonds & Savings", "score": min(100, base_score + 6), "pros": "Reliable cash cushion thresholds", "cons": "Slow composite generating multiple"}
                ]
            else:
                scenarios = [
                    {"title": "Aggressive ETF Portfolio", "score": min(100, base_score + 18), "pros": "Maximal return ceiling multipliers", "cons": "Vulnerable to short term crash"},
                    {"title": "Real Estate Re-investment", "score": min(100, base_score + 14), "pros": "Exponential leveraging options", "cons": "Illiquid if failing fast"},
                    {"title": "Conservative Bonds & Savings", "score": min(100, base_score - 2), "pros": "Guarenteed yield lockups", "cons": "Bypasses high velocity allocations"}
                ]
        else: # Career
            if base_score <= 50:
                scenarios = [
                    {"title": "Pivot to Tech Sector", "score": min(100, base_score + 22), "pros": "Accurate foundational skill upgrade", "cons": "Steep technical learning curve"},
                    {"title": "Internal Promotion Path", "score": min(100, base_score + 6), "pros": "Guarenteed inner circle feedback", "cons": "Slower salary boosts grid"},
                    {"title": "Freelance Consultation", "score": min(100, base_score + 14), "pros": "No organizational glass ceilings", "cons": "High client retainer risks"}
                ]
            elif base_score <= 75:
                scenarios = [
                    {"title": "Pivot to Tech Sector", "score": min(100, base_score + 16), "pros": "Immediate high salary ceiling", "cons": "Restarting probation frameworks"},
                    {"title": "Internal Promotion Path", "score": min(100, base_score + 12), "pros": "Stable salary scaling metrics", "cons": "Gradual ladder timelines"},
                    {"title": "Freelance Consultation", "score": min(100, base_score + 10), "pros": "Be your own boss layouts", "cons": "Delayed operational setups"}
                ]
            else:
                scenarios = [
                    {"title": "Pivot to Tech Sector", "score": min(100, base_score + 18), "pros": "Exponential growth trajectory framing", "cons": "Heavy burden workloads"},
                    {"title": "Internal Promotion Path", "score": min(100, base_score + 14), "pros": "Leadership/Director board pivot", "cons": "Heavy burden accountability"},
                    {"title": "Freelance Consultation", "score": min(100, base_score + 20), "pros": "Scalable consultation multiples", "cons": "Corporate overhead setup triggers"}
                ]
            
        return jsonify(scenarios)
    except Exception as e:
        print("SCENARIOS ERROR:", e)
        return jsonify([{"title": "Error generating scenarios", "score": 0, "pros": "", "cons": str(e)}])

# ---------------------------------
# COMPARE FUTURES
# ---------------------------------
@app.route('/compare_futures/<int:user_id>', methods=['GET'])
def compare_futures(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM predictions WHERE user_id=%s ORDER BY created_at DESC LIMIT 1", (user_id,))
        last_prediction = cursor.fetchone()
        cursor.close()

        input_decision = "Current Path"
        base_score = 50
        fin_impact = 50.0
        life_sat = 50.0
        
        if last_prediction:
            input_decision = last_prediction.get('decision_input') or 'Current Path'
            base_score = int(float(last_prediction.get('success_probability') or 50))
            fin_impact = float(last_prediction.get('financial_impact') or 50)
            life_sat = float(last_prediction.get('life_satisfaction') or 50)

        category_str = input_decision.lower()

        # Option B is the user's input, Option A is the better AI alternative
        if "edu" in category_str and not "work" in category_str:
            improved_score = min(100, base_score + 15)
            improved_fin = fin_impact * 1.15
            improved_life = min(100, life_sat + 18)
        elif "cap" in category_str or "finance" in category_str:
            improved_score = min(100, base_score + 12)
            improved_fin = fin_impact * 1.45
            improved_life = min(100, life_sat + 5)
        else:
            improved_score = min(100, base_score + 18)
            improved_fin = fin_impact * 1.22
            improved_life = min(100, life_sat + 12)
        
        rows = [
            {
                "label": "Success Probability",
                "valA": f"{improved_score}%",
                "valB": f"{base_score}%",
                "isWinnerA": True
            },
            {
                "label": "Financial Impact",
                "valA": f"₹{int(improved_fin)}K",
                "valB": f"₹{int(fin_impact)}K",
                "isWinnerA": True
            },
            {
                "label": "Life Satisfaction",
                "valA": f"{int(improved_life)}/100",
                "valB": f"{int(life_sat)}/100",
                "isWinnerA": True
            },
            {
                "label": "Time Investment",
                "valA": "High (30h/w)",
                "valB": "Low (10h/w)",
                "isWinnerA": False
            },
            {
                "label": "Risk Level",
                "valA": "Moderate",
                "valB": "Low",
                "isWinnerA": False
            },
            {
                "label": "Stress Factor",
                "valA": "Elevated",
                "valB": "Stable",
                "isWinnerA": False
            },
            {
                "label": "Career Growth",
                "valA": "Exponential",
                "valB": "Linear",
                "isWinnerA": True
            }
        ]
        category_str = input_decision.lower()
        if "edu" in category_str and not "work" in category_str:
            if improved_score <= 50:
                option_a = "Online Certification"
                verdict = f"Option A ({option_a}) requires less commitment and provides foundational skills, fitting a safer success probability."
            elif improved_score <= 75:
                option_a = "Part-Time Master's Degree"
                verdict = f"Option A ({option_a}) balances current responsibilities while significantly boosting your credentials."
            else:
                option_a = "Full-Time Advanced Degree"
                verdict = f"Option A ({option_a}) offers the highest long-term satisfaction and drastically accelerates your career trajectory."
        elif "cap" in category_str or "finance" in category_str:
            if improved_score <= 50:
                option_a = "Conservative Bonds & Savings"
                verdict = f"Option A ({option_a}) minimizes risk and secures capital, ideal for uncertain economic conditions."
            elif improved_score <= 75:
                option_a = "Balanced Index Funds"
                verdict = f"Option A ({option_a}) offers steady financial growth with moderate risk exposure for long-term wealth."
            else:
                option_a = "Aggressive Investment Portfolio"
                verdict = f"Option A ({option_a}) offers significantly higher financial returns but requires managing more volatility."
        else:
            if improved_score <= 50:
                option_a = "Gradual Skill Building"
                verdict = f"Option A ({option_a}) allows you to steadily modernise your tech skills without risking your current stability."
            elif improved_score <= 75:
                option_a = "Internal Lateral Move"
                verdict = f"Option A ({option_a}) leverages your current company's network to transition into a tech-focused role safely."
            else:
                option_a = "Tech Sector Pivot"
                verdict = f"Option A ({option_a}) aggressively accelerates your career growth with substantially higher salary potential."

        return jsonify({
            "rows": rows,
            "optionA": option_a,
            "optionB": input_decision,
            "verdict": verdict,
            "scoreA": improved_score,
            "scoreB": base_score
        })
    except Exception as e:
        print("COMPARE ERROR:", e)
        return jsonify({"error": str(e)}), 500

# ---------------------------------
# FORECAST ROUTE
# ---------------------------------
@app.route('/forecast/<int:user_id>', methods=['GET'])
def get_forecast(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            "SELECT success_probability, financial_impact, life_satisfaction FROM predictions WHERE user_id=%s ORDER BY created_at DESC LIMIT 1",
            (user_id,)
        )

        latest = cursor.fetchone()
        cursor.close()

        if not latest:
            return jsonify({
                "growth": "+0%",
                "years": [2026, 2027, 2028, 2029, 2030],
                "career": [50,55,60,65,70],
                "finance": [45,50,55,60,65],
                "life_balance": [50,52,55,58,60]
            })

        # Safe value extraction
        success = float(latest['success_probability'] or 50)
        finance = float(latest['financial_impact'] or 50)
        life = float(latest['life_satisfaction'] or 50)

        # Generate 5-year forecast
        career_scores = [
            round(success * 0.8),
            round(success * 0.9),
            round(success * 1.0),
            round(success * 1.05),
            round(success * 1.1)
        ]

        finance_scores = [
            round(finance * 0.7),
            round(finance * 0.8),
            round(finance * 0.9),
            round(finance * 1.0),
            round(finance * 1.1)
        ]

        life_scores = [
            round(life * 0.8),
            round(life * 0.9),
            round(life * 1.0),
            round(life * 1.05),
            round(life * 1.1)
        ]

        growth = round((career_scores[-1] - career_scores[0]) / career_scores[0] * 100, 1)

        return jsonify({
            "growth": f"+{growth}%",
            "years": [2026, 2027, 2028, 2029, 2030],
            "career": career_scores,
            "finance": finance_scores,
            "life_balance": life_scores
        })

    except Exception as e:
        print("FORECAST ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/home_data/<int:user_id>', methods=['GET'])
def get_home_data(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        
        # Get Stats Counts
        cursor.execute("SELECT COUNT(*) as count FROM goals WHERE user_id=%s", (user_id,))
        active_goals = cursor.fetchone()['count']
        
        cursor.execute("SELECT COUNT(*) as count FROM simulations WHERE user_id=%s", (user_id,))
        simulation_count = cursor.fetchone()['count']
        
        cursor.execute("SELECT COUNT(*) as count FROM journal WHERE user_id=%s", (user_id,))
        ai_insights = cursor.fetchone()['count']

        cursor.execute(
            "SELECT success_probability, financial_impact, life_satisfaction FROM predictions WHERE user_id=%s ORDER BY created_at DESC LIMIT 1",
            (user_id,)
        )
        latest = cursor.fetchone()
        
        if not latest:
            cursor.close()
            return jsonify({
                "future_score": 0,
                "trend": "+0 this week",
                "career": 0,
                "finance": 0,
                "balance": 0,
                "active_goals": active_goals,
                "simulation_count": simulation_count,
                "ai_insights": ai_insights
            })
            
        future_score = int(float(latest['success_probability'] or 0))
        career_score = future_score
        finance_score = int(float(latest['financial_impact'] or 0))
        balance_score = int(float(latest['life_satisfaction'] or 0))
        
        # Calculate trend based on history
        cursor.execute("SELECT success_probability FROM predictions WHERE user_id=%s ORDER BY created_at DESC LIMIT 10", (user_id,))
        recent = cursor.fetchall()
        
        if len(recent) > 1:
            prev_sum = sum(float(r['success_probability'] or 0) for r in recent[1:])
            prev_avg = prev_sum / (len(recent) - 1)
            diff = future_score - int(prev_avg)
            trend = f"{'↗' if diff >= 0 else '↘'} {'+' if diff >= 0 else ''}{diff} this week"
        else:
            trend = "+0 this week"
            
        cursor.close()
        return jsonify({
            "future_score": future_score,
            "trend": trend,
            "career": career_score,
            "finance": finance_score,
            "balance": balance_score,
            "active_goals": active_goals,
            "simulation_count": simulation_count,
            "ai_insights": ai_insights
        })
    except Exception as e:
        print("HOME DATA ERROR:", e)
        return jsonify({"error": str(e)}), 500


# ---------------------------------
# CONTACT SUPPORT
# ---------------------------------
@app.route('/contact_support', methods=['POST'])
def contact_support():
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        subject = data.get("subject")
        message = data.get("message")

        # ✅ Validate fields
        if not name or not email or not subject or not message:
            return jsonify({
                "status": False,
                "message": "All fields are required"
            }), 400

        # ✅ Create email
        msg = Message(
            subject=f"{subject} (from {name})",
            sender=app.config['MAIL_USERNAME'],
            recipients=['sanjaykuruvella112@gmail.com']
        )

        # ✅ Reply directly to user
        msg.reply_to = email

        # ✅ Email content
        msg.body = f"""
New Support Message

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}
"""

        # ✅ Send email
        mail.send(msg)

        return jsonify({
            "status": True,
            "message": "Support message sent successfully"
        }), 200

    except Exception as e:
        print("CONTACT SUPPORT ERROR:", e)
        return jsonify({
            "status": False,
            "message": str(e)
        }), 500


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


# ---------------------------------
# RUN SERVER
# ---------------------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8142, debug=False)



