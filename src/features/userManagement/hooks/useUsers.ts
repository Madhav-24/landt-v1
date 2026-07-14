import { useMemo, useState } from 'react'
import { ROLE_FILTER_ALL } from '../constants/roles'
import { createUser, deleteUser, isEmployeeIdTaken, listUsers, updateUser } from '../services/user.service'
import type { ToastState, UserEntity, UserFormValues, UserSortOption } from '../types/user'
import { trimUserFormValues, validateUserForm } from '../validation/userValidation'

const DEFAULT_FORM_VALUES: UserFormValues = {
  fullName: '',
  email: '',
  employeeId: '',
  phoneNumber: '',
  role: '',
}

export function useUsers() {
  const [users, setUsers] = useState<UserEntity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<UserSortOption>('newest')
  const [roleFilter, setRoleFilter] = useState(ROLE_FILTER_ALL)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserEntity | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<UserEntity | null>(null)
  const [toast, setToast] = useState<ToastState>({ open: false, message: '' })

  async function loadUsers() {
    setIsLoading(true)

    try {
      const result = await listUsers()
      setUsers(result)
    } finally {
      setIsLoading(false)
    }
  }

  function showToast(message: string) {
    setToast({ open: true, message })
  }

  function hideToast() {
    setToast({ open: false, message: '' })
  }

  function openCreateModal() {
    setEditingUser(null)
    setIsFormOpen(true)
  }

  function openEditModal(user: UserEntity) {
    setEditingUser(user)
    setIsFormOpen(true)
  }

  function closeFormModal() {
    setIsFormOpen(false)
    setEditingUser(null)
  }

  function openDeleteDialog(user: UserEntity) {
    setDeleteTarget(user)
  }

  function closeDeleteDialog() {
    setDeleteTarget(null)
  }

  async function submitUserForm(values: UserFormValues): Promise<boolean> {
    const trimmedValues = trimUserFormValues(values)
    const fieldErrors = validateUserForm(trimmedValues)

    if (Object.keys(fieldErrors).length > 0) {
      return false
    }

    setIsSubmitting(true)

    try {
      const employeeIdTaken = await isEmployeeIdTaken(trimmedValues.employeeId, editingUser?.id)

      if (employeeIdTaken) {
        return false
      }

      if (editingUser) {
        const result = await updateUser(editingUser.id, trimmedValues)
        if (result.ok && result.user) {
          setUsers((prevUsers) => prevUsers.map((user) => (user.id === result.user?.id ? result.user : user)))
          closeFormModal()
          showToast(result.message)
          return true
        }
      } else {
        const result = await createUser(trimmedValues)
        if (result.ok && result.user) {
          setUsers((prevUsers) => [result.user as UserEntity, ...prevUsers])
          closeFormModal()
          showToast(result.message)
          return true
        }
      }
    } finally {
      setIsSubmitting(false)
    }

    return false
  }

  async function confirmDelete() {
    if (!deleteTarget) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await deleteUser(deleteTarget.id)
      if (result.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deleteTarget.id))
        closeDeleteDialog()
        showToast(result.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  async function validateUniqueEmployeeId(employeeId: string): Promise<string | null> {
    const duplicate = await isEmployeeIdTaken(employeeId, editingUser?.id)
    return duplicate ? 'Employee ID already exists.' : null
  }

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    let nextUsers = users.filter((user) => {
      const searchableText = [user.fullName, user.employeeId, user.email, user.role].join(' ').toLowerCase()
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch)
      const matchesRole = roleFilter === ROLE_FILTER_ALL || user.role === roleFilter
      return matchesSearch && matchesRole
    })

    nextUsers = [...nextUsers].sort((a, b) => {
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }

      if (sortBy === 'az') {
        return a.fullName.localeCompare(b.fullName)
      }

      if (sortBy === 'role') {
        return a.role.localeCompare(b.role)
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return nextUsers
  }, [roleFilter, searchTerm, sortBy, users])

  const formInitialValues: UserFormValues = editingUser
    ? {
        fullName: editingUser.fullName,
        email: editingUser.email,
        employeeId: editingUser.employeeId,
        phoneNumber: editingUser.phoneNumber,
        role: editingUser.role,
      }
    : DEFAULT_FORM_VALUES

  return {
    users,
    filteredUsers,
    isLoading,
    isSubmitting,
    searchTerm,
    sortBy,
    roleFilter,
    isFormOpen,
    editingUser,
    deleteTarget,
    toast,
    formInitialValues,
    loadUsers,
    setSearchTerm,
    setSortBy,
    setRoleFilter,
    openCreateModal,
    openEditModal,
    closeFormModal,
    openDeleteDialog,
    closeDeleteDialog,
    submitUserForm,
    confirmDelete,
    validateUniqueEmployeeId,
    hideToast,
  }
}
