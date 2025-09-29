"use client"
import { Bell, Home, Workflow, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { CopyableField } from "@/components/copyable-field"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Dashboard() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/signin")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Workflow className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-gray-100">Waveify</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span>Dashboard</span> <span className="mx-1">/</span> <span>Overview</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>AE</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Alex Evans</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4">
            <nav className="space-y-1">
              <Link
                href="/"
                className="flex items-center w-full justify-start bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                <Home className="w-4 h-4 mr-3" />
                Overview
              </Link>
              <Link
                href="/settings"
                className="flex items-center w-full justify-start text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Dashboard Overview</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor your workflows and system performance</p>
          </div>

          <Card className="mb-8 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">User Information</CardTitle>
              <CardDescription>Your API credentials and embedded code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CopyableField label="Customer ID:" value="cus_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" />
              <CopyableField
                label="Customer Secret:"
                value="sk_live_51A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7"
              />
              <CopyableField
                label="Embedded code:"
                value='<script src="https://cdn.waveify.com/v1/embed.js" data-customer-id="cus_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" data-api-key="pk_live_51A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7" async></script>'
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
