import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  FaBell,
  FaChevronDown,
  FaDownload,
  FaFilePdf,
  FaSort,
  FaSortDown,
  FaSortUp,
  FaSyncAlt,
} from 'react-icons/fa'
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import './SafetyManagerDashboardPage.css'

const STATES = [
  'Tamil Nadu',
  'Kerala',
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Maharashtra',
  'Goa',
  'Odisha',
  'West Bengal',
  'Gujarat',
  'Rajasthan',
  'Madhya Pradesh',
  'Uttar Pradesh',
  'Bihar',
  'Jharkhand',
  'Chhattisgarh',
  'Punjab',
  'Haryana',
  'Delhi',
  'Assam',
]

const CITIES = [
  'Coimbatore',
  'Salem',
  'Erode',
  'Thoothukudi',
  'Chennai',
  'Madurai',
  'Tiruchirappalli',
  'Tirunelveli',
  'Vellore',
  'Namakkal',
  'Karur',
  'Dindigul',
  'Hosur',
  'Cuddalore',
  'Thanjavur',
  'Kochi',
  'Thiruvananthapuram',
  'Kozhikode',
  'Bengaluru',
  'Hyderabad',
]

const SITES = Array.from({ length: 20 }).map((_, index) => `Site ${index + 1}`)

const CHAINAGES = Array.from({ length: 51 }).map((_, index) => {
  const km = Math.floor(index / 10)
  const m = String((index % 10) * 100).padStart(3, '0')
  return `${km}+${m}m`
})

const ALL_OPTION = 'All'

function withAllOption(options) {
  return [ALL_OPTION, ...options.filter((option) => option !== ALL_OPTION)]
}

const TREND_DATA = {
  Week: [
    { label: 'Monday', compliance: 78, checked: 220, violations: 18 },
    { label: 'Tuesday', compliance: 82, checked: 228, violations: 15 },
    { label: 'Wednesday', compliance: 80, checked: 232, violations: 16 },
    { label: 'Thursday', compliance: 86, checked: 238, violations: 12 },
    { label: 'Friday', compliance: 91, checked: 245, violations: 9 },
    { label: 'Saturday', compliance: 88, checked: 240, violations: 11 },
    { label: 'Sunday', compliance: 94, checked: 230, violations: 7 },
  ],
  Month: [
    { label: 'Week 1', compliance: 79, checked: 920, violations: 70 },
    { label: 'Week 2', compliance: 84, checked: 940, violations: 54 },
    { label: 'Week 3', compliance: 88, checked: 970, violations: 42 },
    { label: 'Week 4', compliance: 92, checked: 980, violations: 35 },
  ],
  Year: [
    { label: 'Jan', compliance: 72, checked: 3900, violations: 310 },
    { label: 'Feb', compliance: 74, checked: 3920, violations: 300 },
    { label: 'Mar', compliance: 77, checked: 3980, violations: 280 },
    { label: 'Apr', compliance: 79, checked: 4040, violations: 260 },
    { label: 'May', compliance: 82, checked: 4100, violations: 240 },
    { label: 'Jun', compliance: 84, checked: 4180, violations: 220 },
    { label: 'Jul', compliance: 86, checked: 4220, violations: 210 },
    { label: 'Aug', compliance: 87, checked: 4250, violations: 195 },
    { label: 'Sep', compliance: 89, checked: 4320, violations: 180 },
    { label: 'Oct', compliance: 91, checked: 4380, violations: 160 },
    { label: 'Nov', compliance: 93, checked: 4440, violations: 145 },
    { label: 'Dec', compliance: 95, checked: 4480, violations: 125 },
  ],
}

