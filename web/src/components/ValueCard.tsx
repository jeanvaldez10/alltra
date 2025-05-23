import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoCircle } from "@/components/ui/info-circle"



interface ValueCardProps {
  title?: string
  value: number | string
  tooltip?: string
  prefix?: string
  format?: (value: number) => string
}

export function ValueCard({
  title,
  value,
  tooltip,
  prefix = "$",
  format = (value) => value.toLocaleString(),
}: ValueCardProps) {
  const formattedValue = typeof value === "number" ? format(value) : value

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {tooltip && <InfoCircle tooltip={tooltip} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === "number" ? `${prefix}${formattedValue}` : formattedValue}
        </div>
      </CardContent>
    </Card>
  )
}

