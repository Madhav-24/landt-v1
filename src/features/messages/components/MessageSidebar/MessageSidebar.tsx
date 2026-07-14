import { GlassCard } from '../../../../components/UI/UI'
import { MessageList } from '../MessageList/MessageList'
import { RoleFilter } from '../RoleFilter/RoleFilter'
import { SearchBar } from '../SearchBar/SearchBar'
import type { Employee, RoleFilter as RoleFilterType } from '../../types/employee'

interface MessageSidebarProps {
  employees: Employee[]
  activeEmployeeId: string | null
  searchTerm: string
  roleFilter: RoleFilterType
  onSearchChange: (value: string) => void
  onRoleFilterChange: (value: RoleFilterType) => void
  onSelectEmployee: (id: string) => void
}

export function MessageSidebar({
  employees,
  activeEmployeeId,
  searchTerm,
  roleFilter,
  onSearchChange,
  onRoleFilterChange,
  onSelectEmployee,
}: MessageSidebarProps) {
  return (
    <GlassCard className="message-sidebar-panel">
      <SearchBar value={searchTerm} onChange={onSearchChange} />
      <RoleFilter value={roleFilter} onChange={onRoleFilterChange} />
      <MessageList employees={employees} activeEmployeeId={activeEmployeeId} onSelect={onSelectEmployee} />
    </GlassCard>
  )
}
