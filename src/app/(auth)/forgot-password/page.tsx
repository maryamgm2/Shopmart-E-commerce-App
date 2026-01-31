"use client"
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { forgotPassword } from '@/services/auth.services'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, forgotPasswordType } from '@/schema/auth.schema'

export default function ForgotPassword() {
  const router = useRouter()
  const form = useForm<forgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" }
  })

  async function onSubmit(values: forgotPasswordType) {
    const data = await forgotPassword(values.email)
    if (data.statusMsg === "success") {
      toast.success("Verification code sent to your email")
      router.push("/verify-code")
    } else {
      toast.error(data.message || "Email not found")
    }
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-md bg-white p-8 rounded-[32px] shadow-sm border border-gray-100'>
        <h1 className='text-2xl font-bold mb-2'>Forgot Password</h1>
        <p className='text-gray-500 mb-6 text-sm font-medium'>Enter your email to receive a 6-digit reset code.</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder="mail@example.com" className="h-12 rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className='w-full h-12 rounded-xl bg-black font-bold'>
              {form.formState.isSubmitting ? <Spinner /> : "Send Reset Code"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}