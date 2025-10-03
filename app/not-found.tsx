import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3">
            <Image src="/waveify-logo.png" alt="Waveify Logo" width={48} height={48} className="object-contain" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Waveify
            </span>
          </div>
        </div>

        {/* 404 Message */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Quick links to help you navigate:</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/" className="text-purple-600 hover:text-purple-700 hover:underline">
              Overview
            </Link>
            <Link href="/instructions" className="text-purple-600 hover:text-purple-700 hover:underline">
              Instructions
            </Link>
            <Link href="/settings" className="text-purple-600 hover:text-purple-700 hover:underline">
              Settings
            </Link>
            <Link href="/billing" className="text-purple-600 hover:text-purple-700 hover:underline">
              Billing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
