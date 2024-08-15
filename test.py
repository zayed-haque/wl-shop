from wl_shop_service import db, create_app
from wl_shop_service.models.user import User

app = create_app()

with app.app_context():
    # Check if the user already exists
    existing_user = User.query.filter_by(id=1).first()
    if not existing_user:
        new_user = User(id=1, username='testuser', email='test@example.com')
        db.session.add(new_user)
        db.session.commit()
        print("User created successfully")
    else:
        print("User already exists")
