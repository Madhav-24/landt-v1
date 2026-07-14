import { AnimatePresence, motion } from 'framer-motion'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { ActionButton } from '../../../../components/UI/UI'
import { isSiteRole } from '../../constants/assignmentOptions'
import type { AssignmentFormErrors, AssignmentFormValues, AssignmentRole } from '../../types/assignment'
import { DescriptionTextarea } from '../DescriptionTextarea/DescriptionTextarea'
import { DynamicChainageSelector } from '../DynamicChainageSelector/DynamicChainageSelector'
import { DynamicSiteSelector } from '../DynamicSiteSelector/DynamicSiteSelector'
import { RoleDropdown } from '../RoleDropdown/RoleDropdown'
import { UserDropdown } from '../UserDropdown/UserDropdown'

interface CreateUserModalProps {
  open: boolean
  form: AssignmentFormValues
  errors: AssignmentFormErrors
  roleOptions: AssignmentRole[]
  userOptions: string[]
  assignmentOptions: string[]
  onRoleChange: (role: AssignmentRole | '') => void
  onNameChange: (name: string) => void
  onDescriptionChange: (value: string) => void
  onAssignmentChange: (index: number, value: string) => void
  onAddAssignment: () => void
  onRemoveAssignment: (index: number) => void
  onClose: () => void
  onSubmit: () => void
}

export function CreateUserModal({
  open,
  form,
  errors,
  roleOptions,
  userOptions,
  assignmentOptions,
  onRoleChange,
  onNameChange,
  onDescriptionChange,
  onAssignmentChange,
  onAddAssignment,
  onRemoveAssignment,
  onClose,
  onSubmit,
}: CreateUserModalProps) {
  const siteRole = form.role ? isSiteRole(form.role) : false

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="project-assigned-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="project-assigned-modal"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Create User Assignment"
          >
            <div className="project-assigned-modal-head">
              <div>
                <h3>Create User Assignment</h3>
                <p>Temporary assignment preview only. Refresh clears all cards.</p>
              </div>
              <button type="button" className="icon-button" onClick={onClose} aria-label="Close modal">
                <FaTimes />
              </button>
            </div>

            <div className="project-assigned-form-grid">
              <RoleDropdown value={form.role} options={roleOptions} error={errors.role} onChange={onRoleChange} />
              <UserDropdown value={form.name} options={userOptions} disabled={!form.role} error={errors.name} onChange={onNameChange} />
            </div>

            {form.role ? (
              siteRole ? (
                <DynamicSiteSelector
                  values={form.assignments}
                  options={assignmentOptions}
                  rowErrors={errors.assignmentRows}
                  onChange={onAssignmentChange}
                  onAdd={onAddAssignment}
                  onRemove={onRemoveAssignment}
                />
              ) : (
                <DynamicChainageSelector
                  values={form.assignments}
                  options={assignmentOptions}
                  rowErrors={errors.assignmentRows}
                  onChange={onAssignmentChange}
                  onAdd={onAddAssignment}
                  onRemove={onRemoveAssignment}
                />
              )
            ) : (
              <small className="project-assigned-hint">Select a role to assign sites or chainages.</small>
            )}

            {errors.assignments ? <small className="field-error">{errors.assignments}</small> : null}

            <DescriptionTextarea value={form.description} error={errors.description} onChange={onDescriptionChange} />

            <div className="project-assigned-modal-actions">
              <ActionButton variant="ghost" type="button" onClick={onClose}>
                Cancel
              </ActionButton>
              <ActionButton variant="primary" type="button" onClick={onSubmit}>
                <FaCheck /> Submit
              </ActionButton>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
