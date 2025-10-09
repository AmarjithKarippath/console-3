"use server"

import { createClient } from "@/lib/supabase/server"

const LOGGED_USER_ID = "b90b57a9-d2ff-48c7-8e54-369a621483ff"

export async function fetchAgentInstructions() {
  try {
    const supabase = await createClient()

    console.log("[v0] Fetching instructions for customer:", LOGGED_USER_ID)

    const { data, error } = await supabase
      .from("agent_instructions")
      .select("*")
      .eq("customer_id", LOGGED_USER_ID)
      .order("customer_id", { ascending: true })

    if (error) {
      console.error("[v0] Error fetching instructions:", error)
      return { success: false, error: error.message, instructions: [] }
    }

    console.log("[v0] Fetched instructions:", data)

    const instructions = data.map((record) => ({
      iconName: "MessageSquare", // Default icon, can be enhanced later
      title: record.section_title,
      subtitle: record.section_subtitle,
      content: record.section_content,
    }))

    return { success: true, instructions, error: null }
  } catch (error) {
    console.error("[v0] Unexpected error fetching instructions:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      instructions: [],
    }
  }
}
