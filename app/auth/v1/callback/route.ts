import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  console.log("[v0] Callback - Origin:", origin)
  console.log("[v0] Callback - Code present:", !!code)

  if (code) {
    const cookieStore = await cookies()

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("[v0] Callback - Supabase URL:", supabaseUrl)

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("[v0] Callback - Missing Supabase credentials")
      return NextResponse.redirect(`${origin}/signin?error=missing_credentials`)
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    })

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      console.log("[v0] Callback - Success, redirecting to:", `${process.env.CONSOLE_URL}/`)
      return NextResponse.redirect(`${process.env.CONSOLE_URL}/`)
    }

    console.error("[v0] Callback - Error:", error)
  }

  // Return the user to an error page with some instructions
  console.log("[v0] Callback - Error, redirecting to signin")
  return NextResponse.redirect(`${origin}/signin?error=auth_callback_error`)
}
