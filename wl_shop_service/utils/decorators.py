from functools import wraps

from flask import abort, request


def store_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        store_id = request.headers.get("X-Store-ID")
        if not store_id:
            abort(400, description="Store ID is required")
        return f(*args, **kwargs)

    return decorated_function
