"use client"

import { Phone, MessageSquare, ShoppingCart, Package, CreditCard, BarChart } from "lucide-react"
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
