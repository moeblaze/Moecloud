// api/yt-chapterize.js  — Vercel Serverless Function (no external deps)
// Set OPENAI_API_KEY in Vercel Project Settings → Environment Variables

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Vercel parses JSON automatically for req.body if content-type is application/json
  const { title = "", transcript = "", duration = 0 } = req.body || {};
  if (!transcript || transcript.length < 20) {
    res.status(400).json({ error: "Missing transcript" });
    return;
  }

  const system = `You are a YouTube packaging assistant. Return ONLY valid JSON matching this schema:
{
  "chapters": [{"t": number, "title": string}],  // t = seconds
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
        model: "gpt-4o-mini",
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
    } catch (e) {
      res.status(500).json({ error: "AI returned non-JSON" });
      return;
    }
    res.status(200).json(json);
  } catch (e) {
    res.status(500).json({ error: "Server error", details: String(e) });
  }
};
