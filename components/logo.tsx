import Link from "next/link"

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
        <span className="text-lg font-bold text-white">P</span>
      </div>
      {showText && <span className="text-xl font-bold text-foreground">Petros LMS</span>}
    </Link>
  )
}
