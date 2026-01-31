import React from 'react'
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center gap-4 bg-[#F9FAFB] font-sans">
      <div className="relative flex items-center justify-center">
        <Loader2 className="size-12 animate-spin text-black" />
        <div className="absolute size-4 bg-black rounded-full animate-pulse" />
      </div>

      <div className="text-center">
        <h2 className="text-xl font-black text-black tracking-tighter uppercase italic">
          ShopMart
        </h2>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] mt-1 animate-pulse">
          Loading ...
        </p>
      </div>
    </div>
  )
}