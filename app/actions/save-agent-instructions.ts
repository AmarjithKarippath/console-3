"use server"

import { createServerClient } from "@/lib/supabase/server"

const LOGGED_USER_ID = "e1a3d0a3-a67f-4676-8675-30571948984a"

interface Instruction {
  iconName: string
  title: string
  subtitle: string
  content: string
}

export async function saveAgentInstructions(instructions: Instruction[]) {
  try {
    const supabase = await createServerClient()

    // First, delete all existing instructions for this customer
    const { error: deleteError } = await supabase.from("agent_instructions").delete().eq("customer_id", LOGGED_USER_ID)

    if (deleteError) {
      console.error("[v0] Error deleting existing instructions:", deleteError)
      return { success: false, error: deleteError.message }
    }

    // Then insert all new instructions
    const instructionsToInsert = instructions.map((instruction) => ({
      customer_id: LOGGED_USER_ID,
      title: instruction.title,
      subtitle: instruction.subtitle,
      content: instruction.content,
      icon_name: instruction.iconName,
    }))

    const { data, error: insertError } = await supabase.from("agent_instructions").insert(instructionsToInsert).select()

    console.log("[v0] Insert instructions result:", { data, error: insertError })

    if (insertError) {
      console.error("[v0] Error inserting instructions:", insertError)
      return { success: false, error: insertError.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error saving agent instructions:", error)
    return { success: false, error: String(error) }
  }
}
