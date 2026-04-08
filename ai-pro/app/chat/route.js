export async function POST(req) {
  try {
    const { message } = await req.json();

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ai-golu.vercel.app", // 👈 IMPORTANT
        "X-Title": "AI Golu App", // 👈 IMPORTANT
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "user", content: message }
        ],
      }),
    });

    const data = await res.json();

    // 🔥 Debug return
    if (!data || !data.choices) {
      return Response.json({
        reply: "API se response nahi aaya ❌",
      });
    }

    return Response.json({
      reply: data.choices[0].message.content,
    });

  } catch (error) {
    return Response.json({
      reply: "Error: " + error.message,
    });
  }
}
