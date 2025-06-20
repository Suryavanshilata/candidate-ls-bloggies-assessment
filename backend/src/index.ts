import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// In-memory post storage
let posts: { title: string; author: string }[] = [];

// GET /api/trends
app.get("/api/trends", (_req: Request, res: Response) => {
  res.json({
    trends: ["ReactJS", "Next.js", "TailwindCSS"]
  });
});

// GET /api/posts
app.get("/api/posts", (_req: Request, res: Response) => {
  res.status(200).json(posts);
});

// POST /api/posts
app.post("/api/posts", (req: Request, res: Response) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newPost = { title, author };
  posts.push(newPost);
  console.log("✅ New Post:", newPost);

  res.status(201).json({ message: "Post created successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
