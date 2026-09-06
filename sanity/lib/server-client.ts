import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

/**
 * Server-only Sanity client for fetching private data and executing mutations.
 * Never import or use this client in client components.
 */
export function getServerClient(options?: { useWriteToken?: boolean }) {
  const token = options?.useWriteToken
    ? process.env.SANITY_API_WRITE_TOKEN
    : process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  })
}
