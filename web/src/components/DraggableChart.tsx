"use client"

import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import type { ChartData } from "@/data/trading-data"
import { ValueCard } from "@/components/ValueCard"
import { CircularProgress } from "@/components/charts/CircularProgress"
import { DualColorCircular } from "@/components/charts/DualColorCircular"
import { ProgressBar } from "@/components/charts/ProgressBar"
import { BarChartComponent } from "@/components/charts/BarChartRounded"

interface DraggableChartProps {
  chart: ChartData
}

export function DraggableChart({ chart }: DraggableChartProps) {
  const [isHovering, setIsHovering] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: chart.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Map chart size to grid span classes
  const getSizeClasses = () => {
    switch (chart.size) {
      case "small":
        return "col-span-1 "
      case "medium":
        return "col-span-1 md:col-span-2"
      case "large":
        return "col-span-1 md:col-span-2 lg:col-span-2"
      case "wide":
        return "col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2"
      case "tall":
        return "col-span-1 row-span-2 h-80"
      default:
        return "col-span-1"
    }
  }

  // Render the appropriate chart component based on type
  const renderChart = () => {
    switch (chart.type) {
      case "value":
        return <ValueCard title={chart.title} value={chart.value} tooltip={chart.tooltip} />
      case "circularProgress":
        return <CircularProgress title={chart.title} value={chart.value} color={chart.color} tooltip={chart.tooltip} />
      case "dualCircular":
        return (
          <DualColorCircular
            title={chart.title}
            value={chart.value}
            percentage={chart.percentage}
            tooltip={chart.tooltip}
          />
        )
      case "progressBar":
        return (
          <ProgressBar
            title={chart.title}
            value={chart.value}
            winAmount={chart.winAmount}
            lossAmount={chart.lossAmount}
            percentage={chart.percentage}
            tooltip={chart.tooltip}
          />
        )
      case "barChart":
        return (
          <BarChartComponent
            title={chart.title}
            data={chart.data}
            labels={chart.labels}
            color={chart.color}
            tooltip={chart.tooltip}
          />
        )
      default:
        return null
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative h-64 ${getSizeClasses()}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        {...attributes}
        {...listeners}
        className={`absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing 
          rounded-md p-1 hover:bg-muted transition-opacity duration-200 ${isHovering ? "opacity-100" : "opacity-0"}`}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground/40" />
      </div>
      {renderChart()}
    </div>
  )
}

