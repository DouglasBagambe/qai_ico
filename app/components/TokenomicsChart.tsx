/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Pie } from "recharts";

const TokenomicsChart = () => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const tokenomicsData = [
    { name: "Presale", value: 20, color: "#DC3545" },
    { name: "Team", value: 10, color: "#6F42C1" },
    { name: "Staff", value: 5, color: "#B8860B" },
    { name: "Manual Burning", value: 10, color: "#E83E8C" },
    { name: "Game", value: 10, color: "#20B2AA" },
    { name: "Liquidity", value: 15, color: "#28A745" },
    { name: "Development", value: 5, color: "#28A745", labelOffset: 20 },
    { name: "Nft", value: 10, color: "#DDA0DD" },
    { name: "Charity", value: 5, color: "#90EE90" },
    { name: "Development of future project", value: 10, color: "#DEB887" },
  ];

  // Calculate the cumulative angles for label positioning
  const total = tokenomicsData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const segments = tokenomicsData.map((item) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    const midAngle = startAngle + angle / 2;
    const radius = 180; // Reduced from 200
    const labelRadius = 230; // Reduced from 260

    // Calculate label position
    const labelX = Math.cos((midAngle - 90) * (Math.PI / 180)) * labelRadius;
    const labelY = Math.sin((midAngle - 90) * (Math.PI / 180)) * labelRadius;

    // Calculate arc path
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (startAngle + angle - 90) * (Math.PI / 180);
    const x1 = Math.cos(startRad) * radius;
    const y1 = Math.sin(startRad) * radius;
    const x2 = Math.cos(endRad) * radius;
    const y2 = Math.sin(endRad) * radius;

    const largeArcFlag = angle > 180 ? 1 : 0;

    return {
      ...item,
      path: `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
      labelX,
      labelY,
      startAngle,
      angle,
    };
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {" "}
      {/* Reduced max-width and padding */}
      <div className="relative">
        <svg
          viewBox="-280 -280 560 560" // Reduced from -300 -300 600 600
          className="w-full transform transition-transform duration-500 hover:scale-105"
        >
          {/* Segments */}
          {segments.map((segment, index) => (
            <g key={segment.name}>
              <path
                d={segment.path}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
                onMouseEnter={() => setActiveSegment(index)}
                onMouseLeave={() => setActiveSegment(null)}
                className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                transform={activeSegment === index ? `scale(1.05)` : ""}
              />

              {/* Label lines */}
              <line
                x1={
                  Math.cos(
                    (segment.startAngle + segment.angle / 2 - 90) *
                      (Math.PI / 180)
                  ) * 180
                } // Reduced from 200
                y1={
                  Math.sin(
                    (segment.startAngle + segment.angle / 2 - 90) *
                      (Math.PI / 180)
                  ) * 180
                } // Reduced from 200
                x2={segment.labelX}
                y2={segment.labelY}
                stroke="white"
                strokeWidth="1"
                className="opacity-70"
              />

              {/* Labels */}
              <g transform={`translate(${segment.labelX}, ${segment.labelY})`}>
                <text
                  textAnchor={segment.labelX > 0 ? "start" : "end"}
                  alignmentBaseline="middle"
                  fill="white"
                  className="text-xs" // Reduced from text-sm
                >
                  {segment.name}: {segment.value}%
                </text>
              </g>
            </g>
          ))}
        </svg>
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
        {" "}
        {/* Reduced gap and margin */}
        {tokenomicsData.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center space-x-2 cursor-pointer transition-all duration-300 hover:scale-105"
            onMouseEnter={() => setActiveSegment(index)}
            onMouseLeave={() => setActiveSegment(null)}
          >
            <div
              className="w-3 h-3 rounded-full" // Reduced from w-4 h-4
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-white">{item.name}</span>{" "}
            {/* Reduced from text-sm */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenomicsChart;
