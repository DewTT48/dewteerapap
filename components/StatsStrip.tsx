'use client'

import { fadeUp, stagger } from '@/components/motion'
import { stats } from '@/data/stats'
import { motion } from 'framer-motion'

export default function StatsStrip() {
  return (
    <section className="relative z-20 mx-auto max-w-7xl px-5 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="grid gap-4 rounded-[28px] border border-border bg-surface/88 p-5 shadow-soft backdrop-blur transition-colors duration-300 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp} className="px-3 py-4">
            <p className="text-2xl font-black text-text">{stat.value}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
