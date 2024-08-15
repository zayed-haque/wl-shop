from wl_shop_service import ma
from wl_shop_service.models.order import Order
from wl_shop_service.schemas.cart_schema import CartItemSchema
from marshmallow import fields


class OrderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        include_fk = True

    items = fields.Nested(CartItemSchema, many=True)


order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)
