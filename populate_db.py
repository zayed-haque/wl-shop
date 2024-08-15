from wl_shop_service import create_app, db
from wl_shop_service.models.product import Product, Category
from datetime import datetime


def create_categories():
    categories = [
        "Electronics",
        "Groceries",
        "Home & Kitchen",
        "Clothing",
        "Toys",
        "Health & Beauty",
        "Sports & Outdoors",
        "Automotive",
        "Pet Supplies",
        "Office Supplies",
    ]
    for cat_name in categories:
        category = Category.query.filter_by(name=cat_name).first()
        if not category:
            category = Category(name=cat_name)
            db.session.add(category)
    db.session.commit()


def create_products():
    products = [
        # Electronics
        {
            "name": '55" 4K Smart TV',
            "description": "Ultra HD Smart LED TV",
            "price": 399.99,
            "category": "Electronics",
            "image_url": "https://picsum.photos/id/0/300/200",
        },
        {
            "name": "Wireless Earbuds",
            "description": "True wireless Bluetooth earbuds",
            "price": 79.99,
            "category": "Electronics",
            "image_url": "https://picsum.photos/id/3/300/200",
        },
        {
            "name": "Laptop",
            "description": '15.6" HD Laptop with Intel Core i5',
            "price": 549.99,
            "category": "Electronics",
            "image_url": "https://picsum.photos/id/2/300/200",
        },
        # Groceries
        {
            "name": "Milk (1 Gallon)",
            "description": "Whole milk",
            "price": 3.49,
            "category": "Groceries",
            "image_url": "https://picsum.photos/id/10/300/200",
        },
        {
            "name": "Bread",
            "description": "Whole wheat bread loaf",
            "price": 2.49,
            "category": "Groceries",
            "image_url": "https://picsum.photos/id/20/300/200",
        },
        {
            "name": "Eggs (Dozen)",
            "description": "Large grade A eggs",
            "price": 2.99,
            "category": "Groceries",
            "image_url": "https://picsum.photos/id/30/300/200",
        },
        # Home & Kitchen
        {
            "name": "Microwave Oven",
            "description": "0.7 cu ft countertop microwave",
            "price": 64.99,
            "category": "Home & Kitchen",
            "image_url": "https://picsum.photos/id/40/300/200",
        },
        {
            "name": "Bedding Set",
            "description": "Queen size comforter set",
            "price": 79.99,
            "category": "Home & Kitchen",
            "image_url": "https://picsum.photos/id/50/300/200",
        },
        {
            "name": "Coffee Maker",
            "description": "12-cup programmable coffee maker",
            "price": 24.99,
            "category": "Home & Kitchen",
            "image_url": "https://picsum.photos/id/60/300/200",
        },
        # Clothing
        {
            "id": 123456,
            "name": "Men's T-Shirt",
            "description": "Cotton crew neck t-shirt",
            "price": 9.99,
            "category": "Clothing",
            "image_url": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSZsLMNnwPd7JuAXGN_t3ZJuQKK5lHMOF6XCKJjYylNpQBXQPsGAYYHpi16XHnhOS7kbNyJfefF6MkTmoTLoPMTbUxneV8hIXXf1fqT92Hh4m8",
        },
        {
            "name": "Women's Jeans",
            "description": "High-waisted skinny jeans",
            "price": 24.99,
            "category": "Clothing",
            "image_url": "https://picsum.photos/id/80/300/200",
        },
        {
            "name": "Kids' Sneakers",
            "description": "Light-up sneakers for children",
            "price": 19.99,
            "category": "Clothing",
            "image_url": "https://picsum.photos/id/90/300/200",
        },
        # Toys
        {
            "name": "LEGO Set",
            "description": "Classic creative building set",
            "price": 29.99,
            "category": "Toys",
            "image_url": "https://picsum.photos/id/100/300/200",
        },
        {
            "name": "Barbie Doll",
            "description": "Fashion doll with accessories",
            "price": 14.99,
            "category": "Toys",
            "image_url": "https://picsum.photos/id/110/300/200",
        },
        {
            "name": "Remote Control Car",
            "description": "RC off-road vehicle",
            "price": 39.99,
            "category": "Toys",
            "image_url": "https://picsum.photos/id/120/300/200",
        },
        # Health & Beauty
        {
            "name": "Shampoo",
            "description": "Moisturizing shampoo for all hair types",
            "price": 5.99,
            "category": "Health & Beauty",
            "image_url": "https://picsum.photos/id/130/300/200",
        },
        {
            "name": "Toothpaste",
            "description": "Fluoride toothpaste for cavity protection",
            "price": 3.49,
            "category": "Health & Beauty",
            "image_url": "https://picsum.photos/id/140/300/200",
        },
        {
            "name": "Multivitamins",
            "description": "Daily multivitamin tablets",
            "price": 8.99,
            "category": "Health & Beauty",
            "image_url": "https://picsum.photos/id/150/300/200",
        },
        # Sports & Outdoors
        {
            "name": "Yoga Mat",
            "description": "Non-slip exercise yoga mat",
            "price": 19.99,
            "category": "Sports & Outdoors",
            "image_url": "https://picsum.photos/id/160/300/200",
        },
        {
            "name": "Basketball",
            "description": "Official size and weight basketball",
            "price": 14.99,
            "category": "Sports & Outdoors",
            "image_url": "https://picsum.photos/id/170/300/200",
        },
        {
            "name": "Camping Tent",
            "description": "4-person dome tent",
            "price": 59.99,
            "category": "Sports & Outdoors",
            "image_url": "https://picsum.photos/id/180/300/200",
        },
        # Automotive
        {
            "name": "Motor Oil",
            "description": "5W-30 synthetic blend motor oil",
            "price": 22.99,
            "category": "Automotive",
            "image_url": "https://picsum.photos/id/190/300/200",
        },
        {
            "name": "Windshield Wipers",
            "description": "All-season windshield wiper blades",
            "price": 14.99,
            "category": "Automotive",
            "image_url": "https://picsum.photos/id/200/300/200",
        },
        {
            "name": "Car Battery",
            "description": "12-volt automotive battery",
            "price": 94.99,
            "category": "Automotive",
            "image_url": "https://picsum.photos/id/210/300/200",
        },
        # Pet Supplies
        {
            "name": "Dog Food",
            "description": "Adult dry dog food, 20 lbs",
            "price": 19.99,
            "category": "Pet Supplies",
            "image_url": "https://picsum.photos/id/220/300/200",
        },
        {
            "name": "Cat Litter",
            "description": "Clumping cat litter, 20 lbs",
            "price": 9.99,
            "category": "Pet Supplies",
            "image_url": "https://picsum.photos/id/230/300/200",
        },
        {
            "name": "Pet Bed",
            "description": "Comfortable pet bed for cats and dogs",
            "price": 24.99,
            "category": "Pet Supplies",
            "image_url": "https://picsum.photos/id/240/300/200",
        },
        # Office Supplies
        {
            "name": "Printer Paper",
            "description": "500 sheets multipurpose printer paper",
            "price": 5.99,
            "category": "Office Supplies",
            "image_url": "https://picsum.photos/id/250/300/200",
        },
        {
            "name": "Ballpoint Pens",
            "description": "Pack of 12 ballpoint pens",
            "price": 3.99,
            "category": "Office Supplies",
            "image_url": "https://picsum.photos/id/260/300/200",
        },
        {
            "name": "Desk Organizer",
            "description": "Mesh desk organizer",
            "price": 12.99,
            "category": "Office Supplies",
            "image_url": "https://picsum.photos/id/270/300/200",
        },
    ]

    for product_data in products:
        category = Category.query.filter_by(name=product_data["category"]).first()
        if category:
            product = Product.query.filter_by(name=product_data["name"]).first()
            if not product:
                product = Product(
                    id=product_data.get("id"),
                    name=product_data["name"],
                    description=product_data["description"],
                    price=product_data["price"],
                    category_id=category.id,
                    image_url=product_data["image_url"],
                )
                db.session.add(product)

    db.session.commit()


def main():
    app = create_app()
    with app.app_context():
        create_categories()
        create_products()
        print(
            "Database populated with sample Walmart-like products including image URLs!"
        )


if __name__ == "__main__":
    main()
