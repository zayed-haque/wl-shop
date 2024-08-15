"""Add store_id to Product and Category models

Revision ID: 681ffebdced8
Revises: 457295e0e0d1
Create Date: 2024-08-15 19:13:00.226116

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '681ffebdced8'
down_revision = '457295e0e0d1'
branch_labels = None
depends_on = None


def upgrade():
    # Add store_id column as nullable first
    op.add_column('category', sa.Column('store_id', sa.Integer(), nullable=True))
    op.add_column('product', sa.Column('store_id', sa.Integer(), nullable=True))
    
    # Create a default store if it doesn't exist
    op.execute("INSERT INTO store (name, address) VALUES ('Default Store', 'Default Address') ON CONFLICT DO NOTHING")
    
    # Set a default store_id for existing categories and products
    op.execute("UPDATE category SET store_id = (SELECT id FROM store LIMIT 1) WHERE store_id IS NULL")
    op.execute("UPDATE product SET store_id = (SELECT id FROM store LIMIT 1) WHERE store_id IS NULL")
    
    # Now alter the column to be non-nullable
    op.alter_column('category', 'store_id', nullable=False)
    op.alter_column('product', 'store_id', nullable=False)
    
    # Add foreign key constraints
    op.create_foreign_key(None, 'category', 'store', ['store_id'], ['id'])
    op.create_foreign_key(None, 'product', 'store', ['store_id'], ['id'])

def downgrade():
    # Remove foreign key constraints
    op.drop_constraint(None, 'product', type_='foreignkey')
    op.drop_constraint(None, 'category', type_='foreignkey')
    
    # Drop the store_id columns
    op.drop_column('product', 'store_id')
    op.drop_column('category', 'store_id')
