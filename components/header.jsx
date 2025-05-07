"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "../hooks/use-auth"

export function Header() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <header className="w-full bg-sfsu-navy text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="h-10 w-auto mr-4">
              <Image
                src="/images/sfsu-logo.png"
                alt="SFSU Marketplace Logo"
                width={120}
                height={40}
                className="h-full w-auto"
              />
            </div>
            <span className="text-xl font-bold hidden sm:inline">Dashboard</span>
          </Link>
        </div>

        <nav className="flex items-center space-x-4">
          <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
            Home
          </Link>
          <Link href="/marketplace" className={pathname === "/marketplace" ? "font-bold" : ""}>
            Marketplace
          </Link>
          <Link href="/about" className={pathname === "/about" ? "font-bold" : ""}>
            About Us
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <span>Hi, {user.firstName}</span>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-sfsu-navy"
                onClick={signOut}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-sfsu-navy"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-sfsu-orange text-white hover:bg-orange-600">Register</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
