export async function GET() {
  return new Response(
    "google.com, pub-4594147660385258, DIRECT, f08c47fec0942fa0",
    {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=86400",
      },
    }
  )
}
