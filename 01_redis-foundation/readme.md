# What is Redis ??

**Redis** is an open-source **in-memory key-value store** used for caching, sessions, and queues. Data lives in RAM, making it extremely fast.

## Common Use Cases

- **Caching** — Store DB query results temporarily
- **Sessions** — Fast user session storage with auto-expiry
- **Rate Limiting** — Track request counts per user
- **Job Queues** — Background task processing (e.g. BullMQ)

## Basic Usage (Node.js)

```bash
npm install ioredis
```

```js
import Redis from "ioredis";
const redis = new Redis(); // default: localhost:6379

await redis.set("key", "value", "EX", 60); // expires in 60s
const val = await redis.get("key");
```

## Redis vs MongoDB

|          | Redis          | MongoDB    |
| -------- | -------------- | ---------- |
| Storage  | RAM            | Disk       |
| Speed    | Extremely fast | Fast       |
| Best For | Cache/sessions | Primary DB |

> Use both together — MongoDB as your main DB, Redis as a caching layer on top.
