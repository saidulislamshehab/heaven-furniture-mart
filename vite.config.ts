import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv, type Plugin } from "vite"

/** Dev-only: serves api/*.ts (Vercel functions) at /api/* so the assistant works locally. */
function devApi(mode: string): Plugin {
  return {
    name: "heaven-dev-api",
    apply: "serve",
    configureServer(server) {
      // Load non-VITE_ vars for the server side only; they never reach the client bundle.
      Object.assign(process.env, loadEnv(mode, process.cwd(), ""))
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? "/", "http://localhost")
        if (!url.pathname.startsWith("/api/")) return next()
        const route = url.pathname.slice("/api/".length).replace(/[^a-z0-9-]/gi, "")
        try {
          const mod = await server.ssrLoadModule(`/api/${route}.ts`)
          const handler = mod[req.method ?? "GET"]
          if (typeof handler !== "function") {
            res.statusCode = 405
            return res.end()
          }
          const chunks: Buffer[] = []
          for await (const c of req) chunks.push(c as Buffer)
          const request = new Request(url, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body: chunks.length ? Buffer.concat(chunks) : undefined,
          })
          const response: Response = await handler(request)
          res.statusCode = response.status
          response.headers.forEach((v, k) => res.setHeader(k, v))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (err) {
          server.config.logger.error(String(err))
          res.statusCode = 500
          res.end(JSON.stringify({ error: "Server error" }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), devApi(mode)],
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react"
            }
            if (
              id.includes("gsap") ||
              id.includes("motion") ||
              id.includes("lenis")
            ) {
              return "vendor-animation"
            }
            if (
              id.includes("lucide-react") ||
              id.includes("radix-ui") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge") ||
              id.includes("class-variance-authority")
            ) {
              return "vendor-ui"
            }
            return "vendor"
          }
        },
      },
    },
  },
}))

