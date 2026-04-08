"use client";
import { useState } from "react";

export default function ChatPage() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("Loading...");

  async function send() {
    try {
      setReply("Loading...");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();

      setReply(data.reply || "No reply");
    } catch (err) {
      setReply("Error: " + err.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Chat</h1>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type..."
      />

      <button onClick={send}>Send</button>

      <p>{reply}</p>
    </div>
  );
}
