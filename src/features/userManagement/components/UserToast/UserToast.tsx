import { AnimatePresence, motion } from 'framer-motion'
import './UserToast.css'

interface UserToastProps {
  open: boolean
  message: string
  onClose: () => void
}

export function UserToast({ open, message, onClose }: UserToastProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="user-toast"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          role="status"
          aria-live="polite"
          onAnimationEnd={() => {
            window.setTimeout(onClose, 1800)
          }}
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
