from flask import Flask, make_response, jsonify
from db import client
from utils import format_tag, parse_json, set_headers
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def hello():
    return "Hello, World!"


@app.route('/course/<tag>')
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


@app.route('/course/search/<tag>')
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
