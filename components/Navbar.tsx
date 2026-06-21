"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navbar.module.css";
import { AnimatePresence, motion } from "framer-motion";
import {TransitionLink} from "@/components/transitionLink";
import { Chroma } from "./chroma";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Brief", 
    href: "/brief",
    hasDropdown: false,
   },
];

export default function Navbar() {

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);



  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <TransitionLink href="/" className={styles.logo}>
        Islom
      </TransitionLink>

      {/* Desktop nav links */}
      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <TransitionLink
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.active : ""
              }`}
            >
              {link.hasDropdown ? (
                <span className={styles.hasDropdown}>
                  {link.label}
                  <svg viewBox="0 0 10 6" fill="none">
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : (
                link.label
              )}
            </TransitionLink>
          </li>
        ))}
      </ul>

      {/* Right side */}
      <div className={styles.right}>
        <div className={styles.divider} />
        <TransitionLink href="/contact" className={styles.btnContact}>
          <span>Contact</span>
        </TransitionLink>
      </div>

      {/* Mobile hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? styles.lineOpen1 : styles.line} />
        <span className={menuOpen ? styles.lineOpen2 : styles.line} />
        <span className={menuOpen ? styles.lineOpen3 : styles.line} />
      </button>

      {/* Mobile menu */}
        <AnimatePresence>
  {menuOpen && (
    <motion.div
      className={styles.mobileMenu}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      style={{ overflow: "hidden" }}
    >
      {navLinks.map((link, i) => (
        <motion.div
          className="justify-center items-center"
          key={link.href}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <TransitionLink
            href={link.href}
            className={styles.mobileLink+" code"}
            style={pathname === link.href ? { color: "#e8e6e1" } : {}}
            onClick={() => setMenuOpen(false)}
          >
            <Chroma>
              {link.label}
            </Chroma>
            {/* <span style={{ fontSize: "16px", color: "#555552" }}>→</span> */}
          </TransitionLink>
        </motion.div>
      ))}

      <TransitionLink
        href="/contact"
        className={styles.mobileBtnContact}
        onClick={() => setMenuOpen(false)}
      >
        Contact
      </TransitionLink>
    </motion.div>
  )}
        </AnimatePresence>
    </nav>
  );
}
