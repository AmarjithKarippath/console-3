"use server"

import { createServerClient } from "@/lib/supabase/server"

const LOGGED_USER_ID = "e1a3d0a3-a67f-4676-8675-30571948984a"

export async function fetchAgentInstructions() {
  try {
    const supabase = await createServerClient()

    console.log("[v0] Fetching instructions for customer:", LOGGED_USER_ID)

    const { data, error } = await supabase
      .from("agent_instructions")
      .select("section_title, section_subtitle, section_content")
      .eq("customer_id", LOGGED_USER_ID)

    if (error) {
      console.error("[v0] Supabase error fetching instructions:", error)
      return { success: false, error: error.message, instructions: [] }
    }

    console.log("[v0] Fetched instructions data:", data)

    if (!data || data.length === 0) {
      console.log("[v0] No instructions found in database")
      return { success: true, instructions: [], error: null }
    }

    const instructions = data.map((record: any) => ({
      iconName: "MessageSquare", // Default icon
      title: record.section_title || "",
      subtitle: record.section_subtitle || "",
      content: record.section_content || "",
    }))

    console.log("[v0] Mapped instructions:", instructions)

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
