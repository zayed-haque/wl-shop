from wl_shop_service import db
from wl_shop_service.models.store import Store
from sqlalchemy.exc import IntegrityError


class StoreService:
    @staticmethod
    def get_all_stores(page=1, per_page=20):
        return Store.query.paginate(page=page, per_page=per_page, error_out=False)

    @staticmethod
    def get_store_by_id(store_id):
        return Store.query.get_or_404(store_id)

    @staticmethod
    def create_store(store_data):
        new_store = Store(**store_data)
        db.session.add(new_store)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Invalid store_id")
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
    def search_stores(query, page=1, per_page=20):
        return Store.query.filter(Store.name.ilike(f"%{query}%")).paginate(
            page=page, per_page=per_page, error_out=False
        )
    
    @staticmethod
    def get_section_by_store_id(store_id, category_id):
        store = Store.query.get_or_404(store_id)
        if store.category_id == category_id:
            return store.section
        else:
            raise ValueError("Invalid category_id")
