from flask import Flask, json, request, make_response, jsonify, redirect
from flask_cors import CORS, cross_origin
from db import client
from utils import format_tag, parse_json, set_headers, generate_random_token, generate_hash, verify_signature
import mailgun
import traceback
from datetime import datetime
from bson.objectid import ObjectId
import sys

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

db_users = client['accounts']['users']


@app.route('/')
def hello():
    return "Hello, World!"


@app.route("/v1/get_user", methods=['GET'])
@cross_origin()
def get_user():
    signature = request.args.get("signature")
    key = request.args.get("key")
    email = request.args.get("email")
    name = request.args.get("name")

    db_user = db_users.find_one({"email": email})
    if db_user:
        res = make_response(jsonify({
            "user": parse_json(db_user)
        }), 200)
        return set_headers(res)
    else:
        res = make_response(jsonify({
            "msg": "User not found"
        }), 404)
        return set_headers(res)


@app.route("/v1/create_user", methods=['POST'])
@cross_origin()
def create_user():
    email = request.form["email"]
    auth_name = request.form["name"]
    first_name = request.form["firstName"]
    last_name = request.form["lastName"]
    major = request.form["major"]
    start_semester = request.form["startSemester"]
    start_year = request.form["startYear"]

    # if user already exists return error
    if db_users.find_one({"email": email}) is not None:
        res = make_response(jsonify({
            "msg": "User already exists"
        }), 400)
        return set_headers(res)
    else:
        # Add new user
        db_users.insert_one({
            "email": email,
            "name": f'{first_name} {last_name}',
            "created_at": datetime.utcnow(),
            "auth_name": auth_name,
            "first_name": first_name,
            "last_name": last_name,
            "major": major,
            "start_semester": start_semester,
            "start_year": start_year,
            "plans": []
        })

        res = make_response(jsonify({
            "success": True
        }), 200)
        return set_headers(res)


@ app.route('/course/<tag>')
def get_course(tag):
    print(tag)
    tag = format_tag(tag)
    print(tag)
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


@ app.route('/course/search/<tag>')
def search_courses(tag):
    tag = format_tag(tag)
    if tag == 'ALL':
        tag = ' '
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
