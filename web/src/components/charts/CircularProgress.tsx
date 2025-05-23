"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoCircle } from "@/components/ui/info-circle"



interface CircularProgressProps {
  title?: string
  value: number
  color: string
  tooltip?: string
  size?: number
  strokeWidth?: number
  format?: (value: number) => string
}

export function CircularProgress({
  title,
  value,
  color="hsl(var(--chart-rate))",
  tooltip,
  size = 120,
  strokeWidth = 15,
  format = (value) => `${value}%`,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = value / 100
  const strokeDashoffset = circumference - progress * circumference

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
              strokeWidth={strokeWidth}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx={size / 2}
              cy={size / 2}
            />
            <circle
              className="transition-all duration-300 ease-in-out"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke={color}
              fill="transparent"
              r={radius}
              cx={size / 2}
              cy={size / 2}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{format(value)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

