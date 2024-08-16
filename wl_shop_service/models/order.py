from datetime import datetime

from wl_shop_service import db


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default="pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    items = db.relationship(
        "CartItem", backref="order", lazy=True, cascade="all, delete-orphan"
    )
    user = db.relationship("User", back_populates="orders")

    def __repr__(self):
        return f"<Order {self.id}>"
