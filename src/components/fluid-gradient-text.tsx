"use client"

import { motion, useMotionValue, useSpring, useTransform } from "motion/react"

export type FluidGradientTextProps = {
  /** Text content rendered inside the SVG. */
  text: string
  /**
   * SVG viewBox width used to scale the gradient and text layout.
   * @default 1200
   * */
  svgViewBoxWidth?: number
  /**
   * SVG viewBox height used as the base text size.
   * @default 300
   * */
  svgViewBoxHeight?: number
  fontFamily?: string
}

export function FluidGradientText({
  text,
  svgViewBoxWidth = 1200,
  svgViewBoxHeight = 300,
  fontFamily = "var(--font-sans)",
}: FluidGradientTextProps) {
  const horizontalPadding = svgViewBoxWidth * 0.05
  const baselineY = svgViewBoxHeight * 0.56
  const textWidth = svgViewBoxWidth - horizontalPadding * 2
  const fontSize = svgViewBoxHeight * 0.78
  const gradientX1Raw = useMotionValue(0.5)
  const gradientX1 = useSpring(
    useTransform(gradientX1Raw, [0, 1], [svgViewBoxWidth * 0.08, svgViewBoxWidth * 0.58]),
    {
      stiffness: 150,
      damping: 25,
    }
  )
  const gradientX2 = useSpring(
    useTransform(gradientX1Raw, [0, 1], [svgViewBoxWidth * 0.42, svgViewBoxWidth * 0.92]),
    {
      stiffness: 150,
      damping: 25,
    }
  )

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const containerRect = event.currentTarget.getBoundingClientRect()
    gradientX1Raw.set(
      (event.clientX - containerRect.left) / containerRect.width
    )
  }

  const handleMouseLeave = () => {
    gradientX1Raw.set(0.5)
  }

  return (
    <div
      className="relative size-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        className="size-full select-none"
        viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x={horizontalPadding}
          y={baselineY}
          textAnchor="start"
          dominantBaseline="central"
          textLength={textWidth}
          lengthAdjust="spacingAndGlyphs"
          stroke="currentColor"
          strokeOpacity="0.09"
          strokeWidth="2"
          fill="currentColor"
          fillOpacity="0.08"
          style={{
            fontFamily,
            fontSize,
            fontWeight: 700,
          }}
        >
          {text}
        </text>
        <text
          x={horizontalPadding}
          y={baselineY}
          textAnchor="start"
          dominantBaseline="central"
          textLength={textWidth}
          lengthAdjust="spacingAndGlyphs"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="2"
          fill="url(#fluid_gradient_text_linear)"
          style={{
            fontFamily,
            fontSize,
            fontWeight: 700,
          }}
        >
          {text}
        </text>
        <defs>
          <motion.linearGradient
            id="fluid_gradient_text_linear"
            x1={gradientX1}
            y1="0"
            x2={gradientX2}
            y2={svgViewBoxHeight}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="currentColor" stopOpacity="0.04" />
            <stop offset="0.35" stopColor="currentColor" stopOpacity="0.16" />
            <stop offset="0.62" stopColor="white" stopOpacity="1" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.22" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  )
}
