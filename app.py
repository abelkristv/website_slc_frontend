from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from linkedin_api import Linkedin
import re
import base64
import requests
from io import BytesIO
from PIL import Image

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = ''
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app, resources={r'/*': {'origins': '*', 'methods': ['POST']}})

class AssistantExperience(db.Model):
    __tablename__ = 'assistant_experiences'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    assistant_id = db.Column(db.Integer)
    position_id = db.Column(db.Integer)

class Position(db.Model):
    __tablename__ = 'positions'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    position_name = db.Column(db.String(100))
    position_description = db.Column(db.Text)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    location = db.Column(db.String(100))
    company_id = db.Column(db.Integer)

class Company(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    company_name = db.Column(db.String(100))
    company_logo = db.Column(db.Text)

def fetchExperiences(link):
    api = Linkedin('username', 'password')
    if not link or not link.startswith("https://www.linkedin.com/in/"):
        raise ValueError("Invalid LinkedIn profile link format")
    try:
        profile_id = link.split("in/")[1].rstrip('/')
        profile = api.get_profile(profile_id)
        linkedin_experiences = profile.get('experience', [])
        return linkedin_experiences
    except Exception as e:
        raise ValueError(f"Failed to retrieve LinkedIn profile: {str(e)}")

def delete_assistant_experiences(assistant_id):
    assistant_experiences = AssistantExperience.query.filter_by(assistant_id=assistant_id).all()
    company_ids_to_check = set()

    for assistant_experience in assistant_experiences:
        positions = Position.query.filter_by(id=assistant_experience.position_id).all()

        for position in positions:
            company_ids_to_check.add(position.company_id)
            db.session.delete(position)

        db.session.delete(assistant_experience)

    for company_id in company_ids_to_check:
        if not Position.query.filter_by(company_id=company_id).first():
            company = Company.query.get(company_id)
            if company:
                db.session.delete(company)

    db.session.commit()

def convert_to_base64(url):
    response = requests.get(url)
    image = Image.open(BytesIO(response.content)).convert('RGBA')
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')

def get_or_create_company(company_data):
    company_name = company_data["miniCompany"]["name"]
    logo_artifacts = company_data["miniCompany"]["logo"]["com.linkedin.common.VectorImage"]["artifacts"]
    logo_url = company_data["miniCompany"]["logo"]["com.linkedin.common.VectorImage"]["rootUrl"] + logo_artifacts[0]["fileIdentifyingUrlPathSegment"]
    base64_logo = convert_to_base64(logo_url)

    company = db.session.query(Company).filter_by(company_name=company_name).first()
    if not company:
        company = Company(
            company_name=company_name,
            company_logo=base64_logo,
        )
        db.session.add(company)
        db.session.commit()
    return company

def create_position(position_data, company):
    position_name = position_data.get("title", "Unknown Position")
    position_description = position_data.get("description", "")
    start_date = datetime(position_data["timePeriod"]["startDate"]["year"], position_data["timePeriod"]["startDate"]["month"], 1)
    end_date = datetime(position_data["timePeriod"]["endDate"]["year"], position_data["timePeriod"]["endDate"]["month"], 1) if position_data.get("timePeriod", {}).get("endDate") else None
    location = position_data.get("locationName", "")

    print(position_name)

    position = Position(
        position_name=position_name,
        position_description=position_description,
        start_date=start_date,
        end_date=end_date,
        location=location,
        company_id=company.id
    )
    db.session.add(position)
    db.session.commit()
    return position

def create_assistant_experiences(json_data, assistant_id):
    for entry in json_data:
        if not entry["positions"] or "company" not in entry["positions"][0]:
            continue

        company_data = entry["positions"][0]["company"]
        company = get_or_create_company(company_data)

        for position_data in entry["positions"]:
            position = create_position(position_data, company)
            assistant_experience = AssistantExperience(
                assistant_id=assistant_id,
                position_id=position.id
            )
            db.session.add(assistant_experience)
    db.session.commit()

@app.route('/add-assistant-experiences', methods=['POST'])
def add_assistant_experiences():
    data = request.get_json()
  
    link = data.get('Link')
    assistant_id = data.get('AssistantId')
    try:
        experiences = fetchExperiences(link)
        delete_assistant_experiences(assistant_id)
        create_assistant_experiences(experiences, assistant_id)
        return jsonify({"status": "success"}), 201
    except ValueError as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": "An unexpected error occurred"}), 500


if __name__ == '__main__':
    app.run(port=1234, debug=True)
