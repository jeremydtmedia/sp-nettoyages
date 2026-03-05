import Image from "next/image"
import Link from "next/link"
import { Home, MessageCircle } from "lucide-react"

export default function NotFound() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-dark">
      {/* Fond dégradé */}
      <div className="absolute inset-0 gradient-dark opacity-90" />

      {/* Grille décorative */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(14,165,200,0.5) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Halos décoratifs */}
      <div className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute bottom-1/4 right-[15%] w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[100px]" />

      {/* Contenu */}
      <div className="container-custom relative z-10 text-center px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-primary/20 blur-xl" />
            <Image
              src="/images/Logo.jpg"
              alt="SP Nettoyages"
              width={80}
              height={80}
              className="relative rounded-xl shadow-2xl shadow-primary/30"
            />
          </div>
        </div>

        {/* Code 404 */}
        <div className="relative mb-6">
          <span className="font-heading font-extrabold text-[8rem] md:text-[12rem] leading-none text-white/[0.04] select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Page <span className="text-gradient">introuvable</span>
            </h1>
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Pas d&apos;inquiétude, je vais vous remettre sur la bonne voie.
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group gradient-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            <Home className="w-5 h-5" />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center gap-3"
          >
            <MessageCircle className="w-5 h-5" />
            Contactez-moi
          </Link>
        </div>

        {/* Séparateur décoratif */}
        <div className="mt-12 flex justify-center">
          <div className="section-divider w-32" />
        </div>
      </div>
    </section>
  )
}
