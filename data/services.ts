import type { LucideIcon } from 'lucide-react'
import { GraduationCap, Heart, Sparkles, Users, Workflow } from 'lucide-react'

export type Service = {
  title: string
  description: string
  icon: LucideIcon
  accent: 'orange' | 'olive' | 'purple' | 'yellow' | 'rose'
}

export const services: Service[] = [
  {
    title: 'AI for HR',
    description: 'ใช้ Generative AI เพื่อเพิ่มประสิทธิภาพงาน HR อย่างปลอดภัยและรับผิดชอบ',
    icon: Sparkles,
    accent: 'orange'
  },
  {
    title: 'HR Workflow Design',
    description: 'ออกแบบระบบงาน HR ให้ชัดเจน เชื่อมต่อ และใช้งานได้จริง',
    icon: Workflow,
    accent: 'olive'
  },
  {
    title: 'Training',
    description: 'อบรมและเวิร์กช็อปสำหรับ HR และผู้บริหาร',
    icon: GraduationCap,
    accent: 'purple'
  },
  {
    title: 'Consulting',
    description: 'ที่ปรึกษางาน HR, HR Tech และการเปลี่ยนผ่านสู่ AI',
    icon: Users,
    accent: 'yellow'
  },
  {
    title: 'Content & Community',
    description: 'สื่อสารความรู้ HR ให้เข้าใจง่าย ใช้ได้จริง และเข้าถึงคนทำงาน',
    icon: Heart,
    accent: 'rose'
  }
]
