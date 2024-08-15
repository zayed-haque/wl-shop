from wl_shop_service import db
from datetime import datetime
from wl_shop_service.models.user import User
from wl_shop_service.models.product import Product


class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    items = db.relationship(
        "CartItem", back_populates="cart", cascade="all, delete-orphan"
    )
    user = db.relationship("User", back_populates="carts")

    def __repr__(self):
        return f"<Cart {self.id}>"


class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('cart.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    price = db.Column(db.Float, nullable=False)

    cart = db.relationship('Cart', back_populates='items')
    product = db.relationship('Product')
