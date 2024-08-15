from wl_shop_service import db
from wl_shop_service.models.product import Category
from datetime import datetime


class Store(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer,db.ForeignKey("category.id"), nullable=False)
    section = db.Column(db.String(3), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    def __repr__(self):
        return f"<Store {self.id}>"
    

class StoreInventory(db.model):
    product_id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    def __repr__(self):
        return f"<StoreInventory {self.product_id}>"


class StorePlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    def __repr__(self):
        return f"<StorePlan {self.id}>"