from flask import Blueprint, request, jsonify
from wl_shop_service.services.cart_service import CartService
from wl_shop_service.schemas.cart_schema import (
    cart_schema,
    carts_schema,
    CartItemSchema,
)

cart_bp = Blueprint("cart_bp", __name__)
cart_item_schema = CartItemSchema()
cart_items_schema = CartItemSchema(many=True)


@cart_bp.route("/carts", methods=["POST"])
def create_cart():
    user_id = request.json.get("user_id")
    cart_id = CartService.create_cart(user_id)
    return jsonify({"cart_id": cart_id}), 201


@cart_bp.route("/carts/<string:cart_id>", methods=["GET"])
def get_cart_items(cart_id):
    cart_items = CartService.get_cart_items(cart_id)
    return jsonify({"cart_items": cart_items_schema.dump(cart_items)}), 200


@cart_bp.route("/carts/<string:cart_id>/items", methods=["POST"])
def add_item_to_cart(cart_id):
    product_id = request.json.get("product_id")
    quantity = request.json.get("quantity")
    cart_item = CartService.add_item_to_cart(cart_id, product_id, quantity)
    return cart_item_schema.jsonify(cart_item), 201


@cart_bp.route("/carts/<string:cart_id>/items/<int:product_id>", methods=["PUT"])
def update_cart_item(cart_id, product_id):
    quantity = request.json.get("quantity")
    cart_item = CartService.update_cart_item(cart_id, product_id, quantity)
    return cart_item_schema.jsonify(cart_item), 200


@cart_bp.route("/carts/<string:cart_id>/items/<int:product_id>", methods=["DELETE"])
def delete_cart_item(cart_id, product_id):
    CartService.delete_cart_item(cart_id, product_id)
    return "", 204
