import Link from "next/link"
import { useTranslations } from "next-intl"
import { Mail, Phone } from "lucide-react"

const Footer = () => {
  const t = useTranslations("footer")

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">{t("companyName")}</h3>
            <p>{t("companyDescription")}</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">{t("contactUs")}</h3>
            <ul>
              <li className="mb-2">
                <Link
                  href="https://t.me/JourneyinUA_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-400"
                >
                  <img src="/telegram (1).png" alt="Telegram" className="w-5 h-5 mr-2" />
                  <span className="text-white hover:text-blue-400">Telegram</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="https://www.instagram.com/journey.in.ua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-400"
                >
                  <img src="/instagram.png" alt="Instagram" className="w-5 h-5 mr-2" />
                  <span className="text-white hover:text-blue-400">Instagram</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href={`mailto:${t("emailAddress")}`} className="flex items-center hover:text-blue-400">
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="text-white hover:text-blue-400">
                    {t("email")}: {t("emailAddress")}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={`tel:${t("phoneNumber").replace(/\s+/g, "")}`}
                  className="flex items-center hover:text-blue-400"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  <span className="text-white hover:text-blue-400">
                    {t("phone")}: {t("phoneNumber")}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">{t("address")}</h3>
            <p>{t("addressLine1")}</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} {t("companyName")}. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

