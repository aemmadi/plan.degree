from db import client
import json

with open('archive/course_catalog_parsed.json') as f:
    data = json.load(f)

"""
{
  _id: ObjectId(),
  subj: CS,
  num: 3305,
  level: 3,
  desc: "Description of the course",
  title: "Discrete Math II"
  course: CS 3305,
  pre_req: [{courses: ["CS2305"]}],
  co_req: [],
  family: ["Computer Science"],
  credits: 3,
  required: true,
  special: false, # upper (junior standing)
  core: false # 040, 060, 080, etc
}
"""

course_data = []


def parse_archive(key, val):
    course = key
    subj = course.split(" ")[0]
    num = course.split(" ")[1]
    level = num[0]
    title = val['name']
    credit = val["hours"]
    desc = val["description"]

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
    }


for key in data:
    val = data[key]
    tmp = parse_archive(key, val)


print(len(data))
