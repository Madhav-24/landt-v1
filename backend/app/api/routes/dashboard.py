from fastapi import APIRouter

from app.services.catalog import cameras, demo_user, sites, users

router = APIRouter()


@router.get('/snapshot')
def snapshot() -> dict:
    return {
        'user': demo_user,
        'sites': sites,
        'cameras': cameras,
        'users': users,
    }


@router.get('/system-health')
def system_health() -> dict:
    return {
        'camera': {'total': 48, 'working': 45, 'offline': 3},
        'edgeDevice': {'total': 12, 'working': 11, 'offline': 1},
        'server': {
            'cpuUsage': 39,
            'ramUsage': 68,
            'storageUsed': 71,
            'storageFree': 29,
            'diskUsage': 52,
            'networkSpeed': '940 Mbps',
            'temperature': '48°C',
            'serverUptime': '36d 14h',
            'operatingSystem': 'Ubuntu 24.04 LTS',
            'pythonVersion': '3.11.9',
            'postgreSQLStatus': 'Healthy',
            'linuxStatus': 'Healthy',
            'fastAPIStatus': 'Running',
            'jwtStatus': 'Active',
            'lastSyncTime': '2026-07-08 10:42:12',
        },
        'trendSeries': [
            {'time': '08:00', 'cameras': 42, 'devices': 10},
            {'time': '10:00', 'cameras': 44, 'devices': 11},
            {'time': '12:00', 'cameras': 46, 'devices': 11},
            {'time': '14:00', 'cameras': 45, 'devices': 12},
            {'time': '16:00', 'cameras': 45, 'devices': 11},
        ],
    }
