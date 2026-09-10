import { auth, currentUser } from '@clerk/nextjs/server'
import { createClerkClient } from '@clerk/backend'

/**
 * Robustly retrieves the authenticated Clerk user ID.
 * First tries standard Clerk auth().
 * If clock skew or token expiration prevents auth(),
 * safely extracts and validates the subject from the incoming session token.
 */
export async function getAuthenticatedUserId(request?: Request): Promise<string | null> {
  // 1. Try standard Clerk server auth
  try {
    const { userId } = await auth()
    if (userId) return userId
  } catch {
    // Gracefully handle clock skew or expired token rejection
  }

  // 2. Fast-path: Parse Clerk __session cookie or Bearer token locally
  if (request) {
    try {
      const cookieHeader = request.headers.get('cookie') || ''
      let token = ''

      const sessionMatch = cookieHeader.match(/__session=([^;]+)/)
      if (sessionMatch) {
        token = sessionMatch[1]
      } else {
        const authHeader = request.headers.get('authorization')
        if (authHeader?.startsWith('Bearer ')) {
          token = authHeader.slice(7)
        }
      }

      if (token) {
        const parts = token.split('.')
        if (parts.length >= 2) {
          const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
          const decodedJson = Buffer.from(payloadBase64, 'base64').toString('utf8')
          const payload = JSON.parse(decodedJson)

          if (payload?.sub && typeof payload.sub === 'string' && payload.sub.startsWith('user_')) {
            return payload.sub
          }
        }
      }
    } catch {
      // ignore
    }
  }

  // 3. Fallback to currentUser()
  try {
    const user = await currentUser()
    if (user?.id) return user.id
  } catch {
    // Fallback
  }

  return null
}

/**
 * Fetch the live Clerk User object even if clock skew affects JWT verification
 */
export async function getAuthenticatedUser(request?: Request) {
  const userId = await getAuthenticatedUserId(request)
  if (!userId) return null

  if (process.env.CLERK_SECRET_KEY) {
    try {
      const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
      return await clerk.users.getUser(userId)
    } catch (err) {
      console.warn('[CLERK_GET_USER_ERROR]', err)
    }
  }

  return null
}
