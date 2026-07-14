import { AnimatePresence, motion } from 'framer-motion'
import { ActionButton } from '../../../../components/UI/UI'

interface ImagePreviewModalProps {
  open: boolean
  imageUrl: string
  caption: string
  onCaptionChange: (value: string) => void
  onCancel: () => void
  onSend: () => void
}

export function ImagePreviewModal({
  open,
  imageUrl,
  caption,
  onCaptionChange,
  onCancel,
  onSend,
}: ImagePreviewModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="message-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="message-modal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
            <h3>Image Preview</h3>
            {imageUrl ? <img src={imageUrl} alt="Selected preview" className="preview-image" /> : null}
            <textarea
              rows={3}
              className="message-input preview-caption"
              placeholder="Add caption"
              value={caption}
              onChange={(event) => onCaptionChange(event.target.value)}
            />
            <div className="message-modal-actions">
              <ActionButton variant="ghost" type="button" onClick={onCancel}>Cancel</ActionButton>
              <ActionButton variant="primary" type="button" onClick={onSend}>Send</ActionButton>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
