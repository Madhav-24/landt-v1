import { useMemo, useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, Cell, Pie, PieChart, Tooltip, XAxis, YAxis, LineChart, Line } from 'recharts'
import { systemHealthData } from '../data/systemHealthData'
import { ExpandableSection } from '../components/ExpandableSection/ExpandableSection'
import { SystemHealthCard } from '../components/SystemHealthCard/SystemHealthCard'
import { SummaryStatCard } from '../components/SummaryStatCard/SummaryStatCard'
import { CameraCard } from '../components/CameraCard/CameraCard'
import { EdgeDeviceCard } from '../components/EdgeDeviceCard/EdgeDeviceCard'
import { ServerMetricCard } from '../components/ServerMetricCard/ServerMetricCard'

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

  const cameraTrend = [
    { day: 'Mon', online: 41, offline: 7 },
    { day: 'Tue', online: 42, offline: 6 },
    { day: 'Wed', online: 43, offline: 5 },
    { day: 'Thu', online: 44, offline: 4 },
    { day: 'Fri', online: 44, offline: 4 },
  ]

  const edgeStatusData = [
    { name: 'Working', value: systemHealthData.edgeSummary.working },
    { name: 'Offline', value: systemHealthData.edgeSummary.total - systemHealthData.edgeSummary.working },
  ]

  const serverHealthData = [
    { metric: 'CPU', value: 39 },
    { metric: 'RAM', value: 68 },
    { metric: 'Disk', value: 52 },
    { metric: 'Network', value: 94 },
  ]

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

      <div className="dashboard-grid dashboard-grid--two">
        <div className="glass-card chart-card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Camera fleet</p>
              <h3>Camera health trend</h3>
            </div>
            <span className="chip">Live status</span>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cameraTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <YAxis tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="online" stroke="#22C55E" strokeWidth={3} />
                <Line type="monotone" dataKey="offline" stroke="#EF4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card chart-card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Edge devices</p>
              <h3>Device availability</h3>
            </div>
            <span className="chip">Operational</span>
          </div>
          <div className="chart-box chart-box--pie">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={edgeStatusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  <Cell fill="#22C55E" />
                  <Cell fill="#EF4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
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
        <div className="dashboard-grid dashboard-grid--two">
          <div className="glass-card chart-card">
            <div className="card-header">
              <div>
                <p className="eyebrow">Server load</p>
                <h3>Resource utilization</h3>
              </div>
              <span className="chip">Capacity</span>
            </div>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serverHealthData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <XAxis dataKey="metric" tick={{ fill: '#95a7c6', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#95a7c6', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card stacked-list-card">
            <div className="card-header">
              <div>
                <p className="eyebrow">Server details</p>
                <h3>System status</h3>
              </div>
              <span className="chip">Healthy</span>
            </div>
            <div className="list-stack">
              {systemHealthData.serverMetrics.map((item) => (
                <div key={item.label} className="list-row">
                  <span>{item.label}</span>
                  <em>{item.value}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ExpandableSection>
    </div>
  )
}
