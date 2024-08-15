from wl_shop_service import db
from wl_shop_service.models.order import Order
from wl_shop_service.models.cart import Cart, CartItem


class OrderService:
    @staticmethod
    def create_order(user_id):
        cart = Cart.query.filter_by(user_id=user_id).first()
        if not cart or not cart.items:
            raise ValueError("Cart is empty")

        total_amount = sum(item.quantity * item.price for item in cart.items)

        if total_amount == 0:
            raise ValueError("Cart total is zero")

        order = Order(user_id=user_id, total_amount=total_amount)
        db.session.add(order)
        db.session.flush()  # This ensures the order gets an ID

        # Move items from cart to order
        for cart_item in cart.items:
            order_item = CartItem(
                order_id=order.id,
                product_id=cart_item.product_id,
                quantity=cart_item.quantity,
                price=cart_item.price
            )
            db.session.add(order_item)

        # Clear the cart
        db.session.query(CartItem).filter_by(cart_id=cart.id).delete()

        db.session.commit()
        return order

    @staticmethod
    def get_user_orders(user_id):
        return Order.query.filter_by(user_id=user_id).all()

    @staticmethod
    def get_order(order_id, user_id):
        return Order.query.filter_by(id=order_id, user_id=user_id).first()

    @staticmethod
    def update_order_status(order_id, user_id, new_status):
        order = Order.query.filter_by(id=order_id, user_id=user_id).first()
        if order:
            order.status = new_status
            db.session.commit()
            return order
        return None
