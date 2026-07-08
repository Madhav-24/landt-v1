from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    identifier: str = Field(min_length=3)
    password: str = Field(min_length=6)


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str | None = None
    role: str
    project: str | None = None


class LoginResponse(BaseModel):
    token: str
    user: UserResponse


class SiteResponse(BaseModel):
    id: str
    name: str
    cameras: int
    working: int
    offline: int
    health: int


class CameraResponse(BaseModel):
    id: str
    siteId: str
    siteName: str
    cameraName: str
    status: str
    feedLabel: str
    detection: str


class HealthResponse(BaseModel):
    camera: dict
    edgeDevice: dict
    server: dict
    trendSeries: list[dict]
