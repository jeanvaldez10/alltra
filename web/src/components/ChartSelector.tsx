"use client"

import { useState } from "react"
import { Settings, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { useDashboard } from "@/context/DashboardContext"
import type { ChartId } from "@/data/trading-data"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ChartSelector() {
  const { charts, toggleChartVisibility, presets, activePreset, savePreset, loadPreset, deletePreset } = useDashboard()
  const [newPresetName, setNewPresetName] = useState("")
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <Select value={activePreset.id} onValueChange={loadPreset}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select preset" />
        </SelectTrigger>
        <SelectContent>
          {presets.map((preset) => (
            <SelectItem key={preset.id} value={preset.id}>
              {preset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Preset
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Dashboard Preset</DialogTitle>
            <DialogDescription>
              Create a new preset with the current chart layout and visibility settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="preset-name" className="text-right">
                Name
              </label>
              <Input
                id="preset-name"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                className="col-span-3"
                placeholder="My Custom Layout"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (newPresetName.trim()) {
                  savePreset(newPresetName)
                  setNewPresetName("")
                  setSaveDialogOpen(false)
                }
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Toggle charts</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Toggle Charts</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.entries(charts).map(([id, chart]) => (
            <div key={id} className="flex items-center justify-between p-2">
              <span className="text-sm">{chart.title}</span>
              <Switch checked={chart.visible} onCheckedChange={() => toggleChartVisibility(id as ChartId)} />
            </div>
          ))}
          <DropdownMenuSeparator />
          {activePreset.id !== "default" && (
            <div className="p-2">
              <Button variant="destructive" size="sm" className="w-full" onClick={() => deletePreset(activePreset.id)}>
                Delete Preset
              </Button>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

