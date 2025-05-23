"use client";

import React from 'react'
import { ChartConfig, ChartContainer } from '../ui/chart';
import { Bar, BarChart, Line, LineChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
    {
        revenue: 10400,
        subscription: 240,
    },
    {
        revenue: 14405,
        subscription: 300,
    },
    {
        revenue: 9400,
        subscription: 200,
    },
    {
        revenue: 8200,
        subscription: 278,
    },
    {
        revenue: 7000,
        subscription: 189,
    },
    {
        revenue: 9600,
        subscription: 239,
    },
    {
        revenue: 11244,
        subscription: 278,
    },
    {
        revenue: 26475,
        subscription: 189,
    },
]

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "green",
    },
    subscription: {
        label: "Subscriptions",
        color: "#737373",
    },
} satisfies ChartConfig


const BalanceChart = () => {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            <Card className=' border-neutral-800 rounded-2xl'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal">Total Balance</CardTitle>
                </CardHeader>
                <CardContent className="pb-0">
                    <div className="text-2xl font-bold">$15,231.89</div>
                    <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p>
                    <ChartContainer config={chartConfig} className="h-[80px] w-full">
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
                                dataKey="revenue"
                                stroke="var(--color-revenue)"
                                activeDot={{
                                    r: 6,
                                }}
                                
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className=' border-neutral-800 rounded-2xl'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal">Trades</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+121</div>
                    <p className="text-xs text-muted-foreground">
                        +80.1% from last month
                    </p>
                    <ChartContainer config={chartConfig} className="mt-2 h-[80px] w-full">
                        <BarChart data={data}>
                            <Bar
                                dataKey="subscription"
                                fill="var(--color-subscription)"
                                radius={4}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default BalanceChart