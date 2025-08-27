import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import { SessionProvider } from "next-auth/react"

import { getAuth } from "../lib/actions/authenticate"

import "./globals.css"

const geistRoboto = Roboto({
  variable: "--font-geist-roboto",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Estapar App",
  description: "Gerenciador de estacionamentos"
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getAuth()

  return (
    <html lang="en">
      <body className={`${geistRoboto.variable} antialiased w-screen h-screen`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
