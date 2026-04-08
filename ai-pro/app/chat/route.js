export async function POST(req) {
  try {
    const { message } = await req.json();

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // safer model
        messages: [{ role: "user", content: message }],
      }),
    });

    const text = await res.text(); // 👈 IMPORTANT

    if (!text) {
      return Response.json({
        reply: "No response from API ❌",
      });
    }

    const data = JSON.parse(text);

    return Response.json({
      reply:
        data.choices?.[0]?.message?.content ||
        "AI ne kuch reply nahi diya ❌",
    });

  } catch (error) {
    return Response.json({
      reply: "Error: " + error.message,
    });
  }
}
