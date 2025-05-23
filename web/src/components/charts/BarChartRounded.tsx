import React, { useEffect, useState, useRef } from 'react';

// Using the provided interface
interface BarChartComponentProps {
  title?: string;
  data: number[];
  labels: string[] | number[];
  maxValue?: number;
  barWidth?: number;
  barRadius?: number;
  activeBar?: string;
  backgroundColor?: string;
  backgroundBarColor?: string;
  color?: string;
  tooltip?: string;
  valueBarStartColor?: string;
  valueBarEndColor?: string;
}
export
const BarChartComponent: React.FC<BarChartComponentProps> = ({
  title = "Weekly Performance",
  data,
  labels,
  maxValue = 100,
  barWidth = 18,
  barRadius = 10,
  activeBar = "Sat",
  backgroundColor = "#000000",
  backgroundBarColor = "rgba(68, 68, 68, 0.44)",
  color,
  tooltip,
  valueBarStartColor = "#0066FF",
  valueBarEndColor = "#00A3FF"
}) => {
  // Use the provided color or fallback to gradient
  const useGradient = !color;
  
  // Chart dimensions
  const chartHeight = 180;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [tooltipInfo, setTooltipInfo] = useState<{ visible: boolean, x: number, y: number, value: number, label: string }>({
    visible: false, x: 0, y: 0, value: 0, label: ''
  });

  // Create a gradient ID that's unique to this component instance
  const gradientId = `barGradient-${Math.random().toString(36).substr(2, 9)}`;

  // Calculate bar positions and spacing when container width changes
  useEffect(() => {
    if (containerRef.current) {
      const updateWidth = () => {
        setContainerWidth(containerRef.current?.clientWidth || 0);
      };
      
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  // Check that data and labels have same length
  if (data.length !== labels.length) {
    console.error('Data and labels arrays must have the same length');
    return null;
  }

  // Calculate spacing between bars
  const barCount = data.length;
  const totalBarWidth = barCount * barWidth;
  const spacing = containerWidth > 0 ? (containerWidth - totalBarWidth) / (barCount + 1) : 30;
  
  // Handle tooltip show/hide
  const handleMouseEnter = (value: number, label: string | number, x: number, y: number) => {
    if (tooltip) {
      setTooltipInfo({
        visible: true,
        x,
        y,
        value,
        label: typeof label === 'string' ? label : label.toString()
      });
    }
  };
  
  const handleMouseLeave = () => {
    if (tooltip) {
      setTooltipInfo({ ...tooltipInfo, visible: false });
    }
  };
  
  return (<div  className={"flex flex-col w-full h-full rounded-xl border-neutral-900"}>
      <div 
        className="rounded-3xl border overflow-hidden" 
        style={{ backgroundColor, borderColor: backgroundColor }}
      >
        {/* Card Header */}
        {title && (
          <div className="px-6 pt-2">
            <div className="flex items-center">
              <h2 className="text-sm font-medium text-white">{title}</h2>
            </div>
          </div>
        )}
        
        {/* Card Body */}
        <div className="flex-grow p-4 sm:p-6 relative">
          <div ref={containerRef} className="w-full">
            {containerWidth > 0 && (
              <>
                {/* SVG Chart */}
                <svg width="100%" height={chartHeight + 30}>
                  {/* Define gradient for bars */}
                  {useGradient && (
                    <defs>
                      <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={valueBarEndColor} />
                        <stop offset="100%" stopColor={valueBarStartColor} />
                      </linearGradient>
                    </defs>
                  )}
                  
                  {/* Render bars */}
                  {data.map((value, index) => {
                    const label = labels[index];
                    const x = spacing + index * (barWidth + spacing);
                    const backgroundHeight = chartHeight;
                    const valueHeight = (value / maxValue) * chartHeight;
                    const barFill = useGradient ? `url(#${gradientId})` : color || "#0066FF";
                    const isActive = label.toString() === activeBar;
                    
                    return (
                      <g 
                        key={index}
                        onMouseEnter={() => handleMouseEnter(value, label, x + barWidth / 2, backgroundHeight - valueHeight)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Background bar */}
                        <rect
                          x={x}
                          y={0}
                          width={barWidth}
                          height={backgroundHeight}
                          rx={barRadius}
                          ry={barRadius}
                          fill={backgroundBarColor}
                        />
                        
                        {/* Value bar */}
                        <rect
                          x={x}
                          y={backgroundHeight - valueHeight}
                          width={barWidth}
                          height={valueHeight}
                          rx={barRadius}
                          ry={barRadius}
                          fill={barFill}
                        />
                        
                        {/* Label */}
                        <text
                          x={x + barWidth / 2}
                          y={chartHeight + 20}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          opacity={isActive ? 1 : 0.5}
                          fontSize="11"
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                
                {/* Tooltip */}
                {tooltip && tooltipInfo.visible && (
                  <div 
                    className="absolute bg-white text-black px-2 py-1 rounded text-sm"
                    style={{
                      left: tooltipInfo.x,
                      top: tooltipInfo.y - 30,
                      transform: 'translateX(-50%)',
                      pointerEvents: 'none'
                    }}
                  >
                    {tooltip.replace('{value}', tooltipInfo.value.toString())
                           .replace('{label}', tooltipInfo.label)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Card Footer (empty in the design) */}
        <div className="px-6 py-2"></div>
      </div>
    </div>
  );
};
