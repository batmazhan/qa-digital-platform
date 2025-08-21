import { useEffect, useState } from "react";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/articles") // 👈 use the Next.js proxy
      .then((res) => res.json())
      .then((data) => {
        const formatted = (data?.data ?? []).map((item) => ({
          id: item.id,
          title: item.attributes.title,
        }));
        setArticles(formatted);
      })
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1 data-testid="articles-title">Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id} data-testid="article-item">
            {article.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
