import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src?: string
    alt?: string
    fallback?: React.ReactNode
    size?: "sm" | "md" | "lg"
  }
>(({ className, src, alt = "", fallback, size = "md", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full bg-muted",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <span className="text-sm font-medium text-muted-foreground">
          {fallback || "A"}
        </span>
      )}
    </div>
  )
})

Avatar.displayName = "Avatar"

export { Avatar }
