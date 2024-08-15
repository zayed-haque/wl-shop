from marshmallow import Schema, fields, validate


class TransactionSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    items = fields.Dict(required=True, keys=fields.int(), values=fields.Int())
    created_at = fields.DateTime(dump_only=True)


transaction_schema = TransactionSchema()
transactions_schema = TransactionSchema(many=True)
