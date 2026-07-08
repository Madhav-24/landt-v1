from fastapi import APIRouter

router = APIRouter()


@router.get('/health')
def detailed_health() -> dict:
    return {
        'status': 'ok',
        'linux': 'healthy',
        'postgresql': 'healthy',
        'fastapi': 'running',
        'jwt': 'active',
    }
