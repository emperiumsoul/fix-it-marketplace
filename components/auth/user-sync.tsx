'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'

export function UserSync() {
  const { isSignedIn, user } = useUser()
  const syncedUserIdRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (!isSignedIn || !user) return

    // Avoid multiple redundant sync requests for the same user session
    if (syncedUserIdRef.current === user.id) return

    syncedUserIdRef.current = user.id

    fetch('/api/profile/sync', {
      method: 'POST',
    }).catch((err) => {
      console.warn('[UserSync] Background sync to Sanity failed:', err)
    })
  }, [isSignedIn, user])

  return null
}
