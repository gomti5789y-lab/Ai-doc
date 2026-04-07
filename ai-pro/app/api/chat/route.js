export async function POST(req) {
  const { message } = await req.json();

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct", // FREE model
      messages: [
        { role: "user", content: message }
      ],
    }),
  });

  const data = await res.json();

  return Response.json({
    reply: data.choices[0].message.content,
  });
}
