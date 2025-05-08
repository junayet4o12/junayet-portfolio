import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: `Junayet's Portfolio`,
  icons: {
    icon: '/favicon.svg',
  },
}
import { ThemeProvider } from "@/components/theme-provider"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
