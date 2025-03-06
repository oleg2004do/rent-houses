import { readFileSync } from "fs"
import { join } from "path"

export const size = {
  width: 500,
  height: 500,
}

export const contentType = "image/png"

export default function Icon() {
  try {
    // Спробуємо прочитати PNG файл з папки public
    const iconPath = join(process.cwd(), "public", "JOURNEY-UA.png")
    const iconBuffer = readFileSync(iconPath)

    // Повертаємо бінарні дані іконки
    return new Response(iconBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
      },
    })
  } catch (e) {
    console.error("Error reading icon:", e)
    return new Response("Icon not found", { status: 404 })
  }
}

