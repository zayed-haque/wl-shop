from flask import Blueprint, request, jsonify
from wl_shop_service.services.store_service import StoreService
from wl_shop_service.schemas.store_schema import store_schema, stores_schema, store_inventory_schema, stores_inventory_schema
from marshmallow import ValidationError

store_bp = Blueprint('store', __name__)


@store_bp.route('/', methods=['GET'])
def get_all_stores():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    stores = StoreService.get_all_stores(page, per_page)
    return jsonify({
        "stores": stores_schema.dump(stores.items),
        "total": stores.total,
        "pages": stores.pages,
        "page": page
    }), 200


@store_bp.route('/', methods=['POST'])
def create_store():
    data = request.json
    try:
        new_store = StoreService.create_store(data)
        return jsonify(store_schema.dump(new_store)), 201
    except ValidationError as e:
        return jsonify({"message": str(e)}), 400


@store_bp.route('/<int:store_id>', methods=['GET'])
def get_store(store_id):
    store = StoreService.get_store(store_id)
    return jsonify(store_schema.dump(store)), 200


@store_bp.route('/<int:store_id>', methods=['PUT'])
def update_store(store_id):
    data = request.json
    try:
        updated_store = StoreService.update_store(store_id, data)
        return jsonify(store_schema.dump(updated_store)), 200
    except ValidationError as e:
        return jsonify({"message": str(e)}), 400


@store_bp.route('/<int:store_id>', methods=['DELETE'])
def delete_store(store_id):
    StoreService.delete_store(store_id)
    return jsonify({"message": "Store deleted successfully"}), 200


@store_bp.route('/<int:store_id>/inventory', methods=['GET'])
def get_store_inventory(store_id):
    inventory = StoreService.get_store_inventory(store_id)
    return jsonify(stores_inventory_schema.dump(inventory)), 200


@store_bp.route('/<int:store_id>/inventory/<int:product_id>', methods=['GET'])
def get_item_quantity(store_id, product_id):
    try:
        quantity = StoreService.get_item_quantity(store_id, product_id)
        return jsonify({"quantity": quantity}), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 404


@store_bp.route('/<int:store_id>/inventory/<int:product_id>', methods=['PUT'])
def update_item_quantity(store_id, product_id):
    data = request.json
    try:
        quantity = data['quantity']
        inventory = StoreService.update_item_quantity(store_id, product_id, quantity)
        return jsonify(store_inventory_schema.dump(inventory)), 200
    except KeyError:
        return jsonify({"message": "Quantity is required"}), 400
    except ValueError as e:
        return jsonify({"message": str(e)}), 400


@store_bp.route('/<int:store_id>/plan', methods=['GET'])
def get_store_plan(store_id):
    try:
        plan_url = StoreService.get_store_plan(store_id)
        return jsonify({"image_url": plan_url}), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 404


@store_bp.route('/<int:store_id>/plan', methods=['PUT'])
def set_store_plan(store_id):
    data = request.json
    try:
        image_url = data['image_url']
        updated_plan = StoreService.set_store_plan(store_id, image_url)
        return jsonify({"message": "Store plan updated successfully", "plan": updated_plan}), 200
    except KeyError:
        return jsonify({"message": "Image URL is required"}), 400
