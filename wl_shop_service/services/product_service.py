from wl_shop_service import db
from wl_shop_service.models.product import Product, Category
from sqlalchemy.exc import IntegrityError


class ProductService:
    @staticmethod
    def get_store_products(store_id, page=1, per_page=20):
        return Product.query.filter_by(store_id=store_id).paginate(page=page, per_page=per_page, error_out=False)

    @staticmethod
    def get_store_product(store_id, product_id):
        return Product.query.filter_by(store_id=store_id, id=product_id).first_or_404()

    @staticmethod
    def create_store_product(product_data):
        new_product = Product(**product_data)
        db.session.add(new_product)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Invalid category_id or store_id")
        return new_product

    @staticmethod
    def update_store_product(store_id, product_id, product_data):
        product = Product.query.filter_by(store_id=store_id, id=product_id).first_or_404()
        for key, value in product_data.items():
            setattr(product, key, value)
        db.session.commit()
        return product

    @staticmethod
    def delete_store_product(store_id, product_id):
        product = Product.query.filter_by(store_id=store_id, id=product_id).first_or_404()
        db.session.delete(product)
        db.session.commit()

    @staticmethod
    def search_store_products(store_id, query, page=1, per_page=20):
        return Product.query.filter(
            Product.store_id == store_id,
            Product.name.ilike(f"%{query}%")
        ).paginate(page=page, per_page=per_page, error_out=False)

    @staticmethod
    def get_store_categories(store_id):
        return Category.query.filter_by(store_id=store_id).all()

    @staticmethod
    def create_store_category(category_data):
        new_category = Category(**category_data)
        db.session.add(new_category)
        db.session.commit()
        return new_category

    @staticmethod
    def get_all_products(page=1, per_page=20):
        return Product.query.paginate(page=page, per_page=per_page, error_out=False)

    @staticmethod
    def get_all_categories():
        return Category.query.all()
