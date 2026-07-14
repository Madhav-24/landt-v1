import { useMemo, useState } from 'react'
import { dummyEmployees } from '../data/dummyEmployees'
import { dummyMessages } from '../data/dummyMessages'
import type { Employee, RoleFilter } from '../types/employee'
import type { AttachmentType, ChatMessage } from '../types/message'

function buildId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function useMessages() {
  const [employees, setEmployees] = useState<Employee[]>(dummyEmployees)
  const [messagesByEmployee, setMessagesByEmployee] = useState<Record<string, ChatMessage[]>>(dummyMessages)
  const [activeEmployeeId, setActiveEmployeeId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('All')
  const [draftMessage, setDraftMessage] = useState('')
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false)
  const [imageCaption, setImageCaption] = useState('')
  const [selectedImageUrl, setSelectedImageUrl] = useState('')
  const [isRecordingVoice, setIsRecordingVoice] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [recordingPreviewReady, setRecordingPreviewReady] = useState(false)

  const activeEmployee = useMemo(
    () => employees.find((employee) => employee.id === activeEmployeeId) ?? null,
    [activeEmployeeId, employees],
  )

  const activeMessages = useMemo(
    () => (activeEmployeeId ? messagesByEmployee[activeEmployeeId] ?? [] : []),
    [activeEmployeeId, messagesByEmployee],
  )

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    return employees.filter((employee) => {
      const matchesRole = roleFilter === 'All' || employee.role === roleFilter
      const matchesSearch =
        !normalizedSearch ||
        [employee.name, employee.role].join(' ').toLowerCase().includes(normalizedSearch)
      return matchesRole && matchesSearch
    })
  }, [employees, roleFilter, searchTerm])

  function updateEmployeeMeta(employeeId: string, latestText: string) {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId
          ? {
              ...employee,
              lastMessage: latestText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              unreadCount: 0,
            }
          : employee,
      ),
    )
  }

  function appendMessage(employeeId: string, message: ChatMessage) {
    setMessagesByEmployee((prevMessages) => {
      const existingMessages = prevMessages[employeeId] ?? []
      return {
        ...prevMessages,
        [employeeId]: [...existingMessages, message],
      }
    })

    updateEmployeeMeta(employeeId, message.content)
  }

  function openConversation(employeeId: string) {
    setActiveEmployeeId(employeeId)
    setEmojiOpen(false)
    setAttachmentMenuOpen(false)
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId
          ? {
              ...employee,
              unreadCount: 0,
            }
          : employee,
      ),
    )
  }

  function sendTextMessage() {
    if (!activeEmployeeId || !draftMessage.trim()) {
      return
    }

    appendMessage(activeEmployeeId, {
      id: buildId('msg'),
      employeeId: activeEmployeeId,
      sender: 'me',
      type: 'text',
      content: draftMessage.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    })

    setDraftMessage('')
    setEmojiOpen(false)
  }

  function sendAttachment(type: AttachmentType) {
    if (!activeEmployeeId) {
      return
    }

    if (type === 'Live Camera') {
      setCameraOpen(true)
      setAttachmentMenuOpen(false)
      return
    }

    if (type === 'Gallery Image') {
      setSelectedImageUrl('https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?auto=format&fit=crop&w=900&q=60')
      setImageCaption('')
      setImagePreviewOpen(true)
      setAttachmentMenuOpen(false)
      return
    }

    const now = new Date().toISOString()

    if (type === 'Progress Report') {
      appendMessage(activeEmployeeId, {
        id: buildId('msg'),
        employeeId: activeEmployeeId,
        sender: 'me',
        type: 'progress',
        content: 'Progress card shared for Layer WMM at CH 10+500.',
        createdAt: now,
        read: false,
      })
      setAttachmentMenuOpen(false)
      return
    }

    if (type === 'PPE Alert') {
      appendMessage(activeEmployeeId, {
        id: buildId('msg'),
        employeeId: activeEmployeeId,
        sender: 'me',
        type: 'ppe',
        content: 'PPE alert card shared for Site A - Camera 03.',
        createdAt: now,
        read: false,
      })
      setAttachmentMenuOpen(false)
      return
    }

    const isVideo = type === 'Video'

    appendMessage(activeEmployeeId, {
      id: buildId('msg'),
      employeeId: activeEmployeeId,
      sender: 'me',
      type: isVideo ? 'video' : 'document',
      content: `${type} shared`,
      fileName: `${type.replace(/\s+/g, '_').toLowerCase()}_report.pdf`,
      createdAt: now,
      read: false,
    })

    setAttachmentMenuOpen(false)
  }

  function captureCameraImage() {
    setSelectedImageUrl('https://images.unsplash.com/photo-1581091215367-59ab6dcef7f8?auto=format&fit=crop&w=900&q=60')
    setImageCaption('')
    setCameraOpen(false)
    setImagePreviewOpen(true)
  }

  function sendPreviewImage() {
    if (!activeEmployeeId || !selectedImageUrl) {
      return
    }

    appendMessage(activeEmployeeId, {
      id: buildId('msg'),
      employeeId: activeEmployeeId,
      sender: 'me',
      type: 'image',
      content: selectedImageUrl,
      fileName: imageCaption.trim() || undefined,
      createdAt: new Date().toISOString(),
      read: false,
    })

    setImagePreviewOpen(false)
    setSelectedImageUrl('')
    setImageCaption('')
  }

  function addEmoji(value: string) {
    setDraftMessage((prevDraft) => `${prevDraft}${value}`)
  }

  function tickVoiceRecorder() {
    setRecordingSeconds((prevSeconds) => prevSeconds + 1)
  }

  function startVoiceRecording() {
    if (!activeEmployeeId) {
      return
    }
    setRecordingSeconds(0)
    setRecordingPreviewReady(false)
    setIsRecordingVoice(true)
  }

  function stopVoiceRecording() {
    setIsRecordingVoice(false)
    setRecordingPreviewReady(true)
  }

  function cancelVoiceRecording() {
    setIsRecordingVoice(false)
    setRecordingPreviewReady(false)
    setRecordingSeconds(0)
  }

  function sendVoiceRecording() {
    if (!activeEmployeeId || recordingSeconds <= 0) {
      return
    }

    appendMessage(activeEmployeeId, {
      id: buildId('msg'),
      employeeId: activeEmployeeId,
      sender: 'me',
      type: 'voice',
      content: 'Voice message',
      duration: formatDuration(recordingSeconds),
      createdAt: new Date().toISOString(),
      read: false,
    })

    cancelVoiceRecording()
  }

  return {
    activeEmployee,
    activeMessages,
    filteredEmployees,
    searchTerm,
    roleFilter,
    draftMessage,
    attachmentMenuOpen,
    emojiOpen,
    cameraOpen,
    imagePreviewOpen,
    selectedImageUrl,
    imageCaption,
    isRecordingVoice,
    recordingPreviewReady,
    recordingSeconds,
    setSearchTerm,
    setRoleFilter,
    setDraftMessage,
    setAttachmentMenuOpen,
    setEmojiOpen,
    setCameraOpen,
    setImagePreviewOpen,
    setImageCaption,
    openConversation,
    sendTextMessage,
    sendAttachment,
    captureCameraImage,
    sendPreviewImage,
    addEmoji,
    tickVoiceRecorder,
    startVoiceRecording,
    stopVoiceRecording,
    cancelVoiceRecording,
    sendVoiceRecording,
  }
}
