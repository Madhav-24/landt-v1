import { AnimatePresence, motion } from 'framer-motion'
import type { TemporaryAssignment } from '../../types/assignment'
import { TemporaryAssignmentCard } from '../TemporaryAssignmentCard/TemporaryAssignmentCard'

interface AssignmentGridProps {
  items: TemporaryAssignment[]
}

export function AssignmentGrid({ items }: AssignmentGridProps) {
  return (
    <div className="assignment-grid" role="list" aria-label="Temporary user assignments">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            role="listitem"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <TemporaryAssignmentCard item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
