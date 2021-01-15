from db import client

import json
import re

with open("archive/major_requirements_processed.json", "r") as f:
    data = json.load(f)

with open("archive/core_courses.json", 'r') as f:
    core_data = json.load(f)


def parse_elective_reqs(elective):
    return


def parse_major_reqs(major):
    parsed = {"prep": {}, "core": {}, "guided": {}}
    index = -1

    for major_type in major:
        index += 1
        courses = []
        for course in major[major_type]:
            if "Choose" in course:
                num = re.findall(r'\d+', course)[0]
                choices = []
                for choose_course in major[major_type][course]:
                    choices.append(choose_course)
                courses.append({num: choices})
            elif "hours" in course:
                for sub_course in major[major_type][course]:
                    if len(sub_course) > 8:
                        for sub_sub_course in major[major_type][course][sub_course]:
                            courses.append({"1": sub_sub_course})
                    else:
                        courses.append({"1": sub_course})
            else:
                courses.append({"1": course})

        if index == 0:
            parsed["prep"].update({"courses": courses})
        elif index == 1:
            parsed["core"].update({"courses": courses})
        elif index == 2:
            parsed["guided"].update({"courses": courses})

    return parsed


def get_core_list_from_code(str_):
    code = re.findall("[0-9]{3}", str_)[0]
    num = re.findall("[0-9] ", str_)[0][:-1]

    core_list = core_data[code]["courses"]

    return {num: core_list}


def parse_core_reqs(core):
    parsed = {}
    for code in core:
        courses = []
        for course in core[code]:
            if "Choose" in course:
                num = re.findall(r'\d+', course)[0]
                choices = []
                for choose_course in core[code][course]:
                    if "Any" in choose_course:
                        cores = get_core_list_from_code(choose_course)
                        choices.append(cores)
                    else:
                        choices.append(choose_course)
                courses.append({num: choices})
            elif "Any" in course:
                cores = get_core_list_from_code(course)
                courses.append(cores)
            else:
                courses.append({"1": course})
        parsed.update({code: courses})

    return parsed


for school in data:
    parsed = {}
    if school == "ecs":
        for major in data[school]:
            parsed.update({school: {
                major: {
                    "path": {}
                }
            }})

            for path in data[school][major]:
                if "Core" in path:
                    core = parse_core_reqs(data[school][major][path])
                    parsed[school][major]["path"].update({"core": core})
                elif "Major" in path:
                    major_ = parse_major_reqs(data[school][major][path])
                    parsed[school][major]["path"].update({"major": major_})

                elif "Elective" in path:
                    elective = {"elective": {
                        "courses": []
                    }}
                    parsed[school][major]["path"].update(
                        {"elective": elective})
    print(parsed)
