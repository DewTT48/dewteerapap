import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | Dew Teerapap',
  description:
    'Profile และ Portfolio ของธีรภาพ ตระการผล (พี่ดิว) ด้าน Modern HR, AI Workflow Design, HR Transformation และ People Development'
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
