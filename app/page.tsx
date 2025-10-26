import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyableField } from "@/components/copyable-field"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AgentConfigForm } from "@/components/agent-config-form"
import { CustomerRequirementForm } from "@/components/customer-requirement-form"
import { MailOpen, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/server"

export default async function Dashboard() {
  const supabase = await createClient()

  const logged_user_id = "e1a3d0a3-a67f-4676-8675-30571948984a"

  const { data: customerInfo, error } = await supabase
    .from("customer_info")
    .select("*")
    .eq("customer_id", logged_user_id)
    .single()

  console.log("[v0] Customer info fetch result:", { customerInfo, error })

  // Mock user data for local development
  const mockUser = {
    id: "local-dev-user",
    email: "developer@local.dev",
    user_metadata: {
      full_name: "Local Developer",
    },
  }

  const customerId = customerInfo?.customer_id || ""
  const customerSecret = customerInfo?.customer_secret || ""
  const embeddedCode = customerInfo?.embedded_code || ""

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

        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Agent Configuration</CardTitle>
            <CardDescription>Configure your Shopify integration settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AgentConfigForm />

            <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                Need help filling out this information?{" "}
                <Link href="/instructions" className="font-medium underline hover:no-underline">
                  Refer to the Instructions page
                </Link>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Customer Requirement</CardTitle>
            <CardDescription>Submit your requirements and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerRequirementForm />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
