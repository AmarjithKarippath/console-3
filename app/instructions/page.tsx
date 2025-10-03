"use client"

import { Phone, MessageSquare, ShoppingCart, Package, CreditCard, BarChart, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"

const instructions = [
  {
    icon: Phone,
    title: "Greeting & Introduction",
    subtitle: "How your AI voice agent should greet customers",
    content:
      "Your AI voice agent should always greet customers warmly and professionally. Start with 'Hello! Thank you for calling [Store Name]. I'm your AI assistant, here to help you with your order, answer product questions, or assist with anything else you need today.' Keep the tone friendly, conversational, and helpful. Always ask how you can assist them right away to keep the conversation moving forward.",
  },
  {
    icon: MessageSquare,
    title: "Handling Product Inquiries",
    subtitle: "Answering questions about products and inventory",
    content:
      "When customers ask about products, provide detailed information including features, pricing, availability, and shipping times. Access real-time inventory data to give accurate stock information. If a product is out of stock, suggest similar alternatives. Always highlight key benefits and answer follow-up questions. Use natural language to describe products as if you were a knowledgeable sales associate in a physical store.",
  },
  {
    icon: ShoppingCart,
    title: "Processing Orders",
    subtitle: "Taking orders and handling checkout via voice",
    content:
      "Guide customers through the ordering process step-by-step. Confirm product selection, quantity, and pricing. Collect shipping information clearly, repeating back the address for confirmation. For payment, securely process credit card information using PCI-compliant voice recognition. Always provide an order confirmation number and estimated delivery date. Ask if they'd like to receive order updates via SMS or email.",
  },
  {
    icon: Package,
    title: "Order Tracking & Status",
    subtitle: "Helping customers track their shipments",
    content:
      "When customers inquire about order status, ask for their order number or email address. Access the order management system to provide real-time tracking information. Share the current status (processing, shipped, out for delivery, delivered), tracking number, and expected delivery date. If there are any delays, proactively explain the reason and provide updated timelines. Offer to send tracking details via SMS or email for their convenience.",
  },
  {
    icon: CreditCard,
    title: "Returns & Refunds",
    subtitle: "Managing return requests and refund processing",
    content:
      "Handle return requests with empathy and efficiency. Ask for the order number and reason for return to understand the issue. Explain your return policy clearly, including timeframes and conditions. If eligible, initiate the return process by generating a return label and providing instructions. For refunds, explain the timeline (typically 5-7 business days) and confirm the refund method. Always try to resolve issues before processing returns by offering exchanges or solutions.",
  },
  {
    icon: BarChart,
    title: "Upselling & Cross-selling",
    subtitle: "Recommending additional products to increase order value",
    content:
      "Naturally suggest complementary products or upgrades during conversations. When a customer orders a product, mention items that pair well with their selection. For example, if they buy a camera, suggest memory cards, cases, or lenses. Use phrases like 'Customers who bought this also loved...' or 'Would you like to add...' Keep suggestions relevant and valuable. Don't be pushy—focus on genuinely helpful recommendations that enhance their purchase.",
  },
]

export default function InstructionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Voice Agent Instructions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Guidelines and best practices for your AI voice agent interactions
          </p>
        </div>

        {/* Shopify Setup Instructions */}
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

        {/* Instructions Grid */}
        <div className="grid grid-cols-1 gap-6">
          {instructions.map((instruction, index) => {
            const IconComponent = instruction.icon
            return (
              <Card key={index} className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold mb-1">{instruction.title}</CardTitle>
                      <CardDescription>{instruction.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{instruction.content}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
