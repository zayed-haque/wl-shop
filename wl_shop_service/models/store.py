from datetime import datetime

from wl_shop_service import db


class Store(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    inventories = db.relationship(
        "StoreInventory", back_populates="store", cascade="all, delete-orphan"
    )
    plan = db.relationship(
        "StorePlan", uselist=False, back_populates="store", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Store {self.name}>"


class StoreInventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    store_id = db.Column(db.Integer, db.ForeignKey("store.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    section = db.Column(db.String(3), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    store = db.relationship("Store", back_populates="inventories")
    product = db.relationship("Product")

    def __repr__(self):
        return f"<StoreInventory {self.store_id}:{self.product_id}>"


class StorePlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    store_id = db.Column(
        db.Integer, db.ForeignKey("store.id"), nullable=False, unique=True
    )
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    store = db.relationship("Store", back_populates="plan")

    def __repr__(self):
        return f"<StorePlan {self.store_id}>"
