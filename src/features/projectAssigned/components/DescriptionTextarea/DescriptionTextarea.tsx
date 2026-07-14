import { DESCRIPTION_MAX_LENGTH } from '../../constants/assignmentOptions'

interface DescriptionTextareaProps {
  value: string
  error?: string
  onChange: (value: string) => void
}

export function DescriptionTextarea({ value, error, onChange }: DescriptionTextareaProps) {
  return (
    <label className="project-assigned-field">
      <span>Description</span>
      <textarea
        rows={5}
        value={value}
        maxLength={DESCRIPTION_MAX_LENGTH}
        onChange={(event) => onChange(event.target.value)}
        className={`project-assigned-input project-assigned-textarea ${error ? 'invalid' : ''}`}
        placeholder="Enter assignment description..."
        aria-invalid={Boolean(error)}
      />
      <div className="description-footer">
        {error ? <small className="field-error">{error}</small> : <span />}
        <small className="char-counter">{value.length} / {DESCRIPTION_MAX_LENGTH}</small>
      </div>
    </label>
  )
}
