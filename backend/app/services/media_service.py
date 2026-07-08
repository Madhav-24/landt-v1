from pathlib import Path

from app.core.config import settings


def media_path(*parts: str) -> Path:
    root = Path(settings.media_root)
    root.mkdir(parents=True, exist_ok=True)
    return root.joinpath(*parts)


def persist_media(relative_path: str, content: bytes) -> str:
    file_path = media_path(relative_path)
    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_bytes(content)
    return str(file_path)
