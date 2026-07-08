from fastapi import APIRouter

from app.services.catalog import cameras, sites
from app.services.media_service import persist_media

router = APIRouter()


@router.get('/sites')
def list_sites() -> list[dict]:
    return [site.model_dump() for site in sites]


@router.get('/')
def list_cameras() -> list[dict]:
    return [camera.model_dump() for camera in cameras]


@router.post('/{camera_id}/snapshot')
def create_snapshot(camera_id: str) -> dict:
    media_uri = persist_media(f'snapshots/{camera_id}.txt', b'snapshot placeholder')
    return {'ok': True, 'message': 'Snapshot Saved', 'cameraId': camera_id, 'imagePath': media_uri}


@router.post('/{camera_id}/recording')
def create_recording(camera_id: str) -> dict:
    media_uri = persist_media(f'videos/{camera_id}.txt', b'video placeholder')
    return {'ok': True, 'message': 'Video Saved Successfully', 'cameraId': camera_id, 'videoPath': media_uri}
