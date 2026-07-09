import { useEffect, useMemo, useState } from 'react'
import { FaCamera, FaCircle } from 'react-icons/fa'
import { fetchCameras, fetchSites, saveRecordingMetadata, saveSnapshotMetadata } from '../../../services/dashboardService'
import { ActionButton, Drawer, GlassCard, MetricCard, SectionHeader, StatusPill } from '../../../components/UI/UI'
import { CameraControlPanel } from '../components/CameraControlPanel/CameraControlPanel'

export function CameraManagementPage() {
  const [sites, setSites] = useState([])
  const [cameras, setCameras] = useState([])
  const [activeSite, setActiveSite] = useState(null)
  const [activeCamera, setActiveCamera] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    Promise.all([fetchSites(), fetchCameras()]).then(([siteList, cameraList]) => {
      setSites(siteList)
      setCameras(cameraList)
      setActiveSite(siteList[0] ?? null)
      setActiveCamera(cameraList[0] ?? null)
      setIsDrawerOpen(Boolean(siteList[0] && cameraList[0]))
    })
  }, [])

  const filteredCameras = useMemo(
    () => cameras.filter((camera) => !activeSite || camera.siteId === activeSite.id),
    [activeSite, cameras],
  )

  async function handleSnapshot() {
    if (!activeCamera || !activeSite) return
    await saveSnapshotMetadata({
      cameraId: activeCamera.id,
      siteId: activeSite.id,
      imagePath: `/storage/snapshots/${activeCamera.id}-${Date.now()}.jpg`,
      timestamp: new Date().toISOString(),
    })
    setFeedback('Snapshot Saved')
    setIsDrawerOpen(true)
  }

  async function toggleRecording() {
    if (!activeCamera || !activeSite) return
    if (!isRecording) {
      setIsRecording(true)
      setFeedback('Recording...')
      return
    }

    setIsRecording(false)
    await saveRecordingMetadata({
      cameraId: activeCamera.id,
      siteId: activeSite.id,
      videoPath: `/storage/videos/${activeCamera.id}-${Date.now()}.mp4`,
      timestamp: new Date().toISOString(),
    })
    setFeedback('Video Saved Successfully')
    setIsDrawerOpen(true)
  }

  return (
    <div className="page-grid">
      <SectionHeader eyebrow="Sites" title="Camera Management" subtitle="Select a site card to open the live camera workspace." />

      <div className="site-row">
        {sites.map((site) => (
          <GlassCard key={site.id} className={`site-card ${activeSite?.id === site.id ? 'active' : ''}`} onClick={() => setActiveSite(site)}>
            <div className="site-head">
              <strong>{site.name}</strong>
              <StatusPill variant={site.health >= 90 ? 'success' : 'warning'}>{site.health}%</StatusPill>
            </div>
            <div className="site-meta">
              <span>Camera Count {site.cameras}</span>
              <span>Working {site.working}</span>
              <span>Offline {site.offline}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="camera-workspace">
        <GlassCard className="camera-feed-card">
          <div className="camera-feed">
            <div className="camera-overlay">
              <FaCamera />
              <strong>{activeCamera?.cameraName ?? 'Select a camera'}</strong>
              <small>{activeCamera?.feedLabel ?? 'Live feed'}</small>
            </div>
            <div className="video-frame" />
          </div>
          <div className="camera-caption-row">
            <div>
              <strong>{activeSite?.name}</strong>
              <p>{activeCamera?.detection ?? 'AI Detection Stream'}</p>
            </div>
            <StatusPill variant={activeCamera?.status === 'Working' ? 'success' : 'danger'}>
              <FaCircle /> {activeCamera?.status ?? 'Offline'}
            </StatusPill>
          </div>
        </GlassCard>

        <div className="camera-side-panel">
          <MetricCard label="Live Cameras" value={filteredCameras.length} subvalue="Site filtered" tone="cyan" icon={<FaCamera />} />
          <CameraControlPanel isRecording={isRecording} onSnapshot={handleSnapshot} onToggleRecording={toggleRecording} />
          <GlassCard className="feedback-card">
            <strong>{feedback || 'Ready for snapshot and recording operations.'}</strong>
            <small>Media is persisted to Linux storage with PostgreSQL metadata.</small>
          </GlassCard>

          <GlassCard className="camera-list-card">
            <div className="card-heading">Cameras</div>
            <div className="camera-list">
              {filteredCameras.map((camera) => (
                <button key={camera.id} type="button" className={`camera-row ${activeCamera?.id === camera.id ? 'active' : ''}`} onClick={() => {
                  setActiveCamera(camera)
                  setIsDrawerOpen(true)
                }}>
                  <strong>{camera.cameraName}</strong>
                  <small>{camera.feedLabel}</small>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <Drawer open={isDrawerOpen && Boolean(activeCamera && activeSite)} title="Camera Stream" subtitle="Camera controls, media capture, and recording live inside the viewport." onClose={() => setIsDrawerOpen(false)}>
        <div className="drawer-body">
          <p>Site: {activeSite?.name}</p>
          <p>Camera: {activeCamera?.cameraName}</p>
          <p>Detection: {activeCamera?.detection}</p>
          <ActionButton onClick={handleSnapshot}>Capture Image</ActionButton>
        </div>
      </Drawer>
    </div>
  )
}
