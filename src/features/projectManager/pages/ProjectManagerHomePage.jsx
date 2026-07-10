import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAuth } from '../../authentication/context/AuthContext'
import { ROLES } from '../../../utils/constants'
import './ProjectManagerHomePage.css'

const projectManagerData = {
  metrics: {
    totalWorkers: 300,
    presentWorkers: 240,
    absentWorkers: 60,
    ppeViolations: 50,
    ppeSolved: 20,
    runningProjects: 12,
    delayedProjects: 2,
    budgetUtilized: 72,
    delayRisk: 78,
    openRFIs: 14,
  },
  attendanceTrend: [
    { date: '01 Jul', workers: 230 },
    { date: '02 Jul', workers: 238 },
    { date: '03 Jul', workers: 240 },
    { date: '04 Jul', workers: 250 },
    { date: '05 Jul', workers: 245 },
    { date: '06 Jul', workers: 240 },
  ],
  resourceAllocation: [
    { department: 'Civil', workers: 90 },
    { department: 'Electrical', workers: 45 },
    { department: 'Plumbing', workers: 35 },
    { department: 'Finishing', workers: 70 },
    { department: 'Safety', workers: 20 },
  ],
  projectProgress: [
    { phase: 'Foundation', progress: 100 },
    { phase: 'Structure', progress: 80 },
    { phase: 'Electrical', progress: 60 },
    { phase: 'Finishing', progress: 35 },
    { phase: 'Testing', progress: 15 },
  ],
  projectHealth: {
    healthy: 8,
    warning: 3,
    critical: 1,
  },
  chainageProgress: [
    { chainage: 'CH 0+000', progress: 100 },
    { chainage: 'CH 1+500', progress: 80 },
    { chainage: 'CH 3+000', progress: 55 },
    { chainage: 'CH 5+000', progress: 30 },
  ],
  ppeBreakdown: [
    { category: 'Helmet', count: 18 },
    { category: 'Vest', count: 10 },
    { category: 'Gloves', count: 12 },
    { category: 'Shoes', count: 10 },
  ],
  issues: [
    { title: 'RFI-214 pending approval', priority: 'High' },
    { title: 'Material shortage at Chainage 3+000', priority: 'Medium' },
    { title: 'Concrete curing delay', priority: 'High' },
  ],
  alerts: [
    'Delay risk trending above threshold',
    'Weather window may compress finishing activities',
    '2 cameras need maintenance at Site B',
  ],
  predictions: [
    { label: 'Safety score', value: 89 },
    { label: 'Productivity score', value: 76 },
    { label: 'Delay probability', value: 62 },
  ],
}

const siteSupervisorData = {
  metrics: {
    totalWorkers: 240,
    presentWorkers: 220,
    absentWorkers: 20,
    ppeViolations: 15,
    pendingDeliveries: 4,
    openDefects: 6,
  },
  teams: [
    { team: 'Civil', count: 90 },
    { team: 'Electrical', count: 45 },
    { team: 'Plumbing', count: 35 },
    { team: 'Finishing', count: 50 },
    { team: 'Safety', count: 20 },
  ],
  tasks: [
    { task: 'Excavation Zone A', status: 'Completed' },
    { task: 'Footing Concrete', status: 'In Progress' },
    { task: 'Steel Inspection', status: 'Pending' },
  ],
  deliveries: [
    { time: '08:00', material: 'Cement Truck', status: 'Arrived' },
    { time: '10:00', material: 'Concrete Mixer', status: 'In Transit' },
    { time: '12:00', material: 'Steel Delivery', status: 'Delayed' },
  ],
  defects: [
    { title: 'Column Crack', priority: 'High' },
    { title: 'Water Leakage', priority: 'High' },
    { title: 'Rebar Misalignment', priority: 'Medium' },
  ],
  aiAlerts: [
    'Worker without helmet detected',
    'Crowding near tower crane',
    'Rain forecast after 3 PM',
    'Labour shortage predicted tomorrow',
  ],
  attendanceTrend: [
    { date: 'Mon', workers: 212 },
    { date: 'Tue', workers: 218 },
    { date: 'Wed', workers: 220 },
    { date: 'Thu', workers: 217 },
    { date: 'Fri', workers: 221 },
  ],
  ppeBreakdown: [
    { category: 'Helmet', count: 7 },
    { category: 'Vest', count: 4 },
    { category: 'Gloves', count: 3 },
    { category: 'Shoes', count: 1 },
  ],
  diary: [
    { time: '07:30', note: 'Site kickoff completed' },
    { time: '10:15', note: 'Concrete pour approved' },
    { time: '15:00', note: 'Safety walkthrough executed' },
  ],
}

