from flask import Blueprint, request, jsonify
from wl_shop_service.services.store_service import StoreService
from wl_shop_service.schemas.store_schema import store_schema, stores_schema, store_inventory_schema, stores_inventory_schema
from marshmallow import ValidationError

store_bp = Blueprint("store", __name__)


@store_bp.route("/stores", methods=["GET"])
def get_stores():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)
    stores = StoreService.get_all_stores(page, per_page)
    return (
        jsonify(
            {
                "stores": stores_schema.dump(stores.items),
                "total": stores.total,
                "pages": stores.pages,
                "page": page,
            }
        ),
        200,
    )


@store_bp.route("/stores/<int:store_id>", methods=["GET"])
def get_full_store(store_id):
    store = StoreService.get_full_store_inventory(store_id)
    return jsonify(store_inventory_schema.dump(store)), 200


@store_bp.route("/stores/<int:store_id>", methods=["POST"])
def create_store_inventory():
    try:
        store_data = store_inventory_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    try:
        new_store = StoreService.create_store_inventory(store_data)
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

    return jsonify(store_inventory_schema.dump(new_store)), 201


@store_bp.route("/stores/<int:store_id/<int:product_id>", methods=["GET"])
def get_item_quantity(store_id, product_id):
    try:
        quantity = StoreService.get_item_quantity(store_id, product_id)
    except ValueError as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"quantity": quantity}), 200


@store_bp.route("/stores/<int:store_id>/<int:product_id>", methods=["PUT"])
def update_item_quantity(store_id, product_id):
    try:
        quantity = request.json["quantity"]
    except KeyError:
        return jsonify({"message": "quantity is required"}), 400

    try:
        store = StoreService.update_item_quantity(store_id, product_id, quantity)
    except ValueError as e:
        return jsonify({"message": str(e)}), 400
    return jsonify(store_inventory_schema.dump(store)), 200


@store_bp.route("/stores/<int:store_id>", methods=["DELETE"])
def delete_store_inventory(store_id):
    StoreService.delete_store_inventory(store_id)
    return "", 204


@store_bp.route("/stores/<int:store_id>/plan", methods=["GET"])
def get_store_plan(store_id):
    plan = StoreService.get_store_plan(store_id)
    return jsonify({"image_url": plan}), 200