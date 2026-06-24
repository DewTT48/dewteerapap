'use client'

import CharacterStage from '@/components/CharacterStage'
import { fadeUp, stagger } from '@/components/motion'
import OrbitLinks from '@/components/OrbitLinks'
import { emailUrl } from '@/data/links'
import { assetPath } from '@/lib/asset-path'
import type { CharacterState } from '@/data/links'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarCheck, Play, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const idleCharacterStates: CharacterState[] = [
  'default',
  'thinking',
  'pointing',
  'heart',
  'celebrate',
  'wave'
]

export default function HeroSection() {
  const reduceMotion = useReducedMotion()
  const [hoverState, setHoverState] = useState<CharacterState | null>(null)
  const [idleIndex, setIdleIndex] = useState(0)

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
    <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-16 sm:pb-32 lg:min-h-[820px] lg:px-8 lg:pb-24 lg:pt-20">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-20 lg:col-span-4"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-4 py-2 text-sm font-semibold text-text ring-1 ring-orange/15"
          >
            <span className="size-2 rounded-full bg-orange" />
            Modern HR x AI Workflow Designer
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 max-w-[620px] text-5xl font-black leading-[1.06] text-text sm:text-6xl lg:text-[56px]"
          >
            <span className="block text-[clamp(2.7rem,4.5vw,3.7rem)]">HR ยุคใหม่</span>
            <span className="block text-[clamp(2.7rem,4.5vw,3.7rem)]">ต้องเข้าใจ</span>
            <span className="mt-3 block text-orange">People</span>
            <span className="block text-olive">Business</span>
            <span className="block text-text">AI</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-[34rem] text-lg leading-8 text-muted">
            ผมช่วยองค์กรและทีม HR ออกแบบระบบงานและการใช้ AI ให้ทำงาน smart ขึ้น
            เร็วขึ้น และตรวจสอบได้ เพื่อให้ HR เป็นพาร์ทเนอร์ที่ธุรกิจและคนทำงานไว้วางใจ
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={emailUrl('นัดคุย / ขอ Proposal')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_rgba(244,123,32,0.28)] transition hover:-translate-y-0.5 hover:bg-orange-hover focus:outline-none focus:ring-2 focus:ring-orange/35"
            >
              <CalendarCheck size={18} />
              นัดคุย / ขอ Proposal
            </a>
            <a
              href={assetPath('/portfolio/')}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-4 text-sm font-bold text-text shadow-soft transition hover:-translate-y-0.5 hover:border-orange/30 focus:outline-none focus:ring-2 focus:ring-orange/30"
            >
              <Play size={18} />
              ดู Portfolio
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 inline-flex items-center gap-2 text-sm text-muted">
            <Sparkles size={17} className="text-orange" />
            คลิกการ์ดรอบตัวละครเพื่อดู ecosystem งาน HR x Tech ของพี่ดิว
          </motion.div>
        </motion.div>

        <div className="relative z-10 lg:col-span-8">
          <div className="relative lg:min-h-[740px]">
            <div className="relative z-20 w-full lg:absolute lg:left-[49%] lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
              <CharacterStage state={characterState} />
            </div>
            <OrbitLinks onHover={handleCardHover} />
          </div>
        </div>
      </div>
    </section>
  )
}
