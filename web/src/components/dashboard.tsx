"use client"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable"
import { ChartSelector } from "@/components/ChartSelector"
import { DraggableChart } from "@/components/DraggableChart"
import { useDashboard } from "@/context/DashboardContext"
import { scoreData, type ChartId } from "@/data/trading-data"
import { Gauge } from "@/components/charts/gauge"

import type { DateRange } from "react-day-picker"
import { useState } from "react"

import LightweightChart, { ChartDataPoint } from '@/components/LightChart'


const fakeData: ChartDataPoint[] = [
  { time: '2025-03-01', value: 80.01 },
  { time: '2025-03-02', value: 96.63 },
  { time: '2025-03-03', value: 76.64 },
  { time: '2025-03-05', value: 86.64 },
  { time: '2025-03-08', value: 46.64 },
  { time: '2025-03-09', value: 56.64 },
  { time: '2025-03-10', value: 66.64 },
  { time: '2025-03-11', value: 76.64 },
  { time: '2025-03-12', value: 86.64 },
  { time: '2025-03-13', value: 96.64 },
  { time: '2025-03-14', value: 36.64 },
  { time: '2025-03-15', value: 56.64 },
  { time: '2025-03-16', value: 26.64 },
  { time: '2025-03-17', value: 16.64 },
  { time: '2025-03-18', value: 56.64 },
  { time: '2025-03-19', value: 86.64 },
  { time: '2025-03-20', value: 76.64 },
  { time: '2025-03-21', value: 36.64 },
  { time: '2025-03-22', value: 46.64 },
  { time: '2025-03-23', value: 76.64 },
];





export function Dashboard() {

  // State for date range
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })



  const { charts, chartOrder, setChartOrder } = useDashboard()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = chartOrder.indexOf(active.id as ChartId)
      const newIndex = chartOrder.indexOf(over.id as ChartId)

      setChartOrder(arrayMove(chartOrder, oldIndex, newIndex))
    }
  }

  // Handle date range change
  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range)
    // In a real app, you would fetch data for the new date range here
    // For this example, we'll just log the date range
    console.log("Date range changed:", range)
  }

  // Filter visible charts and maintain order
  const visibleCharts = chartOrder.filter((id) => charts[id].visible).map((id) => charts[id])

  return (
    <div className="container mx-auto p-4">

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Trading Dashboard</h2>
        <ChartSelector />
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={visibleCharts.map((chart) => chart.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-fr">
            {visibleCharts.map((chart) => (
              <DraggableChart key={chart.id} chart={chart} />
            ))}
          </div>

        </SortableContext>

      </DndContext>
      <LightweightChart data={fakeData} symbol="CUSTOM:MYFAKEDATA" />

      <div className="relative w-full max-w-md aspect-square rounded-3xl m-4 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-radial from-[#020e29] to-white"></div>

        {/* Score gauge */}
        <Gauge data={scoreData} className="relative z-10" />


      </div>
    </div>
  )
}

