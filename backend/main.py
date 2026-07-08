from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import get_allowed_origins, settings
from app.core.logging_config import configure_logging
from app.services.scheduler import start_scheduler

configure_logging()

app = FastAPI(title=settings.app_name, version='1.0.0', docs_url='/docs', redoc_url='/redoc')
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)
app.include_router(api_router, prefix=settings.api_prefix)


@app.on_event('startup')
def on_startup() -> None:
    start_scheduler()


@app.get('/health')
def health() -> dict:
    return {
        'status': 'ok',
        'service': settings.app_name,
        'environment': settings.app_env,
    }
