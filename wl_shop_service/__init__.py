from flask import Blueprint, Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta

db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False

    app.config.from_object("config.Config")
    #app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    #app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    from wl_shop_service.routes.auth_routes import auth_bp
    from wl_shop_service.routes.cart_routes import cart_bp
    from wl_shop_service.routes.order_routes import order_bp
    from wl_shop_service.routes.product_routes import product_bp
    from wl_shop_service.routes.store_routes import store_bp
    from wl_shop_service.routes.user_routes import user_bp

    # Create a parent blueprint for store-specific routes
    store_specific = Blueprint("store_specific", __name__)

    # Register store-specific blueprints
    store_specific.register_blueprint(product_bp, url_prefix="/<int:store_id>/products")

    # Register blueprints
    app.register_blueprint(cart_bp, url_prefix="/api")
    app.register_blueprint(order_bp, url_prefix="/api")
    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(store_bp, url_prefix="/api/stores")
    app.register_blueprint(store_specific, url_prefix="/api")

    return app
