addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1421020236911**********HKHzP4V********r0J1ZBF88yvtVH93tj7CopYL9UtNZ4OQPv*******YYnVN-4zC7s'

async function handleRequest(request) {
  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    })
  }

  try {
    const body = await request.json()

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    return new Response('Webhook triggered', {
      status: response.status,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  } catch (err) {
    return new Response('Error: ' + err.message, {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  }
}
