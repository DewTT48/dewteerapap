'use client'

import type { CharacterState } from '@/data/links'
import type { PersonaMode } from '@/data/personas'
import { getPersonaCharacterImage } from '@/data/personas'
import { assetPath } from '@/lib/asset-path'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

type CharacterStageProps = {
  state: CharacterState
  persona?: PersonaMode
}

export default function CharacterStage({ state, persona = 'plus' }: CharacterStageProps) {
  const reduceMotion = useReducedMotion()
  const src = assetPath(getPersonaCharacterImage(persona, state))

  return (
    <motion.div
      className="relative mx-auto aspect-square w-[min(92vw,520px)]"
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={reduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-[11%] rounded-full bg-[radial-gradient(circle,rgba(255,247,239,0.96)_0%,rgba(255,247,239,0.45)_52%,rgba(255,247,239,0)_70%)]"
        animate={reduceMotion ? undefined : { scale: [1, 1.035, 1] }}
        transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={`${persona}-${src}`}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -8 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt="Dew illustrated character"
            fill
            priority
            sizes="(max-width: 768px) 92vw, 520px"
            className="object-contain drop-shadow-[0_28px_32px_rgba(30,36,48,0.16)]"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
