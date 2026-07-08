import { buildDashboardSnapshot, loginWithDemoFallback } from '../api/mockData'

const delay = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 320))

export async function login(payload) {
  return delay(loginWithDemoFallback(payload.identifier, payload.password))
}

export async function fetchDashboardSnapshot() {
  return delay(buildDashboardSnapshot())
}

export async function fetchSystemHealth() {
  return delay(buildDashboardSnapshot().systemHealth)
}

export async function fetchSites() {
  return delay(buildDashboardSnapshot().sites)
}

export async function fetchCameras() {
  return delay(buildDashboardSnapshot().cameras)
}

export async function fetchUsers() {
  return delay(buildDashboardSnapshot().users)
}

export async function saveSnapshotMetadata(payload) {
  return delay({ ok: true, message: 'Snapshot Saved', payload })
}

export async function saveRecordingMetadata(payload) {
  return delay({ ok: true, message: 'Video Saved Successfully', payload })
}
