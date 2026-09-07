import { AssistantError, askAssistant, parseMessages } from './_lib/assistant.js'

// Free providers can be slow; 60s is the Hobby-plan ceiling (Pro allows more).
export const maxDuration = 60

const FRIENDLY_ERROR =
  "Sorry, I'm having trouble responding right now. Please try again in a moment or contact Heaven Furniture Mart directly at +880 1960-481983."

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  try {
    const messages = parseMessages(body)
    const answer = await askAssistant(messages, AbortSignal.timeout(55_000))
    return json({ answer })
  } catch (err) {
    const status = err instanceof AssistantError ? err.status : 502
    if (status >= 500 || status === 429) console.error('[api/chat]', err instanceof Error ? err.message : err)
    return json({ error: status === 400 ? 'Invalid request' : FRIENDLY_ERROR }, status)
  }
}

export function GET() {
  return json({ error: 'Method not allowed' }, 405)
}
