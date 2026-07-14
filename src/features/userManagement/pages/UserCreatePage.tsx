import { useEffect } from 'react'
import { ActionButton, GlassCard, SectionHeader } from '../../../components/UI/UI'
import { ROLE_FILTER_ALL, USER_ROLE_OPTIONS, USER_SORT_OPTIONS } from '../constants/roles'
import { useUsers } from '../hooks/useUsers'
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal/DeleteConfirmationModal'
import { EmptyState } from '../components/EmptyState/EmptyState'
import { UserCard } from '../components/UserCard/UserCard'
import { UserFormModal } from '../components/UserFormModal/UserFormModal'
import { UserToast } from '../components/UserToast/UserToast'
import './UserCreatePage.css'

function UsersSkeleton() {
  return (
    <div className="user-create-grid" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <GlassCard key={index} className="user-skeleton-card" />
      ))}
    </div>
  )
}

export function UserCreatePage() {
  const {
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
  } = useUsers()

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <div className="page-grid user-create-page">
      <SectionHeader
        title="User Create"
        subtitle="Manage employee accounts and roles."
        actions={
          <ActionButton variant="primary" onClick={openCreateModal} aria-label="Create a new user">
            + Create User
          </ActionButton>
        }
      />

      <GlassCard className="user-create-controls" role="region" aria-label="User search and filters">
        <label className="user-filter-field" htmlFor="user-search">
          <span>Search</span>
          <input
            id="user-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="user-input"
            placeholder="Search by name, employee ID, email or role"
          />
        </label>

        <label className="user-filter-field" htmlFor="user-sort">
          <span>Sort</span>
          <select
            id="user-sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
            className="user-input"
          >
            {USER_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="user-filter-field" htmlFor="user-role-filter">
          <span>Role Filter</span>
          <select
            id="user-role-filter"
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            className="user-input"
          >
            <option value={ROLE_FILTER_ALL}>{ROLE_FILTER_ALL}</option>
            {USER_ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>
      </GlassCard>

      {isLoading ? (
        <UsersSkeleton />
      ) : filteredUsers.length === 0 ? (
        <EmptyState onCreate={openCreateModal} />
      ) : (
        <div className="user-create-grid" role="list" aria-label="Created users">
          {filteredUsers.map((user) => (
            <div key={user.id} role="listitem">
              <UserCard user={user} onEdit={openEditModal} onDelete={openDeleteDialog} />
            </div>
          ))}
        </div>
      )}

      <UserFormModal
        isOpen={isFormOpen}
        isSubmitting={isSubmitting}
        initialValues={formInitialValues}
        isEditMode={Boolean(editingUser)}
        onCancel={closeFormModal}
        onSubmit={submitUserForm}
        onValidateEmployeeIdUnique={validateUniqueEmployeeId}
      />

      <DeleteConfirmationModal user={deleteTarget} isDeleting={isSubmitting} onConfirm={confirmDelete} onCancel={closeDeleteDialog} />

      <UserToast open={toast.open} message={toast.message} onClose={hideToast} />
    </div>
  )
}
