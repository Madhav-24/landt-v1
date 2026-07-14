interface ImageBubbleProps {
  url: string
  caption?: string
  time: string
  mine: boolean
}

export function ImageBubble({ url, caption, time, mine }: ImageBubbleProps) {
  return (
    <div className={`message-bubble image ${mine ? 'mine' : 'theirs'}`}>
      <img src={url} alt="Shared image" className="message-image" />
      {caption ? <p className="message-caption">{caption}</p> : null}
      <small>{time}</small>
    </div>
  )
}
