from flask import Flask, json, request, make_response, jsonify, redirect
from flask_cors import CORS, cross_origin
from db import client
from utils import format_tag, parse_json, set_headers, generate_random_token, generate_hash
import mailgun
import traceback
from datetime import datetime
from bson.objectid import ObjectId
import sys

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

pending_users = client["users"]["pending"]
verified_users = client["users"]["verified"]

@app.route('/')
def hello():
    return "Hello, World!"

@app.route('/auth/login/', methods=["POST"])
@cross_origin()
def login_user():
    error = False
    form_data = request.get_json()
    email = form_data["email"]
    password = form_data["password"]

    try:
        if pending_users.find_one({'email': email}):
            return make_response(
                jsonify({'data': 'unconfirmed'}), 400
            )
        user = verified_users.find_one({'email': email})
        if user is not None:
            salt = user["password"]["salt"]
            password = generate_hash(salt) + password
            if password == user["password"]["hash"]:
                session = {
                    "token": generate_random_token(),
                    "created_at": datetime.now()
                }
                verified_users.update_one(user, {"$set": { "session": session }})
            else:
                error = True
        else:
            error = True
    except:
        error = True

    if error:
        return make_response(
            jsonify({'data': 'error'}), 400
        )
    
    res = make_response(
        jsonify({'data': session["token"]}), 200
    )
    res = set_headers(res)
    return res



@app.route('/auth/signup/', methods=["POST"])
@cross_origin()
def create_user():
    error = False
    form_data = request.get_json()

    if pending_users.find_one({'email': form_data["email"]}) or verified_users.find_one({'email': form_data["email"]}):
        error = True
    else:
        try:
            user = pending_users.insert_one(form_data)
        except:
            error = True
    
    if(error):
        return make_response(
            jsonify({'data': 'error'}), 400
        )
    
    token = generate_random_token()
    mailgun.send_confirmation(
        form_data["firstName"], 
        form_data["email"], 
        f"http://localhost:5000/auth/confirm/{token}/{user.inserted_id}"
    )

    res = make_response(
        jsonify({'data': 'success'}), 200
    )
    res = set_headers(res)
    return res

@app.route('/auth/confirm/<token>/<id>', methods=["GET"])
def confirm_user(token, id):
    error = False

    try:
        user = pending_users.find_one({'_id': ObjectId(id)})
        existing_user = verified_users.find_one({'_id': ObjectId(id)})
     
        if user and not existing_user:
            user.update({"isOnboarding": True})
            verified_users.insert_one(user)
            pending_users.delete_one({'_id': ObjectId(id)})
        else:
            error = True
    except:
        error = True
    
    if error:
        return redirect("http://localhost:3000/auth/confirm/error", code=302)
    return redirect("http://localhost:3000/auth/confirm/success", code=302)

@app.route('/auth/confirm/resend-email/', methods=["POST"])
@cross_origin()
def resend_confirm_email():
    form_data = request.get_json()
    error = False

    try:
        user = pending_users.find_one({'email': form_data["email"]})
        existing_user = verified_users.find_one({'email': form_data["email"]})

        if user and not existing_user:
            form_data["firstName"] = user["firstName"]
            token = generate_random_token()
            mailgun.send_confirmation(
                form_data["firstName"], 
                form_data["email"], 
                f"http://localhost:5000/auth/confirm/{token}/{user['_id']}"
            )
        else:
            error = True
    except:
        error = True
    
    if error:
        res = make_response(
            jsonify({'data': 'error'}), 400
        )
        res = set_headers(res)
        return res
    
    res = make_response(
            jsonify({'data': 'success'}), 200
        )
    res = set_headers(res)
    return res

@app.route('/auth/password-reset/', methods=["POST"])
@cross_origin()
def password_reset():
    form_data = request.get_json()
    error = False

    try:
        user = verified_users.find_one({"email": form_data["email"]})
        if user is not None:
            form_data["firstName"] = user["firstName"]
            token = generate_random_token()
            created_at = datetime.now()

            verified_users.update_one(
                user, 
                {"$set": {
                    "password_reset_timestamp": created_at,
                    "password_reset_token": token
                    }
                }
            )

            mailgun.send_password_reset(
                form_data["firstName"],
                form_data["email"],
                f"http://localhost:3000/reset-password/{token}/{user['_id']}"
            )
        elif pending_users.find_one({"email": form_data["email"]}) is not None:
            res = make_response(
                jsonify(
                    {"data": "unconfirmed"}
                ), 400
                )

            res = set_headers(res)
            return res
        else:
            error = True
    except:
        error = True
    
    if error:
        res = make_response(
            jsonify({'data': 'error'}), 400
        )
        res = set_headers(res)
        return res
    
    res = make_response(
            jsonify({'data': 'success'}), 200
        )
    res = set_headers(res)
    return res

# Verify user token and id
def verify_user(token, id):
    error = False
    try:
        user = verified_users.find_one({"_id": ObjectId(id)})
        if user is not None:
            if token == user["password_reset_token"]:
                request_time = user["password_reset_timestamp"]
                current_time = datetime.now()

                time_taken = (current_time - request_time).total_seconds() / 60.0
                if time_taken >= 60.0:
                    error = True
            else:
                error = True
        else:
            error = True
    except:
        error = True

    return not error

@app.route("/auth/password-reset/<token>/<id>", methods=["GET", "POST"])
@cross_origin()
def update_password(token, id):
    if request.method == "GET":
        isVerified = verify_user(token, id)
        if isVerified == True:
            res = make_response(
                jsonify({'data': 'verified'}), 200
            )
            res = set_headers(res)
            return res
        else:
            res = make_response(
                jsonify({'data': 'error'}), 400
            )
            res = set_headers(res)
            return res
    elif request.method == "POST":
        isVerified = verify_user(token, id)
        error = False

        if isVerified == True:
            form_data = request.get_json()
            try:
                verified_users.update_one({"_id": ObjectId(id)}, 
                    {
                        "$set": {"password": form_data["password"]},
                        "$unset": {"password_reset_token": "", "password_reset_timestamp": ""}
                })
            except:
                error = True
        
        if isVerified == False or error == True:
            res = make_response(
                jsonify({'data': 'error'}), 400
            )
            res = set_headers(res)
            return res
        
        res = make_response(
                jsonify({'data': 'success'}), 200
            )
        res = set_headers(res)
        return res

@app.route('/course/<tag>')
def get_course(tag):
    tag = format_tag(tag)
    course_data = client["catalog_data"]["course_data"]
    result = list(course_data.find({"course": tag}))
    result = parse_json(result[0])

    res = make_response(
        jsonify(
            {"data": result}
        ), 200
    )

    res = set_headers(res)
    return res


@app.route('/search/<tag>')
def search_courses(tag):
    tag = format_tag(tag)
    course_data = client["catalog_data"]["course_data"]
    result = list(course_data.find({"course": {"$regex": f".*{tag}.*"}}))
    result = parse_json(result)

    res = make_response(
        jsonify(
            {"results": result}
        ), 200
    )

    res = set_headers(res)
    return res


if __name__ == "__main__":
    app.run(threaded=True)
