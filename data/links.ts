import type { LucideIcon } from 'lucide-react'
import {
  BookHeart,
  Gamepad2,
  HeartHandshake,
  Home,
  MessageCircle,
  NotebookPen,
  Sprout
} from 'lucide-react'

export type CharacterState =
  | 'default'
  | 'pointing'
  | 'thinking'
  | 'laptop'
  | 'thumbsUp'
  | 'wai'
  | 'community'
  | 'calm'
  | 'playful'
  | 'wave'
  | 'heart'
  | 'celebrate'

export type PlatformAccent = 'orange' | 'olive' | 'blue' | 'rose' | 'neutral'

export type PlatformLink = {
  id: string
  name: string
  href: string
  description: string
  icon: LucideIcon
  characterState: CharacterState
  accent: PlatformAccent
}

export const facebookPageUrl = 'https://www.facebook.com/share/18tDW1TQx8/?mibextid=wwXIfr'
export const contactEmail = 'dewteerapap@seederschool.com'
export const emailUrl = (subject: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}&su=${encodeURIComponent(subject)}`

export const platformLinks: PlatformLink[] = [
  {
    id: 'prompable',
    name: 'Prompable.app',
    href: 'https://prompable.app',
    description: 'AI Assistant ที่ทำงานได้จริง',
    icon: MessageCircle,
    characterState: 'thinking',
    accent: 'orange'
  },
  {
    id: 'hrgeniuslab',
    name: 'HRGeniusLab.com',
    href: 'https://hrgeniuslab.com',
    description: 'HR AI Skills Library และ Workflow',
    icon: Sprout,
    characterState: 'pointing',
    accent: 'olive'
  },
  {
    id: 'hrdc',
    name: 'HRDC.app',
    href: 'https://hrdc.app',
    description: 'Community & Marketplace ของคน HR',
    icon: HeartHandshake,
    characterState: 'heart',
    accent: 'blue'
  },
  {
    id: 'mywoofydewey',
    name: 'MyWoofyDewey.com',
    href: 'https://mywoofydewey.com',
    description: 'The Workflow Game และ AI Workflow',
    icon: Gamepad2,
    characterState: 'celebrate',
    accent: 'rose'
  },
  {
    id: 'ddries',
    name: 'DDries.com',
    href: 'https://ddries.com',
    description: 'Everyday Diary / บันทึกเพื่อชีวิต',
    icon: NotebookPen,
    characterState: 'wai',
    accent: 'neutral'
  },
  {
    id: 'hrkhangban',
    name: 'HR ข้างบ้าน',
    href: facebookPageUrl,
    description: 'คอมมูนิตี้และคอนเทนต์ความรู้สำหรับคน HR',
    icon: Home,
    characterState: 'wave',
    accent: 'blue'
  },
  {
    id: 'hrcommunity',
    name: 'HR Community',
    href: facebookPageUrl,
    description: 'พื้นที่แลกเปลี่ยนของคนทำงาน HR',
    icon: BookHeart,
    characterState: 'community',
    accent: 'olive'
  }
]
