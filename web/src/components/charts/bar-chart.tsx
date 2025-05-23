"use client";
import {
	Bar,
	BarChart as RechartsBarChart,
	ResponsiveContainer,
	XAxis,
} from "recharts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {InfoCircle} from "@/components/ui/info-circle";

interface BarChartProps {
	title?: string;
	data: number[];
	labels: string[];
	color: string;
	tooltip?: string;
}

export function BarChartComponent({
	title,
	data,
	labels,
	color,
	tooltip,
}: BarChartProps) {
	// Transform the data into the format expected by Recharts
	const chartData = data.map((value, index) => ({
		name: labels[index],
		value,
	}));

  const RoundedBar = (props: { fill: any; x: any; y: any; width: any; height: any; }) => {
    const { fill, x, y, width, height } = props;
    const radius = 10;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={radius}
          ry={radius}
        />
      </g>
    );
  };
	return (
		<Card className="h-full">
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-sm font-medium">
					{title}
				</CardTitle>
				{tooltip && <InfoCircle tooltip={tooltip} />}
			</CardHeader>
			<CardContent className="flex-1">
				<div className="h-[200px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<RechartsBarChart
							data={chartData}
							margin={{
								top: 10,
								right: 0,
								left: 0,
								bottom: 10,
							}}
							barGap={0}
							barSize={18}
						>
							<XAxis
								dataKey="name"
								stroke="#888888"
								fontSize={12}
								tickLine={false}
								axisLine={false}
								tick={{
									fill: "#FFFFFF",
									opacity: 0.5,
									fontSize: 11,
								}}
								dy={10}
							/>
              <Bar 
                  dataKey="fullHeight" 
                  fill="rgba(68, 68, 68, 0.44)" 
                  radius={[10, 10, 10, 10]}
                  shape={<RoundedBar />}
                />

							<Bar
								dataKey="value"
								fill={color}
								radius={[10, 4, 5, 0]}
								width={2}
							/>
						</RechartsBarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}

