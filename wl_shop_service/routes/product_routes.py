from flask import Blueprint, request, jsonify
from wl_shop_service.services.product_service import ProductService
from wl_shop_service.schemas.product_schema import product_schema, products_schema, CategorySchema
from marshmallow import ValidationError

product_bp = Blueprint('product', __name__)
category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)


@product_bp.route('/products', methods=['GET'])
def get_products():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    products = ProductService.get_all_products(page, per_page)
    return jsonify({
        'products': products_schema.dump(products.items),
        'total': products.total,
        'pages': products.pages,
        'page': page
    }), 200


@product_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = ProductService.get_product_by_id(product_id)
    return product_schema.jsonify(product), 200


@product_bp.route('/products', methods=['POST'])
def create_product():
    try:
        product_data = product_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    try:
        new_product = ProductService.create_product(product_data)
    except ValueError as e:
        return jsonify({'message': str(e)}), 400

    return product_schema.jsonify(new_product), 201


@product_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        product_data = product_schema.load(request.json, partial=True)
    except ValidationError as err:
        return jsonify(err.messages), 400

    updated_product = ProductService.update_product(product_id, product_data)
    return product_schema.jsonify(updated_product), 200


@product_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    ProductService.delete_product(product_id)
    return '', 204


@product_bp.route('/products/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    products = ProductService.search_products(query, page, per_page)
    return jsonify({
        'products': products_schema.dump(products.items),
        'total': products.total,
        'pages': products.pages,
        'page': page
    }), 200


@product_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = ProductService.get_all_categories()
    return categories_schema.jsonify(categories), 200


@product_bp.route('/categories', methods=['POST'])
def create_category():
    try:
        category_data = category_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_category = ProductService.create_category(category_data['name'])
    return category_schema.jsonify(new_category), 201
