"use server"

import { createServerClient } from "@/lib/supabase/server"

interface CustomerRequirementData {
  requirement: string
  plan: string
  countryCode: string
  contactNumber: string
  websiteAddress?: string
}

export async function saveCustomerRequirement(data: CustomerRequirementData) {
  try {
    const supabase = await createServerClient()

    const loggedUserId = "e1a3d0a3-a67f-4676-8675-30571948984a"

    const { data: customerData, error: fetchError } = await supabase
      .from("customer_info")
      .select("customer_id")
      .eq("customer_id", loggedUserId)
      .single()

    console.log("[v0] Customer data fetch:", { customerData, fetchError })

    const emailAddress = `customer_${loggedUserId.substring(0, 8)}@example.com`

    const requirementData = {
      requirements: data.requirement,
      subscription: data.plan,
      contact_number: `${data.countryCode}${data.contactNumber}`,
      website_address: data.websiteAddress || null,
      email_address: emailAddress,
    }

    console.log("[v0] Inserting requirement data:", requirementData)

    const { data: insertedData, error: insertError } = await supabase
      .from("cust_requirements")
      .insert([requirementData])
      .select()

    if (insertError) {
      console.error("[v0] Error inserting requirement:", insertError)
      throw new Error(insertError.message)
    }

    console.log("[v0] Successfully inserted requirement:", insertedData)
    return { success: true, data: insertedData }
  } catch (error) {
    console.error("[v0] Error in saveCustomerRequirement:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save customer requirement",
    }
  }
}
