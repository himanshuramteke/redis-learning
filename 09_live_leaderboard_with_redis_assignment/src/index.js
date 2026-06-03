import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.post("/post/:id/view", async (req, res) => {
  try {
    const { id } = req.params;
    const views = await redis.incr(`post:${id}:views`);
    return res.json({ success: true, postId: id, views });
  } catch (error) {
    console.error("Error incrementing view count:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to increment view count" });
  }
});

app.post("/leaderboard/score", async (req, res) => {
  try {
    const { id, points } = req.body;
    const newScore = await redis.zincrby("leaderboard", points, userid);
    res.json({ success: true, userid, score: Number(newScore) });
  } catch (error) {
    console.error("Error adding points to user score", error);
    res.status(500).json({
      success: false,
      message: "Failed to add points to user score",
    });
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await redis.zrevrange("leaderboard", 0, 9);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/leaderboard/:id/rank", async (req, res) => {
  try {
    const rank = await redis.zrevrank("leaderboard", req.params.id);
    res.json({
      id: req.params.id,
      rank: rank !== null ? rank + 1 : null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
