"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { saveAgentConfig } from "@/app/actions/save-agent-config"

export function AgentConfigForm() {
  const [formData, setFormData] = useState({
    website: "",
    shopSubdomain: "",
    accessToken: "",
    secretKey: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.website.trim()) {
      newErrors.website = "Website URL is required"
    } else if (!/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = "Please enter a valid URL (e.g., https://example.com)"
    }

    if (!formData.shopSubdomain.trim()) {
      newErrors.shopSubdomain = "Shop subdomain is required"
    }

    if (!formData.accessToken.trim()) {
      newErrors.accessToken = "Shopify Access Token is required"
    }

    if (!formData.secretKey.trim()) {
      newErrors.secretKey = "Shopify APP Secret Key is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaveSuccess(false)
    setSaveError(null)

    if (!validateForm()) {
      return
    }

    setIsSaving(true)

    const result = await saveAgentConfig(formData)

    setIsSaving(false)

    if (result.success) {
      setSaveSuccess(true)
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000)
    } else {
      setSaveError(result.error || "Failed to save configuration")
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    // Clear save error when user makes changes
    if (saveError) {
      setSaveError(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="website" className="text-sm font-medium">
          Enter Website <span className="text-red-500">*</span>
        </Label>
        <Input
          id="website"
          type="text"
          placeholder="https://yourwebsite.com"
          value={formData.website}
          onChange={(e) => handleChange("website", e.target.value)}
          className={errors.website ? "border-red-500" : ""}
        />
        {errors.website && <p className="text-sm text-red-500">{errors.website}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="shopSubdomain" className="text-sm font-medium">
          Shop Subdomain <span className="text-red-500">*</span>
        </Label>
        <Input
          id="shopSubdomain"
          type="text"
          placeholder="your-shop"
          value={formData.shopSubdomain}
          onChange={(e) => handleChange("shopSubdomain", e.target.value)}
          className={errors.shopSubdomain ? "border-red-500" : ""}
        />
        {errors.shopSubdomain && <p className="text-sm text-red-500">{errors.shopSubdomain}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="accessToken" className="text-sm font-medium">
          Shopify Access Token <span className="text-red-500">*</span>
        </Label>
        <Input
          id="accessToken"
          type="password"
          placeholder="shpat_••••••••••••••••"
          value={formData.accessToken}
          onChange={(e) => handleChange("accessToken", e.target.value)}
          className={errors.accessToken ? "border-red-500" : ""}
        />
        {errors.accessToken && <p className="text-sm text-red-500">{errors.accessToken}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="secretKey" className="text-sm font-medium">
          Shopify APP Secret Key <span className="text-red-500">*</span>
        </Label>
        <Input
          id="secretKey"
          type="password"
          placeholder="shpss_••••••••••••••••"
          value={formData.secretKey}
          onChange={(e) => handleChange("secretKey", e.target.value)}
          className={errors.secretKey ? "border-red-500" : ""}
        />
        {errors.secretKey && <p className="text-sm text-red-500">{errors.secretKey}</p>}
      </div>

      {saveSuccess && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900">
          <AlertDescription className="text-green-800 dark:text-green-200">
            Configuration saved successfully!
          </AlertDescription>
        </Alert>
      )}

      {saveError && (
        <Alert className="bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900">
          <AlertDescription className="text-red-800 dark:text-red-200">{saveError}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={isSaving} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        {isSaving ? "Saving..." : "Save Configuration"}
      </Button>
    </form>
  )
}
