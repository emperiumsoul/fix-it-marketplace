import { currentUser } from '@clerk/nextjs/server'
import { createClerkClient } from '@clerk/backend'

export interface AdminCheckResult {
  isAdmin: boolean
  userId: string | null
  email?: string
}

/**
 * Checks if the currently authenticated user has admin privileges.
 * Admin criteria:
 * 1. publicMetadata.role === 'admin'
 * 2. Primary email matches process.env.ADMIN_EMAILS (or default admin: emmanuelopokunyame@gmail.com)
 * 3. User ID matches process.env.ADMIN_USER_IDS
 */
export async function checkAdminAccess(): Promise<AdminCheckResult> {
  try {
    const user = await currentUser()
    if (!user) {
      return { isAdmin: false, userId: null }
    }

    // 1. Check Clerk publicMetadata role
    if (user.publicMetadata?.role === 'admin') {
      return {
        isAdmin: true,
        userId: user.id,
        email: user.emailAddresses?.[0]?.emailAddress,
      }
    }

    // 2. Check ADMIN_EMAILS environment variable / default admin list
    const adminEmailsConfig = process.env.ADMIN_EMAILS || 'emmanuelopokunyame@gmail.com'
    const allowedAdminEmails = adminEmailsConfig
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)

    const userEmail = user.emailAddresses?.[0]?.emailAddress?.toLowerCase()
    if (userEmail && allowedAdminEmails.includes(userEmail)) {
      // Auto-synchronize role in publicMetadata if not set
      try {
        if (process.env.CLERK_SECRET_KEY) {
          const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
          await clerk.users.updateUserMetadata(user.id, {
            publicMetadata: {
              ...user.publicMetadata,
              role: 'admin',
            },
          })
        }
      } catch (syncErr) {
        console.warn('[ADMIN_AUTH_SYNC_WARNING]', syncErr)
      }

      return {
        isAdmin: true,
        userId: user.id,
        email: userEmail,
      }
    }

    // 3. Check ADMIN_USER_IDS
    const adminUserIds = (process.env.ADMIN_USER_IDS || '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)

    if (adminUserIds.includes(user.id)) {
      return {
        isAdmin: true,
        userId: user.id,
        email: userEmail,
      }
    }

    return {
      isAdmin: false,
      userId: user.id,
      email: userEmail,
    }
  } catch (error) {
    console.error('[CHECK_ADMIN_ACCESS_ERROR]', error)
    return { isAdmin: false, userId: null }
  }
}
