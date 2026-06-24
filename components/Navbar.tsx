'use client'

import { motion } from 'framer-motion'
import { Facebook, Mail, Send, Youtube } from 'lucide-react'
import { emailUrl, facebookPageUrl } from '@/data/links'

const socialLinks = [
  { label: 'Facebook', href: facebookPageUrl, icon: Facebook },
  { label: 'YouTube', href: 'https://www.youtube.com', icon: Youtube }
]

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative z-50 border-b border-border/70 bg-bg/88 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#" className="group inline-flex flex-col" aria-label="Dew Teerapap home">
          <span className="font-serif text-4xl font-semibold italic leading-none text-orange">Dew.</span>
          <span className="mt-1 text-sm font-semibold text-text">ธีรภาพ ตระการผล (พี่ดิว)</span>
          <span className="text-xs text-muted">HR ข้างบ้าน</span>
        </a>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            {socialLinks.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="grid size-11 place-items-center rounded-full border border-border bg-white/80 text-muted shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:text-orange focus:outline-none focus:ring-2 focus:ring-orange/30"
                >
                  <Icon size={19} />
                </a>
              )
            })}
          </div>

          <a
            href={emailUrl('ติดต่อคุยงาน')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(244,123,32,0.28)] transition hover:-translate-y-0.5 hover:bg-orange-hover focus:outline-none focus:ring-2 focus:ring-orange/35"
          >
            <Send size={17} />
            <span className="hidden sm:inline">ติดต่อคุยงาน</span>
            <Mail className="sm:hidden" size={17} />
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
