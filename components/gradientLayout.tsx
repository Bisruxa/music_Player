import React from 'react'

interface GradientLayoutProps {
  color: string
  children: React.ReactNode
  image: string
  subtitle: string
  title: string
  description: string
  roundImage?: boolean
}

const GradientLayout: React.FC<GradientLayoutProps> = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage = false,
}) => {
  // Tailwind doesn't support dynamic gradients by default.
  // We'll build a gradient string inline for the background style.
  // Example: linear-gradient(to bottom, #color1 0%, #color2 15%, ...)

  // Map a few common color names to Tailwind color hex values
  const colorsMap: Record<string, string> = {
    red: '#ef4444',
    green: '#22c55e',
    blue: '#3b82f6',
    purple: '#a855f7',
    pink: '#ec4899',
    yellow: '#eab308',
    teal: '#14b8a6',
    orange: '#f97316',
    cyan: '#06b6d4',
    gray: '#6b7280',
  }

  const c500 = colorsMap[color] ?? '#3b82f6'
  const c600 = colorsMap[color] ?? '#2563eb' // Slightly darker, fallback blue
  const c700 = colorsMap[color] ?? '#1d4ed8'

  const gradientStyle = {
    background: `linear-gradient(to bottom, ${c500} 0%, ${c600} 15%, ${c700} 40%, rgba(0,0,0,0.95) 75%)`,
  }

  return (
    <div className="h-full overflow-y-auto" style={gradientStyle}>
      <div className={`flex items-end p-10`} style={{ backgroundColor: c600 }}>
        <div className="p-5">
          <img
            src={image}
            alt={title}
            className={`box-shadow-2xl w-40 h-40 object-cover ${
              roundImage ? 'rounded-full' : 'rounded-sm'
            }`}
          />
        </div>
        <div className="p-5 text-white leading-[40px]">
          <p className="text-xs font-bold uppercase">{subtitle}</p>
          <p className="text-6xl">{title}</p>
          <p className="text-xs">{description}</p>
        </div>
      </div>
      <div className="py-12">{children}</div>
    </div>
  )
}

export default GradientLayout
