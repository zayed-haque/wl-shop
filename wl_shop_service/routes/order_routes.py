from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from wl_shop_service.schemas.order_schema import order_schema, orders_schema
from wl_shop_service.services.order_service import OrderService

order_bp = Blueprint("order", __name__)


@order_bp.route("/checkout", methods=["POST"])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    try:
        order = OrderService.create_order(user_id)
        return order_schema.jsonify(order), 201
    except ValueError as e:
        return jsonify({"message": str(e)}), 400


@order_bp.route("/orders", methods=["GET"])
@jwt_required()
def get_user_orders():
    user_id = get_jwt_identity()
    orders = OrderService.get_user_orders(user_id)
    return orders_schema.jsonify(orders), 200


@order_bp.route("/orders/<int:order_id>", methods=["GET"])
@jwt_required()
def get_order(order_id):
    user_id = get_jwt_identity()
    order = OrderService.get_order(order_id, user_id)
    if order:
        return order_schema.jsonify(order), 200
    return jsonify({"message": "Order not found"}), 404


@order_bp.route("/orders/<int:order_id>/status", methods=["PUT"])
@jwt_required()
def update_order_status(order_id):
    user_id = get_jwt_identity()
    new_status = request.json.get("status")
    if not new_status:
        return jsonify({"message": "Status is required"}), 400

    order = OrderService.update_order_status(order_id, user_id, new_status)
    if order:
        return order_schema.jsonify(order), 200
    return jsonify({"message": "Order not found"}), 404
