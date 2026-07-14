interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="project-assigned-field">
      <span>Search</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="project-assigned-input"
        placeholder="Search by name, role, site, or chainage"
      />
    </label>
  )
}
