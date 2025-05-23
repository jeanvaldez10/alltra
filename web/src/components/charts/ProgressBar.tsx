"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoCircle } from "@/components/ui/info-circle"



interface ProgressBarProps {
  title?: string
  value: number
  winAmount: number
  lossAmount: number
  percentage: number
  tooltip?: string
  positiveColor?: string
  negativeColor?: string
}

export function ProgressBar({
  title,
  value,
  winAmount,
  lossAmount,
  percentage,
  tooltip,
  positiveColor = "hsl(var(--chart-positive))",
  negativeColor = "hsl(var(--chart-negative))",
}: ProgressBarProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {tooltip && <InfoCircle tooltip={tooltip} />}
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-4">
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="text-chart-positive">${winAmount.toLocaleString()}</span>
          <span className="text-chart-negative">${lossAmount.toLocaleString()}</span>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-full bg-secondary flex justify-end">
          <div
            className="h-full rounded-full"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(90deg, color-mix(in srgb, ${positiveColor} 30%, transparent) 0%, ${positiveColor} 100%)`,
            }}
          />
          <div
            className="h-full rounded-full"
            style={{
              width: `${100-percentage}%`,
              background: `linear-gradient(90deg,${negativeColor} 0%, color-mix(in srgb, ${negativeColor} 90%, transparent)   100%)`,
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

