import { USER_ROLE_OPTIONS } from '../constants/roles'
import type { UserEntity, UserFormValues, UserMutationResult } from '../types/user'

const MOCK_DELAY = 280

let usersDb: UserEntity[] = [
  {
    id: 'usr-001',
    fullName: 'Madhav',
    email: 'admin@gmail.com',
    employeeId: 'LTADMIN01',
    phoneNumber: '9000000000',
    role: USER_ROLE_OPTIONS[0],
    createdAt: '2026-07-01T09:20:00.000Z',
    updatedAt: '2026-07-01T09:20:00.000Z',
  },
  {
    id: 'usr-002',
    fullName: 'Jaidev',
    email: 'pm@gmail.com',
    employeeId: 'LTPM01',
    phoneNumber: '8870672181',
    role: USER_ROLE_OPTIONS[1],
    createdAt: '2026-07-02T09:20:00.000Z',
    updatedAt: '2026-07-02T09:20:00.000Z',
  },
  {
    id: 'usr-003',
    fullName: 'Jayanitha',
    email: 'sm@gmail.com',
    employeeId: 'LTSM01',
    phoneNumber: '8870672184',
    role: USER_ROLE_OPTIONS[4],
    createdAt: '2026-07-03T09:20:00.000Z',
    updatedAt: '2026-07-03T09:20:00.000Z',
  },
]

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_DELAY))
}

function generateUserId(): string {
  return `usr-${Math.random().toString(36).slice(2, 10)}`
}

function normalizeEmployeeId(value: string): string {
  return value.trim().toUpperCase()
}

export async function listUsers(): Promise<UserEntity[]> {
  return delay([...usersDb])
}

export async function isEmployeeIdTaken(employeeId: string, excludedId?: string): Promise<boolean> {
  const normalizedEmployeeId = normalizeEmployeeId(employeeId)
  const duplicate = usersDb.some(
    (user) => normalizeEmployeeId(user.employeeId) === normalizedEmployeeId && user.id !== excludedId,
  )

  return delay(duplicate)
}

export async function createUser(values: UserFormValues): Promise<UserMutationResult> {
  const now = new Date().toISOString()
  const user: UserEntity = {
    id: generateUserId(),
    fullName: values.fullName,
    email: values.email,
    employeeId: values.employeeId,
    phoneNumber: values.phoneNumber,
    role: values.role,
    createdAt: now,
    updatedAt: now,
  }

  usersDb = [user, ...usersDb]

  return delay({
    ok: true,
    message: 'User created successfully.',
    user,
  })
}

export async function updateUser(id: string, values: UserFormValues): Promise<UserMutationResult> {
  const existingUser = usersDb.find((user) => user.id === id)

  if (!existingUser) {
    return delay({ ok: false, message: 'User not found.' })
  }

  const nextUser: UserEntity = {
    ...existingUser,
    fullName: values.fullName,
    email: values.email,
    employeeId: values.employeeId,
    phoneNumber: values.phoneNumber,
    role: values.role,
    updatedAt: new Date().toISOString(),
  }

  usersDb = usersDb.map((user) => (user.id === id ? nextUser : user))

  return delay({
    ok: true,
    message: 'User updated successfully.',
    user: nextUser,
  })
}

export async function deleteUser(id: string): Promise<UserMutationResult> {
  const existingUser = usersDb.find((user) => user.id === id)

  if (!existingUser) {
    return delay({ ok: false, message: 'User not found.' })
  }

  usersDb = usersDb.filter((user) => user.id !== id)

  return delay({ ok: true, message: 'User deleted successfully.' })
}
