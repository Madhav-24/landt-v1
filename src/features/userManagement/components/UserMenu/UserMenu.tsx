import { useEffect, useRef, useState } from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import './UserMenu.css'

interface UserMenuProps {
  onEdit: () => void
  onDelete: () => void
}

export function UserMenu({ onEdit, onDelete }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', onDocumentClick)
    document.addEventListener('keydown', onEscape)

    return () => {
      document.removeEventListener('mousedown', onDocumentClick)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  function handleAction(action: () => void) {
    setIsOpen(false)
    action()
  }

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        type="button"
        className="icon-button user-menu-trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Open user actions"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaEllipsisV />
      </button>

      {isOpen ? (
        <div className="user-menu-popover" role="menu" aria-label="User actions">
          <button type="button" role="menuitem" onClick={() => handleAction(onEdit)}>
            Edit
          </button>
          <button type="button" role="menuitem" onClick={() => handleAction(onDelete)}>
            Delete
          </button>
        </div>
      ) : null}
    </div>
  )
}
