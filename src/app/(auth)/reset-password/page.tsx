"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPassword } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, resetPasswordType } from "@/schema/auth.schema";

export default function ResetPassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "", newPassword: "" },
  });

  async function onSubmit(values: resetPasswordType) {
    const data = await resetPassword({
      email: values.email,
      newPassword: values.newPassword,
    });

    if (data.token) {
      toast.success("Password reset successfully!");
      router.push("/login");
    } else {
      toast.error(data.message || "Reset password code not verified");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-2">New Password</h1>
        <p className="text-gray-500 mb-6 text-sm font-medium">
          Set your new password to access your account.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Confirm your email"
                      className="h-12 rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 rounded-xl pr-12"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-12 rounded-xl bg-black font-bold mt-4"
            >
              {form.formState.isSubmitting ? <Spinner /> : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}