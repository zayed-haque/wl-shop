from marshmallow import Schema, fields, validate


class CategorySchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(max=50))


class ProductSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(max=100))
    description = fields.Str()
    price = fields.Float(required=True, validate=validate.Range(min=0))
    category_id = fields.Int(required=True)
    image_url = fields.Url()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    category = fields.Nested(CategorySchema, dump_only=True)


product_schema = ProductSchema()
products_schema = ProductSchema(many=True)
