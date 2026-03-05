interface SectionTitleProps {
  title: string
  subtitle?: string
  light?: boolean
  centered?: boolean
}

export default function SectionTitle({ title, subtitle, light, centered = true }: SectionTitleProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      <h2
        className={`font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4 ${
          light ? "text-white" : "text-secondary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-1 w-20 rounded-full gradient-primary ${centered ? "mx-auto" : ""}`} />
    </div>
  )
}
