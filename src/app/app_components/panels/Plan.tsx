"use client"
// import { useState } from "react"
import { cn } from "@/utils/class-join"

export default function Plan() {
  return (
    <div className="w-full h-[93%] py-2 px-1">
      <div className="w-full text-center">
        <h2 className={cn("")}>
          Planning Board
        </h2>
      </div>

      <div className="w-full h-[100%] overflow-y-auto overflow-x-hidden">
        <div className="w-full">
          {/* Your Plan content will go here */}
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-secondary">Plan your story structure here</p>
          </div>
        </div>
      </div>
    </div>
  )
}