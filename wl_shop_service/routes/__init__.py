from flask import Blueprint


def create_store_blueprint(name):
    store_bp = Blueprint(name, __name__)

    @store_bp.url_value_preprocessor
    def pull_store_id(endpoint, values):
        if values is not None:
            values['store_id'] = values.pop('store_id', None)

    return store_bp
