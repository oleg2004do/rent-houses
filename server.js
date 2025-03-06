const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const port = process.env.PORT || 3000

// Ініціалізуємо Next.js з детальним логуванням
const app = next({
  dev,
  conf: {
    // Додаткові налаштування для логування
    distDir: ".next",
    logLevel: "debug",
  },
})
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        // Логуємо запити для діагностики
        console.log(`${new Date().toISOString()} - Request: ${req.method} ${req.url}`)

        // Обробляємо запит
        const parsedUrl = parse(req.url, true)
        await handle(req, res, parsedUrl)

        // Логуємо успішні відповіді
        console.log(`${new Date().toISOString()} - Response: ${res.statusCode} ${req.url}`)
      } catch (err) {
        console.error(`${new Date().toISOString()} - Error:`, err)
        console.error("Stack trace:", err.stack)
        res.statusCode = 500
        res.end("Internal Server Error")
      }
    }).listen(port, "0.0.0.0", (err) => {
      if (err) {
        console.error("Failed to start server:", err)
        throw err
      }
      console.log(`> Ready on http://0.0.0.0:${port}`)
    })
  })
  .catch((err) => {
    console.error("Error preparing Next.js app:", err)
    process.exit(1)
  })

