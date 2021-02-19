import os
import requests
import json

# FOR DEV ENVIRONMENT ONLY
from dotenv import load_dotenv
load_dotenv()

def send_confirmation(firstName, email, confirmLink):
    variables = {
        "firstName": firstName,
        "confirmationLink": confirmLink
    }
    variables = json.dumps(variables)

    return requests.post(
		f'{os.environ.get("MAILGUN_BASE_URL")}/messages',
		auth=("api", f'{os.environ.get("MAILGUN_API_KEY")}'),
		data={"from": "no-reply@plan.degree  <no-reply@plan.degree>",
			"to": [email],
			"subject": "Confirm Your E-Mail Address - plan.degree",
			"template": "email-confirmation",
            "h:X-Mailgun-Variables": variables
            }
        )