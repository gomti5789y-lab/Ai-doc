export async function POST(req) {
  try {
    const { message } = await req.json();

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ai-golu.vercel.app",
        "X-Title": "AI Golu App",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "user", content: message }
        ],
      }),
    });

    const text = await res.text();

    console.log("RAW RESPONSE:", text);

    if (!text) {
      return Response.json({
        reply: "API ne blank response diya ❌",
      });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return Response.json({
        reply: "JSON parse error ❌",
      });
    }

    if (!data.choices) {
      return Response.json({
        reply: "API error: " + text,
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
