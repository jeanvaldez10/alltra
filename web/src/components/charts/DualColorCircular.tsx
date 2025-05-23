"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoCircle } from "@/components/ui/info-circle"



interface DualColorCircularProps {
  title?: string
  value: number
  percentage: number
  tooltip?: string
  size?: number
  strokeWidth?: number
  positiveColor?: string
  negativeColor?: string
  muteColor?: string
}

export function DualColorCircular({
  title,
  value,
  percentage,
  tooltip,
  size = 120,
  strokeWidth = 15,
  muteColor = "hsl(var(--chart-mute))",
  positiveColor = "hsl(var(--chart-positive))",
  negativeColor = "hsl(var(--chart-negative))",
}: DualColorCircularProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI


  const gapSize = 0.05 // 5% gap

  const positiveProgress = percentage / 100
  const negativeProgress = 1 - positiveProgress

  const totalGapSize = circumference * gapSize * 2 // Two gaps (one at each end of segments)

  const availableLength = circumference - totalGapSize

  const positiveLength = availableLength * positiveProgress
  const negativeLength = availableLength * negativeProgress
  


  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {tooltip && <InfoCircle tooltip={tooltip} />}
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-2">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size}>
            <circle
              className="text-muted stroke-current"
              strokeWidth={strokeWidth }
              stroke={muteColor}
              fill="transparent"
              r={radius}
              cx={size / 2}
              cy={size / 2}
            />
            <circle
              strokeWidth={strokeWidth}
              strokeDasharray={`${positiveLength} ${circumference - positiveLength}`}
              strokeDashoffset={0}
              strokeLinecap="round"
              stroke={positiveColor}
              fill="transparent"
              r={radius}
              cx={size / 2}
              cy={size / 2}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <circle
              strokeWidth={strokeWidth}
              strokeDasharray={`${negativeLength} ${circumference - negativeLength}`}
              strokeLinecap="round"
              strokeDashoffset={ -(positiveLength + circumference * gapSize)}
              stroke={negativeColor}
              fill="transparent"
              r={radius}
              cx={size / 2}
              cy={size / 2}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{value}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

