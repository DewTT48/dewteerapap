'use client'

import Footer from '@/components/Footer'
import LineBreakText from '@/components/LineBreakText'
import Navbar from '@/components/Navbar'
import { usePersona } from '@/components/PersonaProvider'
import ThaiText from '@/components/ThaiText'
import {
  aboutProfile,
  beliefs,
  caseStudies,
  expertise,
  portfolioItems,
  profileHero,
  profileServices
} from '@/data/portfolio'
import { emailUrl } from '@/data/links'
import { assetPath } from '@/lib/asset-path'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  HeartHandshake,
  Mail,
  Sparkles,
  UsersRound
} from 'lucide-react'

const focusAreas = [
  { label: 'Business', icon: BriefcaseBusiness },
  { label: 'People', icon: UsersRound },
  { label: 'AI', icon: Bot }
]

const profileHeroLines = {
  base: ['ออกแบบงาน HR', 'ยุคใหม่ ให้', 'Business, People และ AI', 'เดินไปด้วยกัน'],
  lg: ['ออกแบบงาน HR', 'ยุคใหม่ ให้', 'Business, People และ AI', 'เดินไปด้วยกัน']
}

const sectionHeadings = {
  businessSystem: ['HR ที่มองงานคน', 'เป็นระบบธุรกิจ'],
  expertise: ['พื้นที่ที่ผม', 'ช่วยองค์กรได้'],
  portfolio: ['ผลงานและแพลตฟอร์ม', 'ที่สะท้อนวิธีคิด HR x AI'],
  caseStudies: ['ตัวอย่างงานที่เชื่อม HR, Business', 'และ AI เข้าด้วยกัน'],
  services: ['รูปแบบงาน', 'ที่สามารถคุยต่อได้'],
  finalCta: {
    base: ['มาคุยกันครับ', 'เพื่อออกแบบวิธีทำงาน', 'ที่ทำให้ Business, People และ AI', 'เดินไปด้วยกันได้จริง'],
    lg: ['มาคุยกันครับ เพื่อออกแบบวิธีทำงาน', 'ที่ทำให้ Business, People และ AI', 'เดินไปด้วยกันได้จริง']
  }
}

