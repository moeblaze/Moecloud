// api/yt-chapterize.js — Vercel Serverless Function with optional Bearer auth + CORS
// Required:   OPENAI_API_KEY
// Optional:   OPENAI_MODEL (default: gpt-4o-mini)
//             AUTH_BEARER (if set, require 'Authorization: Bearer <token>')
//             CORS_ALLOW_ORIGIN (e.g. 'https://moecloud-hbeworyun-morris-stephens-projects.vercel.app')
// Note: If AUTH_BEARER is set and you call this from the browser, you'll need to add that header in your client fetch.
//       Exposing tokens in client code is visible to users; use with care.

module.exports = async (req, res) => {
  // ---- CORS (optional lock-down) ----
  const origin = req.headers.origin || "";
  const allowOrigin = process.env.CORS_ALLOW_ORIGIN || "";
  const setCORS = () => {
    const permitted = allowOrigin || origin || "*";
    res.setHeader("Access-Control-Allow-Origin", permitted);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Max-Age", "86400");
  };
  setCORS();
  if (req.method === "OPTIONS") { res.status(204).end(); return; }

  // ---- Auth (optional) ----
  if (process.env.AUTH_BEARER) {
    const auth = req.headers.authorization || "";
    if (auth !== `Bearer ${process.env.AUTH_BEARER}`) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { title = "", transcript = "", duration = 0 } = req.body || {};
  if (!transcript || transcript.length < 20) {
    res.status(400).json({ error: "Missing transcript" });
    return;
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const system = `You are a YouTube packaging assistant. Return ONLY valid JSON matching this schema:
{
  "chapters": [{"t": number, "title": string}],  // t = seconds from start
  "hooks": string[],
  "thumbs": string[],
  "hashtags": string[],
  "tags": string[],
  "pinned": string,
  "shorts": [{"start": number, "end": number, "label": string}]
}
Keep chapters tight (6–12 typical). Titles < 60 chars. Short windows 20–60s.`;

  const user = `TITLE: ${title}
DURATION_MIN: ${duration}
TRANSCRIPT:
${transcript}`;

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        response_format: { type: "json_object" },
        temperature: 0.6,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ]
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      res.status(500).json({ error: "OpenAI error", details: text });
      return;
    }

    const data = await resp.json();
    let json;
    try {
      json = JSON.parse(data.choices[0].message.content);
    } catch {
      res.status(500).json({ error: "AI returned non-JSON" });
      return;
    }
    res.status(200).json(json);
  } catch (e) {
    res.status(500).json({ error: "Server error", details: String(e) });
  }
};
