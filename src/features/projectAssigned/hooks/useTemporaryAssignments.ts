import { useMemo, useState } from 'react'
import {
  CHAINAGE_OPTIONS,
  DESCRIPTION_MAX_LENGTH,
  ROLE_FILTER_ALL,
  ROLE_OPTIONS,
  ROLE_USER_MAP,
  SITE_OPTIONS,
  isSiteRole,
} from '../constants/assignmentOptions'
import type {
  AssignmentFormErrors,
  AssignmentFormValues,
  AssignmentRole,
  AssignmentSort,
  TemporaryAssignment,
} from '../types/assignment'

const INITIAL_FORM: AssignmentFormValues = {
  role: '',
  name: '',
  assignments: [''],
  description: '',
}

function buildId() {
  return `asg-${Math.random().toString(36).slice(2, 10)}`
}

function normalize(values: AssignmentFormValues): AssignmentFormValues {
  return {
    role: values.role,
    name: values.name.trim(),
    assignments: values.assignments.map((entry) => entry.trim()),
    description: values.description.trim(),
  }
}

function validateForm(values: AssignmentFormValues): AssignmentFormErrors {
  const errors: AssignmentFormErrors = {}
  const rowErrors = values.assignments.map(() => '')

  if (!values.role) {
    errors.role = 'Role is required.'
  }

  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!values.assignments.length) {
    errors.assignments = 'At least one assignment is required.'
  }

  const normalizedAssignments = values.assignments.map((item) => item.trim())

  normalizedAssignments.forEach((value, index) => {
    if (!value) {
      rowErrors[index] = 'This field is required.'
    }
  })

  const seen = new Set<string>()
  normalizedAssignments.forEach((value, index) => {
    if (!value) return
    if (seen.has(value)) {
      rowErrors[index] = 'Duplicate selection is not allowed.'
    }
    seen.add(value)
  })

  if (rowErrors.some(Boolean)) {
    errors.assignmentRows = rowErrors
  }

  if (values.description.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `Maximum ${DESCRIPTION_MAX_LENGTH} characters allowed.`
  }

  return errors
}

export function useTemporaryAssignments() {
  const [assignments, setAssignments] = useState<TemporaryAssignment[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState<AssignmentFormValues>(INITIAL_FORM)
  const [errors, setErrors] = useState<AssignmentFormErrors>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>(ROLE_FILTER_ALL)
  const [sortBy, setSortBy] = useState<AssignmentSort>('newest')

  const currentNames = form.role ? ROLE_USER_MAP[form.role as AssignmentRole] : []
  const optionList = form.role ? (isSiteRole(form.role as AssignmentRole) ? SITE_OPTIONS : CHAINAGE_OPTIONS) : []
  const assignmentLabel = form.role && isSiteRole(form.role as AssignmentRole) ? 'Assigned Site(s)' : 'Assigned Chainage(s)'

  const visibleAssignments = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    let next = assignments.filter((item) => {
      const searchBlob = [item.name, item.role, ...item.assignments].join(' ').toLowerCase()
      const matchesSearch = !normalizedSearch || searchBlob.includes(normalizedSearch)
      const matchesRole = roleFilter === ROLE_FILTER_ALL || item.role === roleFilter
      return matchesSearch && matchesRole
    })

    next = [...next].sort((a, b) => {
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }

      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }

      if (sortBy === 'role') {
        return a.role.localeCompare(b.role)
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return next
  }, [assignments, roleFilter, searchTerm, sortBy])

  function openCreateModal() {
    setForm(INITIAL_FORM)
    setErrors({})
    setIsModalOpen(true)
  }

  function closeCreateModal() {
    setIsModalOpen(false)
  }

  function setRole(role: AssignmentRole | '') {
    setForm((prev) => ({ ...prev, role, name: '', assignments: [''] }))
    setErrors((prev) => ({ ...prev, role: undefined, name: undefined, assignments: undefined, assignmentRows: undefined }))
  }

  function setName(name: string) {
    setForm((prev) => ({ ...prev, name }))
    setErrors((prev) => ({ ...prev, name: undefined }))
  }

  function setDescription(description: string) {
    setForm((prev) => ({ ...prev, description }))
    setErrors((prev) => ({ ...prev, description: undefined }))
  }

  function addAssignmentRow() {
    setForm((prev) => ({ ...prev, assignments: [...prev.assignments, ''] }))
  }

  function removeAssignmentRow(index: number) {
    setForm((prev) => {
      if (index === 0) return prev
      return {
        ...prev,
        assignments: prev.assignments.filter((_, rowIndex) => rowIndex !== index),
      }
    })
  }

  function updateAssignmentRow(index: number, value: string) {
    setForm((prev) => {
      const next = [...prev.assignments]
      next[index] = value
      return { ...prev, assignments: next }
    })

    setErrors((prev) => {
      if (!prev.assignmentRows) return { ...prev, assignments: undefined }
      const nextRows = [...prev.assignmentRows]
      nextRows[index] = ''
      return { ...prev, assignments: undefined, assignmentRows: nextRows }
    })
  }

  function submit(): boolean {
    const normalized = normalize(form)
    const validationErrors = validateForm(normalized)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return false
    }

    const nextAssignment: TemporaryAssignment = {
      id: buildId(),
      role: normalized.role as AssignmentRole,
      name: normalized.name,
      assignments: normalized.assignments,
      description: normalized.description,
      createdAt: new Date().toISOString(),
    }

    setAssignments((prev) => [nextAssignment, ...prev])
    closeCreateModal()
    setForm(INITIAL_FORM)
    setErrors({})
    return true
  }

  return {
    isModalOpen,
    form,
    errors,
    currentNames,
    optionList,
    assignmentLabel,
    assignments,
    visibleAssignments,
    roleOptions: ROLE_OPTIONS,
    roleFilter,
    searchTerm,
    sortBy,
    openCreateModal,
    closeCreateModal,
    setRole,
    setName,
    setDescription,
    addAssignmentRow,
    removeAssignmentRow,
    updateAssignmentRow,
    submit,
    setSearchTerm,
    setRoleFilter,
    setSortBy,
  }
}
