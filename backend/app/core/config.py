from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = 'Larsen & Toubro AI Road Safety Platform'
    app_env: str = 'development'
    debug: bool = True
    api_prefix: str = '/api'
    jwt_secret: str = 'replace-with-a-long-random-secret'
    jwt_algorithm: str = 'HS256'
    jwt_expires_minutes: int = 240
    database_url: str = 'postgresql://lt_user:lt_password@127.0.0.1:5432/lt_platform'
    media_root: str = '/var/lib/lt-platform/media'
    allowed_origins: str = 'http://localhost:5173'

    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8', extra='ignore')


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()


settings = get_settings()


def get_allowed_origins() -> list[str]:
    return [origin.strip() for origin in settings.allowed_origins.split(',') if origin.strip()]
