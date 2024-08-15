from wl_shop_service import db
from wl_shop_service.models.store import Store, StoreInventory, StorePlan
from wl_shop_service.models.product import Product
from sqlalchemy.exc import IntegrityError


class StoreService:
    @staticmethod
    def get_all_stores(page=1, per_page=20):
        return Store.query.paginate(page=page, per_page=per_page, error_out=False)

    @staticmethod
    def get_store(store_id):
        return Store.query.get_or_404(store_id)

    @staticmethod
    def create_store(store_data):
        new_store = Store(**store_data)
        db.session.add(new_store)
        db.session.commit()
        return new_store

    @staticmethod
    def update_store(store_id, store_data):
        store = Store.query.get_or_404(store_id)
        for key, value in store_data.items():
            setattr(store, key, value)
        db.session.commit()
        return store

    @staticmethod
    def delete_store(store_id):
        store = Store.query.get_or_404(store_id)
        db.session.delete(store)
        db.session.commit()

    @staticmethod
    def get_store_inventory(store_id):
        return StoreInventory.query.filter_by(store_id=store_id).all()

    @staticmethod
    def get_item_quantity(store_id, product_id):
        inventory = StoreInventory.query.filter_by(store_id=store_id, product_id=product_id).first()
        if not inventory:
            raise ValueError("Product not found in store inventory")
        return inventory.quantity

    @staticmethod
    def update_item_quantity(store_id, product_id, quantity):
        inventory = StoreInventory.query.filter_by(store_id=store_id, product_id=product_id).first()
        if not inventory:
            inventory = StoreInventory(store_id=store_id, product_id=product_id, quantity=quantity)
            db.session.add(inventory)
        else:
            inventory.quantity = quantity
        db.session.commit()
        return inventory

    @staticmethod
    def get_store_plan(store_id):
        plan = StorePlan.query.filter_by(store_id=store_id).first()
        if not plan:
            raise ValueError("Store plan not found")
        return plan.image_url

    @staticmethod
    def set_store_plan(store_id, image_url):
        plan = StorePlan.query.filter_by(store_id=store_id).first()
        if not plan:
            plan = StorePlan(store_id=store_id, image_url=image_url)
            db.session.add(plan)
        else:
            plan.image_url = image_url
        db.session.commit()
        return plan
