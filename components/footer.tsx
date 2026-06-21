// components/Footer.tsx
import Link from "next/link"
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import {useState} from "react"
import Modal from "./modal-privacy"
import {AiOutlineInstagram} from "react-icons/ai"
import {BiLogoTelegram} from "react-icons/bi"

export default function Footer() {

    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)

  return (
    <footer className="bg-neutral-900 px-12 py-10 flex flex-col gap-8">
      {/* Top row */}
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-medium code text-neutral-100 tracking-tight">
            Islom
          </span>

          <div className="w-10 h-px bg-neutral-600 lg:block hidden" />
          
          <a
            href="mailto:lamjarred063@gmail.com"
            className="flex items-center gap-2 text-neutral-400 text-sm hover:text-neutral-100 transition-colors"
          >
            <EnvelopeIcon className="w-4 h-4" />
            lamjarred063@gmail.com
          </a>
        </div>

        <nav className="flex gap-8">
          {["Home", "Work", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className="text-xs tracking-widest text-neutral-400 minicode hover:text-neutral-100 transition-colors uppercase"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom row */}
      <div className="border-t border-neutral-800 pt-6 flex items-center justify-between flex-wrap gap-4">
        <span className="text-xs text-neutral-500">
          Copyright © {new Date().getFullYear()} Islom.
        </span>

        <button 
          className="text-xs text-neutral-500 hover:text-neutral-100 transition-colors uppercase tracking-widest"
          onClick={() => setIsPrivacyOpen(true)}
        >
          Privacy
        </button>
        <div className="flex gap-5">
            <a href="https://www.instagram.com/islom.filmic/" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-100 transition-colors">
              <AiOutlineInstagram className="w-6 h-6" />
            </a>
            <a href="https://t.me/who_islom" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-100 transition-colors">
              <BiLogoTelegram className="w-6 h-6" />
            </a>
        </div>
        <div className="flex gap-3">
          <Modal isOpen={isPrivacyOpen} setIsOpen={setIsPrivacyOpen} />
        </div>
      </div>
    </footer>
  )
}