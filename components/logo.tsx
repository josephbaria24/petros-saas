import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/trans-logo.png"
        alt="Logo"
        width={20}
        height={15}
        className=" w-auto [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.8))]"
        priority
      />
      {showText && (
        <span className="text-xl font-bold text-foreground hidden sm:inline [filter:drop-shadow(0_0_6px_rgba(0,0,0,0.8))]">
          {/* Add text here if needed */}
        </span>
      )}
    </Link>
  )
}
