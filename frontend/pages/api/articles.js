const base = process.env.DRUPAL_BASE_URL || "http://127.0.0.1:8080";

export default async function handler(req, res) {
  try {
    const r = await fetch(`${base}/jsonapi/node/article`, {
      // Helps Drupal pick JSON:API response even if content negotiation is picky
      headers: { accept: "application/vnd.api+json" },
    });

    // Read as text first so we can handle HTML error pages safely
    const text = await r.text();

    // Try to parse JSON if possible; otherwise include raw text for debugging
    let body;
    try { body = JSON.parse(text); } catch { body = { raw: text.slice(0, 400) + "…" }; }

    if (!r.ok) {
      console.error("Upstream error", r.status, body);
      return res.status(r.status).json({
        error: "Upstream error",
        status: r.status,
        from: `${base}/jsonapi/node/article`,
        body,
      });
    }

    return res.status(200).json(body);
  } catch (e) {
    console.error("Proxy failed:", e);
    return res.status(500).json({ error: "Proxy failed", message: String(e) });
  }
}
