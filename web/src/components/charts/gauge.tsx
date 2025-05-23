"use client"

import { useEffect, useRef } from "react"
import type { ScoreData } from "@/data/trading-data"
import { MoreHorizontal } from "lucide-react"

interface ScoreGaugeProps {
  data: ScoreData
  className?: string
}

export function Gauge({ data, className = "" }: ScoreGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { value, maxValue = 100, label, description } = data
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Draw gauge
    const centerX = rect.width / 2
    const centerY = rect.height / 2 + rect.height * 0.1 // Move center point down to create semi-circle
    const radius = Math.min(centerX, centerY) * 0.85

    // Draw tick marks - semi-circle from -180 to 0 degrees
    ctx.strokeStyle = "rgba(217, 217, 217, 0.3)" 
    ctx.lineWidth = 2

    for (let i = 0; i <= 40; i++) {
      // Map i from 0-20 to angles from -180 to 0 degrees (in radians)
      const angle = (i / 40) * Math.PI - Math.PI

      const startRadius = radius *.9
      const endRadius = radius * 0.8

      ctx.beginPath()
      ctx.moveTo(centerX + Math.cos(angle) * startRadius, centerY + Math.sin(angle) * startRadius)
      ctx.lineTo(centerX + Math.cos(angle) * endRadius, centerY + Math.sin(angle) * endRadius)
      ctx.stroke()
    }

    // Draw progress arc - semi-circle
    const startAngle = Math.PI // 180 degrees (left side)
    const maxAngle = 2 * Math.PI // 360 degrees (right side)
    const endAngle = startAngle + (maxAngle - startAngle) * (percentage / 100)

    // Create gradient for the arc
    const gradient = ctx.createLinearGradient(0, 0, canvas.width*(Math.cos(endAngle)+1)/2, 0)
    gradient.addColorStop(0, '#00ffff')    // Cyan
    gradient.addColorStop(1, '#0066ff')    // Blue

    // Draw the arc with gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.85, startAngle, endAngle)
    ctx.lineWidth = radius * 0.15
    ctx.strokeStyle = gradient
    ctx.lineCap = "round"
    ctx.stroke()
  }, [percentage])

  return (
    <div className={`relative w-full aspect-square ${className}`}>
      {/* Canvas for gauge */}
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Menu dots */}
      <div className="absolute top-4 right-4">
        <MoreHorizontal className="text-white" size={24} />
      </div>

      {/* Score overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white text-8xl font-bold">{value}</span>
        {label && <span className="text-[#0066ff] text-2xl font-medium tracking-wide mt-2">{label}</span>}
      </div>

      {/* Description text */}
      {description && (
        <div className="absolute bottom-4 left-0 right-0">
          <p className="text-white text-center px-6 max-w-xs mx-auto">{description}</p>
        </div>
      )}
    </div>
  )
}

