import json
from bson import json_util


def format_tag(tag):
    return tag.upper()


def parse_json(data):
    return json.loads(json_util.dumps(data))


def set_headers(res):
    res.headers["Content-Type"] = "application/json"
    return res
