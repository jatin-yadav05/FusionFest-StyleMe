import React from 'react'
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, children, onClick, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      {children && (
        <div 
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white/40 hover:text-white/60 transition-colors" 
          onClick={onClick}
        >
          {children}
        </div>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input