import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CustomerRequirementForm } from "@/components/customer-requirement-form"
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

  const fullName = mockUser.user_metadata?.full_name || mockUser.email?.split("@")[0] || "User"

  return (
    <DashboardLayout user={mockUser as any}>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg p-6 border border-purple-100 dark:border-purple-900">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Welcome back, {fullName}!</h2>
          <p className="text-gray-600 dark:text-gray-400">Here's your dashboard overview</p>
        </div>

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
