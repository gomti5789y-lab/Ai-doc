export async function POST(req) {
  const { prompt } = await req.json();

  // Simple dummy AI (abhi real API nahi lagayenge)
  const response = `AI Response: ${prompt}`;

  return Response.json({
    result: response,
  });
}
