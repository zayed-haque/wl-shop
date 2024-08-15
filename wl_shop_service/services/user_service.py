from wl_shop_service import db
from wl_shop_service.models.user import User
from sqlalchemy.exc import IntegrityError
import re


class UserService:
    @staticmethod
    def create_user(first_name, last_name, email, phone_number):
        # Validate email
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Invalid email format")

        if not re.match(r"^\+?1?\d{9,15}$", phone_number):
            raise ValueError("Invalid phone number format")

        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number,
        )

        try:
            db.session.add(new_user)
            db.session.commit()
            return new_user
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Email or phone number already exists")

    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()
