from marshmallow import fields
from wl_shop_service.models.store import Store, StoreInventory, StorePlan

from wl_shop_service import ma


class StorePlanSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = StorePlan
        include_fk = True


class StoreInventorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = StoreInventory
        include_fk = True

    product = fields.Nested("ProductSchema", only=("id", "name", "price"))


class StoreSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Store
        include_fk = True

    inventories = fields.Nested(StoreInventorySchema, many=True)
    plan = fields.Nested(StorePlanSchema)


store_schema = StoreSchema()
stores_schema = StoreSchema(many=True)
store_inventory_schema = StoreInventorySchema()
stores_inventory_schema = StoreInventorySchema(many=True)
