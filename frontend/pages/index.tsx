import { useEffect, useState } from "react";
import Link from "next/link"; // ✅ Next.js link

type DrupalArticle = {
  id: string;
  attributes: { title: string };
};

export default function Home() {
  const [articles, setArticles] = useState<DrupalArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/articles")
      .then((r) => {
        if (!r.ok) throw new Error(`API ${r.status}`);
        return r.json();
      })
      .then((d) => setArticles(d.data || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <h1 data-testid="articles-heading">Articles</h1>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>Failed to load: {error}</p>}

      {!loading && !error && (
        <>
          <ul data-testid="articles-list" style={{ lineHeight: 1.8 }}>
            {articles.map((a) => (
              <li key={a.id} data-testid="article-item">
                {a.attributes?.title}
              </li>
            ))}
          </ul>

          {/* ✅ Add this so Cypress finds it */}
          <p style={{ marginTop: "1rem" }}>
            <Link href="/articles" data-testid="articles-link">
              View all articles
            </Link>
          </p>
        </>
      )}
    </main>
  );
}
