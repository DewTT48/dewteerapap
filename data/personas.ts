import type { CSSProperties } from 'react'
import type { CharacterState } from '@/data/links'

export type PersonaMode = 'plus' | 'pro'

export type PersonaConfig = {
  label: string
  shortLabel: string
  badge: string
  headline: Array<{
    text: string
    className: string
  }>
  description: string
  proposalSubject: string
  cssVars: CSSProperties
}

export const personaConfigs: Record<PersonaMode, PersonaConfig> = {
  plus: {
    label: 'Plus',
    shortLabel: 'Plus',
    badge: 'Modern HR x AI Workflow Designer',
    headline: [
      { text: 'HR ยุคใหม่', className: 'text-text' },
      { text: 'ต้องเข้าใจ', className: 'text-text' },
      { text: 'People', className: 'mt-3 text-orange' },
      { text: 'Business', className: 'text-olive' },
      { text: 'AI', className: 'text-text' }
    ],
    description:
      'ผมช่วยองค์กรและทีม HR ออกแบบระบบงานและการใช้ AI ให้ทำงาน smart ขึ้น เร็วขึ้น และตรวจสอบได้ เพื่อให้ HR เป็นพาร์ทเนอร์ที่ธุรกิจและคนทำงานไว้วางใจ',
    proposalSubject: 'นัดคุย / ขอ Proposal',
    cssVars: {
      '--surface-soft': '#fff7ef',
      '--text': '#1e2430',
      '--muted': '#5d6470',
      '--orange': '#f47b20',
      '--orange-hover': '#e56c12',
      '--olive': '#6c7550',
      '--olive-soft': '#8d9771',
      '--border': '#ece8e1',
      '--shadow-soft': '0 18px 50px rgba(30, 36, 48, 0.08)'
    } as CSSProperties
  },
  pro: {
    label: 'Professional',
    shortLabel: 'Pro',
    badge: 'Corporate HR x AI Adoption Partner',
    headline: [
      { text: 'ออกแบบ', className: 'text-text' },
      { text: 'HR Workflow', className: 'text-[#14213d]' },
      { text: 'และ AI Adoption', className: 'mt-3 text-orange' },
      { text: 'ให้องค์กรใช้ได้จริง', className: 'text-olive' }
    ],
    description:
      'ผมช่วยผู้บริหารและทีม HR วางระบบงาน คน และ AI Adoption ให้เชื่อมกับเป้าหมายธุรกิจ ใช้งานได้จริง วัดผลได้ และขยายผลอย่างรับผิดชอบ',
    proposalSubject: 'นัดคุยเรื่อง HR Workflow และ AI Adoption',
    cssVars: {
      '--surface-soft': '#f3f5f7',
      '--text': '#172033',
      '--muted': '#4f5b6c',
      '--orange': '#b8873f',
      '--orange-hover': '#9f7334',
      '--olive': '#334155',
      '--olive-soft': '#64748b',
      '--border': '#dfe5ec',
      '--shadow-soft': '0 18px 54px rgba(15, 23, 42, 0.1)'
    } as CSSProperties
  }
}

export const personaCharacterImages: Record<PersonaMode, Partial<Record<CharacterState, string>>> = {
  plus: {
    default: '/characters/dew-stand.png',
    pointing: '/characters/dew-pointing.png',
    thinking: '/characters/dew-thinking.png',
    laptop: '/characters/dew-laptop-sit.png',
    thumbsUp: '/characters/dew-thumbs-up.png',
    wai: '/characters/dew-wai.png',
    community: '/characters/dew-thumbs-up.png',
    calm: '/characters/dew-thinking.png',
    playful: '/characters/dew-pointing.png',
    wave: '/characters/dew-wave.png',
    heart: '/characters/dew-heart.png',
    celebrate: '/characters/dew-celebrate.png'
  },
  pro: {
    default: '/characters/pro/dew-pro-stand.png',
    pointing: '/characters/pro/dew-pro-pointing.png',
    thinking: '/characters/pro/dew-pro-thinking.png',
    laptop: '/characters/pro/dew-pro-laptop-sit.png',
    thumbsUp: '/characters/pro/dew-pro-thumbs-up.png',
    wai: '/characters/pro/dew-pro-wai.png',
    community: '/characters/pro/dew-pro-thumbs-up.png',
    calm: '/characters/pro/dew-pro-calm.png',
    playful: '/characters/pro/dew-pro-pointing.png',
    wave: '/characters/pro/dew-pro-wave.png',
    heart: '/characters/pro/dew-pro-heart.png',
    celebrate: '/characters/pro/dew-pro-celebrate.png'
  }
}

export function getPersonaCharacterImage(persona: PersonaMode, state: CharacterState) {
  return (
    personaCharacterImages[persona][state] ??
    personaCharacterImages[persona].default ??
    personaCharacterImages.plus[state] ??
    personaCharacterImages.plus.default ??
    '/characters/dew-stand.png'
  )
}
