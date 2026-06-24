import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="th">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