const ALERT_ROWS = [
  {
    date: '09-Jul-2026',
    time: '10:30 AM',
    workerName: 'Ravi Kumar',
    state: 'Tamil Nadu',
    city: 'Chennai',
    site: 'Site 1',
    chainage: '1+200m',
    camera: 'CAM-01',
    ppe: { Helmet: true, Vest: false, Boots: true },
    confidence: '98.4%',
    status: 'Pending',
  },
  {
    date: '09-Jul-2026',
    time: '10:18 AM',
    workerName: 'Arun Kumar',
    state: 'Tamil Nadu',
    city: 'Chennai',
    site: 'Site 2',
    chainage: '1+500m',
    camera: 'CAM-03',
    ppe: { Helmet: true, Vest: true, Boots: true },
    confidence: '99.1%',
    status: 'Solved',
  },
  {
    date: '09-Jul-2026',
    time: '10:05 AM',
    workerName: 'Manoj Singh',
    state: 'Karnataka',
    city: 'Bengaluru',
    site: 'Site 5',
    chainage: '2+000m',
    camera: 'CAM-07',
    ppe: { Helmet: false, Vest: true, Boots: false },
    confidence: '95.6%',
    status: 'Pending',
  },
  {
    date: '09-Jul-2026',
    time: '09:52 AM',
    workerName: 'Suresh Babu',
    state: 'Kerala',
    city: 'Kochi',
    site: 'Site 8',
    chainage: '3+400m',
    camera: 'CAM-05',
    ppe: { Helmet: true, Vest: true, Boots: false },
    confidence: '96.8%',
    status: 'Pending',
  },
  {
    date: '09-Jul-2026',
    time: '09:40 AM',
    workerName: 'Vijay Kumar',
    state: 'Telangana',
    city: 'Hyderabad',
    site: 'Site 10',
    chainage: '4+100m',
    camera: 'CAM-09',
    ppe: { Helmet: true, Vest: true, Boots: true },
    confidence: '99.3%',
    status: 'Solved',
  },
  {
    date: '09-Jul-2026',
    time: '09:15 AM',
    workerName: 'Imran Ali',
    state: 'Andhra Pradesh',
    city: 'Tirupati',
    site: 'Site 12',
    chainage: '4+700m',
    camera: 'CAM-04',
    ppe: { Helmet: false, Vest: false, Boots: true },
    confidence: '94.7%',
    status: 'Pending',
  },
  {
    date: '09-Jul-2026',
    time: '09:58 AM',
    workerName: 'Vijay Kumar',
    state: 'Goa',
    city: 'Panaji',
    site: 'Site 14',
    chainage: '4+000m',
    camera: 'CAM-11',
    ppe: { Helmet: true, Vest: true, Boots: true },
    confidence: '99.3%',
    status: 'Solved',
  },
  {
    date: '09-Jul-2026',
    time: '09:50 AM',
    workerName: 'Karthik M',
    state: 'Andhra Pradesh',
    city: 'Hyderabad',
    site: 'Site 7',
    chainage: '4+500m',
    camera: 'CAM-06',
    ppe: { Helmet: false, Vest: true, Boots: true },
    confidence: '94.7%',
    status: 'Pending',
  },
  {
    date: '09-Jul-2026',
    time: '09:42 AM',
    workerName: 'Ajay Sharma',
    state: 'Odisha',
    city: 'Kochi',
    site: 'Site 9',
    chainage: '5+000m',
    camera: 'CAM-08',
    ppe: { Helmet: true, Vest: false, Boots: false },
    confidence: '92.5%',
    status: 'Pending',
  },
  {
    date: '09-Jul-2026',
    time: '09:35 AM',
    workerName: 'Mahesh R',
    state: 'Maharashtra',
    city: 'Chennai',
    site: 'Site 16',
    chainage: '5+000m',
    camera: 'CAM-10',
    ppe: { Helmet: true, Vest: true, Boots: true },
    confidence: '98.8%',
    status: 'Solved',
  },
  {
    date: '09-Jul-2026',
    time: '09:28 AM',
    workerName: 'Naveen Raj',
    state: 'Tamil Nadu',
    city: 'Madurai',
    site: 'Site 3',
    chainage: '0+700m',
    camera: 'CAM-12',
    ppe: { Helmet: true, Vest: false, Boots: true },
    confidence: '96.2%',
    status: 'Pending',
  },
  {
    date: '09-Jul-2026',
    time: '09:20 AM',
    workerName: 'Pradeep N',
    state: 'Karnataka',
    city: 'Bengaluru',
    site: 'Site 18',
    chainage: '2+400m',
    camera: 'CAM-13',
    ppe: { Helmet: true, Vest: true, Boots: true },
    confidence: '97.1%',
    status: 'Solved',
  },
  {
    date: '09-Jul-2026',
    time: '09:14 AM',
    workerName: 'Sathish B',
    state: 'Kerala',
    city: 'Kozhikode',
    site: 'Site 4',
    chainage: '2+800m',
    camera: 'CAM-14',
    ppe: { Helmet: false, Vest: true, Boots: true },
    confidence: '93.1%',
    status: 'Pending',
  },
  {
    date: '09-Jul-2026',
    time: '09:08 AM',
    workerName: 'Jagan M',
    state: 'Telangana',
    city: 'Hyderabad',
    site: 'Site 11',
    chainage: '3+600m',
    camera: 'CAM-15',
    ppe: { Helmet: true, Vest: true, Boots: false },
    confidence: '95.0%',
    status: 'Pending',
  },
  {
    date: '09-Jul-2026',
    time: '09:01 AM',
    workerName: 'Bala K',
    state: 'Tamil Nadu',
    city: 'Coimbatore',
    site: 'Site 6',
    chainage: '1+900m',
    camera: 'CAM-16',
    ppe: { Helmet: true, Vest: true, Boots: true },
    confidence: '98.0%',
    status: 'Solved',
  },
  {
    date: '09-Jul-2026',
    time: '08:56 AM',
    workerName: 'Ramesh P',
    state: 'Assam',
    city: 'Chennai',
    site: 'Site 13',
    chainage: '4+200m',
    camera: 'CAM-17',
    ppe: { Helmet: false, Vest: false, Boots: true },
    confidence: '91.4%',
    status: 'Pending',
  },
  {
    date: '09-Jul-2026',
    time: '08:48 AM',
    workerName: 'Deepak V',
    state: 'Haryana',
    city: 'Chennai',
    site: 'Site 17',
    chainage: '3+300m',
    camera: 'CAM-18',
    ppe: { Helmet: true, Vest: true, Boots: true },
    confidence: '99.0%',
    status: 'Solved',
  },
  {
    date: '09-Jul-2026',
    time: '08:40 AM',
    workerName: 'Hari S',
    state: 'Punjab',
    city: 'Chennai',
    site: 'Site 15',
    chainage: '2+100m',
    camera: 'CAM-19',
    ppe: { Helmet: true, Vest: false, Boots: true },
    confidence: '94.0%',
    status: 'Pending',
  },
  {
    date: '09-Jul-2026',
    time: '08:33 AM',
    workerName: 'Vimal R',
    state: 'Rajasthan',
    city: 'Chennai',
    site: 'Site 20',
    chainage: '5+000m',
    camera: 'CAM-20',
    ppe: { Helmet: true, Vest: true, Boots: true },
    confidence: '98.6%',
    status: 'Solved',
  },
  {
    date: '08-Jul-2026',
    time: '06:28 PM',
    workerName: 'Arul Mani',
    state: 'Tamil Nadu',
    city: 'Salem',
    site: 'Site 2',
    chainage: '0+900m',
    camera: 'CAM-01',
    ppe: { Helmet: true, Vest: true, Boots: false },
    confidence: '95.9%',
    status: 'Pending',
  },
  {
    date: '08-Jul-2026',
    time: '05:54 PM',
    workerName: 'Kishore T',
    state: 'Kerala',
    city: 'Thiruvananthapuram',
    site: 'Site 8',
    chainage: '2+500m',
    camera: 'CAM-05',
    ppe: { Helmet: false, Vest: true, Boots: false },
    confidence: '90.8%',
    status: 'Pending',
  },
  {
    date: '08-Jul-2026',
    time: '05:31 PM',
    workerName: 'Harish C',
    state: 'Madhya Pradesh',
    city: 'Chennai',
    site: 'Site 6',
    chainage: '1+100m',
    camera: 'CAM-10',
    ppe: { Helmet: true, Vest: true, Boots: true },
    confidence: '97.4%',
    status: 'Solved',
  },
  {
    date: '08-Jul-2026',
    time: '04:59 PM',
    workerName: 'Nithin K',
    state: 'Uttar Pradesh',
    city: 'Chennai',
    site: 'Site 9',
    chainage: '2+700m',
    camera: 'CAM-08',
    ppe: { Helmet: true, Vest: false, Boots: true },
    confidence: '93.2%',
    status: 'Pending',
  },
  {
    date: '08-Jul-2026',
    time: '04:22 PM',
    workerName: 'Sanjay D',
    state: 'Bihar',
    city: 'Chennai',
    site: 'Site 12',
    chainage: '3+100m',
    camera: 'CAM-03',
    ppe: { Helmet: true, Vest: true, Boots: true },
    confidence: '98.2%',
    status: 'Solved',
  },
  {
    date: '08-Jul-2026',
    time: '03:41 PM',
    workerName: 'Prakash V',
    state: 'Jharkhand',
    city: 'Chennai',
    site: 'Site 5',
    chainage: '1+600m',
    camera: 'CAM-07',
    ppe: { Helmet: false, Vest: true, Boots: true },
    confidence: '92.6%',
    status: 'Pending',
  },
  {
    date: '08-Jul-2026',
    time: '03:05 PM',
    workerName: 'Senthil R',
    state: 'Chhattisgarh',
    city: 'Chennai',
    site: 'Site 11',
    chainage: '2+300m',
    camera: 'CAM-09',
    ppe: { Helmet: true, Vest: true, Boots: false },
    confidence: '94.5%',
    status: 'Pending',
  },
  {
    date: '08-Jul-2026',
    time: '02:49 PM',
    workerName: 'Ashwin M',
    state: 'Gujarat',
    city: 'Chennai',
    site: 'Site 4',
    chainage: '0+500m',
    camera: 'CAM-04',
    ppe: { Helmet: true, Vest: true, Boots: true },
    confidence: '99.4%',
    status: 'Solved',
  },
  {
    date: '08-Jul-2026',
    time: '02:12 PM',
    workerName: 'Dinesh N',
    state: 'West Bengal',
    city: 'Chennai',
    site: 'Site 18',
    chainage: '4+600m',
    camera: 'CAM-06',
    ppe: { Helmet: false, Vest: false, Boots: true },
    confidence: '89.7%',
    status: 'Pending',
  },
  {
    date: '08-Jul-2026',
    time: '01:44 PM',
    workerName: 'Rahul S',
    state: 'Delhi',
    city: 'Chennai',
    site: 'Site 19',
    chainage: '4+800m',
    camera: 'CAM-02',
    ppe: { Helmet: true, Vest: true, Boots: true },
    confidence: '97.6%',
    status: 'Solved',
  },
]

