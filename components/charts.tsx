'use client';

import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const tooltipStyle = { backgroundColor: '#24102f', border: '1px solid #512A59', borderRadius: 12, color: '#FBE5D8' };

export function TelemetryChart({ data, xKey, lines, xLabel, yLabel, height = 280 }: { data: Record<string, unknown>[]; xKey: string; lines: { key: string; label: string; color: string }[]; xLabel?: string; yLabel?: string; height?: number }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 14, left: -12, bottom: 12 }}>
          <CartesianGrid stroke="#512A59" strokeDasharray="3 5" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fill: '#C4A9BC', fontSize: 11 }} axisLine={false} tickLine={false} label={xLabel ? { value: xLabel, position: 'insideBottom', offset: -4, fill: '#C4A9BC', fontSize: 11 } : undefined} />
          <YAxis tick={{ fill: '#C4A9BC', fontSize: 11 }} axisLine={false} tickLine={false} label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', fill: '#C4A9BC', fontSize: 11 } : undefined} />
          <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#D1A9A7' }} />
          <Legend wrapperStyle={{ color: '#C4A9BC', fontSize: 11, paddingTop: 10 }} />
          {lines.map((line) => <Line key={line.key} type="monotone" dataKey={line.key} name={line.label} stroke={line.color} strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: line.color, stroke: '#180018', strokeWidth: 2 }} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryChart({ data, height = 240 }: { data: { category: string; count: number }[]; height?: number }) {
  return <div style={{ height }} className="w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} layout="vertical" margin={{ top: 4, right: 20, left: 12, bottom: 4 }}><CartesianGrid stroke="#512A59" strokeDasharray="3 5" horizontal={false} /><XAxis type="number" allowDecimals={false} tick={{ fill: '#C4A9BC', fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis type="category" dataKey="category" width={120} tick={{ fill: '#FBE5D8', fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} /><Bar dataKey="count" name="Indexed records" fill="#D1A9A7" radius={[0, 5, 5, 0]} /></BarChart></ResponsiveContainer></div>;
}

export function ComparisonChart({ data, dataKey, label, color = '#f3b25b', height = 260 }: { data: { name: string; value: number }[]; dataKey: string; label: string; color?: string; height?: number }) {
  return <div style={{ height }} className="w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 12, right: 12, left: -12, bottom: 16 }}><CartesianGrid stroke="#512A59" strokeDasharray="3 5" vertical={false} /><XAxis dataKey="name" tick={{ fill: '#C4A9BC', fontSize: 10 }} axisLine={false} tickLine={false} interval={0} angle={-14} textAnchor="end" height={48} /><YAxis tick={{ fill: '#C4A9BC', fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} /><Bar dataKey={dataKey} name={label} fill={color} radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div>;
}
