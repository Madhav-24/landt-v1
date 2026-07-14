import { ActionButton } from '../../../../components/UI/UI'

interface CreateUserButtonProps {
  onClick: () => void
}

export function CreateUserButton({ onClick }: CreateUserButtonProps) {
  return (
    <ActionButton variant="primary" onClick={onClick} aria-label="Create user assignment">
      + Create User
    </ActionButton>
  )
}
