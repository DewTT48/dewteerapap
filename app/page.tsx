import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import ServicesSection from '@/components/ServicesSection'
import StatsStrip from '@/components/StatsStrip'

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
