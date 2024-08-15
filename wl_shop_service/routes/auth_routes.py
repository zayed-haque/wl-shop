from flask import Blueprint, jsonify
from wl_shop_service.utils.auth import generate_test_token

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/get-test-token/<int:user_id>', methods=['GET'])
def get_test_token(user_id):
    token = generate_test_token(user_id)
    return jsonify({"token": token}), 200