export default function PortfolioPage() {
  const { persona } = usePersona()
  const isPro = persona === 'pro'
  const portraitSrc = isPro
    ? '/characters/pro/dew-pro-thinking.png'
    : '/characters/dew-thinking.png'

  return (
    <main className="min-h-screen overflow-hidden bg-bg transition-colors duration-300">
      <Navbar />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="min-w-0 lg:col-span-7">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-bold text-muted shadow-soft transition hover:-translate-y-0.5 hover:text-orange"
          >
            <ArrowLeft size={17} />
            กลับหน้าแรก
          </Link>
          <p className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-orange">{profileHero.label}</p>
          <h1 className="mt-5 max-w-4xl break-words text-[2.5rem] font-black leading-[1.12] text-text sm:text-6xl sm:leading-[1.08] lg:text-[68px]">
            <LineBreakText lines={profileHeroLines} />
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted"><ThaiText text={profileHero.intro} /></p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted"><ThaiText text={profileHero.belief} /></p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={emailUrl('ขอ Portfolio / นัดคุยกับ Dew')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_var(--accent-shadow)] transition hover:-translate-y-0.5 hover:bg-orange-hover"
            >
              <Mail size={18} />
              ติดต่อคุยงาน
            </a>
            <a
              href="#case-studies"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-4 text-sm font-bold text-text shadow-soft transition hover:-translate-y-0.5 hover:border-orange/30"
            >
              ดู Case Studies
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-[linear-gradient(145deg,var(--surface)_0%,var(--surface-soft)_60%,var(--bg)_100%)] p-6 shadow-soft">
            <div className="relative mx-auto aspect-square max-w-[380px]">
              <img
                src={assetPath(portraitSrc)}
                alt="Dew thinking about HR, Business and AI"
                className="h-full w-full object-contain drop-shadow-[0_24px_26px_rgba(30,36,48,0.14)]"
              />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {focusAreas.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="rounded-2xl border border-border bg-surface/80 p-4 text-center shadow-soft">
                    <Icon className="mx-auto text-orange" size={22} />
                    <p className="mt-2 text-sm font-extrabold text-text">{item.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">About Me</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-text"><LineBreakText lines={sectionHeadings.businessSystem} /></h2>
          </div>
          <div className="space-y-5 lg:col-span-8">
            {aboutProfile.map((item) => (
              <p key={item} className="text-lg leading-8 text-muted"><ThaiText text={item} /></p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="rounded-[32px] border border-border bg-surface p-7 shadow-soft lg:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">What I Believe</p>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {beliefs.map((item) => (
              <div key={item} className="rounded-3xl bg-surface-soft p-6">
                <CheckCircle2 className="text-olive" size={24} />
                <p className="mt-4 text-base leading-7 text-text"><ThaiText text={item} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Expertise</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-text"><LineBreakText lines={sectionHeadings.expertise} /></h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-muted">
            <ThaiText text="ผมทำงานอยู่ตรงกลางระหว่าง HR Strategy, People System และการใช้ AI อย่างมีมนุษย์เป็นผู้กำกับ" />
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {expertise.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-border bg-surface p-6 shadow-soft">
              <Sparkles className="text-orange" size={26} />
              <h3 className="mt-5 text-xl font-black text-text"><ThaiText text={item.title} /></h3>
              <p className="mt-4 text-sm leading-7 text-muted"><ThaiText text={item.body} /></p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Portfolio</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-text"><LineBreakText lines={sectionHeadings.portfolio} /></h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <article key={item.title} className="rounded-[28px] border border-border bg-surface p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-orange/10 text-lg font-black text-orange">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-black text-text"><ThaiText text={item.title} /></h3>
                  <p className="mt-3 text-sm leading-7 text-muted"><ThaiText text={item.body} /></p>
                  <p className="mt-4 rounded-2xl bg-[var(--portfolio-proof)] px-4 py-3 text-sm font-semibold leading-6 text-text"><ThaiText text={item.proof} /></p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="case-studies" className="scroll-mt-12 mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Selected Case Studies</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-text"><LineBreakText lines={sectionHeadings.caseStudies} /></h2>
        </div>
        <div className="grid gap-4">
          {caseStudies.map((item) => (
            <article key={item.title} className="grid gap-4 rounded-[28px] border border-border bg-surface p-6 shadow-soft lg:grid-cols-12 lg:p-7">
              <div className="lg:col-span-3">
                <p className="text-sm font-bold text-orange">{item.client}</p>
                <h3 className="mt-2 text-xl font-black leading-tight text-text"><ThaiText text={item.title} /></h3>
              </div>
              <p className="text-base leading-8 text-muted lg:col-span-9"><ThaiText text={item.body} /></p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="rounded-[32px] border border-border bg-[linear-gradient(135deg,var(--surface)_0%,var(--surface-soft)_54%,var(--bg)_100%)] p-7 shadow-soft lg:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Services</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-text"><LineBreakText lines={sectionHeadings.services} /></h2>
          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {profileServices.map((item) => (
              <article key={item.title} className="rounded-[24px] bg-surface/85 p-6 shadow-soft">
                <HeartHandshake className="text-olive" size={25} />
                <h3 className="mt-5 text-lg font-black text-text"><ThaiText text={item.title} /></h3>
                <p className="mt-3 text-sm leading-7 text-muted"><ThaiText text={item.body} /></p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col justify-between gap-5 rounded-[28px] bg-surface p-6 shadow-soft lg:flex-row lg:items-center">
            <div>
              <h3 className="text-2xl font-black leading-tight text-text"><LineBreakText lines={sectionHeadings.finalCta} /></h3>
              <p className="mt-3 text-base leading-7 text-muted"><ThaiText text="เหมาะสำหรับองค์กรที่อยากให้ HR เชื่อมกับธุรกิจมากขึ้น เริ่มใช้ AI อย่างเป็นระบบ หรือสร้างทีมที่เข้าใจกันและทำงานร่วมกันได้ดีขึ้น" /></p>
            </div>
            <a
              href={emailUrl('ขอคุยงาน HR x AI กับ Dew')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_var(--accent-shadow)] transition hover:-translate-y-0.5 hover:bg-orange-hover"
            >
              <Mail size={18} />
              ติดต่อคุยงาน
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
