"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const countryCodes = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  { code: "+61", country: "AU" },
  { code: "+86", country: "CN" },
  { code: "+81", country: "JP" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+39", country: "IT" },
  { code: "+34", country: "ES" },
]

export function CustomerRequirementForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    requirement: "",
    countryCode: "+1",
    contactNumber: "",
    websiteAddress: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields are filled
    if (!formData.requirement.trim()) {
      toast({
        title: "Validation Error",
        description: "Customer requirement is required",
        variant: "destructive",
      })
      return
    }

    if (!formData.contactNumber.trim()) {
      toast({
        title: "Validation Error",
        description: "Contact number is required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Add server action to save to Supabase
      console.log("[v0] Submitting customer requirement:", {
        ...formData,
        fullContactNumber: `${formData.countryCode}${formData.contactNumber}`,
      })

      toast({
        title: "Success",
        description: "Customer requirement submitted successfully",
      })

      // Reset form
      setFormData({
        requirement: "",
        countryCode: "+1",
        contactNumber: "",
        websiteAddress: "",
      })
    } catch (error) {
      console.error("[v0] Error submitting requirement:", error)
      toast({
        title: "Error",
        description: "Failed to submit requirement. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="requirement" className="text-sm font-medium">
          Customer Requirement <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="requirement"
          placeholder="Describe your requirements..."
          value={formData.requirement}
          onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
          required
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactNumber" className="text-sm font-medium">
          Contact Number <span className="text-red-500">*</span>
        </Label>
        <div className="flex gap-2">
          <Select
            value={formData.countryCode}
            onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((item) => (
                <SelectItem key={item.code} value={item.code}>
                  {item.code} ({item.country})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="contactNumber"
            type="tel"
            placeholder="1234567890"
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            required
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="websiteAddress" className="text-sm font-medium">
          Website Address <span className="text-muted-foreground text-xs">(Optional)</span>
        </Label>
        <Input
          id="websiteAddress"
          type="url"
          placeholder="https://example.com"
          value={formData.websiteAddress}
          onChange={(e) => setFormData({ ...formData, websiteAddress: e.target.value })}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-violet-600 hover:bg-violet-700">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  )
}
