'use client'

import ProductCard from '@/components/ProductCard'
import type { CharacterState } from '@/data/links'
import { platformLinks } from '@/data/links'
import { motion, useReducedMotion } from 'framer-motion'

const desktopPositions = [
  'lg:absolute lg:right-[7%] lg:top-[5%]',
  'lg:absolute lg:right-[-2%] lg:top-[27%]',
  'lg:absolute lg:right-[2%] lg:bottom-[18%]',
  'lg:absolute lg:left-[3%] lg:top-[38%]',
  'lg:absolute lg:left-[9%] lg:bottom-[10%]',
  'lg:absolute lg:right-[29%] lg:bottom-[-1%]',
  'lg:hidden'
]

type OrbitLinksProps = {
  onHover: (state: CharacterState) => void
}

export default function OrbitLinks({ onHover }: OrbitLinksProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="lg:pointer-events-none lg:absolute lg:inset-0">
      <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            aria-hidden="true"
            className="absolute left-[49%] top-1/2 rounded-full border border-orange/15"
            style={{
              width: `${520 + ring * 122}px`,
              height: `${520 + ring * 122}px`,
              marginLeft: `${-(520 + ring * 122) / 2}px`,
              marginTop: `${-(520 + ring * 122) / 2}px`
            }}
            animate={reduceMotion ? undefined : { rotate: ring % 2 ? -360 : 360 }}
            transition={reduceMotion ? undefined : { duration: 55 + ring * 20, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute -right-1 top-1/2 size-2.5 rounded-full bg-orange/25" />
            <span className="absolute left-[24%] top-[11%] size-2 rounded-full bg-olive/28" />
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-auto relative z-30 mt-7 grid grid-cols-1 gap-3 px-1 sm:grid-cols-2 lg:absolute lg:inset-0 lg:mt-0 lg:block lg:px-0">
        {platformLinks.slice(0, 6).map((item, index) => (
          <ProductCard
            key={item.id}
            item={item}
            index={index}
            onHover={onHover}
            className={desktopPositions[index]}
          />
        ))}
      </div>
    </div>
  )
}
