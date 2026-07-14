import type { ChatMessage } from '../types/message'

function createTimestamp(hoursAgo: number): string {
  return new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString()
}

export const dummyMessages: Record<string, ChatMessage[]> = {
  'emp-2': [
    {
      id: 'm-1',
      employeeId: 'emp-2',
      sender: 'me',
      type: 'text',
      content: 'Hello Sir.',
      createdAt: createTimestamp(8),
      read: true,
    },
    {
      id: 'm-2',
      employeeId: 'emp-2',
      sender: 'them',
      type: 'text',
      content: 'Please upload today\'s progress.',
      createdAt: createTimestamp(7.7),
      read: true,
    },
    {
      id: 'm-3',
      employeeId: 'emp-2',
      sender: 'me',
      type: 'text',
      content: 'Progress uploaded.',
      createdAt: createTimestamp(7.5),
      read: true,
    },
    {
      id: 'm-4',
      employeeId: 'emp-2',
      sender: 'me',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=60',
      createdAt: createTimestamp(7.2),
      read: true,
    },
    {
      id: 'm-5',
      employeeId: 'emp-2',
      sender: 'me',
      type: 'voice',
      content: 'Voice message',
      duration: '00:18',
      createdAt: createTimestamp(7),
      read: true,
    },
    {
      id: 'm-6',
      employeeId: 'emp-2',
      sender: 'them',
      type: 'text',
      content: 'Received. Looks good.',
      createdAt: createTimestamp(6.7),
      read: false,
    },
  ],
  'emp-4': [
    {
      id: 'm-7',
      employeeId: 'emp-4',
      sender: 'them',
      type: 'ppe',
      content: 'PPE alert triggered at Site B Camera 04',
      createdAt: createTimestamp(2),
      read: false,
    },
    {
      id: 'm-8',
      employeeId: 'emp-4',
      sender: 'me',
      type: 'progress',
      content: 'WMM Layer progress updated to 62%',
      createdAt: createTimestamp(1.8),
      read: false,
    },
  ],
}
