from flask import Blueprint, request, jsonify
from wl_shop_service.services.user_service import UserService
from wl_shop_service.schemas.user_schema import user_schema
from flask_jwt_extended import create_access_token

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
