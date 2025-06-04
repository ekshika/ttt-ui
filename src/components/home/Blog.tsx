import React, { useState, useEffect } from "react";
import { getPublicBlogs } from "../../services/blogService"; // ← adjust this path as needed
import type { Blog } from "../../types/blog"; // ← adjust this path as needed

const PRIMARY = "#1f528c";
const SECONDARY = "#3e6aa7";
const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

export default function BlogDisplayPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getPublicBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${PRIMARY} 55%, ${SECONDARY})`,
          minHeight: "100vh",
          fontFamily: FONT_FAMILY,
          padding: "40px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 18,
        }}
      >
        Loading blogs…
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${PRIMARY} 55%, ${SECONDARY})`,
          minHeight: "100vh",
          fontFamily: FONT_FAMILY,
          padding: "40px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 18,
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${PRIMARY} 55%, ${SECONDARY})`,
        minHeight: "100vh",
        fontFamily: FONT_FAMILY,
        padding: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontFamily: FONT_FAMILY,
            fontWeight: 800,
            fontSize: 34,
            marginBottom: 36,
            textAlign: "center",
            letterSpacing: "-1px",
          }}
        >
          Blog Articles
        </h2>

        {blogs.length === 0 && (
          <div style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
            No blogs published yet.
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 32,
          }}
        >
          {blogs.map((blog) => (
            <a
              key={blog.id}
              href={`/blog/${blog.slug || blog.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                borderRadius: 16,
                boxShadow:
                  "0 2px 12px rgba(62,106,167,0.09), 0 1.5px 6px rgba(31,82,140,0.08)",
                background: "#fff",
                transition: "transform 0.12s, box-shadow 0.12s",
                display: "flex",
                flexDirection: "column",
                minHeight: 320,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              tabIndex={0}
              aria-label={blog.title}
            >
              {blog.media_cid && (
                <img
                  src={blog.media_cid}
                  alt={blog.title}
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                  }}
                  loading="lazy"
                />
              )}
              <div
                style={{
                  flex: 1,
                  padding: 22,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    color: PRIMARY,
                    fontFamily: FONT_FAMILY,
                    fontWeight: 700,
                    fontSize: 20,
                    margin: 0,
                    marginBottom: 10,
                  }}
                >
                  {blog.title}
                </h3>
                <div
                  style={{
                    color: "#555",
                    fontWeight: 400,
                    fontSize: 15,
                    marginBottom: 10,
                    minHeight: 36,
                    lineHeight: "1.35",
                  }}
                >
                  {blog.content?.slice(0, 110) ?? ""}
                  {blog.content && blog.content.length > 110 && "..."}
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{ color: SECONDARY, fontWeight: 600, fontSize: 15 }}
                  >
                    {blog.author_id}
                  </span>
                  <span style={{ margin: "0 7px", color: "#aaa" }}>•</span>
                  <span style={{ color: "#888", fontSize: 13 }}>
                    {blog.published_at
                      ? new Date(blog.published_at).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </div>
              <div
                style={{
                  height: 4,
                  background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  width: "100%",
                }}
              />
              <style>
                {`
                  a:hover, a:focus {
                    transform: translateY(-5px) scale(1.017);
                    box-shadow: 0 4px 18px rgba(31,82,140,0.12);
                  }
                `}
              </style>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
