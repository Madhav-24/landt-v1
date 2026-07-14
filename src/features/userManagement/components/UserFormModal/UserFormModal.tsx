import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { ActionButton } from '../../../../components/UI/UI'
import type { UserFormErrors, UserFormValues } from '../../types/user'
import { validateUserForm } from '../../validation/userValidation'
import { UserForm } from '../UserForm/UserForm'
import { UserModal } from '../UserModal/UserModal'
import './UserFormModal.css'

interface UserFormModalProps {
  isOpen: boolean
  isSubmitting: boolean
  initialValues: UserFormValues
  isEditMode: boolean
  onCancel: () => void
  onSubmit: (values: UserFormValues) => Promise<boolean>
  onValidateEmployeeIdUnique: (employeeId: string) => Promise<string | null>
}

export function UserFormModal({
  isOpen,
  isSubmitting,
  initialValues,
  isEditMode,
  onCancel,
  onSubmit,
  onValidateEmployeeIdUnique,
}: UserFormModalProps) {
  const [values, setValues] = useState<UserFormValues>(initialValues)
  const [errors, setErrors] = useState<UserFormErrors>({})
  const [employeeIdError, setEmployeeIdError] = useState('')

  useEffect(() => {
    setValues(initialValues)
    setErrors({})
    setEmployeeIdError('')
  }, [initialValues, isOpen])

  const isFormValid = useMemo(() => {
    const validationErrors = validateUserForm(values)
    return Object.keys(validationErrors).length === 0 && !employeeIdError
  }, [employeeIdError, values])

  function updateField(field: keyof UserFormValues, value: string) {
    setValues((prevValues) => ({ ...prevValues, [field]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }))

    if (field === 'employeeId') {
      setEmployeeIdError('')
    }
  }

  async function handleEmployeeIdBlur() {
    if (!values.employeeId.trim()) {
      return
    }

    const duplicateError = await onValidateEmployeeIdUnique(values.employeeId)
    setEmployeeIdError(duplicateError ?? '')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateUserForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const duplicateError = await onValidateEmployeeIdUnique(values.employeeId)
    setEmployeeIdError(duplicateError ?? '')

    if (duplicateError) {
      return
    }

    await onSubmit(values)
  }

  return (
    <UserModal
      isOpen={isOpen}
      title={isEditMode ? 'Edit User' : 'Create User'}
      subtitle="Manage employee accounts and roles."
      onClose={onCancel}
    >
      <form className="user-form-modal" onSubmit={handleSubmit} noValidate>
        <div onBlurCapture={handleEmployeeIdBlur}>
          <UserForm values={values} errors={{ ...errors, employeeId: errors.employeeId || employeeIdError }} onFieldChange={updateField} />
        </div>

        <div className="user-form-actions">
          <ActionButton variant="ghost" onClick={onCancel} type="button">
            Cancel
          </ActionButton>
          <ActionButton variant="primary" type="submit" disabled={!isFormValid || isSubmitting}>
            {isEditMode ? 'Save Changes' : 'Create User'}
          </ActionButton>
        </div>
      </form>
    </UserModal>
  )
}
