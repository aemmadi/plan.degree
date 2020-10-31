from pymongo import MongoClient
import os

# FOR DEV ENVIRONMENT ONLY
from dotenv import load_dotenv
load_dotenv()

client = MongoClient(os.environ.get("DB_AUTH"))

db = client.sample_mflix
print(db.movies.find_one())