"use client"

import { useContext } from "react"
import { createContext } from "react"

// Define the User interface
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  signOut: () => void
}

// Create a default context value
const defaultContextValue: AuthContextType = {
  user: null,
  signIn: async () => {},
  register: async () => {},
  signOut: () => {},
}

// Create the context with default value
export const AuthContext = createContext<AuthContextType>(defaultContextValue)

// Hook to use the auth context
export function useAuth() {
  return useContext(AuthContext)
}
