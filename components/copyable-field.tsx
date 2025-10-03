"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CopyableFieldProps {
  label: string
  value: string
}

export function CopyableField({ label, value }: CopyableFieldProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Label>
      <div className="flex gap-2">
        <Input
          id={label}
          value={value}
          disabled
          className="font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
        />
        <Button variant="outline" size="icon" onClick={handleCopy} className="shrink-0 bg-transparent">
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
