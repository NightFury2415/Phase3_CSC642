"use client"

import { useContext } from "react"
import { AuthContext } from "../components/auth-provider"

// Hook to use the auth context
export function useAuth() {
  return useContext(AuthContext)
}
