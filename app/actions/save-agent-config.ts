"use server"

import { createClient } from "@/lib/supabase/server"

export async function saveAgentConfig(formData: {
  website: string
  shopSubdomain: string
  accessToken: string
  secretKey: string
}) {
  try {
    const supabase = await createClient()
    const logged_user_id = "e1a3d0a3-a67f-4676-8675-30571948984a"

    // Insert or update the agent configuration
    const { data, error } = await supabase
      .from("shopify_agents")
      .upsert(
        {
          customer_id: logged_user_id,
          website: formData.website,
          shop_subdomain: formData.shopSubdomain,
          access_token: formData.accessToken,
          secret_key: formData.secretKey,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "customer_id",
        },
      )
      .select()
      .single()

    console.log("[v0] Agent config save result:", { data, error })

    if (error) {
      console.error("[v0] Error saving agent config:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Exception saving agent config:", error)
    return { success: false, error: "Failed to save configuration" }
  }
}
