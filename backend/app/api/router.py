from fastapi import APIRouter

from app.api.routes.auth import router as auth_router
from app.api.routes.cameras import router as cameras_router
from app.api.routes.dashboard import router as dashboard_router
from app.api.routes.system import router as system_router
from app.api.routes.users import router as users_router

api_router = APIRouter()
api_router.include_router(auth_router, prefix='/auth', tags=['auth'])
api_router.include_router(dashboard_router, prefix='/dashboard', tags=['dashboard'])
api_router.include_router(cameras_router, prefix='/cameras', tags=['cameras'])
api_router.include_router(users_router, prefix='/users', tags=['users'])
api_router.include_router(system_router, prefix='/system', tags=['system'])