const metricCards = [
  { label: 'Total Workers', value: '300', accent: '#F59E0B' },
  { label: 'Present Workers', value: '240', accent: '#22C55E' },
  { label: 'Absent Workers', value: '60', accent: '#F97316' },
  { label: 'PPE Violations', value: '50', accent: '#EF4444' },
  { label: 'PPE Solved', value: '20', accent: '#3B82F6' },
  { label: 'Running Projects', value: '12', accent: '#F59E0B' },
  { label: 'Delayed Projects', value: '2', accent: '#F97316' },
  { label: 'Budget Utilized', value: '72%', accent: '#22C55E' },
  { label: 'AI Delay Risk', value: '78%', accent: '#EF4444' },
  { label: 'Open RFIs', value: '14', accent: '#3B82F6' },
]

const supervisorMetricCards = [
  { label: 'Total Workers', value: '240', accent: '#F59E0B' },
  { label: 'Present Workers', value: '220', accent: '#22C55E' },
  { label: 'Absent Workers', value: '20', accent: '#F97316' },
  { label: 'PPE Violations', value: '15', accent: '#EF4444' },
  { label: 'Pending Deliveries', value: '4', accent: '#3B82F6' },
  { label: 'Open Defects', value: '6', accent: '#F97316' },
]

function SummaryCard({ label, value, accent, small }) {
  return (
    <motion.article className={`metric-card ${small ? 'metric-card--small' : ''}`} whileHover={{ y: -2, scale: 1.01 }}>
      <span className="metric-card__dot" style={{ backgroundColor: accent }} />
      <span className="metric-card__label">{label}</span>
      <strong className="metric-card__value">{value}</strong>
    </motion.article>
  )
}

