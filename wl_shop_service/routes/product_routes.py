from flask import Blueprint, jsonify, request
from marshmallow import ValidationError

from wl_shop_service.schemas.product_schema import (CategorySchema,
                                                    product_schema,
                                                    products_schema)
from wl_shop_service.services.product_service import ProductService

product_bp = Blueprint("product", __name__)
category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)


@product_bp.route("/", methods=["GET"])
def get_products(store_id):
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)
    products = ProductService.get_store_products(store_id, page, per_page)
    return (
        jsonify(
            {
                "products": products_schema.dump(products.items),
                "total": products.total,
                "pages": products.pages,
                "page": page,
            }
        ),
        200,
    )


@product_bp.route("/<int:product_id>", methods=["GET"])
def get_product(store_id, product_id):
    product = ProductService.get_store_product(store_id, product_id)
    return jsonify(product_schema.dump(product)), 200


@product_bp.route("/", methods=["POST"])
def create_product(store_id):
    try:
        product_data = product_schema.load(request.json)
        product_data["store_id"] = store_id
    except ValidationError as err:
        return jsonify(err.messages), 400

    try:
        new_product = ProductService.create_store_product(product_data)
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

    return jsonify(product_schema.dump(new_product)), 201


@product_bp.route("/<int:product_id>", methods=["PUT"])
def update_product(store_id, product_id):
    try:
        product_data = product_schema.load(request.json, partial=True)
    except ValidationError as err:
        return jsonify(err.messages), 400

    updated_product = ProductService.update_store_product(
        store_id, product_id, product_data
    )
    return jsonify(product_schema.dump(updated_product)), 200


@product_bp.route("/<int:product_id>", methods=["DELETE"])
def delete_product(store_id, product_id):
    ProductService.delete_store_product(store_id, product_id)
    return "", 204


@product_bp.route("/search", methods=["GET"])
def search_products(store_id):
    query = request.args.get("q", "")
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)
    products = ProductService.search_store_products(store_id, query, page, per_page)
    return (
        jsonify(
            {
                "products": products_schema.dump(products.items),
                "total": products.total,
                "pages": products.pages,
                "page": page,
            }
        ),
        200,
    )


@product_bp.route("/categories", methods=["GET"])
def get_categories(store_id):
    categories = ProductService.get_store_categories(store_id)
    return jsonify(categories_schema.dump(categories)), 200


@product_bp.route("/categories", methods=["POST"])
def create_category(store_id):
    try:
        category_data = category_schema.load(request.json)
        category_data["store_id"] = store_id
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_category = ProductService.create_store_category(category_data)
    return jsonify(category_schema.dump(new_category)), 201
