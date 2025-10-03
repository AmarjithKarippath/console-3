"use client"

import { Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function InstructionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Instructions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Setup guides and documentation for configuring your voice agent
          </p>
        </div>

        <Card className="border-gray-200 dark:border-gray-800 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center flex-shrink-0">
                <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold mb-1">Setup Shopify connection with Waveify</CardTitle>
                <CardDescription>Follow these steps to connect your Shopify store</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-semibold mb-2">1. Create a Custom App in Shopify:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Go to your Shopify Admin: Settings → Apps and sales channels</li>
                  <li>Click "Develop apps"</li>
                  <li>Click "Create a custom app"</li>
                  <li>Enter an App name and select an App developer (must have Develop apps permission)</li>
                  <li>Click "Create app"</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Set API Scopes:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Click "Select scopes"</li>
                  <li>
                    Choose the API scopes your app needs (e.g., read_orders, write_orders, read_products,
                    write_products)
                  </li>
                  <li>Click "Save"</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Install the App:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Click "Install app"</li>
                  <li>Confirm by clicking "Install app" again</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">4. Get Your Credentials:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    In the app's API Credentials section, copy the <strong>Admin API Access Token</strong> (use this as
                    Access Token in Waveify)
                  </li>
                  <li>
                    Copy the <strong>API Secret Key</strong> (use this as APP Secret Key in Waveify)
                  </li>
                  <li>
                    Your <strong>Shop Subdomain</strong> is the part before .myshopify.com in your store URL (e.g., for
                    https://waveify.myshopify.com, the subdomain is "waveify")
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">5. Set Up Credentials in Waveify:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>In Waveify, go to Agent Configuration and add new Shopify credentials</li>
                  <li>Enter your Shop Subdomain, Access Token, and APP Secret Key</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm">For more details, see Shopify's official documentation:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm mt-2">
                  <li>
                    <a
                      href="https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/generate-access-tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Generate access tokens for custom apps
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://help.shopify.com/en/manual/apps/app-types/custom-apps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Creating a custom app
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
