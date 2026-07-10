import { GlassCard, SectionHeader } from '../../../components/UI/UI'

const reports = [
  { title: 'Daily progress report', status: 'Ready' },
  { title: 'Safety compliance summary', status: 'Pending review' },
  { title: 'Budget utilization report', status: 'Updated' },
]

export function ReportPage() {
  return (
    <div className="page-grid">
      <SectionHeader eyebrow="Reporting" title="Reports" subtitle="Operational summaries and compliance documents are listed here." />

      <div className="site-row">
        {reports.map((report) => (
          <GlassCard key={report.title} className="site-card">
            <div className="site-head">
              <strong>{report.title}</strong>
              <span className="chip">{report.status}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
