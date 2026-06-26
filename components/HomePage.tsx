'use client'

import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import ServicesSection from '@/components/ServicesSection'
import StatsStrip from '@/components/StatsStrip'
import { personaConfigs, type PersonaMode } from '@/data/personas'
import { useState } from 'react'

export default function HomePage() {
  const [persona, setPersona] = useState<PersonaMode>('plus')
  const currentPersona = personaConfigs[persona]

  return (
    <main
      data-persona={persona}
      style={currentPersona.cssVars}
      className="min-h-screen overflow-hidden bg-bg transition-colors duration-300"
    >
      <Navbar />
      <HeroSection persona={persona} onPersonaChange={setPersona} />
      <StatsStrip />
      <ServicesSection />
      <ContactSection persona={persona} />
      <Footer />
    </main>
  )
}
