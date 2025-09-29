import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyableField } from "@/components/copyable-field"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"

export default async function Dashboard() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/signin")
  }

  // Get user's full name from metadata or use email as fallback
  const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"

  return (
    <DashboardLayout user={user}>
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
      </div>
    </DashboardLayout>
  )
}
