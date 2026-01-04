const USER_STORAGE_KEY = 'bytecart_user'

export function signIn(credentials) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const { email, password } = credentials
        
        if (!email || !password) {
          reject(new Error('Email and password are required'))
          return
        }
        
        if (password.length < 6) {
          reject(new Error('Password must be at least 6 characters'))
          return
        }
        
        const user = {
          id: 'user_' + Date.now(),
          email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString()
        }
        
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
        resolve(user)
      } catch (error) {
        reject(error)
      }
    }, 800)
  })
}

export function signOut() {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        localStorage.removeItem(USER_STORAGE_KEY)
        resolve()
      } catch {
        resolve()
      }
    }, 300)
  })
}

export function getCurrentUser() {
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}
