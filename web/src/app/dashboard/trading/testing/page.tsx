'use client'// src/app/dashboard/trading/page.tsx
import LightweightChart , { ChartDataPoint } from '../../../../components/LightChart'
// Example usage
const TradingPage: React.FC = () => {
  const fakeData: ChartDataPoint[] = [
    { time: '2025-03-01', value: 80.01 },
    { time: '2025-03-02', value: 96.63 },
    { time: '2025-03-03', value: 76.64 },
    { time: '2025-03-05', value: 86.64 },
    { time: '2025-03-08', value: 46.64 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Trading Dashboard</h1>
      <LightweightChart data={fakeData} symbol="CUSTOM:MYFAKEDATA" />
    </div>
  );
};

export default TradingPage;