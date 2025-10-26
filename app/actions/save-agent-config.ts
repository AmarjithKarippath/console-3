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

    const { data: existingRecord, error: fetchError } = await supabase
      .from("shopify_agents")
      .select("*")
      .eq("customer_id", logged_user_id)
      .maybeSingle()

    console.log("[v0] Existing record check:", { existingRecord, fetchError })

    const configData = {
      customer_id: logged_user_id,
      shop_subdomain: formData.shopSubdomain,
      store_url: formData.website,
      api_key: formData.accessToken,
      api_secret: formData.secretKey,
    }

    let result

    if (existingRecord) {
      const { data, error } = await supabase
        .from("shopify_agents")
        .update(configData)
        .eq("customer_id", logged_user_id)
        .select()
        .single()

      console.log("[v0] Update result:", { data, error })
      result = { data, error }
    } else {
      const { data, error } = await supabase.from("shopify_agents").insert(configData).select().single()

      console.log("[v0] Insert result:", { data, error })
      result = { data, error }
    }

    if (result.error) {
      console.error("[v0] Error saving agent config:", result.error)
      return { success: false, error: result.error.message }
    }

    return { success: true, data: result.data }
  } catch (error) {
    console.error("[v0] Exception saving agent config:", error)
    return { success: false, error: "Failed to save configuration" }
  }
}
