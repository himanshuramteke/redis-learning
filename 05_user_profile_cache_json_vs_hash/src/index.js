import express, { raw } from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.post("/user/:id/json", async (req, res) => {
  await redis.set(`user:${req.params.id}:json`, JSON.stringify(req.body));
  res.json({ savedAs: "json" });
});

app.get("/user/:id/json", async (req, res) => {
  const raw = await redis.get(`user:${req.params.id}:json`);
  res.json({ user: raw ? JSON.parse(raw) : null });
});

/*
set method => store the single variable
hset => store object
hgetall => like getting entire object
hget => gets only single variable
hdel => delete the variable
hexists => checks for existing   
*/

//hset method used in hash
app.post("/user/:id/hash", async (req, res) => {
  await redis.hset(`user:${req.params.id}:hash`, req.body);
  res.json({ savedAs: "hash" });
});

//hget gets only single variable, that why we use [hgetall]
//if we are storing something in hash then we have to use [hgetall] method to get the object otherwise we dont get it.
app.get("/user/:id/hash", async (req, res) => {
  const user = await redis.hgetall(`user:${req.params.id}:hash`);
  res.json({ user });
});

app.listen(3000, () => {
  console.log(`Server is running on PORT 3000`);
});
