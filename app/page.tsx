import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyableField } from "@/components/copyable-field"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MailOpen } from "lucide-react"

export default async function Dashboard() {
  // Mock user data for local development
  const mockUser = {
    id: "local-dev-user",
    email: "developer@local.dev",
    user_metadata: {
      full_name: "Local Developer",
    },
  }

  // Mock customer info for local development
  const customerId = "dev-customer-id-12345"
  const customerSecret = "dev-secret-key-67890"
  const embeddedCode = "<script src='https://example.com/embed.js'></script>"

  const fullName = mockUser.user_metadata?.full_name || mockUser.email?.split("@")[0] || "User"

  return (
    <DashboardLayout user={mockUser as any}>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg p-6 border border-purple-100 dark:border-purple-900">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Welcome back, {fullName}!</h2>
          <p className="text-gray-600 dark:text-gray-400">Here's your dashboard overview and API credentials</p>
        </div>

        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">User Information</CardTitle>
            <CardDescription>Your API credentials and embedded code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CopyableField label="Customer ID:" value={customerId} />
            <CopyableField label="Customer Secret:" value={customerSecret} />
            <CopyableField label="Embedded code:" value={embeddedCode} />

            <div className="flex items-center gap-2">
              <MailOpen className="w-4 h-4" />
              <h2 className="text-xl lg:text-xl text-gray-600 font-bold dark:text-gray-300 leading-relaxed max-w-2xl">
                Enquire:
              </h2>
              <h2 className="text-xl lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                amar@waveify.ai
              </h2>
            </div>
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
