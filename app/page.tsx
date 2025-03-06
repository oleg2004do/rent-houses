import { redirect } from "next/navigation"

// Перенаправляємо кореневий маршрут на маршрут з локаллю
export default function RootPage() {
  redirect("/en")
}

