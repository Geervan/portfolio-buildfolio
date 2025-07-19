import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Geervan-Portfolio',
  description: 'Made with Typescript, Tailwind and a lot of love',
 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
