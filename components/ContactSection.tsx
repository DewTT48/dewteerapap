'use client'

import { fadeUp } from '@/components/motion'
import { emailUrl } from '@/data/links'
import type { PersonaMode } from '@/data/personas'
import { assetPath } from '@/lib/asset-path'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, Mail } from 'lucide-react'
import Image from 'next/image'
import ThaiText from '@/components/ThaiText'

type ContactSectionProps = {
  persona: PersonaMode
}

export default function ContactSection({ persona }: ContactSectionProps) {
  const reduceMotion = useReducedMotion()
  const isPro = persona === 'pro'
  const contactImage = isPro ? '/characters/pro/dew-pro-laptop-sit.png' : '/characters/dew-laptop-sit.png'
  const eyebrow = isPro ? 'Executive Consultation' : 'Work with Dew'
  const headline = isPro
    ? 'อยากให้ HR Workflow และ AI Adoption ใช้งานได้จริงในองค์กร?'
    : 'อยากให้ทีม HR ของคุณทำงานง่ายขึ้นด้วย AI และระบบที่ใช่?'
  const description = isPro
    ? 'มาคุยกันครับ เพื่อออกแบบระบบงาน คน และ AI ที่เชื่อมกับเป้าหมายธุรกิจและขยายผลได้อย่างรับผิดชอบ'
    : 'มาคุยกันครับ ผมยินดีช่วยออกแบบโซลูชันที่เหมาะกับองค์กรของคุณ'

  return (
    <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="relative overflow-hidden rounded-[32px] border border-border bg-[linear-gradient(135deg,var(--surface)_0%,var(--surface-soft)_54%,rgba(255,255,255,0.86)_100%)] p-8 shadow-soft transition-colors duration-300 sm:p-12 lg:min-h-[420px]"
      >
        <motion.div variants={fadeUp} className="relative z-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">{eyebrow}</p>
          <h2 className="mt-5 text-4xl font-black leading-tight text-text sm:text-5xl">
            <ThaiText text={headline} />
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            <ThaiText text={description} />
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={emailUrl('ติดต่อคุยงาน')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_var(--accent-shadow)] transition hover:-translate-y-0.5 hover:bg-orange-hover focus:outline-none focus:ring-2 focus:ring-orange/35"
            >
              <Mail size={18} />
              ติดต่อคุยงาน
            </a>
            <a
              href={emailUrl('นัดคุย 30 นาที')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-4 text-sm font-bold text-text shadow-soft transition hover:-translate-y-0.5 hover:border-orange/30 focus:outline-none focus:ring-2 focus:ring-orange/30"
            >
              <CalendarDays size={18} />
              นัดคุย 30 นาที
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative z-0 mx-auto mt-8 aspect-square w-[min(86vw,360px)] lg:absolute lg:bottom-[-12px] lg:right-8 lg:mt-0 lg:w-[430px]"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 44, y: 16 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <Image
            src={assetPath(contactImage)}
            alt="Dew working on a laptop"
            fill
            sizes="(max-width: 768px) 86vw, 430px"
            className="object-contain drop-shadow-[0_24px_26px_rgba(30,36,48,0.14)]"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
