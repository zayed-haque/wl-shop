from wl_shop_service import ma
from wl_shop_service.models.user import User


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ('created_at',)


user_schema = UserSchema()
users_schema = UserSchema(many=True)
