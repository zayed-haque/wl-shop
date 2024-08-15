from marshmallow import Schema, fields, validate
from product_schema import ProductSchema, CategorySchema 


class StoreSchema(Schema):
    id  = fields.Int(dump_only=True)
    category_id = CategorySchema.id
    section = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)  


class StoreInventorySchema(Schema):
    product_id = fields.Nested(ProductSchema, only=("id",))
    quantity = fields.Int(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True) 

store_schema = StoreSchema()
stores_schema = StoreSchema(many=True)

store_inventory_schema = StoreInventorySchema()
stores_inventory_schema = StoreInventorySchema(many=True)