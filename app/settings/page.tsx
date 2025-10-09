"use client"

import { useState, useEffect } from "react"
import { Phone, MessageSquare, ShoppingCart, Package, CreditCard, BarChart } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { EditableInstructionCard } from "@/components/editable-instruction-card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { saveAgentInstructions } from "@/app/actions/save-agent-instructions"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Phone,
  MessageSquare,
  ShoppingCart,
  Package,
  CreditCard,
  BarChart,
}

interface Instruction {
  iconName: string
  title: string
  subtitle: string
  content: string
}

const defaultInstructions: Instruction[] = [
  {
    iconName: "Phone",
    title: "Greeting & Introduction",
    subtitle: "How your AI voice agent should greet customers",
    content:
      "Your AI voice agent should always greet customers warmly and professionally. Start with 'Hello! Thank you for calling [Store Name]. I'm your AI assistant, here to help you with your order, answer product questions, or assist with anything else you need today.' Keep the tone friendly, conversational, and helpful. Always ask how you can assist them right away to keep the conversation moving forward.",
  },
  {
    iconName: "MessageSquare",
    title: "Handling Product Inquiries",
    subtitle: "Answering questions about products and inventory",
    content:
      "When customers ask about products, provide detailed information including features, pricing, availability, and shipping times. Access real-time inventory data to give accurate stock information. If a product is out of stock, suggest similar alternatives. Always highlight key benefits and answer follow-up questions. Use natural language to describe products as if you were a knowledgeable sales associate in a physical store.",
  },
  {
    iconName: "ShoppingCart",
    title: "Processing Orders",
    subtitle: "Taking orders and handling checkout via voice",
    content:
      "Guide customers through the ordering process step-by-step. Confirm product selection, quantity, and pricing. Collect shipping information clearly, repeating back the address for confirmation. For payment, securely process credit card information using PCI-compliant voice recognition. Always provide an order confirmation number and estimated delivery date. Ask if they'd like to receive order updates via SMS or email.",
  },
  {
    iconName: "Package",
    title: "Order Tracking & Status",
    subtitle: "Helping customers track their shipments",
    content:
      "When customers inquire about order status, ask for their order number or email address. Access the order management system to provide real-time tracking information. Share the current status (processing, shipped, out for delivery, delivered), tracking number, and expected delivery date. If there are any delays, proactively explain the reason and provide updated timelines. Offer to send tracking details via SMS or email for their convenience.",
  },
  {
    iconName: "CreditCard",
    title: "Returns & Refunds",
    subtitle: "Managing return requests and refund processing",
    content:
      "Handle return requests with empathy and efficiency. Ask for the order number and reason for return to understand the issue. Explain your return policy clearly, including timeframes and conditions. If eligible, initiate the return process by generating a return label and providing instructions. For refunds, explain the timeline (typically 5-7 business days) and confirm the refund method. Always try to resolve issues before processing returns by offering exchanges or solutions.",
  },
  {
    iconName: "BarChart",
    title: "Upselling & Cross-selling",
    subtitle: "Recommending additional products to increase order value",
    content:
      "Naturally suggest complementary products or upgrades during conversations. When a customer orders a product, mention items that pair well with their selection. For example, if they buy a camera, suggest memory cards, cases, or lenses. Use phrases like 'Customers who bought this also loved...' or 'Would you like to add...' Keep suggestions relevant and valuable. Don't be pushy—focus on genuinely helpful recommendations that enhance their purchase.",
  },
]

export default function SettingsPage() {
  const [instructions, setInstructions] = useState<Instruction[]>(defaultInstructions)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem("agentInstructions")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const isValid =
          Array.isArray(parsed) &&
          parsed.every((item) => item.iconName && typeof item.iconName === "string" && iconMap[item.iconName])

        if (isValid) {
          setInstructions(parsed)
        } else {
          // Clear invalid data and use defaults
          console.log("[v0] Invalid localStorage data detected, using defaults")
          localStorage.removeItem("agentInstructions")
        }
      } catch (e) {
        console.error("Failed to parse saved instructions:", e)
        localStorage.removeItem("agentInstructions")
      }
    }
  }, [])

  const handleSaveInstruction = (index: number, newContent: string) => {
    const updated = [...instructions]
    updated[index] = { ...updated[index], content: newContent }
    setInstructions(updated)
    localStorage.setItem("agentInstructions", JSON.stringify(updated))

    toast({
      title: "Saved successfully",
      description: "Your instruction has been updated.",
    })
  }

  const handleSaveAllInstructions = async () => {
    setIsSaving(true)
    try {
      const result = await saveAgentInstructions(instructions)

      if (result.success) {
        setShowSuccessDialog(true)
      } else {
        toast({
          title: "Error saving instructions",
          description: result.error || "Failed to save instructions. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account preferences and configuration</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Agent Instructions</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Configure how your AI voice agent should interact with customers
              </p>
            </div>
            <Button
              onClick={handleSaveAllInstructions}
              disabled={isSaving}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              {isSaving ? "Saving..." : "Save Instructions"}
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {instructions.map((instruction, index) => {
              const IconComponent = iconMap[instruction.iconName] || MessageSquare
              return (
                <EditableInstructionCard
                  key={index}
                  icon={IconComponent}
                  title={instruction.title}
                  subtitle={instruction.subtitle}
                  content={instruction.content}
                  onSave={(newContent) => handleSaveInstruction(index, newContent)}
                />
              )
            })}
          </div>
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Successfully Updated!</DialogTitle>
            <DialogDescription className="text-center pt-4">
              All agent instructions have been saved to the database successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
