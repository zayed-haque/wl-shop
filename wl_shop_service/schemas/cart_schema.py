from marshmallow import fields
from wl_shop_service.models.cart import Cart, CartItem

from wl_shop_service import ma


class CartItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CartItem
        include_fk = True

    product = fields.Nested("ProductSchema", only=("id", "name", "price"))


class CartSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Cart
        include_fk = True

    items = fields.Nested(CartItemSchema, many=True)


cart_schema = CartSchema()
cart_item_schema = CartItemSchema()
