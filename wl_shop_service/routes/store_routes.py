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
def get_store(store_id):
    store = StoreService.get_store_by_id(store_id)
    return jsonify(store_schema.dump(store)), 200


@store_bp.route("/stores", methods=["POST"])
def create_store():
    try:
        store_data = store_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    try:
        new_store = StoreService.create_store(store_data)
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

    return jsonify(store_schema.dump(new_store)), 201


@store_bp.route("/stores/<int:store_id>", methods=["PUT"])
def update_store(store_id):
    try:
        store_data = store_schema.load(request.json, partial=True)
    except ValidationError as err:
        return jsonify(err.messages), 400

    store = StoreService.update_store(store_id, store_data)
    return jsonify(store_schema.dump(store)), 200


@store_bp.route("/stores/<int:store_id>", methods=["DELETE"])
def delete_store(store_id):
    StoreService.delete_store(store_id)
    return "", 204


@store_bp.route("/stores/search", methods=["GET"])
def search_stores():
    query = request.args.get("query", "")
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)
    stores = StoreService.search_stores(query, page, per_page)
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


@store_bp.route("/stores/<int:store_id>/category/<int:category_id>", methods=["GET"])
def get_section_by_store_id(store_id, category_id):
    try:
        section = StoreService.get_section_by_store_id(store_id, category_id)
    except ValueError as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"section": section}), 200


@store_bp.route("/stores/<int:store_id>/inventory", methods=["GET"])
def get_store_inventory(store_id):
    inventory = StoreService.get_store_inventory(store_id)
    return jsonify(stores_inventory_schema.dump(inventory)), 200
