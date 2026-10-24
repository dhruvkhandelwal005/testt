
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import sqlite3

app = FastAPI(title="Login and Register API")

DATABASE = "users.db"


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


# Create database table automatically
with get_db() as conn:
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )
    """)


class User(BaseModel):
    name: str
    email: EmailStr


@app.get("/")
def home():
    return {"message": "Login/Register API is running"}


@app.post("/register")
def register(user: User):
    name = user.name.strip()
    email = str(user.email).lower()

    if not name:
        raise HTTPException(status_code=400, detail="Name is required")

    conn = get_db()
    try:
        conn.execute(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            (name, email)
        )
        conn.commit()
        return {"message": "Registration successful"}
    except sqlite3.IntegrityError:
        raise HTTPException(
            status_code=409,
            detail="Email already registered. Please sign in."
        )
    finally:
        conn.close()


@app.post("/login")
def login(user: User):
    name = user.name.strip()
    email = str(user.email).lower()

    conn = get_db()
    try:
        existing_user = conn.execute(
            "SELECT id, name, email FROM users WHERE name = ? AND email = ?",
            (name, email)
        ).fetchone()

        if not existing_user:
            raise HTTPException(
                status_code=401,
                detail="User not found. Please register first."
            )

        return {
            "message": "Login successful",
            "user": dict(existing_user)
        }
    finally:
        conn.close()
