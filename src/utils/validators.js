export function validatePassword(password) {
  return {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  }
}

export function passwordStrength(password) {
  const checks = validatePassword(password)
  const score = Object.values(checks).filter(Boolean).length

  if (score <= 1) return { label: 'Weak', level: 1 }
  if (score === 2) return { label: 'Fair', level: 2 }
  if (score === 3) return { label: 'Good', level: 3 }
  return { label: 'Strong', level: 4 }
}

export function validateLoginField(value) {
  return value.trim().length >= 3
}
