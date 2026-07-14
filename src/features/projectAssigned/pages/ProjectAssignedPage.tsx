import { useMemo } from 'react'
import { GlassCard, SectionHeader } from '../../../components/UI/UI'
import { ROLE_FILTER_ALL } from '../constants/assignmentOptions'
import { useTemporaryAssignments } from '../hooks/useTemporaryAssignments'
import { AssignmentGrid } from '../components/AssignmentGrid/AssignmentGrid'
import { CreateUserButton } from '../components/CreateUserButton/CreateUserButton'
import { CreateUserModal } from '../components/CreateUserModal/CreateUserModal'
import { RoleFilter } from '../components/RoleFilter/RoleFilter'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { SortDropdown } from '../components/SortDropdown/SortDropdown'
import './ProjectAssignedPage.css'

export function ProjectAssignedPage() {
  const {
    isModalOpen,
    form,
    errors,
    currentNames,
    optionList,
    assignments,
    visibleAssignments,
    roleOptions,
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
  } = useTemporaryAssignments()

  const isEmpty = useMemo(() => visibleAssignments.length === 0, [visibleAssignments.length])

  return (
    <div className="page-grid project-assigned-page">
      <SectionHeader
        title="Project Assigned"
        subtitle="Create temporary user assignments for drawing management preview."
        actions={<CreateUserButton onClick={openCreateModal} />}
      />

      <GlassCard className="project-assigned-controls">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <RoleFilter value={roleFilter} roleOptions={roleOptions} onChange={setRoleFilter} />
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </GlassCard>

      {isEmpty ? (
        <GlassCard className="project-assigned-empty">
          <h3>No Temporary Assignments</h3>
          <p>
            {assignments.length
              ? 'No cards match the current search or filters.'
              : 'Create a user assignment to preview role-based project allocations.'}
          </p>
          {roleFilter !== ROLE_FILTER_ALL || searchTerm ? <small>Try clearing search and role filters.</small> : null}
        </GlassCard>
      ) : (
        <AssignmentGrid items={visibleAssignments} />
      )}

      <CreateUserModal
        open={isModalOpen}
        form={form}
        errors={errors}
        roleOptions={roleOptions}
        userOptions={currentNames}
        assignmentOptions={optionList}
        onRoleChange={setRole}
        onNameChange={setName}
        onDescriptionChange={setDescription}
        onAssignmentChange={updateAssignmentRow}
        onAddAssignment={addAssignmentRow}
        onRemoveAssignment={removeAssignmentRow}
        onClose={closeCreateModal}
        onSubmit={submit}
      />
    </div>
  )
}
