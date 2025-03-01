import type React from "react"

interface AdditionalInfoProps {
  info: string
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ info }) => {
  const renderLine = (line: string, index: number) => {
    if (line.startsWith("✅")) {
      return (
        <li key={index} className="flex items-start mb-2">
          <span className="text-green-500 mr-2 flex-shrink-0">✅</span>
          <span>{line.substring(2)}</span>
        </li>
      )
    } else if (line.startsWith("🛏") || line.startsWith("🚿") || line.startsWith("💰")) {
      return (
        <li key={index} className="flex items-start mb-2">
          <span className="mr-2 flex-shrink-0">{line.charAt(0)}</span>
          <span>{line.substring(2)}</span>
        </li>
      )
    } else if (line.startsWith("✔️")) {
      return (
        <li key={index} className="flex items-start ml-4 mb-1">
          <span className="text-green-500 mr-2 flex-shrink-0">✔️</span>
          <span>{line.substring(3)}</span>
        </li>
      )
    } else if (line.startsWith("🚫")) {
      return (
        <li key={index} className="flex items-start mb-1">
          <span className="text-red-500 mr-2 flex-shrink-0">🚫</span>
          <span>{line.substring(2)}</span>
        </li>
      )
    } else if (line.startsWith("📆")) {
      return (
        <li key={index} className="flex items-start mb-1">
          <span className="mr-2 flex-shrink-0">📆</span>
          <span>{line.substring(2)}</span>
        </li>
      )
    } else if (line.trim() === "") {
      return <br key={index} />
    } else if (line.endsWith(":")) {
      return (
        <h3 key={index} className="font-bold text-lg mt-4 mb-2">
          {line}
        </h3>
      )
    } else {
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      )
    }
  }

  return (
    <div className="bg-gray-100 rounded-lg p-6 mt-4">
      <ul className="space-y-2">{info.split("\n").map((line, index) => renderLine(line, index))}</ul>
    </div>
  )
}

export default AdditionalInfo

