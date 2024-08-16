from datetime import datetime

from wl_shop_service import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(20), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    carts = db.relationship("Cart", back_populates="user", lazy=True)
    orders = db.relationship("Order", back_populates="user", lazy=True)

    def __repr__(self):
        return f"<User {self.email}>"
