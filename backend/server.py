from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from datetime import datetime

from models import (
    UserCreate, UserLogin, User, Token,
    AdmissionCreate, Admission, AdmissionStatusUpdate,
    ContactCreate, Contact,
    GalleryCreate, Gallery,
    AnnouncementCreate, Announcement, AnnouncementUpdate
)
from auth import (
    get_password_hash, verify_password, create_access_token,
    get_current_user, get_current_admin
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== Authentication Routes ====================

@api_router.post("/auth/register", response_model=Token)
async def register(user_data: UserCreate):
    """Register a new user"""
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    user = User(
        email=user_data.email,
        name=user_data.name,
        phone=user_data.phone,
        role="user"
    )
    
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    
    await db.users.insert_one(user_dict)
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role}
    )
    
    return Token(access_token=access_token, token_type="bearer", user=user)

@api_router.post("/auth/login", response_model=Token)
async def login(credentials: UserLogin):
    """Login user"""
    user = await db.users.find_one({"email": credentials.email})
    
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user["email"], "role": user["role"]}
    )
    
    user_obj = User(**{k: v for k, v in user.items() if k != "password"})
    
    return Token(access_token=access_token, token_type="bearer", user=user_obj)

@api_router.get("/auth/me", response_model=User)
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current user profile"""
    user = await db.users.find_one({"email": current_user["sub"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return User(**{k: v for k, v in user.items() if k != "password"})

@api_router.put("/auth/profile", response_model=User)
async def update_profile(
    name: str = None,
    phone: str = None,
    current_user: dict = Depends(get_current_user)
):
    """Update user profile"""
    update_data = {}
    if name:
        update_data["name"] = name
    if phone:
        update_data["phone"] = phone
    
    if update_data:
        await db.users.update_one(
            {"email": current_user["sub"]},
            {"$set": update_data}
        )
    
    user = await db.users.find_one({"email": current_user["sub"]})
    return User(**{k: v for k, v in user.items() if k != "password"})

# ==================== Admin Routes ====================

@api_router.post("/admin/login", response_model=Token)
async def admin_login(credentials: UserLogin):
    """Admin login"""
    user = await db.users.find_one({"email": credentials.email, "role": "admin"})
    
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials"
        )
    
    access_token = create_access_token(
        data={"sub": user["email"], "role": user["role"]}
    )
    
    user_obj = User(**{k: v for k, v in user.items() if k != "password"})
    
    return Token(access_token=access_token, token_type="bearer", user=user_obj)

@api_router.get("/admin/dashboard")
async def get_dashboard_stats(current_user: dict = Depends(get_current_admin)):
    """Get dashboard statistics"""
    total_users = await db.users.count_documents({"role": "user"})
    total_admissions = await db.admissions.count_documents({})
    pending_admissions = await db.admissions.count_documents({"status": "pending"})
    total_contacts = await db.contacts.count_documents({})
    total_gallery = await db.gallery.count_documents({})
    
    return {
        "total_users": total_users,
        "total_admissions": total_admissions,
        "pending_admissions": pending_admissions,
        "total_contacts": total_contacts,
        "total_gallery": total_gallery,
        "stats": {
            "students": 6000,
            "faculty": 400,
            "years": 7,
            "ratio": "35:1",
            "satisfaction": "100%"
        }
    }

@api_router.get("/admin/users", response_model=List[User])
async def get_all_users(current_user: dict = Depends(get_current_admin)):
    """Get all users (admin only)"""
    users = await db.users.find({"role": "user"}).to_list(1000)
    return [User(**{k: v for k, v in user.items() if k != "password"}) for user in users]

@api_router.delete("/admin/users/{user_id}")
async def delete_user(user_id: str, current_user: dict = Depends(get_current_admin)):
    """Delete a user (admin only)"""
    result = await db.users.delete_one({"id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}

# ==================== Admission Routes ====================

@api_router.post("/admissions", response_model=Admission)
async def submit_admission(admission_data: AdmissionCreate):
    """Submit admission application"""
    admission = Admission(**admission_data.dict())
    await db.admissions.insert_one(admission.dict())
    return admission

@api_router.get("/admissions", response_model=List[Admission])
async def get_all_admissions(current_user: dict = Depends(get_current_admin)):
    """Get all admission applications (admin only)"""
    admissions = await db.admissions.find().to_list(1000)
    return [Admission(**admission) for admission in admissions]

@api_router.get("/admissions/{admission_id}", response_model=Admission)
async def get_admission(admission_id: str, current_user: dict = Depends(get_current_user)):
    """Get specific admission application"""
    admission = await db.admissions.find_one({"id": admission_id})
    if not admission:
        raise HTTPException(status_code=404, detail="Admission not found")
    return Admission(**admission)

@api_router.put("/admissions/{admission_id}/status")
async def update_admission_status(
    admission_id: str,
    status_update: AdmissionStatusUpdate,
    current_user: dict = Depends(get_current_admin)
):
    """Update admission status (admin only)"""
    result = await db.admissions.update_one(
        {"id": admission_id},
        {"$set": {"status": status_update.status}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Admission not found")
    return {"message": "Status updated successfully"}

# ==================== Contact Routes ====================

@api_router.post("/contact", response_model=Contact)
async def submit_contact(contact_data: ContactCreate):
    """Submit contact form"""
    contact = Contact(**contact_data.dict())
    await db.contacts.insert_one(contact.dict())
    return contact

@api_router.get("/contact", response_model=List[Contact])
async def get_all_contacts(current_user: dict = Depends(get_current_admin)):
    """Get all contact submissions (admin only)"""
    contacts = await db.contacts.find().to_list(1000)
    return [Contact(**contact) for contact in contacts]

# ==================== Gallery Routes ====================

@api_router.get("/gallery", response_model=List[Gallery])
async def get_gallery():
    """Get all gallery images"""
    images = await db.gallery.find().to_list(1000)
    return [Gallery(**image) for image in images]

@api_router.post("/gallery", response_model=Gallery)
async def add_gallery_image(
    gallery_data: GalleryCreate,
    current_user: dict = Depends(get_current_admin)
):
    """Add new gallery image (admin only)"""
    gallery = Gallery(**gallery_data.dict(), uploaded_by=current_user["sub"])
    await db.gallery.insert_one(gallery.dict())
    return gallery

@api_router.delete("/gallery/{image_id}")
async def delete_gallery_image(
    image_id: str,
    current_user: dict = Depends(get_current_admin)
):
    """Delete gallery image (admin only)"""
    result = await db.gallery.delete_one({"id": image_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Image not found")
    return {"message": "Image deleted successfully"}

# ==================== Announcement Routes ====================

@api_router.get("/announcements", response_model=List[Announcement])
async def get_announcements():
    """Get all active announcements"""
    announcements = await db.announcements.find({"is_active": True}).to_list(1000)
    return [Announcement(**announcement) for announcement in announcements]

@api_router.post("/announcements", response_model=Announcement)
async def create_announcement(
    announcement_data: AnnouncementCreate,
    current_user: dict = Depends(get_current_admin)
):
    """Create new announcement (admin only)"""
    announcement = Announcement(**announcement_data.dict(), created_by=current_user["sub"])
    await db.announcements.insert_one(announcement.dict())
    return announcement

@api_router.put("/announcements/{announcement_id}", response_model=Announcement)
async def update_announcement(
    announcement_id: str,
    update_data: AnnouncementUpdate,
    current_user: dict = Depends(get_current_admin)
):
    """Update announcement (admin only)"""
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    
    if update_dict:
        result = await db.announcements.update_one(
            {"id": announcement_id},
            {"$set": update_dict}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Announcement not found")
    
    announcement = await db.announcements.find_one({"id": announcement_id})
    return Announcement(**announcement)

@api_router.delete("/announcements/{announcement_id}")
async def delete_announcement(
    announcement_id: str,
    current_user: dict = Depends(get_current_admin)
):
    """Delete announcement (admin only)"""
    result = await db.announcements.delete_one({"id": announcement_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return {"message": "Announcement deleted successfully"}

# ==================== Root Route ====================

@api_router.get("/")
async def root():
    return {"message": "Gurukul School API is running"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
