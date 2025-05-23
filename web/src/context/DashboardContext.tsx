"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import {
  type ChartId,
  type ChartData,
  initialChartData,
  type DashboardPreset,
  defaultPreset,
} from "@/data/trading-data"

interface DashboardContextType {
  charts: Record<ChartId, ChartData>
  chartOrder: ChartId[]
  presets: DashboardPreset[]
  activePreset: DashboardPreset
  setChartOrder: (order: ChartId[]) => void
  toggleChartVisibility: (id: ChartId) => void
  savePreset: (name: string) => void
  loadPreset: (id: string) => void
  deletePreset: (id: string) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [charts, setCharts] = useState<Record<ChartId, ChartData>>(initialChartData)
  const [chartOrder, setChartOrder] = useState<ChartId[]>(Object.keys(initialChartData) as ChartId[])
  const [presets, setPresets] = useState<DashboardPreset[]>([defaultPreset])
  const [activePreset, setActivePreset] = useState<DashboardPreset>(defaultPreset)

  // Load presets from localStorage on initial render
  useEffect(() => {
    const savedPresets = localStorage.getItem("dashboard-presets")
    const savedActivePreset = localStorage.getItem("dashboard-active-preset")

    if (savedPresets) {
      const parsedPresets = JSON.parse(savedPresets) as DashboardPreset[]
      setPresets(parsedPresets)

      if (savedActivePreset) {
        const activePresetId = JSON.parse(savedActivePreset)
        const foundPreset = parsedPresets.find((preset) => preset.id === activePresetId)
        if (foundPreset) {
          setActivePreset(foundPreset)

          // Apply the active preset
          const updatedCharts = { ...charts }
          Object.keys(foundPreset.chartVisibility).forEach((chartId) => {
            if (updatedCharts[chartId as ChartId]) {
              updatedCharts[chartId as ChartId].visible = foundPreset.chartVisibility[chartId as ChartId]
            }
          })
          setCharts(updatedCharts)
          setChartOrder(foundPreset.chartOrder)
        }
      }
    }
  }, [])

  // Save presets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("dashboard-presets", JSON.stringify(presets))
    localStorage.setItem("dashboard-active-preset", JSON.stringify(activePreset.id))
  }, [presets, activePreset])

  const toggleChartVisibility = (id: ChartId) => {
    setCharts((prev) => {
      const updated = {
        ...prev,
        [id]: {
          ...prev[id],
          visible: !prev[id].visible,
        },
      }
      return updated
    })

    // Update active preset's visibility
    setActivePreset((prev) => ({
      ...prev,
      chartVisibility: {
        ...prev.chartVisibility,
        [id]: !charts[id].visible,
      },
    }))
  }

  const savePreset = (name: string) => {
    const newPreset: DashboardPreset = {
      id: Date.now().toString(),
      name,
      chartOrder: [...chartOrder],
      chartVisibility: Object.entries(charts).reduce(
        (acc, [id, chart]) => {
          acc[id as ChartId] = chart.visible
          return acc
        },
        {} as Record<ChartId, boolean>,
      ),
    }

    setPresets((prev) => [...prev, newPreset])
    setActivePreset(newPreset)
  }

  const loadPreset = (id: string) => {
    const preset = presets.find((p) => p.id === id)
    if (!preset) return

    setActivePreset(preset)
    setChartOrder(preset.chartOrder)

    // Apply visibility settings
    setCharts((prev) => {
      const updated = { ...prev }
      Object.keys(preset.chartVisibility).forEach((chartId) => {
        if (updated[chartId as ChartId]) {
          updated[chartId as ChartId].visible = preset.chartVisibility[chartId as ChartId]
        }
      })
      return updated
    })
  }

  const deletePreset = (id: string) => {
    // Don't delete the default preset
    if (id === defaultPreset.id) return

    const updatedPresets = presets.filter((p) => p.id !== id)
    setPresets(updatedPresets)

    // If the active preset is deleted, switch to default
    if (activePreset.id === id) {
      const defaultPresetInList = updatedPresets.find((p) => p.id === defaultPreset.id)
      if (defaultPresetInList) {
        setActivePreset(defaultPresetInList)
        setChartOrder(defaultPresetInList.chartOrder)

        // Apply visibility settings
        setCharts((prev) => {
          const updated = { ...prev }
          Object.keys(defaultPresetInList.chartVisibility).forEach((chartId) => {
            if (updated[chartId as ChartId]) {
              updated[chartId as ChartId].visible = defaultPresetInList.chartVisibility[chartId as ChartId]
            }
          })
          return updated
        })
      }
    }
  }

  return (
    <DashboardContext.Provider
      value={{
        charts,
        chartOrder,
        presets,
        activePreset,
        setChartOrder,
        toggleChartVisibility,
        savePreset,
        loadPreset,
        deletePreset,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

