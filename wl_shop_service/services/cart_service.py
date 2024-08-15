from wl_shop_service import db
from wl_shop_service.models.cart import Cart, CartItem
from wl_shop_service.models.product import Product
from wl_shop_service.models.user import User


class CartService:
    @staticmethod
    def get_cart(user_id):
        # Check if user exists
        user = User.query.get(user_id)
        if not user:
            raise ValueError("User does not exist")

        cart = Cart.query.filter_by(user_id=user_id).first()
        if not cart:
            cart = Cart(user_id=user_id)
            db.session.add(cart)
            db.session.commit()
        return cart

    @staticmethod
    def add_item(user_id, product_id, quantity):
        cart = CartService.get_cart(user_id)
        product = Product.query.get_or_404(product_id)

        cart_item = CartItem.query.filter_by(cart_id=cart.id, product_id=product_id).first()
        if cart_item:
            cart_item.quantity += quantity
        else:
            cart_item = CartItem(
                cart_id=cart.id,
                product_id=product_id,
                quantity=quantity,
                price=product.price
            )
            db.session.add(cart_item)

        db.session.commit()
        return cart

    @staticmethod
    def update_item(user_id, product_id, quantity):
        cart = CartService.get_cart(user_id)
        cart_item = CartItem.query.filter_by(
            cart_id=cart.id, product_id=product_id
        ).first_or_404()

        if quantity > 0:
            cart_item.quantity = quantity
        else:
            db.session.delete(cart_item)

        db.session.commit()
        return cart

    @staticmethod
    def remove_item(user_id, product_id):
        cart = CartService.get_cart(user_id)
        cart_item = CartItem.query.filter_by(
            cart_id=cart.id, product_id=product_id
        ).first_or_404()

        db.session.delete(cart_item)
        db.session.commit()
        return cart

    @staticmethod
    def clear_cart(user_id):
        cart = CartService.get_cart(user_id)
        CartItem.query.filter_by(cart_id=cart.id).delete()
        db.session.commit()
        return cart
