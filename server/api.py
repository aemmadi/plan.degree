from flask import Flask, json, request, make_response, jsonify, redirect
from flask_cors import CORS, cross_origin
from db import client
from utils import format_tag, parse_json, set_headers, generate_random_token
import mailgun
import traceback
from bson.objectid import ObjectId
import sys

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def hello():
    return "Hello, World!"

@app.route('/auth/signup/', methods=["POST"])
@cross_origin()
def create_user():
    error = False
    form_data = request.get_json()
    pending_users = client["users"]["pending"]
    verified_users = client["users"]["verified"]

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
    pending_users = client["users"]["pending"]
    verified_users = client["users"]["verified"]

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
    pending_users = client["users"]["pending"]
    verified_users = client["users"]["verified"]

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
