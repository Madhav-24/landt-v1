interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="message-search" htmlFor="message-employee-search">
      <span>Search Employee</span>
      <input
        id="message-employee-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="message-input"
        placeholder="Search by name or role"
      />
    </label>
  )
}
