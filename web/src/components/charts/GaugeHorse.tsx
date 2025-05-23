import React from 'react';

// Define the types for our component
interface ScoreGaugeDataType {
  score: number;
  maxScore: number;
  label: string;
  description: string;
}

// Separate data model
const ScoreGaugeData: ScoreGaugeDataType = {
  score: 98,
  maxScore: 100,
  label: "YOUR SCORE",
  description: "By completing the bundle of dividend-yielding stocks, you'll finalize the process."
};

interface ScoreGaugeProps {
  data?: ScoreGaugeDataType;
}

const GaugeHorse: React.FC<ScoreGaugeProps> = ({ data = ScoreGaugeData }) => {
  const { score, maxScore, label, description } = data;
  
  // SVG parameters
  const size = 240;
  const strokeWidth = 16;
  const radius = (size / 2) - (strokeWidth / 2);
  
  // Calculate the percentage for the arc
  const percentage = (score / maxScore);
  
  // Arc parameters - almost full circle (about 270 degrees)
  const startAngle = 135; // degrees
  const endAngle = 405; // degrees (135 + 270)
  const angleRange = endAngle - startAngle;
  
  // Calculate SVG arc path
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number): { x: number; y: number } => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };
  
  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number): string => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };
  
  // Calculate the arcs paths
  const fullArcPath = describeArc(size/2, size/2, radius, startAngle, endAngle);
  const progressArcPath = describeArc(size/2, size/2, radius, startAngle, startAngle + (angleRange * percentage));
  
  // Generate tick marks on the right side
  const generateTicks = (): React.ReactNode[] => {
    const ticks: React.ReactNode[] = [];
    const tickCount = 8;
    
    // Only create ticks for the right quarter of the circle (from ~2 o'clock to ~4 o'clock)
    const tickStartAngle = 30;
    const tickEndAngle = 60;
    const tickRange = tickEndAngle - tickStartAngle;
    
    for (let i = 0; i < tickCount; i++) {
      const angle = tickStartAngle + (i / (tickCount - 1)) * tickRange;
      const radians = (angle) * (Math.PI / 180);
      
      const outerRadius = radius + 5;
      const innerRadius = radius - 2;
      
      const x1 = size / 2 + outerRadius * Math.cos(radians);
      const y1 = size / 2 + outerRadius * Math.sin(radians);
      const x2 = size / 2 + innerRadius * Math.cos(radians);
      const y2 = size / 2 + innerRadius * Math.sin(radians);
      
      ticks.push(
        <line 
          key={i} 
          x1={x1} 
          y1={y1} 
          x2={x2} 
          y2={y2} 
          stroke="#444"
          strokeWidth="1.5"
          opacity="0.7"
        />
      );
    }
    
    return ticks;
  };
  
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-xs rounded-xl overflow-hidden bg-black text-white p-4">
        <div className="flex flex-col items-center">
          <div className="relative">
            <svg 
              width={size} 
              height={size} 
              viewBox={`0 0 ${size} ${size}`}
              className="transform -rotate-90"
            >
              {/* Background arc (dark gray) */}
              <path
                d={fullArcPath}
                fill="none"
                stroke="#333"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              {/* Foreground arc (blue) */}
              <path
                d={progressArcPath}
                fill="none"
                stroke="#0077ff"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              {/* Tick marks */}
              <g className="transform rotate-90">
                {generateTicks()}
              </g>
            </svg>
            
            {/* Center text content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl font-bold">{score}</div>
              <div className="text-blue-500 font-medium tracking-wide text-lg mt-1">{label}</div>
            </div>
          </div>
          
          {/* Description text */}
          <p className="text-center mt-2 text-sm mx-6">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GaugeHorse;