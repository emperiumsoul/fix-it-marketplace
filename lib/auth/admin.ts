import { currentUser } from '@clerk/nextjs/server'
import { createClerkClient } from '@clerk/backend'

export interface AdminCheckResult {
  isAdmin: boolean
  userId: string | null
  email?: string
}

/**
 * Checks if the currently authenticated user has admin privileges.
 * 1. Live Clerk publicMetadata.role === 'admin' (Primary manual source of truth)
 * 2. Optional: process.env.ADMIN_EMAILS (only if explicitly configured in env)
 * 3. Optional: process.env.ADMIN_USER_IDS
 *
 * NOTE: Never automatically overwrites or writes to Clerk metadata behind the user's back.
 */
export async function checkAdminAccess(): Promise<AdminCheckResult> {
  try {
    const user = await currentUser()
    if (!user) {
      return { isAdmin: false, userId: null }
    }

    // Fetch live user from Clerk Backend API to bypass cached session JWT tokens
    // and reflect manual Clerk Dashboard edits immediately on page refresh
    let liveUser = user
    if (process.env.CLERK_SECRET_KEY) {
      try {
        const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
        liveUser = await clerk.users.getUser(user.id)
      } catch (e) {
        console.warn('[ADMIN_LIVE_USER_FETCH_FALLBACK]', e)
      }
    }

    const userEmail = liveUser.emailAddresses?.[0]?.emailAddress?.toLowerCase()

    // 1. Check Clerk publicMetadata role (Live from Clerk Dashboard)
    if (liveUser.publicMetadata?.role === 'admin') {
      return {
        isAdmin: true,
        userId: liveUser.id,
        email: userEmail,
      }
    }

    // 2. Check explicit ADMIN_EMAILS environment variable (optional secondary check, NO auto-sync)
    const adminEmailsConfig = process.env.ADMIN_EMAILS
    if (adminEmailsConfig && userEmail) {
      const allowedAdminEmails = adminEmailsConfig
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)

      if (allowedAdminEmails.includes(userEmail)) {
        return {
          isAdmin: true,
          userId: liveUser.id,
          email: userEmail,
        }
      }
    }

    // 3. Check explicit ADMIN_USER_IDS (optional secondary check)
    const adminUserIds = (process.env.ADMIN_USER_IDS || '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)

    if (adminUserIds.includes(liveUser.id)) {
      return {
        isAdmin: true,
        userId: liveUser.id,
        email: userEmail,
      }
    }

    return {
      isAdmin: false,
      userId: liveUser.id,
      email: userEmail,
    }
  } catch (error) {
    console.error('[CHECK_ADMIN_ACCESS_ERROR]', error)
    return { isAdmin: false, userId: null }
  }
}

