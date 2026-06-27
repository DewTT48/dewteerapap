'use client'

import CharacterStage from '@/components/CharacterStage'
import { fadeUp, stagger } from '@/components/motion'
import OrbitLinks from '@/components/OrbitLinks'
import PersonaToggle from '@/components/PersonaToggle'
import ThaiText from '@/components/ThaiText'
import { emailUrl } from '@/data/links'
import { personaConfigs } from '@/data/personas'
import type { CharacterState } from '@/data/links'
import type { PersonaMode } from '@/data/personas'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarCheck, Play } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const idleCharacterStates: CharacterState[] = [
  'default',
  'thinking',
  'pointing',
  'heart',
  'celebrate',
  'wave'
]

type HeroSectionProps = {
  persona: PersonaMode
  onPersonaChange: (persona: PersonaMode) => void
}

export default function HeroSection({ persona, onPersonaChange }: HeroSectionProps) {
  const reduceMotion = useReducedMotion()
  const [hoverState, setHoverState] = useState<CharacterState | null>(null)
  const [idleIndex, setIdleIndex] = useState(0)
  const currentPersona = personaConfigs[persona]

  useEffect(() => {
    if (reduceMotion) return

    const timer = window.setInterval(() => {
      setIdleIndex((current) => (current + 1) % idleCharacterStates.length)
    }, 2600)

    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const characterState = hoverState ?? idleCharacterStates[idleIndex]
  const handleCardHover = (state: CharacterState) => {
    setHoverState(state === 'default' ? null : state)
  }

  return (
    <section
      data-persona={persona}
      className="relative mx-auto max-w-7xl px-5 pb-24 pt-16 transition-colors duration-300 sm:pb-32 lg:min-h-[820px] lg:px-8 lg:pb-24 lg:pt-20"
    >
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-20 lg:col-span-4"
        >
          <div className="flex flex-wrap items-center gap-3">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-4 py-2 text-sm font-semibold text-text ring-1 ring-orange/15 transition-colors duration-300"
            >
              <span className="size-2 rounded-full bg-orange" />
              {currentPersona.badge}
            </motion.div>
            <motion.div variants={fadeUp}>
              <PersonaToggle value={persona} onChange={onPersonaChange} />
            </motion.div>
          </div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 max-w-[620px] text-5xl font-black leading-[1.06] text-text transition-colors duration-300 sm:text-6xl lg:text-[56px]"
          >
            {currentPersona.headline.map((line) => (
              <span key={`${persona}-${line.text}`} className={`block sm:whitespace-nowrap ${currentPersona.headlineClassName} transition-colors duration-300 ${line.className}`}>
                <ThaiText text={line.text} />
              </span>
            ))}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-[34rem] text-lg leading-8 text-muted transition-colors duration-300">
            <ThaiText text={currentPersona.description} />
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={emailUrl(currentPersona.proposalSubject)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_var(--accent-shadow)] transition hover:-translate-y-0.5 hover:bg-orange-hover focus:outline-none focus:ring-2 focus:ring-orange/35"
            >
              <CalendarCheck size={18} />
              นัดคุย / ขอ Proposal
            </a>
            <Link
              href="/portfolio/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-4 text-sm font-bold text-text shadow-soft transition hover:-translate-y-0.5 hover:border-orange/30 focus:outline-none focus:ring-2 focus:ring-orange/30"
            >
              <Play size={18} />
              ดู Portfolio
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative z-10 lg:col-span-8">
          <div className="relative lg:min-h-[740px]">
            <div className="relative z-20 w-full lg:absolute lg:left-[49%] lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
              <CharacterStage state={characterState} persona={persona} />
            </div>
            <OrbitLinks onHover={handleCardHover} />
          </div>
        </div>
      </div>
    </section>
  )
}
