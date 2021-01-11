from db import client
import json
import re

with open('archive/course_catalog_parsed.json') as f:
    data = json.load(f)


def parse_archive(key, val):
    course = key
    subj = course.split(" ")[0]
    num = course.split(" ")[1]
    level = num[0]
    title = val['name']
    credit = val["hours"]
    desc = val["description"]
    req_text = ""

    if len(val["prerequisites"]) > 1:
        for req in val["prerequisites"]:
            req_text += f"{req}; "
        req_text = req_text[:-2]
    elif len(val["prerequisites"]) > 0:
        req_text = val["prerequisites"][0]

    # If credit is "v", cant confirm amount of credits (client should prompt user to verify credit hours for these classes)
    if not credit.isdigit():
        credit = -1

    return {
        "course": course,
        "subj": subj,
        "num": num,
        "level": level,
        "title": title,
        "desc": desc,
        "credits": credit,
        "req_text": req_text
    }


def get_req_from_str(str_):
    req = re.findall("[A-Z]{2,5} ?[A-Z0-9]{4}|[0-9]{3} ", str_)

    # Remove trailing space
    for i in range(len(req)):
        if req[i][-1] == " ":
            req[i] = req[i][:-1]

    str_ = str_.lower()
    if "upper" in str_:
        req.append("upper")
    if "lower" in str_:
        req.append("lower")
    if "instructor" in str_ and "consent" in str_:
        req.append("instructor consent")
    if "department" in str_ and "consent" in str_:
        req.append("department consent")
    if "senior" in str_:
        req.append("senior")
    if "junior" in str_:
        req.append("junior")
    if "sophomore" in str_:
        req.append("sophomore")
    if "freshman" in str_:
        req.append("freshman")
    if "equivalent based on placement" in str_ or "placement exam" in str_:
        req.append("placement exam")
    elif "equivalent" in str_:
        req.append("equivalent")

    return req


def create_list(indexes):
    list_ = []
    for i in range(indexes):
        list_.insert(i, {"tags": []})
    return list_


def parse_req(req, reqs):
    req = req.split(" and ")
    indexes = len(req)
    reqs = create_list(indexes)
    for index, and_ in enumerate(req):
        if " or " in and_:
            and_ = and_.split(" or ")
            for or_and in and_:
                courses = get_req_from_str(or_and)
                for course in courses:
                    reqs[index]["tags"].append(course)
        else:
            courses = get_req_from_str(and_)
            for course in courses:
                reqs[index]["tags"].append(course)
    return reqs


def parse_pre_req_co(req_list):
    if not req_list:
        return {
            "pre_req": [],
            "co_req": []
        }

    pre_reqs = []
    co_reqs = []

    for req in req_list:
        if "corequisite" in req.lower():
            co_reqs = parse_req(req, co_reqs)
        else:
            pre_reqs = parse_req(req, pre_reqs)
    return {
        "pre_req": pre_reqs,
        "co_req": co_reqs
    }


courses = []
for key in data:
    val = data[key]
    tmp = (parse_archive(key, val))
    pre_req_co = parse_pre_req_co(val["prerequisites"])
    tmp.update(pre_req_co)

    courses.append(tmp)


# PUSH TO DB
# course_data = client["catalog_data"]["course_data"]
# course_data.insert_many(courses)
