"use client";

import { useState } from "react";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const generate = async () => {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Generator 🤖</h2>

      <input
        style={{ width: "100%", padding: "10px" }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Kuch bhi likho..."
      />

      <button
        onClick={generate}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        Generate
      </button>

      <p style={{ marginTop: "20px" }}>{result}</p>
    </div>
  );
}
