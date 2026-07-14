import { FaFileAlt } from 'react-icons/fa'

interface DocumentBubbleProps {
  title: string
  fileName?: string
  time: string
  mine: boolean
}

export function DocumentBubble({ title, fileName, time, mine }: DocumentBubbleProps) {
  return (
    <div className={`message-bubble doc ${mine ? 'mine' : 'theirs'}`}>
      <div className="message-doc-row">
        <FaFileAlt />
        <div>
          <strong>{title}</strong>
          <p>{fileName ?? 'document.pdf'}</p>
        </div>
      </div>
      <small>{time}</small>
    </div>
  )
}
