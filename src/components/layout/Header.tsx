"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
]

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (pathname === href) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isMobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-18 md:h-20">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <Image
            src="/images/Logo.jpg"
            alt="SP Nettoyages"
            width={48}
            height={48}
            className="rounded-lg"
            priority
          />
          <div className="flex flex-col">
            <span
              className={`font-heading font-bold text-lg leading-tight transition-colors duration-300 ${
                isScrolled ? "text-secondary" : "text-white"
              }`}
            >
              SP Nettoyages
            </span>
            <span
              className={`text-xs font-medium transition-colors duration-300 ${
                isScrolled ? "text-primary" : "text-primary-light"
              }`}
            >
              L&apos;excellence du nettoyage
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                isScrolled ? "text-secondary" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+33674338786"
            className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-primary ${
              isScrolled ? "text-secondary" : "text-white"
            }`}
            onClick={() => {
              try {
                fetch("https://crm-dt-media.vercel.app/api/track-event", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ event: "phone_click", projectId: "sp-nettoyages" }),
                })
              } catch {}
            }}
          >
            <Phone className="w-4 h-4" />
            06 74 33 87 86
          </a>
          <Link
            href="/devis"
            className="gradient-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            Devis gratuit
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`lg:hidden relative z-10 p-2 transition-colors ${
            isScrolled || isMobileOpen ? "text-secondary" : "text-white"
          }`}
          aria-label={isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-0 bg-white z-40 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => { handleNavClick(e, link.href); setIsMobileOpen(false) }}
                  className="text-2xl font-heading font-bold text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <a
                href="tel:+33674338786"
                className="flex items-center gap-2 text-lg text-secondary"
              >
                <Phone className="w-5 h-5" />
                06 74 33 87 86
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/devis"
                onClick={() => setIsMobileOpen(false)}
                className="gradient-primary text-white px-8 py-3 rounded-full text-lg font-semibold"
              >
                Devis gratuit
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
