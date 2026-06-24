'use client'

import { fadeUp } from '@/components/motion'
import { emailUrl } from '@/data/links'
import { assetPath } from '@/lib/asset-path'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, Mail } from 'lucide-react'
import Image from 'next/image'

export default function ContactSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="relative overflow-hidden rounded-[32px] border border-border bg-[linear-gradient(135deg,#fff_0%,#fff7ef_54%,#f7f7f0_100%)] p-8 shadow-soft sm:p-12 lg:min-h-[420px]"
      >
        <motion.div variants={fadeUp} className="relative z-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Work with Dew</p>
          <h2 className="mt-5 text-4xl font-black leading-tight text-text sm:text-5xl">
            อยากให้ทีม HR ของคุณทำงานง่ายขึ้นด้วย AI และระบบที่ใช่?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            มาคุยกันครับ ผมยินดีช่วยออกแบบโซลูชันที่เหมาะกับองค์กรของคุณ
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={emailUrl('ติดต่อคุยงาน')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_rgba(244,123,32,0.28)] transition hover:-translate-y-0.5 hover:bg-orange-hover focus:outline-none focus:ring-2 focus:ring-orange/35"
            >
              <Mail size={18} />
              ติดต่อคุยงาน
            </a>
            <a
              href={emailUrl('นัดคุย 30 นาที')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-4 text-sm font-bold text-text shadow-soft transition hover:-translate-y-0.5 hover:border-orange/30 focus:outline-none focus:ring-2 focus:ring-orange/30"
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
            src={assetPath('/characters/dew-laptop-sit.png')}
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
