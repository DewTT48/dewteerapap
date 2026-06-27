import type { Metadata } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'
import './globals.css'
import BackgroundMusicPlayer from '@/components/BackgroundMusicPlayer'
import PersonaProvider from '@/components/PersonaProvider'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-thai',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Dew Teerapap | Modern HR x AI Workflow Designer',
  description:
    'ธีรภาพ ตระการผล (พี่ดิว) ผู้ช่วยองค์กรและทีม HR ออกแบบการทำงานกับ AI, HR Workflow, Training และ Consulting'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body className="font-sans antialiased">
        <PersonaProvider>
          {children}
          <BackgroundMusicPlayer />
        </PersonaProvider>
      </body>
    </html>
  )
}
