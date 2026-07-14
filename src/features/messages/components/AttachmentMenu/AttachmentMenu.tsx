import { AnimatePresence, motion } from 'framer-motion'
import type { AttachmentType } from '../../types/message'

const OPTIONS: AttachmentType[] = [
  'Document',
  'Gallery Image',
  'Live Camera',
  'Video',
  'Voice Recording',
  'Progress Report',
  'PPE Alert',
  'Site Documents',
]

interface AttachmentMenuProps {
  open: boolean
  onSelect: (type: AttachmentType) => void
  onClose: () => void
}

export function AttachmentMenu({ open, onSelect, onClose }: AttachmentMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="attachment-menu"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.16 }}
          role="menu"
          aria-label="Attachment menu"
        >
          {OPTIONS.map((option) => (
            <button type="button" key={option} role="menuitem" onClick={() => onSelect(option)}>
              {option}
            </button>
          ))}
          <button type="button" role="menuitem" onClick={onClose}>Cancel</button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
