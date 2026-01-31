"use client"
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { verifyResetCode } from '@/services/auth.services'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { verifyCodeSchema, verifyCodeType } from '@/schema/auth.schema'

export default function VerifyCode() {
  const router = useRouter()
  const form = useForm<verifyCodeType>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { resetCode: "" }
  })

  async function onSubmit(values: verifyCodeType) {
    const data = await verifyResetCode(values.resetCode)
    if (data.status === "Success") {
      toast.success("Code verified successfully")
      router.push("/reset-password")
    } else {
      toast.error("Invalid or expired code")
    }
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-md bg-white p-8 rounded-[32px] shadow-sm border border-gray-100'>
        <h1 className='text-2xl font-bold mb-2'>Verify Code</h1>
        <p className='text-gray-500 mb-6 text-sm font-medium'>Please enter the 6-digit code sent to your email.</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Code</FormLabel>
                  <FormControl>
                    <Input 
                      type='text' 
                      placeholder="123456" 
                      maxLength={6}
                      className="h-12 rounded-xl text-center tracking-[1em] font-bold" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className='w-full h-12 rounded-xl bg-black font-bold'>
              {form.formState.isSubmitting ? <Spinner /> : "Verify Code"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}