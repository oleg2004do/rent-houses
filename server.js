const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = process.env.PORT || 3000

// Ініціалізуємо Next.js з детальним логуванням
const app = next({
  dev,
  hostname,
  port,
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Логуємо запити для діагностики
      console.log(`Request: ${req.method} ${req.url}`)

      // Обробляємо запит
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)

      // Логуємо успішні відповіді
      console.log(`Response: ${res.statusCode} ${req.url}`)
    } catch (err) {
      console.error("Error occurred handling", req.url, err)
      res.statusCode = 500
      res.end("Internal Server Error")
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})

