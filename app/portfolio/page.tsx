import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
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
import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Portfolio | Dew Teerapap',
  description:
    'Profile และ Portfolio ของธีรภาพ ตระการผล (พี่ดิว) ด้าน Modern HR, AI Workflow Design, HR Transformation และ People Development'
}

const focusAreas = [
  { label: 'Business', icon: BriefcaseBusiness },
  { label: 'People', icon: UsersRound },
  { label: 'AI', icon: Bot }
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="lg:col-span-7">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-bold text-muted shadow-soft transition hover:-translate-y-0.5 hover:text-orange"
          >
            <ArrowLeft size={17} />
            กลับหน้าแรก
          </Link>
          <p className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-orange">{profileHero.label}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[1.08] text-text sm:text-6xl lg:text-[68px]">
            {profileHero.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted">{profileHero.intro}</p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{profileHero.belief}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={emailUrl('ขอ Portfolio / นัดคุยกับ Dew')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_rgba(244,123,32,0.28)] transition hover:-translate-y-0.5 hover:bg-orange-hover"
            >
              <Mail size={18} />
              ติดต่อคุยงาน
            </a>
            <a
              href="#case-studies"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-4 text-sm font-bold text-text shadow-soft transition hover:-translate-y-0.5 hover:border-orange/30"
            >
              ดู Case Studies
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-[linear-gradient(145deg,#fff_0%,#fff7ef_60%,#f4f5ed_100%)] p-6 shadow-soft">
            <div className="relative mx-auto aspect-square max-w-[380px]">
              <img
                src={assetPath('/characters/dew-thinking.png')}
                alt="Dew thinking about HR, Business and AI"
                className="h-full w-full object-contain drop-shadow-[0_24px_26px_rgba(30,36,48,0.14)]"
              />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {focusAreas.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="rounded-2xl border border-border bg-white/80 p-4 text-center shadow-soft">
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
            <h2 className="mt-4 text-4xl font-black leading-tight text-text">HR ที่มองงานคนเป็นระบบธุรกิจ</h2>
          </div>
          <div className="space-y-5 lg:col-span-8">
            {aboutProfile.map((item) => (
              <p key={item} className="text-lg leading-8 text-muted">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="rounded-[32px] border border-border bg-white p-7 shadow-soft lg:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">What I Believe</p>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {beliefs.map((item) => (
              <div key={item} className="rounded-3xl bg-surface-soft p-6">
                <CheckCircle2 className="text-olive" size={24} />
                <p className="mt-4 text-base leading-7 text-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Expertise</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-text">พื้นที่ที่ผมช่วยองค์กรได้</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-muted">
            ผมทำงานอยู่ตรงกลางระหว่าง HR Strategy, People System และการใช้ AI อย่างมีมนุษย์เป็นผู้กำกับ
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {expertise.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-border bg-white p-6 shadow-soft">
              <Sparkles className="text-orange" size={26} />
              <h3 className="mt-5 text-xl font-black text-text">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Portfolio</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-text">ผลงานและแพลตฟอร์มที่สะท้อนวิธีคิด HR x AI</h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <article key={item.title} className="rounded-[28px] border border-border bg-white p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-orange/10 text-lg font-black text-orange">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-black text-text">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
                  <p className="mt-4 rounded-2xl bg-[#F4F1EC] px-4 py-3 text-sm font-semibold leading-6 text-text">{item.proof}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="case-studies" className="scroll-mt-12 mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Selected Case Studies</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-text">ตัวอย่างงานที่เชื่อม HR, Business และ AI เข้าด้วยกัน</h2>
        </div>
        <div className="grid gap-4">
          {caseStudies.map((item) => (
            <article key={item.title} className="grid gap-4 rounded-[28px] border border-border bg-white p-6 shadow-soft lg:grid-cols-12 lg:p-7">
              <div className="lg:col-span-3">
                <p className="text-sm font-bold text-orange">{item.client}</p>
                <h3 className="mt-2 text-xl font-black leading-tight text-text">{item.title}</h3>
              </div>
              <p className="text-base leading-8 text-muted lg:col-span-9">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="rounded-[32px] border border-border bg-[linear-gradient(135deg,#fff_0%,#fff7ef_54%,#f7f7f0_100%)] p-7 shadow-soft lg:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Services</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-text">รูปแบบงานที่สามารถคุยต่อได้</h2>
          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {profileServices.map((item) => (
              <article key={item.title} className="rounded-[24px] bg-white/85 p-6 shadow-soft">
                <HeartHandshake className="text-olive" size={25} />
                <h3 className="mt-5 text-lg font-black text-text">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col justify-between gap-5 rounded-[28px] bg-white p-6 shadow-soft lg:flex-row lg:items-center">
            <div>
              <h3 className="text-2xl font-black text-text">มาคุยกันครับ เพื่อออกแบบวิธีทำงานที่ทำให้ Business, People และ AI เดินไปด้วยกันได้จริง</h3>
              <p className="mt-3 text-base leading-7 text-muted">เหมาะสำหรับองค์กรที่อยากให้ HR เชื่อมกับธุรกิจมากขึ้น เริ่มใช้ AI อย่างเป็นระบบ หรือสร้างทีมที่เข้าใจกันและทำงานร่วมกันได้ดีขึ้น</p>
            </div>
            <a
              href={emailUrl('ขอคุยงาน HR x AI กับ Dew')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_rgba(244,123,32,0.28)] transition hover:-translate-y-0.5 hover:bg-orange-hover"
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
