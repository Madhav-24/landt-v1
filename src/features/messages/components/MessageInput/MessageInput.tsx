import { useEffect } from 'react'
import { FaMicrophone, FaPaperPlane, FaPaperclip, FaSmile } from 'react-icons/fa'
import { AttachmentMenu } from '../AttachmentMenu/AttachmentMenu'
import { EmojiPicker } from '../EmojiPicker/EmojiPicker'
import type { AttachmentType } from '../../types/message'

interface MessageInputProps {
  draftMessage: string
  attachmentMenuOpen: boolean
  emojiOpen: boolean
  isRecordingVoice: boolean
  recordingPreviewReady: boolean
  recordingSeconds: number
  onDraftChange: (value: string) => void
  onSend: () => void
  onAttachmentMenuToggle: () => void
  onAttachmentSelect: (type: AttachmentType) => void
  onAttachmentClose: () => void
  onEmojiToggle: () => void
  onEmojiPick: (emoji: string) => void
  onVoiceStart: () => void
  onVoiceStop: () => void
  onVoiceCancel: () => void
  onVoiceSend: () => void
  onVoiceTick: () => void
}

export function MessageInput({
  draftMessage,
  attachmentMenuOpen,
  emojiOpen,
  isRecordingVoice,
  recordingPreviewReady,
  recordingSeconds,
  onDraftChange,
  onSend,
  onAttachmentMenuToggle,
  onAttachmentSelect,
  onAttachmentClose,
  onEmojiToggle,
  onEmojiPick,
  onVoiceStart,
  onVoiceStop,
  onVoiceCancel,
  onVoiceSend,
  onVoiceTick,
}: MessageInputProps) {
  useEffect(() => {
    if (!isRecordingVoice) {
      return
    }
    const timer = window.setInterval(onVoiceTick, 1000)
    return () => window.clearInterval(timer)
  }, [isRecordingVoice, onVoiceTick])

  return (
    <div className="message-input-wrap">
      {isRecordingVoice || recordingPreviewReady ? (
        <div className="voice-recorder-panel">
          <div className={`voice-dot ${isRecordingVoice ? 'recording' : ''}`} />
          <span>{recordingSeconds}s</span>
          <button type="button" className="action-button ghost" onClick={onVoiceCancel}>Cancel</button>
          {isRecordingVoice ? (
            <button type="button" className="action-button ghost" onClick={onVoiceStop}>Preview</button>
          ) : (
            <button type="button" className="action-button primary" onClick={onVoiceSend}>Send Voice</button>
          )}
        </div>
      ) : null}

      <div className="message-input-row">
        <button type="button" className="icon-button" onClick={onEmojiToggle} aria-label="Open emoji picker">
          <FaSmile />
        </button>

        <div className="message-input-attachments">
          <button type="button" className="icon-button" onClick={onAttachmentMenuToggle} aria-label="Open attachment menu">
            <FaPaperclip />
          </button>
          <AttachmentMenu open={attachmentMenuOpen} onSelect={onAttachmentSelect} onClose={onAttachmentClose} />
        </div>

        <input
          type="text"
          className="message-input"
          placeholder="Type a message"
          value={draftMessage}
          onChange={(event) => onDraftChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onSend()
            }
          }}
        />

        <button type="button" className="icon-button" onClick={onVoiceStart} aria-label="Record voice message">
          <FaMicrophone />
        </button>

        <button type="button" className="action-button primary" onClick={onSend} aria-label="Send message">
          <FaPaperPlane />
        </button>
      </div>

      <EmojiPicker open={emojiOpen} onPick={onEmojiPick} />
    </div>
  )
}
