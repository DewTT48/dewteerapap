'use client'

import { personaConfigs, type PersonaMode } from '@/data/personas'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'dew-persona-mode'

type PersonaContextValue = {
  persona: PersonaMode
  setPersona: (persona: PersonaMode) => void
}

const PersonaContext = createContext<PersonaContextValue | null>(null)

export default function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersona] = useState<PersonaMode>('plus')
  const [hasRestoredPersona, setHasRestoredPersona] = useState(false)

  useEffect(() => {
    try {
      const storedPersona = window.localStorage.getItem(STORAGE_KEY)
      if (storedPersona === 'plus' || storedPersona === 'pro') {
        setPersona(storedPersona)
      }
    } catch {
      // Keep the default theme when browser storage is unavailable.
    } finally {
      setHasRestoredPersona(true)
    }
  }, [])

  useEffect(() => {
    if (!hasRestoredPersona) return

    try {
      window.localStorage.setItem(STORAGE_KEY, persona)
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  }, [hasRestoredPersona, persona])

  const value = useMemo(() => ({ persona, setPersona }), [persona])
  const currentPersona = personaConfigs[persona]

  return (
    <PersonaContext.Provider value={value}>
      <div
        data-persona={persona}
        style={currentPersona.cssVars}
        className="min-h-screen bg-bg text-text transition-colors duration-300"
      >
        {children}
      </div>
    </PersonaContext.Provider>
  )
}

export function usePersona() {
  const context = useContext(PersonaContext)
  if (!context) throw new Error('usePersona must be used within PersonaProvider')
  return context
}