export function ProjectManagerHomePage() {
  const { user } = useAuth()
  const isProjectManager = user?.role === ROLES.PROJECT_MANAGER
  const initialFilters = {
    search: '',
    state: 'Tamil Nadu',
    city: 'Chennai',
    site: 'Package A',
    chainage: 'All',
    date: '2026-07-09',
  }
  const [filters, setFilters] = useState(initialFilters)
  const [appliedFilters, setAppliedFilters] = useState(initialFilters)
  const viewData = isProjectManager ? projectManagerData : siteSupervisorData

  const filteredProjectData = useMemo(() => {
    const search = appliedFilters.search.trim().toLowerCase()
    const buildFilteredList = (items) => {
      if (!search) return items
      return items.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(search)))
    }

    const filteredChainages =
      appliedFilters.chainage && appliedFilters.chainage !== 'All'
        ? projectManagerData.chainageProgress.filter((item) => item.chainage === appliedFilters.chainage)
        : projectManagerData.chainageProgress

    return {
      ...projectManagerData,
      attendanceTrend: search
        ? projectManagerData.attendanceTrend.filter((item) => String(item.date).toLowerCase().includes(search) || String(item.workers).includes(search))
        : projectManagerData.attendanceTrend,
      resourceAllocation: search
        ? projectManagerData.resourceAllocation.filter((item) => String(item.department).toLowerCase().includes(search) || String(item.workers).includes(search))
        : projectManagerData.resourceAllocation,
      projectProgress: search
        ? projectManagerData.projectProgress.filter((item) => String(item.phase).toLowerCase().includes(search) || String(item.progress).includes(search))
        : projectManagerData.projectProgress,
      ppeBreakdown: search
        ? projectManagerData.ppeBreakdown.filter((item) => String(item.category).toLowerCase().includes(search) || String(item.count).includes(search))
        : projectManagerData.ppeBreakdown,
      chainageProgress: filteredChainages,
      issues: buildFilteredList(projectManagerData.issues),
      alerts: buildFilteredList(projectManagerData.alerts),
      predictions: search
        ? projectManagerData.predictions.filter((item) => String(item.label).toLowerCase().includes(search) || String(item.value).includes(search))
        : projectManagerData.predictions,
    }
  }, [appliedFilters.chainage, appliedFilters.search])

  const filteredSiteData = useMemo(() => {
    const search = appliedFilters.search.trim().toLowerCase()
    const buildFilteredList = (items) => {
      if (!search) return items
      return items.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(search)))
    }

    return {
      ...siteSupervisorData,
      attendanceTrend: search
        ? siteSupervisorData.attendanceTrend.filter((item) => String(item.date).toLowerCase().includes(search) || String(item.workers).includes(search))
        : siteSupervisorData.attendanceTrend,
      teams: search
        ? siteSupervisorData.teams.filter((item) => String(item.team).toLowerCase().includes(search) || String(item.count).includes(search))
        : siteSupervisorData.teams,
      tasks: buildFilteredList(siteSupervisorData.tasks),
      deliveries: buildFilteredList(siteSupervisorData.deliveries),
      defects: buildFilteredList(siteSupervisorData.defects),
      aiAlerts: search
        ? siteSupervisorData.aiAlerts.filter((alert) => alert.toLowerCase().includes(search))
        : siteSupervisorData.aiAlerts,
      diary: search
        ? siteSupervisorData.diary.filter((item) => String(item.note).toLowerCase().includes(search) || String(item.time).includes(search))
        : siteSupervisorData.diary,
    }
  }, [appliedFilters.search])

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  const handleApplyFilters = () => {
    setAppliedFilters(filters)
  }

  const handleResetFilters = () => {
    setFilters(initialFilters)
    setAppliedFilters(initialFilters)
  }

  const renderProjectManagerDashboard = () => (
    <>
      <section className="dashboard-toolbar glass-card" aria-label="Global filters">
        <div className="toolbar-heading">
          <p className="eyebrow">Construction command center</p>
          <h2>{isProjectManager ? 'Project manager overview' : 'Site supervisor workspace'}</h2>
        </div>
        <div className="filter-grid">
          <label className="filter-field">
            <span>Search</span>
            <input name="search" type="text" placeholder="Search project or chainage" value={filters.search} onChange={handleFilterChange} />
          </label>
          <label className="filter-field">
            <span>State</span>
            <select name="state" value={filters.state} onChange={handleFilterChange}>
              <option>Tamil Nadu</option>
              <option>Karnataka</option>
            </select>
          </label>
          <label className="filter-field">
            <span>City</span>
            <select name="city" value={filters.city} onChange={handleFilterChange}>
              <option>Chennai</option>
              <option>Bengaluru</option>
            </select>
          </label>
          <label className="filter-field">
            <span>Site</span>
            <select name="site" value={filters.site} onChange={handleFilterChange}>
              <option>Package A</option>
              <option>Package B</option>
              <option>Package C</option>
            </select>
          </label>
          <label className="filter-field">
            <span>Chainage</span>
            <select name="chainage" value={filters.chainage} onChange={handleFilterChange}>
              <option value="All">All chainages</option>
              <option>CH 0+000</option>
              <option>CH 3+000</option>
              <option>CH 5+000</option>
            </select>
          </label>
          <label className="filter-field">
            <span>Date</span>
            <input name="date" type="date" value={filters.date} onChange={handleFilterChange} />
          </label>
          <button className="ghost-button" type="button" onClick={handleApplyFilters}>Search</button>
          <button className="ghost-button ghost-button--muted" type="button" onClick={handleResetFilters}>Reset</button>
        </div>
        <p className="filter-status">Showing {appliedFilters.site} • {appliedFilters.chainage} • {appliedFilters.date}</p>
      </section>

      <section className="kpi-grid" aria-label="Key metrics">
        {(isProjectManager ? metricCards : supervisorMetricCards).map((card) => (
          <SummaryCard key={card.label} label={card.label} value={card.value} accent={card.accent} />
        ))}
      </section>

      <section className="dashboard-grid">
        <motion.article className="glass-card chart-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Attendance</p>
              <h3>Attendance trend</h3>
            </div>
            <span className="chip">30 day pulse</span>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={isProjectManager ? filteredProjectData.attendanceTrend : filteredSiteData.attendanceTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <YAxis tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="workers" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article className="glass-card chart-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Execution</p>
              <h3>Project progress</h3>
            </div>
            <span className="chip">Phased view</span>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredProjectData.projectProgress}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="phase" tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <YAxis tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="progress" radius={[8, 8, 0, 0]} fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.article>
      </section>

      <section className="dashboard-grid dashboard-grid--two">
        <motion.article className="glass-card chart-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Safety</p>
              <h3>PPE violations</h3>
            </div>
            <span className="chip">Action tracking</span>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredProjectData.ppeBreakdown}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <YAxis tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article className="glass-card chart-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Resource flow</p>
              <h3>Resource allocation</h3>
            </div>
            <span className="chip">Live teams</span>
          </div>
          <div className="chart-box chart-box--pie">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={filteredProjectData.resourceAllocation} dataKey="workers" nameKey="department" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {filteredProjectData.resourceAllocation.map((entry, index) => (
                    <Cell key={`${entry.department}-${index}`} fill={['#F59E0B', '#22C55E', '#3B82F6', '#F97316', '#EF4444'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.article>
      </section>

      <section className="dashboard-grid dashboard-grid--two">
        <motion.article className="glass-card chart-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Finance</p>
              <h3>Budget S-curve</h3>
            </div>
            <span className="chip">Planned vs actual</span>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[{ month: 'W1', planned: 30, actual: 24 }, { month: 'W2', planned: 45, actual: 38 }, { month: 'W3', planned: 60, actual: 52 }, { month: 'W4', planned: 78, actual: 72 }] }>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <YAxis tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="planned" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="actual" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article className="glass-card chart-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Survey</p>
              <h3>Chainage progress</h3>
            </div>
            <span className="chip">Critical segments</span>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredProjectData.chainageProgress}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="chainage" tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <YAxis tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="progress" radius={[8, 8, 0, 0]} fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.article>
      </section>

      <section className="dashboard-grid dashboard-grid--two">
        <motion.article className="glass-card chart-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Health</p>
              <h3>Project health</h3>
            </div>
            <span className="chip">Risk split</span>
          </div>
          <div className="chart-box chart-box--pie">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: 'Healthy', value: projectManagerData.projectHealth.healthy }, { name: 'Warning', value: projectManagerData.projectHealth.warning }, { name: 'Critical', value: projectManagerData.projectHealth.critical }]} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  <Cell fill="#22C55E" />
                  <Cell fill="#F97316" />
                  <Cell fill="#EF4444" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article className="glass-card stacked-list-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">AI</p>
              <h3>AI predictions</h3>
            </div>
            <span className="chip">Forecasts</span>
          </div>
          <div className="prediction-list">
            {filteredProjectData.predictions.map((item) => (
              <div key={item.label} className="prediction-row">
                <span>{item.label}</span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </motion.article>
      </section>

      <section className="dashboard-grid dashboard-grid--two">
        <motion.article className="glass-card stacked-list-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Operations</p>
              <h3>Open issues</h3>
            </div>
            <span className="chip">Needs review</span>
          </div>
          <div className="list-stack">
            {filteredProjectData.issues.map((issue) => (
              <div key={issue.title} className="list-row">
                <span>{issue.title}</span>
                <em>{issue.priority}</em>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article className="glass-card stacked-list-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Alerts</p>
              <h3>Critical alerts</h3>
            </div>
            <span className="chip">Immediate</span>
          </div>
          <div className="list-stack">
            {filteredProjectData.alerts.map((alert) => (
              <div key={alert} className="list-row">
                <span>{alert}</span>
                <em>Live</em>
              </div>
            ))}
          </div>
        </motion.article>
      </section>
    </>
  )

  const renderSiteSupervisorDashboard = () => (
    <>
      <section className="dashboard-toolbar glass-card" aria-label="Global filters">
        <div className="toolbar-heading">
          <p className="eyebrow">Site operations</p>
          <h2>Site supervisor control center</h2>
        </div>
        <div className="filter-grid">
          <label className="filter-field">
            <span>Search</span>
            <input name="search" type="text" placeholder="Find worker or task" value={filters.search} onChange={handleFilterChange} />
          </label>
          <label className="filter-field">
            <span>Site</span>
            <select name="site" value={filters.site} onChange={handleFilterChange}>
              <option>Package A</option>
              <option>Package B</option>
              <option>Package C</option>
            </select>
          </label>
          <label className="filter-field">
            <span>Chainage</span>
            <select name="chainage" value={filters.chainage} onChange={handleFilterChange}>
              <option value="All">All chainages</option>
              <option>CH 0+000</option>
              <option>CH 3+000</option>
              <option>CH 5+000</option>
            </select>
          </label>
          <label className="filter-field">
            <span>Date</span>
            <input name="date" type="date" value={filters.date} onChange={handleFilterChange} />
          </label>
          <button className="ghost-button" type="button" onClick={handleApplyFilters}>Refresh</button>
          <button className="ghost-button ghost-button--muted" type="button" onClick={handleResetFilters}>Reset</button>
        </div>
        <p className="filter-status">Showing {appliedFilters.site} • {appliedFilters.chainage} • {appliedFilters.date}</p>
      </section>

      <section className="action-grid">
        <button className="action-button" type="button">Attendance Check-in</button>
        <button className="action-button" type="button">Hazard Reporting</button>
        <button className="action-button" type="button">Upload Photo</button>
        <button className="action-button" type="button">Create Daily Log</button>
      </section>

      <section className="kpi-grid">
        {supervisorMetricCards.map((card) => (
          <SummaryCard key={card.label} label={card.label} value={card.value} accent={card.accent} />
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid--two">
        <motion.article className="glass-card chart-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Manpower</p>
              <h3>Today&apos;s manpower</h3>
            </div>
            <span className="chip">Daily roster</span>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredSiteData.attendanceTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <YAxis tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="workers" stroke="#22C55E" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article className="glass-card chart-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Distribution</p>
              <h3>Worker distribution</h3>
            </div>
            <span className="chip">Teams</span>
          </div>
          <div className="chart-box chart-box--pie">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={filteredSiteData.teams} dataKey="count" nameKey="team" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {filteredSiteData.teams.map((entry, index) => (
                    <Cell key={`${entry.team}-${index}`} fill={['#F59E0B', '#22C55E', '#3B82F6', '#F97316', '#EF4444'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.article>
      </section>

      <section className="dashboard-grid dashboard-grid--two">
        <motion.article className="glass-card stacked-list-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Plan</p>
              <h3>Today&apos;s tasks</h3>
            </div>
            <span className="chip">Progress</span>
          </div>
          <div className="list-stack">
            {filteredSiteData.tasks.map((task) => (
              <div key={task.task} className="list-row">
                <span>{task.task}</span>
                <em>{task.status}</em>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article className="glass-card chart-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Deliveries</p>
              <h3>Material deliveries</h3>
            </div>
            <span className="chip">Logistics</span>
          </div>
          <div className="list-stack">
            {filteredSiteData.deliveries.map((delivery) => (
              <div key={`${delivery.time}-${delivery.material}`} className="list-row">
                <span>{delivery.material}</span>
                <em>{delivery.time} • {delivery.status}</em>
              </div>
            ))}
          </div>
        </motion.article>
      </section>

      <section className="dashboard-grid dashboard-grid--two">
        <motion.article className="glass-card chart-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Safety</p>
              <h3>PPE analytics</h3>
            </div>
            <span className="chip">Compliance</span>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={siteSupervisorData.ppeBreakdown}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <YAxis tick={{ fill: '#95a7c6', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article className="glass-card stacked-list-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Quality</p>
              <h3>Open defects</h3>
            </div>
            <span className="chip">Priority</span>
          </div>
          <div className="list-stack">
            {filteredSiteData.defects.map((defect) => (
              <div key={defect.title} className="list-row">
                <span>{defect.title}</span>
                <em>{defect.priority}</em>
              </div>
            ))}
          </div>
        </motion.article>
      </section>

      <section className="dashboard-grid dashboard-grid--two">
        <motion.article className="glass-card stacked-list-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">AI</p>
              <h3>AI safety alerts</h3>
            </div>
            <span className="chip">Realtime</span>
          </div>
          <div className="list-stack">
            {filteredSiteData.aiAlerts.map((alert) => (
              <div key={alert} className="list-row">
                <span>{alert}</span>
                <em>New</em>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article className="glass-card stacked-list-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <div>
              <p className="eyebrow">Diary</p>
              <h3>Daily site diary</h3>
            </div>
            <span className="chip">Site notes</span>
          </div>
          <div className="list-stack">
            {filteredSiteData.diary.map((entry) => (
              <div key={`${entry.time}-${entry.note}`} className="list-row">
                <span>{entry.note}</span>
                <em>{entry.time}</em>
              </div>
            ))}
          </div>
        </motion.article>
      </section>
    </>
  )

  return (
    <section className="page-grid pm-home-shell" aria-label="Construction monitoring dashboard">
      {isProjectManager ? renderProjectManagerDashboard() : renderSiteSupervisorDashboard()}
    </section>
  )
}
