import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import { join } from "path"

// Розміри іконки
export const size = {
  width: 64,
  height: 64,
}

export const contentType = "image/png"

// Генерація іконки
export default function Icon() {
  try {
    // Спробуємо прочитати PNG файл з папки public
    const iconPath = join(process.cwd(), "public", "JOURNEY-UA.png")
    const iconBuffer = readFileSync(iconPath)

    // Повертаємо бінарні дані іконки з заголовками, що запобігають кешуванню
    return new Response(iconBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (e) {
    // Якщо не вдалося прочитати файл, повертаємо стандартну іконку
    return new ImageResponse(
      <div
        style={{
          fontSize: 24,
          background: "#0057b7",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffd700",
          fontWeight: "bold",
        }}
      >
        JU
      </div>,
      { ...size },
    )
  }
}

