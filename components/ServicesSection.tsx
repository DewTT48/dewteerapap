'use client'

import { fadeUp, stagger } from '@/components/motion'
import ServiceCard from '@/components/ServiceCard'
import { services } from '@/data/services'
import { motion } from 'framer-motion'
import ThaiText from '@/components/ThaiText'
import LineBreakText from '@/components/LineBreakText'

const servicesHeading = ['ผมช่วยอะไร', 'องค์กรคุณได้บ้าง']

export default function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-28 mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.18em] text-orange">
          I help HR teams with
        </motion.p>
        <motion.div variants={fadeUp} className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <h2 className="max-w-2xl text-4xl font-black leading-tight text-text sm:text-5xl">
            <LineBreakText lines={servicesHeading} />
          </h2>
          <p className="max-w-xl text-base leading-8 text-muted">
            <ThaiText text="จากกลยุทธ์ HR สู่ workflow ที่ใช้ได้จริง พร้อมเครื่องมือ AI ที่ทีมเข้าใจ ตรวจสอบได้ และนำไปต่อยอดได้" />
          </p>
        </motion.div>

        <motion.div variants={stagger} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
