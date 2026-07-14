import { FaPlay } from 'react-icons/fa'

interface VoiceBubbleProps {
  duration?: string
  time: string
  mine: boolean
}

export function VoiceBubble({ duration, time, mine }: VoiceBubbleProps) {
  return (
    <div className={`message-bubble voice ${mine ? 'mine' : 'theirs'}`}>
      <div className="voice-row">
        <button type="button" className="icon-button" aria-label="Play voice message">
          <FaPlay />
        </button>
        <div className="voice-wave" aria-hidden="true" />
        <span>{duration ?? '00:12'}</span>
      </div>
      <small>{time}</small>
    </div>
  )
}
