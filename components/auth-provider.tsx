"use client"

import { createContext, useContext, useState, useEffect } from "react"

export const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  register: async () => {},
  signOut: () => {},
})

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("sfsu_marketplace_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("sfsu_marketplace_user")
      }
    }
  }, [])

  const signIn = async (email, password) => {
    // In a real app, this would call an API endpoint
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // })
    // const data = await response.json()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, create a mock user
    const mockUser = {
      id: "user-1",
      firstName: "SFSU",
      lastName: "Student",
      email,
    }

    setUser(mockUser)
    localStorage.setItem("sfsu_marketplace_user", JSON.stringify(mockUser))
  }

  const register = async (userData) => {
    // In a real app, this would call an API endpoint
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData),
    // })
    // const data = await response.json()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, create a mock user
    const mockUser = {
      id: "user-" + Date.now(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    }

    setUser(mockUser)
    localStorage.setItem("sfsu_marketplace_user", JSON.stringify(mockUser))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("sfsu_marketplace_user")
  }

  return <AuthContext.Provider value={{ user, signIn, register, signOut }}>{children}</AuthContext.Provider>
}
