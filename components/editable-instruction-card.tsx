"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Check, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface EditableInstructionCardProps {
  icon: LucideIcon
  title: string
  subtitle: string
  content: string
  onSave: (newContent: string) => void
}

export function EditableInstructionCard({
  icon: IconComponent,
  title,
  subtitle,
  content,
  onSave,
}: EditableInstructionCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)

  const handleSave = () => {
    onSave(editedContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedContent(content)
    setIsEditing(false)
  }

  return (
    <Card className="border-gray-200 dark:border-gray-800">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-1">{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel} className="gap-2 bg-transparent">
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} className="gap-2">
                  <Check className="w-4 h-4" />
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[150px] text-gray-700 dark:text-gray-300"
            placeholder="Enter instruction details..."
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content}</p>
        )}
      </CardContent>
    </Card>
  )
}
