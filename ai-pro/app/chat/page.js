"use client";
import { useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  async function send() {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <div>
      <h1>AI Chat</h1>

      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={send}>Send</button>

      <p>{reply}</p>
    </div>
  );
}
