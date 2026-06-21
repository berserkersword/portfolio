"use client"
import { useState } from "react"


interface privacyFooterProps {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
}


export default function PrivacyModal({isOpen, setIsOpen}:privacyFooterProps) {


  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-neutral-100 text-lg font-medium mb-4">Privacy Policy</h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-3">
              This site does not collect or store personal data. No cookies or tracking tools are used.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              The only interactions available are viewing the portfolio and leaving a brief. 
              Any information submitted is used solely to respond to your inquiry and is never shared with third parties.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-neutral-500 hover:text-neutral-100 transition-colors uppercase tracking-widest"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}