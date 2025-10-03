"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"

const billingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with basic AI voice commerce features",
    features: [
      "10 voice interactions/month",
      "Basic order tracking",
      "Product information",
      "Email support",
      "Shopify integration",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Perfect for small businesses getting started with AI voice commerce",
    features: [
      "Up to 500 calls/month",
      "Basic Shopify integration",
      "Email support",
      "Standard voice quality",
      "Basic analytics",
      "1 store connection",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "$149",
    period: "/month",
    description: "For growing businesses that need advanced features and support",
    features: [
      "Up to 2,000 calls/month",
      "Advanced Shopify & WooCommerce",
      "Priority support 24/7",
      "Premium voice quality",
      "Advanced analytics & insights",
      "Up to 5 store connections",
      "Custom voice training",
      "Abandoned cart recovery",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large businesses with custom needs and high volume",
    features: [
      "Unlimited calls",
      "All platform integrations",
      "Dedicated account manager",
      "Ultra-premium voice quality",
      "Custom analytics & reporting",
      "Unlimited store connections",
      "White-label options",
      "Custom AI training",
      "SLA guarantee",
      "API access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Choose Your Plan</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Select the perfect plan for your business. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Billing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {billingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative border-gray-200 dark:border-gray-800 ${
                plan.popular ? "ring-2 ring-purple-600 shadow-lg" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-semibold mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
                </div>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full bg-purple-600 hover:bg-purple-700 text-white`}>{plan.cta}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center max-w-2xl mx-auto pt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All plans include PCI compliance, bank-level encryption, and seamless integration with your existing
            systems. Need a custom solution?{" "}
            <a href="https://waveify.ai" className="text-purple-600 dark:text-purple-400 hover:underline">
              Contact our sales team
            </a>
            .
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
