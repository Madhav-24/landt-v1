import { FaCheckDouble, FaExclamationTriangle, FaRoad } from 'react-icons/fa'
import type { ChatMessage } from '../../types/message'
import { DocumentBubble } from '../DocumentBubble/DocumentBubble'
import { ImageBubble } from '../ImageBubble/ImageBubble'
import { VoiceBubble } from '../VoiceBubble/VoiceBubble'

interface MessageBubbleProps {
  message: ChatMessage
}

function formatTime(value: string): string {
  return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function PpeAlertCard({ mine, time }: { mine: boolean; time: string }) {
  return (
    <div className={`message-bubble card ${mine ? 'mine' : 'theirs'}`}>
      <div className="card-alert-head">
        <FaExclamationTriangle />
        <strong>PPE Alert</strong>
        <span className="status-pill danger">High</span>
      </div>
      <p>Site: Site B • Camera: CAM-04 • Chainage: CH 10+500</p>
      <small>{time}</small>
    </div>
  )
}

function ProgressCard({ mine, time }: { mine: boolean; time: string }) {
  return (
    <div className={`message-bubble card ${mine ? 'mine' : 'theirs'}`}>
      <div className="card-alert-head">
        <FaRoad />
        <strong>Progress Report</strong>
        <span className="status-pill success">62%</span>
      </div>
      <p>Layer: WMM • Chainage: CH 10+500 • Captured: 10:10 AM</p>
      <small>{time}</small>
    </div>
  )
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const mine = message.sender === 'me'
  const time = formatTime(message.createdAt)

  if (message.type === 'image') {
    return <ImageBubble url={message.content} caption={message.fileName} time={time} mine={mine} />
  }

  if (message.type === 'voice') {
    return <VoiceBubble duration={message.duration} time={time} mine={mine} />
  }

  if (message.type === 'document' || message.type === 'video') {
    return <DocumentBubble title={message.content} fileName={message.fileName} time={time} mine={mine} />
  }

  if (message.type === 'ppe') {
    return <PpeAlertCard mine={mine} time={time} />
  }

  if (message.type === 'progress') {
    return <ProgressCard mine={mine} time={time} />
  }

  return (
    <div className={`message-bubble text ${mine ? 'mine' : 'theirs'}`}>
      <p>{message.content}</p>
      <small>
        {time} {mine ? <FaCheckDouble className={`receipt ${message.read ? 'read' : ''}`} /> : null}
      </small>
    </div>
  )
}
