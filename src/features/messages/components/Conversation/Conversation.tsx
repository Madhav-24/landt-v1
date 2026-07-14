import { useMemo } from 'react'
import type { ChatMessage } from '../../types/message'
import { MessageBubble } from '../MessageBubble/MessageBubble'

interface ConversationProps {
  messages: ChatMessage[]
}

function formatDateLabel(value: string): string {
  const date = new Date(value)
  const today = new Date()
  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  }
  return date.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })
}

export function Conversation({ messages }: ConversationProps) {
  const grouped = useMemo(() => {
    const map = new Map<string, ChatMessage[]>()
    messages.forEach((message) => {
      const key = formatDateLabel(message.createdAt)
      const current = map.get(key) ?? []
      current.push(message)
      map.set(key, current)
    })
    return Array.from(map.entries())
  }, [messages])

  return (
    <div className="conversation-scroll" aria-label="Conversation messages">
      {grouped.map(([dateLabel, list]) => (
        <div key={dateLabel}>
          <div className="date-separator">{dateLabel}</div>
          {list.map((message) => (
            <div key={message.id} className={`message-row ${message.sender === 'me' ? 'mine' : 'theirs'}`}>
              <MessageBubble message={message} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
