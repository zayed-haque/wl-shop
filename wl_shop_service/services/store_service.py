from wl_shop_service import db
from wl_shop_service.models.store import Store, StoreInventory, StorePlan
from sqlalchemy.exc import IntegrityError


class StoreService:
    @staticmethod
    def get_all_stores(page=1, per_page=20):
        return Store.query.paginate(page=page, per_page=per_page, error_out=False)

    @staticmethod
    def create_store_inventory(store_data):
        new_store = StoreInventory(**store_data)
        db.session.add(new_store)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Invalid product_id")
        return new_store
    
    @staticmethod
    def get_full_store_inventory(store_id):
        store = StoreInventory.query.get_or_404(store_id)
        return store
    
    @staticmethod
    def get_item_quantity(store_id, product_id):
        store = StoreInventory.query.get_or_404(store_id)
        if store.product_id == product_id:
            return store.quantity
        else:
            raise ValueError("Invalid product_id")
        
    @staticmethod
    def update_item_quantity(store_id, product_id, quantity):
        store = StoreInventory.query.get_or_404(store_id)
        if store.product_id == product_id:
            store.quantity = quantity
            db.session.commit()
            return store
        else:
            raise ValueError("Invalid product_id")
        
    @staticmethod
    def delete_store_inventory(store_id):
        store = StoreInventory.query.get_or_404(store_id)
        db.session.delete(store)
        db.session.commit()

    @staticmethod
    def get_store_plan(store_id):
        store = StorePlan.query.get_or_404(store_id)
        return store.image_url