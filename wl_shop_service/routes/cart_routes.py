from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.orm.exc import NoResultFound

from wl_shop_service.schemas.cart_schema import cart_schema
from wl_shop_service.services.cart_service import CartService

cart_bp = Blueprint("cart", __name__)


@cart_bp.route("/cart", methods=["GET"])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    try:
        cart = CartService.get_cart(user_id)
        return cart_schema.jsonify(cart), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 404


@cart_bp.route("/cart/add", methods=["POST"])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.json
    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)

    if not product_id:
        return jsonify({"message": "Product ID is required"}), 400

    try:
        quantity = int(quantity)
        if quantity <= 0:
            return jsonify({"message": "Quantity must be a positive integer"}), 400
    except ValueError:
        return jsonify({"message": "Invalid quantity"}), 400

    try:
        cart = CartService.add_item(user_id, product_id, quantity)
        return cart_schema.jsonify(cart), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 404
    except NoResultFound:
        return jsonify({"message": "Product not found"}), 404


@cart_bp.route("/cart/update", methods=["PUT"])
@jwt_required()
def update_cart_item():
    user_id = get_jwt_identity()
    data = request.json
    product_id = data.get("product_id")
    quantity = data.get("quantity")

    if not product_id or quantity is None:
        return jsonify({"message": "Product ID and quantity are required"}), 400

    try:
        quantity = int(quantity)
        if quantity < 0:
            return jsonify({"message": "Quantity must be a non-negative integer"}), 400
    except ValueError:
        return jsonify({"message": "Invalid quantity"}), 400

    try:
        cart = CartService.update_item(user_id, product_id, quantity)
        return cart_schema.jsonify(cart), 200
    except NoResultFound:
        return jsonify({"message": "Cart item not found"}), 404


@cart_bp.route("/cart/remove", methods=["DELETE"])
@jwt_required()
def remove_from_cart():
    user_id = get_jwt_identity()
    product_id = request.args.get("product_id")

    if not product_id:
        return jsonify({"message": "Product ID is required"}), 400

    try:
        cart = CartService.remove_item(user_id, product_id)
        return cart_schema.jsonify(cart), 200
    except NoResultFound:
        return jsonify({"message": "Cart item not found"}), 404


@cart_bp.route("/cart/clear", methods=["DELETE"])
@jwt_required()
def clear_cart():
    user_id = get_jwt_identity()
    try:
        cart = CartService.clear_cart(user_id)
        return cart_schema.jsonify(cart), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 404
