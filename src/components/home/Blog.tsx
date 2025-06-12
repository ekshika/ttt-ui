import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPublicBlogs } from "../../services/blogService"; // Adjust this path if needed
import type { Blog } from "../../types/blog"; // Adjust this path if needed

const PRIMARY = "#1f528c";
const SECONDARY = "#3e6aa7";
const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0 6px 20px rgba(31,82,140,0.15)",
    transition: { duration: 0.2 },
  },
};

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
        id="blogs"
        className="py-20"
        style={{
          background: "#fff",
          minHeight: "100vh",
          fontFamily: FONT_FAMILY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#333",
          fontSize: 18,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading blogs…
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        id="blogs"
        className="py-20"
        style={{
          background: "#fff",
          minHeight: "100vh",
          fontFamily: FONT_FAMILY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d32f2f",
          fontSize: 18,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.div>
      </div>
    );
  }

  return (
    <div
      id="blogs"
      className="py-20"
      style={{
        background: "#fff",
        minHeight: "100vh",
        fontFamily: FONT_FAMILY,
        padding: "0 0 80px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1200, // Slightly wider for better content spread
          margin: "0 auto",
          padding: "0 24px", // Increased padding for better spacing
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            color: PRIMARY,
            fontFamily: FONT_FAMILY,
            fontWeight: 800,
            fontSize: 42, // Slightly larger for emphasis
            marginBottom: 24,
            textAlign: "center",
            letterSpacing: "-1px",
            padding: "80px 0 40px 0", // Increased top padding for balance
          }}
        >
          Blog Articles
        </motion.h2>

        {blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ color: "#888", fontSize: 18, textAlign: "center", padding: "40px 0" }}
          >
            No blogs published yet.
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", // Slightly wider cards
            gap: 40, // Increased gap for better spacing
          }}
        >
          <AnimatePresence>
            {blogs.map((blog) => (
              <motion.a
                key={blog.id}
                href={`/blog/${blog.slug || blog.id}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: 20, // Softer corners
                  boxShadow:
                    "0 4px 16px rgba(62,106,167,0.1), 0 2px 8px rgba(31,82,140,0.08)", // Softer shadow
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 360, // Slightly taller for balance
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
                      height: 200, // Taller image for better visual impact
                      objectFit: "cover",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                    loading="lazy"
                  />
                )}
                <div
                  style={{
                    flex: 1,
                    padding: 28, // Increased padding for spacious feel
                    display: "flex",
                    flexDirection: "column",
                    gap: 12, // Consistent spacing
                  }}
                >
                  <h3
                    style={{
                      color: PRIMARY,
                      fontFamily: FONT_FAMILY,
                      fontWeight: 700,
                      fontSize: 22, // Slightly larger for hierarchy
                      margin: 0,
                    }}
                  >
                    {blog.title}
                  </h3>
                  <div
                    style={{
                      color: "#555",
                      fontWeight: 400,
                      fontSize: 16, // Slightly larger for readability
                      lineHeight: "1.5", // Improved line height
                      flex: 1,
                    }}
                  >
                    {blog.content?.slice(0, 120) ?? ""}
                    {blog.content && blog.content.length > 120 && "..."}
                  </div>
                  {/* Uncomment if author and date are needed */}
                  {/* <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: SECONDARY, fontWeight: 600, fontSize: 15 }}>
                      {blog.author_id}
                    </span>
                    <span style={{ color: "#aaa" }}>•</span>
                    <span style={{ color: "#888", fontSize: 14 }}>
                      {blog.published_at
                        ? new Date(blog.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                  </div> */}
                </div>
                <div
                  style={{
                    height: 4,
                    background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    width: "100%",
                  }}
                />
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}