'use client'

import type { CharacterState, PlatformAccent, PlatformLink } from '@/data/links'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const accentStyles: Record<PlatformAccent, string> = {
  orange: 'bg-[#FFF1E5] text-orange ring-orange/20',
  olive: 'bg-[#F0F3E7] text-olive ring-olive/20',
  blue: 'bg-[#EEF6F4] text-[#4E7B76] ring-[#4E7B76]/15',
  rose: 'bg-[#FFF0EF] text-[#D95C50] ring-[#D95C50]/15',
  neutral: 'bg-[#F4F1EC] text-[#5C5145] ring-[#5C5145]/12'
}

type ProductCardProps = {
  item: PlatformLink
  className?: string
  onHover: (state: CharacterState) => void
  index: number
}

export default function ProductCard({ item, className = '', onHover, index }: ProductCardProps) {
  const reduceMotion = useReducedMotion()
  const Icon = item.icon

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`เปิด ${item.name}`}
      onMouseEnter={() => onHover(item.characterState)}
      onMouseLeave={() => onHover('default')}
      onFocus={() => onHover(item.characterState)}
      onBlur={() => onHover('default')}
      initial={{ opacity: 0, y: 18 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -5, 0] }}
      transition={
        reduceMotion
          ? { delay: index * 0.03, duration: 0.2 }
          : {
              opacity: { delay: 0.35 + index * 0.07, duration: 0.35 },
              y: {
                delay: index * 0.18,
                duration: 4.8 + index * 0.25,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }
      }
      whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }}
      className={`group relative block w-full rounded-[20px] border border-border bg-surface/88 p-4 shadow-soft backdrop-blur transition-shadow hover:shadow-lift focus:outline-none focus:ring-2 focus:ring-orange/30 sm:w-[224px] ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className={`grid size-12 place-items-center rounded-[18px] ring-1 ${accentStyles[item.accent]}`}>
          <Icon size={23} strokeWidth={1.8} />
        </div>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-orange/10 text-orange/85 transition group-hover:translate-x-1 group-hover:text-orange">
          <ArrowUpRight size={16} strokeWidth={1.8} />
        </span>
      </div>
      <h3 className="text-sm font-extrabold text-text">{item.name}</h3>
      <p className="mt-1.5 text-xs leading-5 text-muted">{item.description}</p>
    </motion.a>
  )
}
