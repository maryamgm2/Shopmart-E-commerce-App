"use client"
import { useState } from 'react' 
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { registerSchema, registerSchemaType } from '@/schema/auth.schema'
import { registerUser } from '@/services/auth.services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react' 

export default function Register() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    }
  })

  async function handleRegister(values: registerSchemaType) {
    const data = await registerUser(values)
    if (data.message == "success") {
      toast.success("Account created successfully!", { position: "top-center" })
      router.push("/login")
    } else {
      toast.error(data.message || "Registration failed", { position: "top-center" })
    }
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-lg space-y-8 bg-white p-6 sm:p-10 rounded-[32px] shadow-sm border border-gray-100'>
        <div className="text-center sm:text-left">
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight capitalize'>Welcome to ShopMart</h1>
          <p className='mt-2 text-sm sm:text-base font-medium text-gray-500'>Register Now!</p>
        </div>

        <div className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-5'>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Full Name</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder="John Doe" className="h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Email Address</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder="example@mail.com" className="h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="••••••••" 
                            className="h-12 rounded-xl pr-10" 
                            {...field} 
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rePassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showRePassword ? 'text' : 'password'} 
                            placeholder="••••••••" 
                            className="h-12 rounded-xl pr-10" 
                            {...field} 
                          />
                          <button
                            type="button"
                            onClick={() => setShowRePassword(!showRePassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                          >
                            {showRePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Phone Number</FormLabel>
                    <FormControl>
                      <Input type='tel' placeholder="01234567890" className="h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={form.formState.isSubmitting} className='w-full h-12 cursor-pointer bg-black text-white transition-all duration-300 rounded-xl py-6 border border-black hover:bg-white hover:text-black hover:shadow-md active:scale-[0.98] mt-4'>
                {form.formState.isSubmitting ? <Spinner /> : "Create Account"}
              </Button>

              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-black hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}