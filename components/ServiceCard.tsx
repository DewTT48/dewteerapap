'use client'

import type { Service } from '@/data/services'
import { motion } from 'framer-motion'
import ThaiText from '@/components/ThaiText'

const iconStyles: Record<Service['accent'], string> = {
  orange: 'bg-orange text-white',
  olive: 'bg-olive text-white',
  purple: 'bg-[var(--icon-purple-bg)] text-white',
  yellow: 'bg-[var(--icon-yellow-bg)] text-white',
  rose: 'bg-[var(--icon-rose-solid)] text-white'
}

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } }
      }}
      className="rounded-[24px] border border-border bg-surface p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
    >
      <div className={`grid size-14 place-items-center rounded-2xl ${iconStyles[service.accent]}`}>
        <Icon size={26} />
      </div>
      <h3 className="mt-6 text-lg font-extrabold text-text"><ThaiText text={service.title} /></h3>
      <p className="mt-3 text-sm leading-7 text-muted"><ThaiText text={service.description} /></p>
    </motion.article>
  )
}
