'use client';

import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const tooltipStyle = {
  backgroundColor: 'rgba(36, 16, 47, 0.95)',
  borderColor: '#512A59',
  borderWidth: '1px',
  borderRadius: '16px',
  color: '#FBE5D8',
  boxShadow: '0 20px 50px rgba(8, 0, 14, 0.7)',
  backdropFilter: 'blur(16px)',
  fontSize: '11px',
  fontFamily: 'IBM Plex Mono, monospace',
};

export function TelemetryChart({
  data,
  xKey,
  lines,
  xLabel,
  yLabel,
  height = 280,
}: {
  data: Record<string, unknown>[];
  xKey: string;
  lines: { key: string; label: string; color: string }[];
  xLabel?: string;
  yLabel?: string;
  height?: number;
}) {
  return (
    <div style={{ height }} className="w-full select-none">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 16, left: -10, bottom: 12 }}>
          <CartesianGrid stroke="#512A59" strokeDasharray="3 5" vertical={false} opacity={0.6} />
          <XAxis
            dataKey={xKey}
            tick={{ fill: '#C4A9BC', fontSize: 10, fontFamily: 'IBM Plex Mono, monospace' }}
            axisLine={{ stroke: '#512A59' }}
            tickLine={false}
            label={
              xLabel
                ? {
                    value: xLabel,
                    position: 'insideBottom',
                    offset: -4,
                    fill: '#C4A9BC',
                    fontSize: 10,
                    fontFamily: 'IBM Plex Mono, monospace',
                  }
                : undefined
            }
          />
          <YAxis
            tick={{ fill: '#C4A9BC', fontSize: 10, fontFamily: 'IBM Plex Mono, monospace' }}
            axisLine={{ stroke: '#512A59' }}
            tickLine={false}
            label={
              yLabel
                ? {
                    value: yLabel,
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#C4A9BC',
                    fontSize: 10,
                    fontFamily: 'IBM Plex Mono, monospace',
                  }
                : undefined
            }
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#D1A9A7', fontWeight: 600 }}
            itemStyle={{ color: '#FBE5D8' }}
          />
          <Legend
            wrapperStyle={{
              color: '#C4A9BC',
              fontSize: 10,
              fontFamily: 'IBM Plex Mono, monospace',
              paddingTop: 10,
            }}
          />
          {lines.map((line) => {
            // Strictly enforce our palette: if a line passed an old cyan/blue/green color, remap to Rose or Amber or Mauve
            let strokeColor = line.color;
            if (strokeColor.includes('57d3c7') || strokeColor.includes('cyan')) {
              strokeColor = '#D1A9A7'; // Stellar Rose
            } else if (strokeColor.includes('C28DAF') || strokeColor.includes('blue')) {
              strokeColor = '#7F5276'; // Dusty Mauve
            }

            return (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                name={line.label}
                stroke={strokeColor}
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: strokeColor,
                  stroke: '#180018',
                  strokeWidth: 2,
                }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryChart({
  data,
  height = 240,
}: {
  data: { category: string; count: number }[];
  height?: number;
}) {
  return (
    <div style={{ height }} className="w-full select-none">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 6, right: 20, left: 14, bottom: 6 }}
        >
          <CartesianGrid stroke="#512A59" strokeDasharray="3 5" horizontal={false} opacity={0.6} />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fill: '#C4A9BC', fontSize: 10, fontFamily: 'IBM Plex Mono, monospace' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="category"
            width={130}
            tick={{ fill: '#FBE5D8', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#D1A9A7' }}
          />
          <Bar
            dataKey="count"
            name="Indexed records"
            fill="#D1A9A7"
            radius={[0, 6, 6, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ComparisonChart({
  data,
  dataKey,
  label,
  color = '#F3A65B',
  height = 260,
}: {
  data: { name: string; value: number }[];
  dataKey: string;
  label: string;
  color?: string;
  height?: number;
}) {
  const safeColor = color.includes('cyan') ? '#D1A9A7' : color;

  return (
    <div style={{ height }} className="w-full select-none">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 12, right: 12, left: -10, bottom: 20 }}
        >
          <CartesianGrid stroke="#512A59" strokeDasharray="3 5" vertical={false} opacity={0.6} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#C4A9BC', fontSize: 10, fontFamily: 'IBM Plex Mono, monospace' }}
            axisLine={{ stroke: '#512A59' }}
            tickLine={false}
            interval={0}
            angle={-14}
            textAnchor="end"
            height={48}
          />
          <YAxis
            tick={{ fill: '#C4A9BC', fontSize: 10, fontFamily: 'IBM Plex Mono, monospace' }}
            axisLine={{ stroke: '#512A59' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#D1A9A7' }}
          />
          <Bar
            dataKey={dataKey}
            name={label}
            fill={safeColor}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
