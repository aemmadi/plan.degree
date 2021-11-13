from db import client

file = open("archive/all_course_names.txt", "r")

course_list = client["catalog_data"]["course_list"]
data = []

while True:
    subject = file.readline()
    if subject == "":
        break
    course = subject[:-1]
    course = course.split(" ")
    course = {'subj': course[0], 'num': course[1]}

    tmp = {'course': course}
    data.append(tmp)

# PUSH TO DB
# course_list.insert_many(data)
