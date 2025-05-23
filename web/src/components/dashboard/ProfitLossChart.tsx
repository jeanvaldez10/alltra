"use client";

import React from 'react'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Line, LineChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
    {
        average: 0,
        today: 2,
    },
    {
        average: 3,
        today: 1,
    },
    {
        average: 2,
        today: 9,
    },
    {
        average: 2,
        today: 3,
    },
    {
        average: 1,
        today: 4,
    },
    {
        average: 2,
        today: 3,
    },
    {
        average: 3,
        today: 4,
    },
]

const chartConfig = {
    today: {
        label: "Profit",
        color: "green",
    },
    average: {
        label: "Loss",
        color: "red",
    },
} satisfies ChartConfig

const ProfitLossChart = () => {
    return (
        <Card className=' border-neutral-800 rounded-2xl'>
            <CardHeader>
                <CardTitle>Your Trading Profit/Loss</CardTitle>
                <CardDescription>
                    Your trading stats in the last 7 days.
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <ChartContainer config={chartConfig} className="w-full md:h-[200px]">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 0,
                        }}
                    >
                        <Line
                            type="monotone"
                            strokeWidth={2}
                            dataKey="average"
                            stroke="var(--color-average)"
                            
                            strokeOpacity={0.5}
                            activeDot={{
                                r: 6,
                                fill: "var(--color-average)",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="today"
                            strokeWidth={2}
                            stroke="var(--color-today)"
                            activeDot={{
                                r: 8,
                                style: { fill: "var(--color-today)" },
                            }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default ProfitLossChart