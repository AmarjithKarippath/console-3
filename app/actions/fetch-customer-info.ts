"use server"

import { createServerClient } from "@/lib/supabase/server"

export async function fetchCustomerInfo() {
  try {
    const supabase = await createServerClient()
    const logged_user_id = "e1a3d0a3-a67f-4676-8675-30571948984a"

    console.log("[v0] Fetching customer info for:", logged_user_id)

    const { data, error } = await supabase
      .from("customer_info")
      .select("customer_id, customer_secret, embedded_code")
      .eq("customer_id", logged_user_id)
      .single()

    if (error) {
      console.error("[v0] Error fetching customer info:", error)
      return { success: false, customerInfo: null, error: error.message }
    }

    console.log("[v0] Customer info fetched successfully:", data)
    return { success: true, customerInfo: data, error: null }
  } catch (error: any) {
    console.error("[v0] Exception fetching customer info:", error)
    return { success: false, customerInfo: null, error: error.message }
  }
}
