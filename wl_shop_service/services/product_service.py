from wl_shop_service import db
from wl_shop_service.models.product import Product, Category
from sqlalchemy.exc import IntegrityError


class ProductService:
    @staticmethod
    def get_all_products(page=1, per_page=20):
        return Product.query.paginate(page=page, per_page=per_page, error_out=False)

    @staticmethod
    def get_product_by_id(product_id):
        return Product.query.get_or_404(product_id)

    @staticmethod
    def create_product(product_data):
        new_product = Product(**product_data)
        db.session.add(new_product)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Invalid category_id")
        return new_product

    @staticmethod
    def update_product(product_id, product_data):
        product = Product.query.get_or_404(product_id)
        for key, value in product_data.items():
            setattr(product, key, value)
        db.session.commit()
        return product

    @staticmethod
    def delete_product(product_id):
        product = Product.query.get_or_404(product_id)
        db.session.delete(product)
        db.session.commit()

    @staticmethod
    def search_products(query, page=1, per_page=20):
        return Product.query.filter(Product.name.ilike(f"%{query}%")).paginate(
            page=page, per_page=per_page, error_out=False
        )

    @staticmethod
    def get_all_categories():
        return Category.query.all()

    @staticmethod
    def create_category(name):
        new_category = Category(name=name)
        db.session.add(new_category)
        db.session.commit()
        return new_category
