import { useState, useEffect } from 'react'

export function useLocalStorageState<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use provided initialValue
  const [state, setState] = useState<T>(() => {
    const savedValue = localStorage.getItem(key)
    try {
      return savedValue ? JSON.parse(savedValue) : initialValue
    } catch {
      return initialValue
    }
  })

  // Sync with localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState] as const
}
