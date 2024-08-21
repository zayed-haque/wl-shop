from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_raw_jwt, set_access_cookies, get_jwt_identity
import datetime

from wl_shop_service.schemas.user_schema import user_schema
from wl_shop_service.services.user_service import UserService

user_bp = Blueprint("user", __name__)


@user_bp.route("/register", methods=["POST"])
def register_user():
    data = request.json
    try:
        new_user = UserService.create_user(
            first_name=data.get("first_name"),
            last_name=data.get("last_name"),
            email=data.get("email"),
            phone_number=data.get("phone_number"),
        )
        # Create a JWT token for the new user
        access_token = create_access_token(identity=new_user.id)
        return (
            jsonify(
                {
                    "message": "User registered successfully",
                    "user": user_schema.dump(new_user),
                    "access_token": access_token,
                }
            ),
            201,
        )
    except ValueError as e:
        return jsonify({"message": str(e)}), 400


@user_bp.route("/login", methods=["POST"])
def login_user():
    data = request.json
    user = UserService.get_user_by_email(data.get("email"))
    if user:
        access_token = create_access_token(identity=user.id)
        return (
            jsonify(
                {
                    "message": "Login successful",
                    "user": user_schema.dump(user),
                    "access_token": access_token,
                }
            ),
            200,
        )
    else:
        return jsonify({"message": "Invalid email"}), 401
    
# @user_bp.route
# def refresh_jwt_if_near_expiring(response):
#     expires_time = get_raw_jwt().get('exp')
#     if not expires_time:
#         return response
    
#     target_time = datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
#     if (target_time > expires_time):
#         access_token = create_access_token(identity=get_jwt_identity())
#         set_access_cookies(response, access_token)

#     return response