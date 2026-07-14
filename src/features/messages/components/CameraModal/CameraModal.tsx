import { AnimatePresence, motion } from 'framer-motion'
import { ActionButton } from '../../../../components/UI/UI'

interface CameraModalProps {
  open: boolean
  onCapture: () => void
  onClose: () => void
}

export function CameraModal({ open, onCapture, onClose }: CameraModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="message-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="message-modal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
            <h3>Live Camera Capture</h3>
            <div className="camera-preview">Camera Preview</div>
            <div className="message-modal-actions">
              <ActionButton variant="ghost" type="button" onClick={onClose}>Cancel</ActionButton>
              <ActionButton variant="ghost" type="button" onClick={onCapture}>Retake</ActionButton>
              <ActionButton variant="primary" type="button" onClick={onCapture}>Capture</ActionButton>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
