"use client"

import { DashboardLayout } from "@/components/dashboard-layout"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account preferences and configuration</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
