import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, type PropsWithChildren } from 'react'
import { FaTimes } from 'react-icons/fa'
import './UserModal.css'

interface UserModalProps extends PropsWithChildren {
  isOpen: boolean
  title: string
  subtitle?: string
  onClose: () => void
}

export function UserModal({ isOpen, title, subtitle, onClose, children }: UserModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="user-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="user-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="user-modal-header">
              <div>
                <h3>{title}</h3>
                {subtitle ? <p>{subtitle}</p> : null}
              </div>
              <button type="button" className="icon-button" aria-label="Close modal" onClick={onClose}>
                <FaTimes />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
