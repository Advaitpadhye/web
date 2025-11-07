from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid

# User Models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    phone: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: str
    phone: str
    role: str = "user"  # user or admin
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserInDB(User):
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

# Admission Models
class AdmissionCreate(BaseModel):
    student_name: str
    parent_name: str
    email: EmailStr
    phone: str
    grade: str
    dob: str
    address: str
    previous_school: Optional[str] = ""

class Admission(AdmissionCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "pending"  # pending, approved, rejected
    submitted_at: datetime = Field(default_factory=datetime.utcnow)

class AdmissionStatusUpdate(BaseModel):
    status: str

# Contact Models
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str

class Contact(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Gallery Models
class GalleryCreate(BaseModel):
    title: str
    image_url: str
    category: str = "campus"

class Gallery(GalleryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    uploaded_by: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Announcement Models
class AnnouncementCreate(BaseModel):
    title: str
    content: str
    category: str = "general"

class Announcement(AnnouncementCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    is_active: bool = True
    created_by: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AnnouncementUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    is_active: Optional[bool] = None
