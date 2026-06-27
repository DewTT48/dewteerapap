'use client'

import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import ServicesSection from '@/components/ServicesSection'
import StatsStrip from '@/components/StatsStrip'
import { usePersona } from '@/components/PersonaProvider'

export default function HomePage() {
  const { persona, setPersona } = usePersona()

  return (
    <main className="min-h-screen overflow-hidden bg-bg transition-colors duration-300">
      <Navbar />
      <HeroSection persona={persona} onPersonaChange={setPersona} />
      <StatsStrip />
      <ServicesSection />
      <ContactSection persona={persona} />
      <Footer />
    </main>
  )
}
