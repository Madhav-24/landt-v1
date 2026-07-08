from fastapi import APIRouter, HTTPException, status

from app.core.security import create_access_token
from app.schemas import LoginRequest, LoginResponse, UserResponse
from app.services.catalog import demo_user

router = APIRouter()


@router.post('/login', response_model=LoginResponse)
def login(payload: LoginRequest) -> LoginResponse:
    normalized = payload.identifier.strip().lower()
    if normalized in {'admin@gmail.com', 'madhav', 'admin'} and payload.password == 'Admin@1234':
        return LoginResponse(token=create_access_token(subject=demo_user.email, claims={'role': demo_user.role}), user=demo_user)
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid credentials')

