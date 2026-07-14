export type AttachmentType =
  | 'Document'
  | 'Gallery Image'
  | 'Live Camera'
  | 'Video'
  | 'Voice Recording'
  | 'Progress Report'
  | 'PPE Alert'
  | 'Site Documents'

export type MessageType = 'text' | 'image' | 'voice' | 'document' | 'ppe' | 'progress' | 'video'

export interface ChatMessage {
  id: string
  employeeId: string
  sender: 'me' | 'them'
  type: MessageType
  content: string
  fileName?: string
  duration?: string
  createdAt: string
  read: boolean
}
