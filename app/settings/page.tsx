"use client"

import { useState, useEffect } from "react"
import {
  Phone,
  MessageSquare,
  ShoppingCart,
  Package,
  CreditCard,
  BarChart,
  Plus,
  MailOpen,
  AlertCircle,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { EditableInstructionCard } from "@/components/editable-instruction-card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { saveAgentInstructions } from "@/app/actions/save-agent-instructions"
import { fetchAgentInstructions } from "@/app/actions/fetch-agent-instructions"
import { fetchCustomerInfo } from "@/app/actions/fetch-customer-info"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyableField } from "@/components/copyable-field"
import { AgentConfigForm } from "@/components/agent-config-form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
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
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<any>(null)
  const [newInstruction, setNewInstruction] = useState<Instruction>({
    iconName: "MessageSquare",
    title: "",
    subtitle: "",
    content: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const custResult = await fetchCustomerInfo()

        if (custResult.success && custResult.customerInfo) {
          setCustomerInfo(custResult.customerInfo)
        }

        const result = await fetchAgentInstructions()

        if (result.success && result.instructions.length > 0) {
          console.log("[v0] Loaded instructions from database:", result.instructions)
          setInstructions(result.instructions)
        } else {
          console.log("[v0] No instructions found in database, using defaults")
          setInstructions(defaultInstructions)
        }
      } catch (error) {
        console.error("[v0] Error loading data:", error)
        toast({
          title: "Error loading data",
          description: "Failed to load some data. Please refresh the page.",
          variant: "destructive",
        })
        setInstructions(defaultInstructions)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [toast])

  const handleSaveInstruction = (index: number, newContent: string) => {
    const updated = [...instructions]
    updated[index] = { ...updated[index], content: newContent }
    setInstructions(updated)

    toast({
      title: "Saved locally",
      description: "Click 'Save Instructions' to save to database.",
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

  const handleCreateInstruction = () => {
    if (!newInstruction.title || !newInstruction.subtitle || !newInstruction.content) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields to create an instruction.",
        variant: "destructive",
      })
      return
    }

    const updated = [...instructions, newInstruction]
    setInstructions(updated)

    toast({
      title: "Instruction created",
      description: "Click 'Save Instructions' to save to database.",
    })

    setNewInstruction({
      iconName: "MessageSquare",
      title: "",
      subtitle: "",
      content: "",
    })
    setShowCreateDialog(false)
  }

  const handleDeleteInstruction = (index: number) => {
    const updated = instructions.filter((_, i) => i !== index)
    setInstructions(updated)

    toast({
      title: "Instruction deleted",
      description: "Click 'Save Instructions' to update database.",
    })
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  const customerId = customerInfo?.customer_id || ""
  const customerSecret = customerInfo?.customer_secret || ""
  const embeddedCode = customerInfo?.embedded_code || ""

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account preferences and configuration</p>
          </div>
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

        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Agent Instructions</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Configure how your AI voice agent should interact with customers
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowCreateDialog(true)}
                variant="outline"
                className="border-violet-600 text-violet-600 hover:bg-violet-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Instruction
              </Button>
              <Button
                onClick={handleSaveAllInstructions}
                disabled={isSaving}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                {isSaving ? "Saving..." : "Save Instructions"}
              </Button>
            </div>
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
                  onDelete={() => handleDeleteInstruction(index)}
                />
              )
            })}
          </div>
        </div>
      </div>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Instruction</DialogTitle>
            <DialogDescription>
              Add a new instruction for your AI voice agent. Fill in all the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select
                value={newInstruction.iconName}
                onValueChange={(value) => setNewInstruction({ ...newInstruction, iconName: value })}
              >
                <SelectTrigger id="icon">
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phone">Phone</SelectItem>
                  <SelectItem value="MessageSquare">Message Square</SelectItem>
                  <SelectItem value="ShoppingCart">Shopping Cart</SelectItem>
                  <SelectItem value="Package">Package</SelectItem>
                  <SelectItem value="CreditCard">Credit Card</SelectItem>
                  <SelectItem value="BarChart">Bar Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Customer Support"
                value={newInstruction.title}
                onChange={(e) => setNewInstruction({ ...newInstruction, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                placeholder="e.g., How to handle customer support inquiries"
                value={newInstruction.subtitle}
                onChange={(e) => setNewInstruction({ ...newInstruction, subtitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter the detailed instruction content..."
                value={newInstruction.content}
                onChange={(e) => setNewInstruction({ ...newInstruction, content: e.target.value })}
                rows={6}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateInstruction} className="bg-violet-600 hover:bg-violet-700 text-white">
              Create Instruction
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
