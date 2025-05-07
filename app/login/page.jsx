"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "../hooks/use-auth"

const loginSchema = z.object({
  email: z.string().email().endsWith("@sfsu.edu", { message: "Must be an SFSU email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data) {
    setIsLoading(true)

    try {
      await signIn(data.email, data.password)
      toast({
        title: "Login successful",
        description: "Welcome back to SFSU Marketplace!",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image src="/images/sfsu-logo.png" alt="SFSU Marketplace Logo" width={180} height={60} className="h-auto" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-sfsu-navy">LOGIN</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="SFSU Email"
                      className="bg-white border-2 border-sfsu-teal text-black p-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="bg-white border-2 border-sfsu-teal text-black p-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-sfsu-navy hover:bg-blue-900 text-white font-medium px-8"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>

            <div className="text-center text-sm text-sfsu-teal">
              <Link href="/forgot-password">Forgot Password?</Link>
            </div>
          </form>
        </Form>

        <div className="mt-8 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-sfsu-teal">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
