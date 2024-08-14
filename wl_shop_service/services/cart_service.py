from wl_shop_service import db
from wl_shop_service.models.cart import Cart, CartItem
from sqlalchemy.exc import IntegrityError
from uuid import uuid4 as uuid


class CartService:
    @staticmethod
    def create_cart(user_id):
        try:
            cart_id = str(uuid.uuid4())
            cart = Cart(id=cart_id, user_id=user_id)
            db.session.add(cart)
            db.session.commit()
            return cart_id

        except IntegrityError:
            db.session.rollback()
            raise Exception("Failed to create cart")

    @staticmethod
    def get_cart_items(cart_id):
        return CartItem.query.filter_by(cart_id=cart_id).all()

    @staticmethod
    def add_item_to_cart(cart_id, product_id, quantity):
        cart_item = CartItem(cart_id=cart_id, product_id=product_id, quantity=quantity)
        db.session.add(cart_item)
        db.session.commit()
        return cart_item

    @staticmethod
    def update_cart_item(cart_id, product_id, quantity):
        cart_item = CartItem.query.filter_by(cart_id=cart_id, product_id=product_id).first()
        cart_item.quantity = quantity
        db.session.commit()
        return cart_item

    @staticmethod
    def delete_cart_item(cart_id, product_id):
        cart_item = CartItem.query.filter_by(cart_id=cart_id, product_id=product_id).first()
        db.session.delete(cart_item)
        db.session.commit()
