from flask import Blueprint, request, jsonify
from wl_shop_service.services.product_service import ProductService
from wl_shop_service.schemas.product_schema import product_schema, products_schema, CategorySchema
from marshmallow import ValidationError

product_bp = Blueprint('product_bp', __name__)
