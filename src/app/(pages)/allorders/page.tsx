import { getUserOrders } from "@/app/_actions/order.actions";
import { Button } from "@/components/ui/button";
import { Package, Calendar, CreditCard, Truck } from "lucide-react";
import Image from "next/image"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Order, OrderItem } from "@/interfaces/order";

export default async function AllOrdersPage() {
  const response = await getUserOrders();

  const orders: Order[] = Array.isArray(response)
    ? [...response].sort(
        (a: Order, b: Order) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    : [];

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] font-sans text-left">
        <div className="bg-gray-50 p-6 rounded-full mb-4">
          <Package className="size-12 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          No orders found yet
        </h2>
        <p className="text-gray-500 mt-2">
          When you place an order, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-12 px-4 font-sans text-left">
      <main className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-black tracking-tight">
            All Orders
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Check the status of your recent orders
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order: Order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.01)] relative transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-50 pb-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold text-black">
                    Order #{order.id}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                    <Calendar size={14} />
                    <span>
                      Ordered on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                  ID: {order._id}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                    <CreditCard size={16} />
                    <span>Payment Details</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 text-sm font-medium">
                      Method:{" "}
                      <span className="text-black capitalize">
                        {order.paymentMethodType}
                      </span>
                    </p>
                    <p
                      className={`text-sm font-bold ${order.isPaid ? "text-[#10B981]" : "text-red-500"}`}
                    >
                      {order.isPaid ? "Payment Successful" : "Pending Payment"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                    <Truck size={16} />
                    <span>Shipping Status</span>
                  </div>
                  <div className="space-y-1">
                    <p
                      className={`text-sm font-bold ${order.isDelivered ? "text-[#10B981]" : "text-orange-500"}`}
                    >
                      {order.isDelivered
                        ? "Delivered to Customer"
                        : "Processing / In Transit"}
                    </p>
                    <p className="text-gray-500 text-sm font-medium">
                      City: {order.shippingAddress.city}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 lg:text-right">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    Total Amount
                  </p>
                  <p className="text-3xl font-black text-black">
                    EGP {order.totalOrderPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-50">
                <div className="space-y-1 text-sm flex-1">
                  <p className="font-bold text-black uppercase tracking-widest text-[10px] mb-1">
                    Delivery Address
                  </p>
                  <p className="text-gray-500 font-medium truncate max-w-[300px]">
                    {order.shippingAddress.details},{" "}
                    {order.shippingAddress.city}
                  </p>
                  <p className="text-gray-500">
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer sm:w-auto rounded-xl font-bold text-gray-700 px-8 py-6 border-gray-100 hover:bg-black hover:text-white transition-all shadow-sm"
                    >
                      View Order Items
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl rounded-[32px] p-8 border-none shadow-2xl max-h-[85vh] overflow-y-auto font-sans text-left">
                    <DialogHeader className="text-left mb-6 border-b border-gray-50 pb-4">
                      <DialogTitle className="text-2xl font-bold tracking-tight text-black flex items-center gap-2">
                        <Package className="size-6" /> Order Items
                      </DialogTitle>
                      <DialogDescription className="text-gray-500 font-medium">
                        Showing {order.cartItems.length} products in Order #
                        {order.id}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      {order.cartItems.map((item: OrderItem) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-5 p-4 rounded-2xl bg-gray-50 border border-gray-100"
                        >
                          <div className="relative size-20 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              fill
                              className="object-contain p-2"
                              sizes="80px"
                            />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <h4 className="font-bold text-black text-sm uppercase tracking-tight truncate">
                              {item.product.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="text-xs font-bold text-gray-400 bg-gray-200/50 px-2 py-1 rounded-md">
                                QTY: {item.count}
                              </div>
                              <div className="text-xs font-bold text-black">
                                EGP {item.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right font-black text-base text-black">
                            EGP {(item.price * item.count).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                          Summary
                        </p>
                        <p className="text-gray-500 text-sm font-medium">
                          Method: {order.paymentMethodType}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                          Order Total
                        </p>
                        <p className="text-3xl font-black text-black tracking-tight">
                          EGP {order.totalOrderPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}