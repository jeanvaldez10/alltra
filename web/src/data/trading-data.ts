export type ChartId =
  | "netPL"
  | "tradeExpectancy"
  | "profitFactor"
  | "avgWinLoss"
  | "weeklyPerformance1"
  | "weeklyPerformance2"
  | "winRate"
  | "lossRate"
  | "avgLoss"
  | "avgWin"
  | "winLossRatio"
  | "score"

export type ChartSize = "small" | "medium" | "large" | "wide" | "tall"

export interface ChartData {
  id: ChartId
  title?: string
  type: "value" | "circularProgress" | "dualCircular" | "progressBar" | "barChart"|"gauge"
  size?: ChartSize
  visible: boolean
  [key: string]: any
}
export interface ScoreData {
  value: number
  maxValue?: number
  label?: string
  description?: string
}
export const scoreData: ScoreData = {
  value: 98,
  maxValue: 100,
  label: "YOUR SCORE",
  description: "By completing the bundle of dividend-yielding stocks, you'll finalize the process.",
}

export const initialChartData: Record<ChartId, ChartData> = {
  netPL: {
    id: "netPL",
    title: "Net P&L",
    type: "value",
    size: "small",
    value: 23943.5,
    tooltip: "Net Profit and Loss",
    visible: true,
  },
  tradeExpectancy: {
    id: "tradeExpectancy",
    title: "Trade Expectency",
    type: "value",
    size: "small",
    value: 3203.5,
    tooltip: "Expected value per trade",
    visible: true,
  },
  profitFactor: {
    id: "profitFactor",
    title: "Profit Factor",
    type: "dualCircular",
    size: "small",
    value: 1.92,
    percentage: 65,
    tooltip: "Ratio of gross profit to gross loss",
    visible: true,
  },
  avgWinLoss: {
    id: "avgWinLoss",
    title: "Avg Win/Avg Loss",
    type: "progressBar",
    size: "small",
    value: 2.55,
    winAmount: 29594,
    lossAmount: 4800,
    percentage: 75,
    tooltip: "Ratio of average win to average loss",
    visible: true,
  },
  winRate: {
    id: "winRate",
    title: "Win Rate",
    type: "circularProgress",
    size: "small",
    value: 86,
    tooltip: "Percentage of winning trades",
    color: "hsl(var(--chart-positive))",
    visible: true,
  },
  lossRate: {
    id: "lossRate",
    title: "Loss Rate",
    type: "circularProgress",
    size: "small",
    value: 14,
    tooltip: "Percentage of losing trades",
    color: "hsl(var(--chart-negative))",
    visible: true,
  },
  avgLoss: {
    id: "avgLoss",
    title: "Avg Loss",
    type: "circularProgress",
    size: "small",
    value: 20,
    tooltip: "Average loss per losing trade",
    color: "hsl(var(--chart-negative))",
    visible: true,
  },
  avgWin: {
    id: "avgWin",
    title: "Avg Win",
    type: "circularProgress",
    size: "small",
    value: 89,
    tooltip: "Average win per winning trade",
    color: "hsl(var(--chart-positive))",
    visible: true,
  },
  winLossRatio: {
    id: "winLossRatio",
    title: "Win/Loss Ratio",
    type: "dualCircular",
    size: "small",
    value: 6.14,
    percentage: 86,
    tooltip: "Ratio of wins to losses",
    visible: true,
  },
  weeklyPerformance1: {
    id: "weeklyPerformance1",
    title: "Weekly Performance",
    type: "barChart",
    size: "wide",
    data: [15, 25, 18, 30, 22, 35, 20],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    tooltip: "Performance over the week",
    color: "hsl(var(--chart-blue))",
    visible: true,
  },
  weeklyPerformance2: {
    id: "weeklyPerformance2",
    title: "Weekly Performance",
    type: "barChart",
    size: "wide",
    data: [18, 22, 28, 20, 32, 38, 25],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    tooltip: "Performance over the week",
    color: "hsl(var(--chart-green))",
    visible: true,
  },
  score:{
    id:"score",
    type:"gauge",
    value: 99,
    size:"small",
    visible:true,
    maxValue: 100,
    label: "YOUR SCORE",
    description: "By completing the bundle of dividend-yielding stocks, you'll finalize the process.",
  }
}

export type DashboardPreset = {
  id: string
  name: string
  chartOrder: ChartId[]
  chartVisibility: Record<ChartId, boolean>
}

export const defaultPreset: DashboardPreset = {
  id: "default",
  name: "Default Layout",
  chartOrder: Object.keys(initialChartData) as ChartId[],
  chartVisibility: Object.entries(initialChartData).reduce(
    (acc, [id, chart]) => {
      acc[id as ChartId] = chart.visible
      return acc
    },
    {} as Record<ChartId, boolean>,
  ),
}

