'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CountryData {
  name: string;
  value: number;
  flag: string;
  color: string;
}

interface CountriesChartProps {
  data?: CountryData[];
  title?: string;
  description?: string;
}

// Mock data for demo
const mockData: CountryData[] = [
  { name: 'Polska', value: 12, flag: '🇵🇱', color: '#DC143C' },
  { name: 'Niemcy', value: 8, flag: '🇩🇪', color: '#000000' },
  { name: 'Hiszpania', value: 7, flag: '🇪🇸', color: '#FF6B35' },
  { name: 'Francja', value: 6, flag: '🇫🇷', color: '#002395' },
  { name: 'Włochy', value: 5, flag: '🇮🇹', color: '#009246' },
  { name: 'Portugalia', value: 4, flag: '🇵🇹', color: '#006600' },
  { name: 'Inne', value: 8, flag: '🇪🇺', color: '#003399' },
];

const COLORS = ['#003399', '#FFD700', '#DC143C', '#002395', '#009246', '#006600', '#8B8B8B'];

export function CountriesChart({
  data = mockData,
  title = 'Uczestnicy według krajów',
  description = 'Rozkład uczestników z poszczególnych krajów',
}: CountriesChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.08) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={100}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value} (${((value / total) * 100).toFixed(1)}%)`,
                  name,
                ]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend
                formatter={(value, entry) => {
                  const item = data.find((d) => d.name === value);
                  return (
                    <span className="text-sm">
                      {item?.flag} {value}
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-sm text-muted-foreground">łączna liczba uczestników</p>
        </div>
      </CardContent>
    </Card>
  );
}

