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

const registerSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email().endsWith("@sfsu.edu", { message: "Must be an SFSU email" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data) {
    setIsLoading(true)

    try {
      await register(data)
      toast({
        title: "Registration successful",
        description: "Welcome to SFSU Marketplace!",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image src="/images/sfsu-logo.png" alt="SFSU Marketplace Logo" width={180} height={60} className="h-auto" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-sfsu-navy">REGISTRATION</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        className="bg-white border-2 border-sfsu-teal text-black p-5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        className="bg-white border-2 border-sfsu-teal text-black p-5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="SFSU Email"
                      className="bg-white border-2 border-sfsu-teal text-black p-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      className="bg-white border-2 border-sfsu-teal text-black p-5"
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
                      className="bg-white border-2 border-sfsu-teal text-black p-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      className="bg-white border-2 border-sfsu-teal text-black p-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-sfsu-navy hover:bg-blue-900 text-white font-medium px-8"
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-6 text-center text-sfsu-teal">
          <Link href="/login">Already have account? Login in</Link>
        </div>
      </div>
    </div>
  )
}
