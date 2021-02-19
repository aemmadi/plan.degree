from flask import Flask, json, request, make_response, jsonify, redirect
from flask_cors import CORS, cross_origin
from db import client
from utils import format_tag, parse_json, set_headers
import mailgun
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
    new_user = client["users"]["pending"]

    if new_user.find_one({'email': form_data["email"]}):
        error = True
    else:
        try:
            user = new_user.insert_one(form_data)
        except:
            error = True
    
    if(error):
        return make_response(
            jsonify({'data': 'error'}), 400
        )
    
    mailgun.send_confirmation(form_data["firstName"], form_data["email"], f"http://localhost:5000/auth/confirm/{user.inserted_id}")
    res = make_response(
        jsonify({'data': 'success'}), 200
    )
    res = set_headers(res)
    return res

@app.route('/auth/confirm/<id>', methods=["GET"])
def confirm_user(id):
    error = False
    pending_users = client["users"]["pending"]
    verified_users = client["users"]["verified"]

    try:
        user = pending_users.find_one({'_id': ObjectId(id)})
        print(user, file=sys.stderr)
        if user:
            user.update({"isOnboarding": True})
            verified_users.insert_one(user)
            pending_users.delete_one({'_id': ObjectId(id)})
    except:
        error = True
    
    if error:
        return redirect("http://localhost:3000/auth/confirm/error", code=400)
    return redirect("http://localhost:3000/auth/confirm/success", code=200)

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
