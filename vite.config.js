import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// Custom dev middleware so `/api/chat` works during local `npm run dev`
function apiDevPlugin() {
  return {
    name: "api-dev-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/chat" && req.method === "POST") {
          try {
            // Dynamically refresh env on each request so changes in .env are picked up immediately
            const env = loadEnv("development", process.cwd(), "");
            process.env = { ...process.env, ...env };

            let body = "";
            for await (const chunk of req) {
              body += chunk;
            }
            req.body = body ? JSON.parse(body) : {};

            // Provide status() and json() helpers matching Vercel Serverless Function signature
            res.status = (statusCode) => {
              res.statusCode = statusCode;
              return res;
            };
            res.json = (data) => {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(data));
              return res;
            };

            const handler = (await import("./api/chat.js")).default;
            return await handler(req, res);
          } catch (err) {
            console.error("Local /api/chat error:", err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err.message }));
          }
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load local env files (like .env.local) into process.env for local API handler
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };

  return {
    plugins: [react(), apiDevPlugin()],
  };
});

