from app.schemas import CameraResponse, SiteResponse, UserResponse

demo_user = UserResponse(
    id='u-admin-001',
    name='Madhav',
    email='admin@gmail.com',
    phone='+91-90000-00000',
    role='Admin',
    project='NH-44 Chennai Corridor',
)

sites = [
    SiteResponse(id='site-001', name='Southern Bypass Package A', cameras=8, working=7, offline=1, health=87),
    SiteResponse(id='site-002', name='Highway Widening Zone B', cameras=10, working=10, offline=0, health=100),
    SiteResponse(id='site-003', name='Bridge Approach Segment C', cameras=6, working=5, offline=1, health=83),
]

cameras = [
    CameraResponse(
        id='cam-101',
        siteId='site-001',
        siteName='Southern Bypass Package A',
        cameraName='AI Pole Cam 01',
        status='Working',
        feedLabel='Live HD Stream',
        detection='PPE Compliance',
    ),
    CameraResponse(
        id='cam-102',
        siteId='site-001',
        siteName='Southern Bypass Package A',
        cameraName='AI Pole Cam 02',
        status='Offline',
        feedLabel='Last Seen 4 min ago',
        detection='Vehicle Entry',
    ),
    CameraResponse(
        id='cam-203',
        siteId='site-002',
        siteName='Highway Widening Zone B',
        cameraName='AI Tower Cam 07',
        status='Working',
        feedLabel='Live HD Stream',
        detection='Speed Violation',
    ),
]

users = [
    UserResponse(id='u-1', name='Madhav', email='admin@gmail.com', phone=None, role='Admin', project='NH-44 Chennai Corridor'),
    UserResponse(id='u-2', name='Kiran Rao', email='kiran.rao@lt.com', phone=None, role='Project Manager', project='NH-44 Chennai Corridor'),
    UserResponse(id='u-3', name='Neha Singh', email='neha.singh@lt.com', phone=None, role='Safety Manager', project='NH-44 Chennai Corridor'),
    UserResponse(id='u-4', name='Arun Kumar', email='arun.kumar@lt.com', phone=None, role='AI Engineer', project='NH-44 Chennai Corridor'),
]
