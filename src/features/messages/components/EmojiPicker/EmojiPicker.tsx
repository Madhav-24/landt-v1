import { AnimatePresence, motion } from 'framer-motion'

const EMOJIS = ['👍', '✅', '🚧', '📸', '🛠', '📄', '🎯', '⚠️', '📍', '🧱']

interface EmojiPickerProps {
  open: boolean
  onPick: (emoji: string) => void
}

export function EmojiPicker({ open, onPick }: EmojiPickerProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="emoji-picker"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.16 }}
          aria-label="Emoji picker"
        >
          {EMOJIS.map((emoji) => (
            <button type="button" key={emoji} onClick={() => onPick(emoji)} aria-label={`Select ${emoji}`}>
              {emoji}
            </button>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
