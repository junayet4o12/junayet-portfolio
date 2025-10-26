import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Junayet Alam | Full-Stack Web Developer",
  description: "Explore Junayet Alam's portfolio showcasing expertise in React, Node.js, and full-stack web development.",
  keywords: [
    "Junayet Alam",
    "Junayet",
    "Junaid",
    "Junaid Alam",
    "Junayed Alam",
    "Full-Stack Developer",
    "React Developer",
    "Node.js Developer",
    "MERN Stack",
    "MERN Developer",
    "Full-Stack Engineer",
    "Backend Developer",
    "Web Developer",
    "Software Engineer",
    "Next.js Developer",
    "JavaScript Developer",
    "Express.js",
    "MongoDB",
    "REST API",
    "Portfolio",
    "Web Development",
    "Programming",
    "Developer Portfolio"
  ],
  authors: [{ name: "Junayet Alam", url: "https://junayet-alam-portfolio.vercel.app/" }],
  creator: "Junayet Alam",
  publisher: "Junayet Alam",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://junayet-alam-portfolio.vercel.app/",
    siteName: "Junayet Alam Portfolio",
    title: "Junayet Alam | Full-Stack Web Developer",
    description: "Explore Junayet Alam's portfolio showcasing expertise in React, Node.js, and full-stack web development.",
    images: [
      {
        url: "/junayet-alam-profile.png",
        width: 800,
        height: 600,
        alt: "Junayet Alam"
      }
    ],
    emails: ["muhammadjunayetmaruf@gmail.com"],
    phoneNumbers: ["+8801632884012"],
    countryName: "Bangladesh",
    alternateLocale: [
      "https://www.linkedin.com/in/junayet-alam/",
       "https://github.com/junayet4o12",
      "https://www.facebook.com/junayet4012",
      "https://wa.me/+8801632884012"
    ]
  },
  alternates: {
    canonical: "https://junayet-alam-portfolio.vercel.app/"
  },
  generator: "Next.js",
};

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from '@/components/ui/sonner';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster/>
      </body>
    </html>
  )
}
