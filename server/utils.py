import json
from bson import json_util
import hashlib
import uuid


def format_tag(tag):
    return tag.upper()


def parse_json(data):
    return json.loads(json_util.dumps(data))


def set_headers(res):
    res.headers["Content-Type"] = "application/json"
    return res

def generate_random_token():
    id = uuid.uuid4().hex.encode('utf-8')
    return hashlib.sha256(id).hexdigest()