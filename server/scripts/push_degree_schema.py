from db import client
import json

with open("archive/degree_plans.json", "r") as f:
    data = json.load(f)

degree_plans = client["degree_plans"]

for school in data:
    for major in data[school]:
        # PUSH TO DB
        # degree_plans[school][major].insert_one(data[school][major])
