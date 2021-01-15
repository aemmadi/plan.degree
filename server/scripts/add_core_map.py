from db import client
import json

with open("archive/core_courses.json", "r") as f:
    data = json.load(f)

core_courses = client["catalog_data"]["core_courses"]

# PUSH TO DB
# core_courses.insert(data)
