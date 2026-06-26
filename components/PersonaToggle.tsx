use client'

import type { PersonaMode } from '@/data/personas'
import { personaConfigs } from '@/data/personas'
import { motion, useReducedMotion } from 'framer-motion'

type PersonaToggleProps = {
  value: PersonaMode
  onChange: (value: PersonaMode) => void
}

const modes: PersonaMode[] = ['plus', 'pro']

export default function PersonaToggle({ value, onChange }: PersonaToggleProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="inline-flex rounded-full border border-border bg-white/86 p-1 shadow-soft backdrop-blur transition-colors duration-300"
      aria-label="เลือกบุคลิกของเว็บ"
      role="group"
    >
      {modes.map((mode) => {
        const active = value === mode
        return (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            aria-pressed={active}
            className={`relative min-w-[62px] rounded-full px-3 py-1.5 text-xs font-extrabold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange/30 ${
              active ? 'text-white' : 'text-muted hover:text-text'
            }`}
          >
            {active ? (
              <motion.span
                layoutId="persona-toggle-pill"
                className="absolute inset-0 rounded-full bg-orange"
                transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
              />
            ) : null}
            <span className="relative z-10">{personaConfigs[mode].shortLabel}</span>
          </button>
        )
      })}
    </div>
  )
}
