import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A fullstack todo application built with Next.js and Express',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
