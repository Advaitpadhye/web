import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from auth import get_password_hash
from datetime import datetime
import uuid

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_database():
    # MongoDB connection
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    print("Starting database seeding...")
    
    # Create admin user if not exists
    admin_exists = await db.users.find_one({"email": "admin@gurukulschool.net"})
    if not admin_exists:
        admin_user = {
            "id": str(uuid.uuid4()),
            "email": "admin@gurukulschool.net",
            "password": get_password_hash("admin123"),
            "name": "Admin",
            "phone": "+91 1234567890",
            "role": "admin",
            "created_at": datetime.utcnow()
        }
        await db.users.insert_one(admin_user)
        print("✓ Created admin user (email: admin@gurukulschool.net, password: admin123)")
    else:
        print("✓ Admin user already exists")
    
    # Seed gallery images
    gallery_count = await db.gallery.count_documents({})
    if gallery_count == 0:
        gallery_images = [
            {"title": "Campus Classroom", "image_url": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop", "category": "campus"},
            {"title": "Library", "image_url": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop", "category": "facilities"},
            {"title": "Student Life", "image_url": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop", "category": "students"},
            {"title": "Sports", "image_url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop", "category": "sports"},
            {"title": "Science Lab", "image_url": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=300&fit=crop", "category": "facilities"},
            {"title": "Campus Ground", "image_url": "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=300&fit=crop", "category": "campus"},
            {"title": "Music Room", "image_url": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop", "category": "facilities"},
            {"title": "Students Learning", "image_url": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop", "category": "students"},
            {"title": "Classroom", "image_url": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop", "category": "campus"},
            {"title": "Study Time", "image_url": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop", "category": "students"},
            {"title": "Group Study", "image_url": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=400&h=300&fit=crop", "category": "students"},
            {"title": "Discussion", "image_url": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop", "category": "students"}
        ]
        
        for img in gallery_images:
            gallery_item = {
                "id": str(uuid.uuid4()),
                "title": img["title"],
                "image_url": img["image_url"],
                "category": img["category"],
                "uploaded_by": "admin@gurukulschool.net",
                "created_at": datetime.utcnow()
            }
            await db.gallery.insert_one(gallery_item)
        
        print(f"✓ Created {len(gallery_images)} gallery images")
    else:
        print(f"✓ Gallery already has {gallery_count} images")
    
    # Seed announcements
    announcement_count = await db.announcements.count_documents({})
    if announcement_count == 0:
        announcements = [
            {
                "id": str(uuid.uuid4()),
                "title": "Admissions Open for 2025-26",
                "content": "We are excited to announce that admissions are now open for the academic year 2025-26. Apply now!",
                "category": "admissions",
                "is_active": True,
                "created_by": "admin@gurukulschool.net",
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Annual Sports Day",
                "content": "Join us for our annual sports day celebration on March 15th. All parents and students are invited!",
                "category": "events",
                "is_active": True,
                "created_by": "admin@gurukulschool.net",
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Academic Excellence Awards",
                "content": "Congratulations to all students who achieved outstanding results in the recent examinations!",
                "category": "achievements",
                "is_active": True,
                "created_by": "admin@gurukulschool.net",
                "created_at": datetime.utcnow()
            }
        ]
        
        await db.announcements.insert_many(announcements)
        print(f"✓ Created {len(announcements)} announcements")
    else:
        print(f"✓ Announcements already exist ({announcement_count} items)")
    
    print("\n✅ Database seeding completed!")
    print("\n📝 Login credentials:")
    print("   Admin - email: admin@gurukulschool.net, password: admin123")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
