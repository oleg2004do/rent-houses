import enMessages from "@/messages/en.json"
import ukMessages from "@/messages/uk.json"
import esMessages from "@/messages/es.json"

const messages = {
  en: enMessages,
  uk: ukMessages,
  es: esMessages,
}

export function getTranslations(locale: string, namespace: string) {
  const localeMessages = messages[locale as keyof typeof messages] || messages.en
  return localeMessages[namespace as keyof typeof localeMessages] || {}
}

