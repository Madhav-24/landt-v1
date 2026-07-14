import { AnimatePresence, motion } from 'framer-motion'
import { FaPlus, FaTrash } from 'react-icons/fa'

interface DynamicSelectorProps {
  title: string
  rowLabel: string
  options: string[]
  values: string[]
  rowErrors?: string[]
  onChange: (index: number, value: string) => void
  onAdd: () => void
  onRemove: (index: number) => void
}

export function DynamicSelector({ title, rowLabel, options, values, rowErrors, onChange, onAdd, onRemove }: DynamicSelectorProps) {
  return (
    <div className="dynamic-selector-wrap">
      <div className="dynamic-selector-title-row">
        <span>{title}</span>
        <button type="button" className="action-button ghost add-inline-button" onClick={onAdd} aria-label={`Add ${rowLabel}`}>
          <FaPlus /> Add {rowLabel}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {values.map((value, index) => (
          <motion.div
            key={`${rowLabel}-${index}`}
            className="dynamic-selector-row"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <label className="project-assigned-field grow">
              <span>{`${rowLabel} ${index + 1}`}</span>
              <select
                value={value}
                onChange={(event) => onChange(index, event.target.value)}
                className={`project-assigned-input ${rowErrors?.[index] ? 'invalid' : ''}`}
                aria-invalid={Boolean(rowErrors?.[index])}
              >
                <option value="">{`Select ${rowLabel}`}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {rowErrors?.[index] ? <small className="field-error">{rowErrors[index]}</small> : null}
            </label>

            {index > 0 ? (
              <button
                type="button"
                className="icon-button delete-row"
                aria-label={`Delete ${rowLabel} ${index + 1}`}
                onClick={() => onRemove(index)}
              >
                <FaTrash />
              </button>
            ) : null}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
