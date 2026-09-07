import { NextResponse } from 'next/server'
import { checkAdminAccess } from '@/lib/auth/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { isAdmin, userId, email } = await checkAdminAccess()
    return NextResponse.json({
      isAdmin,
      userId,
      email: isAdmin ? email : undefined,
    })
  } catch (error) {
    console.error('[ADMIN_CHECK_ROUTE_ERROR]', error)
    return NextResponse.json({ isAdmin: false }, { status: 500 })
  }
}
