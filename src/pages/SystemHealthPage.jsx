import { useMemo, useState } from 'react'
import { systemHealthData } from '../data/systemHealthData'
import { ExpandableSection } from '../components/common/ExpandableSection'
import { SystemHealthCard } from '../components/common/SystemHealthCard'
import { SummaryStatCard } from '../components/common/SummaryStatCard'
import { CameraCard } from '../components/common/CameraCard'
import { EdgeDeviceCard } from '../components/common/EdgeDeviceCard'
import { ServerMetricCard } from '../components/common/ServerMetricCard'

export function SystemHealthPage() {
  const [activeSection, setActiveSection] = useState('camera')

  const cameraSummary = useMemo(() => {
    const data = systemHealthData.cameraSummary
    return [
      { label: 'Working Cameras', value: data.working },
      { label: 'Not Working Cameras', value: data.total - data.working },
      { label: 'PPE Alerts', value: data.ppeAlerts },
      { label: 'Solved Alerts', value: data.solvedAlerts },
      { label: 'Pending Alerts', value: data.pendingAlerts },
      { label: 'Online Cameras', value: data.online },
      { label: 'Offline Cameras', value: data.offline },
    ]
  }, [])

  const edgeSummary = useMemo(() => {
    const data = systemHealthData.edgeSummary
    return [
      { label: 'Working', value: data.working },
      { label: 'Not Working', value: data.total - data.working },
    ]
  }, [])

  return (
    <div className="page-grid system-health-template">
      <div className="health-kpi-row">
        {systemHealthData.kpis.map((kpi) => (
          <SystemHealthCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            tone={kpi.tone}
            active={activeSection === kpi.id}
            onClick={() => setActiveSection(kpi.id)}
          />
        ))}
      </div>

      <ExpandableSection open={activeSection === 'camera'}>
        <div className="summary-row summary-row-camera">
          {cameraSummary.map((item) => (
            <SummaryStatCard key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
        <div className="resource-list resource-list-three">
          {systemHealthData.cameraCards.map((item) => (
            <CameraCard key={item.cameraId} item={item} />
          ))}
        </div>
      </ExpandableSection>

      <ExpandableSection open={activeSection === 'edge'}>
        <div className="summary-row summary-row-edge">
          {edgeSummary.map((item) => (
            <SummaryStatCard key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
        <div className="resource-list resource-list-three">
          {systemHealthData.edgeDeviceCards.map((item) => (
            <EdgeDeviceCard key={item.deviceId} item={item} />
          ))}
        </div>
      </ExpandableSection>

      <ExpandableSection open={activeSection === 'server'}>
        <div className="server-metric-grid">
          {systemHealthData.serverMetrics.map((item) => (
            <ServerMetricCard key={item.label} item={item} />
          ))}
        </div>
      </ExpandableSection>
    </div>
  )
}
