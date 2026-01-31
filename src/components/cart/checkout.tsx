"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard, Banknote } from "lucide-react";
import { toast } from "sonner";
import { checkoutSchema, CheckoutValues } from "@/schema/checkout.schema"; 
import { checkoutUser, createCashOrder } from "@/app/_actions/cart.actions";
import { useCartContext } from "@/provider/cartprovider"; 
import { CartProductI } from "@/interfaces/cart"; 

export function Checkout({ 
  cartId, 
  setProducts 
}: { 
  cartId: string; 
  setProducts: React.Dispatch<React.SetStateAction<CartProductI[]>> 
}) {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");
  const { handleCart } = useCartContext(); 

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { details: "", phone: "", city: "" },
  });

  async function onSubmit(values: CheckoutValues) {
    try {
      if (paymentMethod === "card") {
        const res = await checkoutUser(values, cartId); 
        if (res.status === "success" && res.session?.url) {
          toast.success("Redirecting to payment...");
          window.location.href = res.session.url; 
        }
      } else {
        const res = await createCashOrder(values, cartId);
        if (res.status === "success") {
          toast.success("Order Placed Successfully!");
          
          setProducts([]); 
          await handleCart(); 
          
          setOpen(false);
          form.reset();
        } else {
          toast.error(res.message || "Failed to process order");
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer py-7 rounded-2xl bg-black text-white font-bold shadow-lg shadow-black/5 transition-all active:scale-[0.98]">
          Proceed to Checkout
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-lg rounded-[32px] p-8 border-none shadow-2xl">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-bold tracking-tight">Checkout</DialogTitle>
            <DialogDescription className="text-gray-500 font-medium">Choose payment method and delivery info.</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "card" ? "border-black bg-black text-white" : "border-gray-100 text-gray-500 hover:bg-gray-50"}`}
            >
              <CreditCard size={18} />
              <span className="font-bold text-sm">Online Card</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "cash" ? "border-black bg-black text-white" : "border-gray-100 text-gray-500 hover:bg-gray-50"}`}
            >
              <Banknote size={18} />
              <span className="font-bold text-sm">Cash</span>
            </button>
          </div>

          <FieldGroup className="space-y-4">
            <Field className="space-y-2 text-left">
              <Label htmlFor="details" className="font-bold text-sm ml-1">Address Details</Label>
              <Input {...form.register("details")} id="details" placeholder="Building, Street, Apartment" className={`h-14 rounded-2xl border-gray-100 focus:ring-1 focus:ring-black transition-all ${form.formState.errors.details ? "border-red-500" : ""}`} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field className="space-y-2 text-left">
                <Label htmlFor="phone" className="font-bold text-sm ml-1">Phone Number</Label>
                <Input {...form.register("phone")} id="phone" type="tel" placeholder="01xxxxxxxxx" className={`h-14 rounded-2xl border-gray-100 focus:ring-1 focus:ring-black transition-all ${form.formState.errors.phone ? "border-red-500" : ""}`} />
              </Field>

              <Field className="space-y-2 text-left">
                <Label htmlFor="city" className="font-bold text-sm ml-1">City</Label>
                <Input {...form.register("city")} id="city" placeholder="Cairo, Alexandria..." className={`h-14 rounded-2xl border-gray-100 focus:ring-1 focus:ring-black transition-all ${form.formState.errors.city ? "border-red-500" : ""}`} />
              </Field>
            </div>
          </FieldGroup>

          <div className="flex items-center gap-4 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1 h-14 rounded-2xl font-bold text-gray-500 border-gray-100">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting} className="flex-[1.5] h-14 rounded-2xl bg-black text-white font-bold shadow-lg shadow-black/10 transition-all flex items-center justify-center">
              {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : paymentMethod === "card" ? "Pay Now" : "Confirm Cash Order"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}