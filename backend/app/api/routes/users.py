from fastapi import APIRouter

from app.services.catalog import users

router = APIRouter()


@router.get('/')
def list_users() -> list[dict]:
    return [user.model_dump() for user in users]
