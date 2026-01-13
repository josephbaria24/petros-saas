// app/api/bunny/signed-url/route.ts (note the path!)
import crypto from "crypto"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export async function POST(req: Request) {
  try {
    // Check environment variables
    if (!process.env.BUNNY_SECURITY_KEY || !process.env.BUNNY_PULL_ZONE) {
      console.error("Missing Bunny environment variables")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const { filePath, materialId, courseId } = await req.json()

    const cookieStore = await cookies()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {}
          },
        },
      }
    )

    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // For admin users, skip enrollment check
    const { data: userProfile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const isAdmin = userProfile?.role === 'admin'

    // Only check enrollment for non-admin users
    if (!isAdmin && courseId) {
      const { data: enrollment } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single()
      
      if (!enrollment) {
        return NextResponse.json(
          { error: "You must be enrolled in this course to access this material" },
          { status: 403 }
        )
      }
    }

    // Generate signed URL
    const expires = Math.floor(Date.now() / 1000) + 300 // 5 minutes

    const token = crypto
      .createHash("md5")
      .update(process.env.BUNNY_SECURITY_KEY + filePath + expires)
      .digest("hex")

    const url = `${process.env.BUNNY_PULL_ZONE}/${filePath}?token=${token}&expires=${expires}`

    console.log("Generated signed URL for:", filePath)

    return NextResponse.json({ url })
  } catch (error) {
    console.error("Signed URL generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 }
    )
  }
}