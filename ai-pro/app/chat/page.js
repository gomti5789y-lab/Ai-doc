"use client";
import { useState } from "react";

export default function ChatPage() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const send = async () => {
    if (!msg) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();

    setChat([...chat, { user: msg, ai: data.reply }]);
    setMsg("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Chat</h1>

      {chat.map((c, i) => (
        <div key={i}>
          <p><b>You:</b> {c.user}</p>
          <p><b>AI:</b> {c.ai}</p>
        </div>
      ))}

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={send}>Send</button>
    </div>
  );
}