function statusClass(status) {
  const normalized = status.toLowerCase()
  if (normalized === 'solved') return 'resolved'
  return 'pending'
}

function confidenceClass(value) {
  const score = Number(String(value).replace('%', ''))
  if (score >= 98) return 'high'
  if (score >= 95) return 'mid'
  if (score >= 90) return 'low'
  return 'danger'
}

function SortIcon({ active, dir }) {
  if (!active) return <FaSort />
  return dir === 'asc' ? <FaSortUp /> : <FaSortDown />
}

function SearchableSelect({ id, label, options, value, onChange, disabled = false, activeDropdown, setActiveDropdown }) {
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const popoverRef = useRef(null)
  const [query, setQuery] = useState('')
  const [highlighted, setHighlighted] = useState(0)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, maxHeight: 300, placement: 'bottom' })

  const isOpen = activeDropdown === id

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return options
    return options.filter((item) => item.toLowerCase().includes(normalized))
  }, [options, query])

  useEffect(() => {
    if (!isOpen) return

    const onMouseDown = (event) => {
      const clickedTrigger = rootRef.current?.contains(event.target)
      const clickedPopover = popoverRef.current?.contains(event.target)

      if (!clickedTrigger && !clickedPopover) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [isOpen, setActiveDropdown])

  useEffect(() => {
    if (!isOpen) return
    setHighlighted(0)
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [isOpen])

  useEffect(() => {
    setHighlighted(0)
  }, [query])

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useLayoutEffect(() => {
    if (!isOpen || !rootRef.current) return

    const updatePosition = () => {
      const rect = rootRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth
      const desiredHeight = Math.min(300, Math.max(filtered.length * 40 + 56, 140))
      const belowSpace = viewportHeight - rect.bottom - 12
      const aboveSpace = rect.top - 12
      const shouldOpenUp = belowSpace < desiredHeight && aboveSpace > belowSpace
      const maxHeight = Math.max(140, Math.min(300, shouldOpenUp ? aboveSpace : belowSpace))
      const width = Math.min(rect.width, viewportWidth - rect.left - 12)

      setPosition({
        left: rect.left,
        width,
        maxHeight,
        placement: shouldOpenUp ? 'top' : 'bottom',
        top: shouldOpenUp ? rect.top - 6 : rect.bottom + 6,
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [filtered.length, isOpen])

  useEffect(() => {
    if (!isOpen || !popoverRef.current) return

    const node = popoverRef.current.querySelector('.smd-filter-option.highlighted')
    node?.scrollIntoView({ block: 'nearest' })
  }, [highlighted, isOpen])

  function onSelect(item) {
    onChange(item)
    setQuery('')
    setActiveDropdown(null)
  }

  function handleKeyDown(event) {
    if (disabled) return

    if (event.key === 'Escape') {
      setActiveDropdown(null)
      return
    }

    if (event.key === 'Tab') {
      setActiveDropdown(null)
      return
    }

    if (!isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      setActiveDropdown(id)
      return
    }

    if (!isOpen) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlighted((prev) => Math.min(filtered.length - 1, prev + 1))
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlighted((prev) => Math.max(0, prev - 1))
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      if (filtered[highlighted]) {
        onSelect(filtered[highlighted])
      }
    }
  }

  const popover = isOpen && !disabled
    ? createPortal(
        <div
          ref={popoverRef}
          className={`smd-filter-popover smd-filter-popover--${position.placement}`}
          style={{
            left: position.left,
            width: position.width,
            maxHeight: position.maxHeight,
            top: position.placement === 'bottom' ? position.top : 'auto',
            bottom: position.placement === 'top' ? window.innerHeight - position.top : 'auto',
          }}
        >
          <div className="smd-filter-popover-inner">
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Search ${label}...`}
              className="smd-filter-search"
            />
            <div className="smd-filter-options" style={{ maxHeight: Math.max(80, position.maxHeight - 56) }}>
              {filtered.length ? (
                filtered.map((item, index) => (
                  <button
                    type="button"
                    key={item}
                    className={`smd-filter-option ${item === value ? 'active' : ''} ${index === highlighted ? 'highlighted' : ''}`}
                    onMouseEnter={() => setHighlighted(index)}
                    onMouseDown={(event) => {
                      if (event.button !== 0) return
                      event.preventDefault()
                      onSelect(item)
                    }}
                    onClick={() => onSelect(item)}
                  >
                    <span>{item}</span>
                    {item === value ? <span className="smd-filter-check">✓</span> : null}
                  </button>
                ))
              ) : (
                <div className="smd-empty-mini">No results found.</div>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )
    : null

  return (
    <div ref={rootRef} className={`smd-filter ${disabled ? 'disabled' : ''}`}>
      <button
        type="button"
        disabled={disabled}
        className="smd-filter-trigger"
        onClick={() => setActiveDropdown(isOpen ? null : id)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="smd-filter-label">{label}</span>
        <strong>{value || `Select ${label}`}</strong>
        <FaChevronDown />
      </button>
      {popover}
    </div>
  )
}

export function SafetyManagerDashboardPage({ dashboardTitle = 'Safety Manager Dashboard' }) {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [filters, setFilters] = useState({
    state: ALL_OPTION,
    city: ALL_OPTION,
    site: ALL_OPTION,
    chainage: ALL_OPTION,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [period, setPeriod] = useState('Week')
  const [tableSearch, setTableSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [kpiFilter, setKpiFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortDir, setSortDir] = useState('desc')
  const [page, setPage] = useState(1)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const kpis = useMemo(() => {
    const totalWorkers = 300
    const presentWorkers = 240
    const absentWorkers = totalWorkers - presentWorkers
    const ppeViolations = 50
    const ppeResolved = 20

    return [
      { key: 'all', title: 'Total Workers', value: totalWorkers, tone: 'blue' },
      { key: 'all', title: 'Present Workers', value: presentWorkers, tone: 'success' },
      { key: 'all', title: 'Absent Workers', value: absentWorkers, tone: 'warning' },
      { key: 'violations', title: 'PPE Violations', value: ppeViolations, tone: 'danger' },
      { key: 'resolved', title: 'PPE Resolved', value: ppeResolved, tone: 'success' },
    ]
  }, [])

  const summary = {
    totalWorkers: 300,
    presentWorkers: 240,
    absentWorkers: 60,
    ppeViolationsToday: 50,
    highRisk: 8,
    resolvedToday: 20,
    pending: 30,
    complianceRate: '83%',
  }

  const trendData = TREND_DATA[period]

  const stateOptions = useMemo(() => withAllOption(STATES), [])
  const cityOptions = useMemo(() => withAllOption(CITIES), [])
  const siteOptions = useMemo(() => withAllOption(SITES), [])
  const chainageOptions = useMemo(() => withAllOption(CHAINAGES), [])

  const filteredAlerts = useMemo(() => {
    const normalizedQuery = tableSearch.trim().toLowerCase()
    let rows = ALERT_ROWS.filter((row) => {
      if (filters.state && filters.state !== ALL_OPTION && row.state !== filters.state) return false
      if (filters.city && filters.city !== ALL_OPTION && row.city !== filters.city) return false
      if (filters.site && filters.site !== ALL_OPTION && row.site !== filters.site) return false
      if (filters.chainage && filters.chainage !== ALL_OPTION && row.chainage !== filters.chainage) return false
      if (statusFilter !== 'All' && row.status !== statusFilter) return false
      if (kpiFilter === 'violations' && row.status === 'Solved') return false
      if (kpiFilter === 'resolved' && row.status !== 'Solved') return false

      if (!normalizedQuery) return true
      return [row.workerName, row.state, row.city, row.site, row.camera, row.chainage]
        .some((value) => String(value).toLowerCase().includes(normalizedQuery))
    })

    rows = [...rows].sort((a, b) => {
      const left =
        sortBy === 'ppe'
          ? Number(a.ppe.Helmet) + Number(a.ppe.Vest) + Number(a.ppe.Boots)
          : sortBy === 'confidence'
            ? Number(String(a.confidence).replace('%', ''))
            : String(a[sortBy])
      const right =
        sortBy === 'ppe'
          ? Number(b.ppe.Helmet) + Number(b.ppe.Vest) + Number(b.ppe.Boots)
          : sortBy === 'confidence'
            ? Number(String(b.confidence).replace('%', ''))
            : String(b[sortBy])

      if (typeof left === 'number' && typeof right === 'number') {
        return sortDir === 'asc' ? left - right : right - left
      }

      return sortDir === 'asc' ? String(left).localeCompare(String(right)) : String(right).localeCompare(String(left))
    })

    return rows
  }, [filters, kpiFilter, sortBy, sortDir, statusFilter, tableSearch])

  const pageSize = 10
  const totalPages = Math.max(1, Math.ceil(filteredAlerts.length / pageSize))
  const pagedAlerts = filteredAlerts.slice((page - 1) * pageSize, page * pageSize)
  const pageNumbers = useMemo(() => Array.from({ length: totalPages }).map((_, index) => index + 1), [totalPages])

  useEffect(() => {
    setPage(1)
  }, [filters, kpiFilter, statusFilter, tableSearch])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  useEffect(() => {
    const timer = setInterval(() => {
      setIsLoading(true)
      setTimeout(() => {
        setLastUpdated(new Date())
        setIsLoading(false)
      }, 500)
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  function applySearch() {
    setIsLoading(true)
    setTimeout(() => {
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 600)
  }

  function onSort(column) {
    if (sortBy === column) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortBy(column)
    setSortDir('asc')
  }

  function downloadCsv() {
    const headers = ['Date', 'Time', 'Worker Name', 'State', 'City', 'Site', 'Chainage', 'Camera', 'PPE Compliance', 'Confidence Score', 'Status']
    const rows = filteredAlerts.map((row) => [
      row.date,
      row.time,
      row.workerName,
      row.state,
      row.city,
      row.site,
      row.chainage,
      row.camera,
      `Helmet ${row.ppe.Helmet ? 'Yes' : 'No'} | Vest ${row.ppe.Vest ? 'Yes' : 'No'} | Boots ${row.ppe.Boots ? 'Yes' : 'No'}`,
      row.confidence,
      row.status,
    ])
    const content = [headers, ...rows].map((line) => line.join(',')).join('\n')
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'safety-manager-alerts.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  function exportPdf() {
    const printable = window.open('', '_blank')
    if (!printable) return
    printable.document.write('<html><head><title>Safety Alerts</title></head><body>')
    printable.document.write('<h2>Safety Manager PPE Alerts</h2>')
    printable.document.write('<table border="1" cellspacing="0" cellpadding="8"><thead><tr><th>Date</th><th>Time</th><th>Worker</th><th>PPE</th><th>Confidence</th><th>Status</th></tr></thead><tbody>')
    filteredAlerts.forEach((row) => {
      printable.document.write(`<tr><td>${row.date}</td><td>${row.time}</td><td>${row.workerName}</td><td>Helmet ${row.ppe.Helmet ? 'Yes' : 'No'}, Vest ${row.ppe.Vest ? 'Yes' : 'No'}, Boots ${row.ppe.Boots ? 'Yes' : 'No'}</td><td>${row.confidence}</td><td>${row.status}</td></tr>`)
    })
    printable.document.write('</tbody></table></body></html>')
    printable.document.close()
    printable.focus()
    printable.print()
  }

  return (
    <div className="smd-page">
      <header className="smd-header">
        <div>
          <div className="smd-eyebrow">AI Construction Monitoring System</div>
          <h1>{dashboardTitle}</h1>
        </div>
        <div className="smd-header-right">
          <button type="button" className="smd-icon-btn" aria-label="Notifications">
            <FaBell />
          </button>
        </div>
      </header>

      <section className="smd-filters glass">
        <SearchableSelect
          id="state"
          label="State"
          options={stateOptions}
          value={filters.state}
          onChange={(state) => setFilters({ state, city: ALL_OPTION, site: ALL_OPTION, chainage: ALL_OPTION })}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        <SearchableSelect
          id="city"
          label="City"
          options={cityOptions}
          value={filters.city}
          onChange={(city) => setFilters((prev) => ({ ...prev, city }))}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        <SearchableSelect
          id="site"
          label="Site"
          options={siteOptions}
          value={filters.site}
          onChange={(site) => setFilters((prev) => ({ ...prev, site }))}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        <SearchableSelect
          id="chainage"
          label="Chainage"
          options={chainageOptions}
          value={filters.chainage}
          onChange={(chainage) => setFilters((prev) => ({ ...prev, chainage }))}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        <button type="button" className="smd-search-btn" onClick={applySearch}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </section>

      {isLoading ? (
        <section className="smd-skeleton-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="smd-skeleton-item" />
          ))}
        </section>
      ) : (
        <>
          <section className="smd-kpis">
            {kpis.map((kpi) => (
              <button
                type="button"
                key={kpi.title}
                className={`glass smd-kpi ${kpi.tone} ${kpiFilter === kpi.key ? 'active' : ''}`}
                onClick={() => setKpiFilter(kpi.key)}
              >
                <span>{kpi.title}</span>
                <strong>{kpi.value}</strong>
              </button>
            ))}
          </section>

          <section className="smd-analytics">
            <article className="glass smd-analytics-card">
              <div className="smd-card-head">
                <h2>PPE Compliance Trend</h2>
                <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                  <option>Week</option>
                  <option>Month</option>
                  <option>Year</option>
                </select>
              </div>
              <div className="smd-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid stroke="rgba(56, 232, 255, 0.16)" strokeDasharray="4 4" />
                    <XAxis dataKey="label" stroke="#b5d8ff" />
                    <YAxis domain={[0, 100]} stroke="#b5d8ff" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(11,18,32,0.94)',
                        border: '1px solid rgba(56,232,255,0.3)',
                        borderRadius: 12,
                      }}
                      formatter={(value, key, payload) => {
                        if (key === 'compliance') return [`Compliance: ${value}%`, 'Compliance']
                        if (key === 'checked') return [`Workers Checked: ${value}`, 'Workers Checked']
                        if (key === 'violations') return [`Violations: ${value}`, 'Violations']
                        return [value, key]
                      }}
                    />
                    <Line type="monotone" dataKey="checked" stroke="rgba(56,232,255,0.25)" dot={false} />
                    <Line type="monotone" dataKey="violations" stroke="rgba(239,68,68,0.35)" dot={false} />
                    <Line type="monotone" dataKey="compliance" stroke="#00B8FF" strokeWidth={3} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="glass smd-summary-card">
              <h2>Today's Safety Summary</h2>
              <dl>
                <div><dt>Total Workers</dt><dd>{summary.totalWorkers}</dd></div>
                <div><dt>Present Workers</dt><dd>{summary.presentWorkers}</dd></div>
                <div><dt>Absent Workers</dt><dd>{summary.absentWorkers}</dd></div>
                <div><dt>PPE Violations Today</dt><dd>{summary.ppeViolationsToday}</dd></div>
                <div><dt>High Risk</dt><dd>{summary.highRisk}</dd></div>
                <div><dt>Resolved Today</dt><dd>{summary.resolvedToday}</dd></div>
                <div><dt>Pending</dt><dd>{summary.pending}</dd></div>
                <div><dt>Overall Compliance Rate</dt><dd>{summary.complianceRate}</dd></div>
                <div><dt>Last Updated</dt><dd>{lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</dd></div>
              </dl>
            </article>
          </section>

          <section className="glass smd-alerts">
            <div className="smd-card-head">
              <h2>Recent PPE Alerts</h2>
              <div className="smd-head-actions">
                <div className="smd-table-filter-group" role="tablist" aria-label="Status filters">
                  {['All', 'Solved', 'Pending'].map((status) => (
                    <button
                      type="button"
                      key={status}
                      className={`smd-table-filter-pill ${statusFilter === status ? 'active' : ''}`}
                      onClick={() => setStatusFilter(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <div className="smd-inline-filters">
                  <input
                    className="smd-table-search"
                    placeholder="Search worker/state/city/site/camera/chainage..."
                    value={tableSearch}
                    onChange={(event) => setTableSearch(event.target.value)}
                  />
                </div>
                <button type="button" className="smd-icon-btn" onClick={downloadCsv} aria-label="Export CSV">
                  <FaDownload />
                </button>
                <button type="button" className="smd-icon-btn" onClick={exportPdf} aria-label="Export PDF">
                  <FaFilePdf />
                </button>
                <button type="button" className="smd-icon-btn" onClick={applySearch} aria-label="Refresh">
                  <FaSyncAlt />
                </button>
              </div>
            </div>

            {pagedAlerts.length ? (
              <>
                <div className="smd-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        {[
                          ['date', 'Date'],
                          ['time', 'Time'],
                          ['workerName', 'Worker Name'],
                          ['state', 'State'],
                          ['city', 'City'],
                          ['site', 'Site'],
                          ['chainage', 'Chainage'],
                          ['camera', 'Camera'],
                          ['ppe', 'PPE Compliance'],
                          ['confidence', 'Confidence Score'],
                          ['status', 'Status'],
                        ].map(([key, label]) => (
                          <th key={key}>
                            <button type="button" onClick={() => onSort(key)}>
                              {label} <SortIcon active={sortBy === key} dir={sortDir} />
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pagedAlerts.map((row, rowIndex) => (
                        <tr key={`${row.workerName}-${row.time}-${rowIndex}`}>
                          <td>{row.date}</td>
                          <td>{row.time}</td>
                          <td>{row.workerName}</td>
                          <td>{row.state}</td>
                          <td>{row.city}</td>
                          <td>{row.site}</td>
                          <td>{row.chainage}</td>
                          <td>{row.camera}</td>
                          <td>
                            <div className="smd-ppe-badges">
                              {['Helmet', 'Vest', 'Boots'].map((item) => (
                                <span key={item} className={`smd-ppe-pill ${row.ppe[item] ? 'ok' : 'miss'}`}>
                                  {row.ppe[item] ? '✓' : '✗'} {item}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td><span className={`smd-confidence ${confidenceClass(row.confidence)}`}>{row.confidence}</span></td>
                          <td><span className={`smd-badge status ${statusClass(row.status)}`}>{row.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="smd-pagination">
                  <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
                  <div className="smd-pagination-center">
                    <span>Page {page} of {totalPages}</span>
                    <div className="smd-pagination-numbers">
                      {pageNumbers.map((pageNumber) => (
                        <button
                          key={pageNumber}
                          type="button"
                          className={`smd-page-number ${page === pageNumber ? 'active' : ''}`}
                          onClick={() => setPage(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
                </div>
              </>
            ) : (
              <div className="smd-empty">No alerts found for the selected filters.</div>
            )}
          </section>
        </>
      )}
    </div>
  )
}
