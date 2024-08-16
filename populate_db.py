from wl_shop_service import create_app, db
from wl_shop_service.models.product import Product, Category
from wl_shop_service.models.store import Store, StoreInventory
from datetime import datetime
import random


def create_stores():
    stores = [
        Store(name="Walmart Store Chennai", address="Velachery"),
    ]
    for store in stores:
        existing_store = Store.query.filter_by(name=store.name).first()
        if not existing_store:
            db.session.add(store)
    db.session.commit()
    return stores


def create_categories(store_id):
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
        category = Category.query.filter_by(name=cat_name, store_id=store_id).first()
        if not category:
            category = Category(name=cat_name, store_id=store_id)
            db.session.add(category)
    db.session.commit()


def create_products_and_inventory(store_id):
    products = [
        # Electronics
        {
            "name": '55" 4K Smart TV',
            "description": "Ultra HD Smart LED TV",
            "price": 399.99,
            "category": "Electronics",
            "image_url": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQTjjfGtnG6_VT-Vpo39-iwaBfze-1hwP49FcXDqERkatZF448zTzfQFtlF4k4ygmRq_q87aaTCgN1BPtD_8SO5D8jHyIOgUA-CQJV8IMOasjAG9Aa0jpBzZuo",
        },
        {
            "name": "Wireless Earbuds",
            "description": "True wireless Bluetooth earbuds",
            "price": 79.99,
            "category": "Electronics",
            "image_url": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS6tB_3IZ8BAZUHiqo7bLKccqOU6F2tqkJkPcjsY-jVohXca1HAbplWEpkgwXbjk5K8Tj4iLbifpicyyQ7dEbngfkCBJYvZ80eMrKEQ8r4jkUR10oPj8MMj1k4",
        },
        {
            "name": "Laptop",
            "description": '15.6" HD Laptop with Intel Core i5',
            "price": 549.99,
            "category": "Electronics",
            "image_url": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGvmq7q2scQNseEA8zzwsFhAAD64klPujdS4aCxVp20q6RecCH1WnmSFjThtB0nZbp5Z1XXi91zrJVYxmZkuvnr2b8ZmgwXUVxa1BNTNUbn0n5Ja-uEyFmbRcf",
        },
        # Groceries
        {
            "name": "Milk (1 Gallon)",
            "description": "Whole milk",
            "price": 3.49,
            "category": "Groceries",
            "image_url": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSqdpwLQmcLFPiBgscvMAeEracJkeA-j2SCaIaMcZuJ1xJrAnHbXipZt8OZoGC2VpegxBLSLYunoCHzLnUrpDZb_mah2skVtlo_4sj_9BG7BzbOQIFbI1moPp4b",
        },
        {
            "name": "Bread",
            "description": "Whole wheat bread loaf",
            "price": 2.49,
            "category": "Groceries",
            "image_url": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQByHHvkYaNa8DiERZuN5-JO9iqM7CxQQH5RMfWB_2UwcarmkuJxeftOQdkVMMYN2vzIfgVWhLKNqzBjNTwNAhgoITTu0HidgQAKBdB8fo_QkiCeXhCEIiisMSo",
        },
        {
            "name": "Eggs (Dozen)",
            "description": "Large grade A eggs",
            "price": 2.99,
            "category": "Groceries",
            "image_url": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTCFKHs6Z6LmoDr9UgMgqY2ssMqdHgIFrSY8bzt-W4-jM-t3eIm_ctp7VVaixUfkf-vgpFLMGSbJWXQPKdFe-CAqHVQ2TkT7PcIRNsb1WccHk0hMH4rD-e3ndI",
        },
        {
            "name": "Honitus Serup",
            "description": "Cough serup",
            "price": 2.99,
            "category": "Groceries",
            "image_url": "https://static.meds.cvpharmacy.in/wp-content/uploads/2024/06/7322_30f3d4a1-fe56-48aa-a394-9b3f975b5551_30f3d4a1-fe56-48aa-a394-9b3f975b5551-1.jpg",
        },
        # Home & Kitchen
        {
            "name": "Microwave Oven",
            "description": "0.7 cu ft countertop microwave",
            "price": 64.99,
            "category": "Home & Kitchen",
            "image_url": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTc9fJ5PaFHI-xgrIR4uvH5XYZ66MdCamXxZtZYHP6IL8mqywv_wRnFqn0ukkzmU138cciFsXb-lAaJ2c4tsZNM6zX3vpVQDODrBCCxHdJPscyXzWuO4e8f0Fus",
        },
        {
            "name": "Bedding Set",
            "description": "Queen size comforter set",
            "price": 79.99,
            "category": "Home & Kitchen",
            "image_url": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTDaEzT2ct7V7wUcdk9deyIgzN7laUhzH8sRKjee_1KYwyqhgTKz7pUPQsum5lhS_mrEVWYJMsbYqfZ8BLLhd0ntwf0-de8KOO3c86I7y1cCLNwQHS4PTZkSIoK",
        },
        {
            "name": "Coffee Maker",
            "description": "12-cup programmable coffee maker",
            "price": 24.99,
            "category": "Home & Kitchen",
            "image_url": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR8fcJpUprWSMxeHbpiGa_C2tkgu36lZuQwcu-_k4cP20ouSN8GqGfPKesPIVRGT2qtNschGUVw0bjHvpPu8tFm3Mx0REkibyTL-YMMOelfRoUXlRIvBJK6kvNY",
        },
        # Clothing
        {
            "id": 12345678,
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
            "image_url": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTxNmPDmidITwAbOnc8N5S1AVIVRGI_ddI9qCFhp949ddxi-HtCHe3DR8UvYy1JbnNHzIzA5Cxfas9IW4vxUpmIh96bDWr9gUgmIMwzMJZ_2oaceoEq0tfbHZc8UQ",
        },
        {
            "name": "Kids' Sneakers",
            "description": "Light-up sneakers for children",
            "price": 19.99,
            "category": "Clothing",
            "image_url": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRA0nc1Af8N1lvU_gZ5Z7fIoKTReKpIBnsutQhRSV7vUIRt6JOVCTWsiM5vDJS2M6enldf0AS2WSSA0ngBeEwHXWbLlybkGCO7ZuIBI-jYq-KzczTAcsmnMrBVO",
        },
    ]

    for product_data in products:
        category = Category.query.filter_by(name=product_data["category"], store_id=store_id).first()
        if category:
            product = Product.query.filter_by(name=product_data["name"], store_id=store_id).first()
            if not product:
                product = Product(
                    id=product_data.get("id"),
                    name=product_data["name"],
                    description=product_data["description"],
                    price=product_data["price"],
                    category_id=category.id,
                    image_url=product_data["image_url"],
                    store_id=store_id
                )
                db.session.add(product)
                db.session.flush()

                inventory = StoreInventory(
                    store_id=store_id,
                    product_id=product.id,
                    quantity=random.randint(10, 100),
                    section=f"{category.name[:1]}{random.randint(1, 5)}"
                )
                db.session.add(inventory)

    db.session.commit()

def main():
    app = create_app()
    with app.app_context():
        print("Starting database population...")
        stores = create_stores()
        for store in stores:
            print(f"Store created: {store.name} with ID: {store.id}")
            create_categories(store.id)
            print(f"Categories created for {store.name}")
            create_products_and_inventory(store.id)
            print(f"Products and inventory created for {store.name}")
        db.session.commit()
        print("All changes committed to the database")

if __name__ == "__main__":
    try:
        main()
        print("Database population completed successfully!")
    except Exception as e:
        print(f"An error occurred: {str(e)}")