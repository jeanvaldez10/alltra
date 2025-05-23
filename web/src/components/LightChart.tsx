// src/app/dashboard/trading/page.tsx
import React, { useEffect, useRef } from 'react';
import { AreaSeries, createChart, IChartApi, ISeriesApi, LineData, LineSeries } from 'lightweight-charts';

export interface ChartDataPoint {
  time: string;
  value: number;
}
export
interface LightweightChartProps {
  data: ChartDataPoint[];
  symbol?: string;
  theme?: 'light' | 'dark';
  width?: number;
  height?: number;
}

const LightweightChart: React.FC<LightweightChartProps> = ({
  data,
  symbol = 'CUSTOM:MYDATA',
  theme = 'dark',
  width = 600,
  height = 400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize chart
    const chart: IChartApi = createChart(containerRef.current, {
      width,
      height,
      layout: {
        attributionLogo: false, // Hides the logo
        background: { color: theme === 'dark' ? '#080808' : '#ffffff' },
        textColor: theme === 'dark' ? '#d9d9d9' : '#000000',
      },
      grid: {
        vertLines: { color: theme === 'dark' ? '#2a2a2a' : '#e0e0e0' },
        horzLines: { color: theme === 'dark' ? '#2a2a2a' : '#e0e0e0' },
      },
      timeScale: { timeVisible: true, secondsVisible: false },
    });


    const series: ISeriesApi<'Area'> = chart.addSeries(AreaSeries ,{
        lineColor: '#2962aa' ,topColor:'#2962aa',lineWidth: 1,  
        bottomColor:'rgba(41,98, 180,0.28) '})


    // Set data
    const normalizedData: LineData[] = data.map((item) => ({
      time: item.time,
      value: item.value,
    }));
    series.setData(normalizedData);
    chart.timeScale().fitContent();

    // Cleanup
    return () => {
      chart.remove();
    };
  }, [data, width, height, theme]);

  return (
    <div style={{ position: 'relative', width, height }}>
      <div ref={containerRef} />
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          background: theme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
          color: theme === 'dark' ? '#ffffff' : '#000000',
          padding: '4px 8px',
          borderRadius: '4px',
        }}
      >
        {symbol}
      </div>
    </div>
  );
};

export default React.memo(LightweightChart);
