import './ExpandableSection.css'

export function ExpandableSection({ open, children }) {
  if (!open) return null
  return <div className="expandable-body">{children}</div>
}
