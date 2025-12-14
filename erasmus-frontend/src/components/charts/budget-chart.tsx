'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface BudgetData {
  event: string;
  budget: number;
  spent: number;
}

interface BudgetChartProps {
  data?: BudgetData[];
  totalBudget?: number;
  totalSpent?: number;
  title?: string;
  description?: string;
}

// Mock data for demo
const mockData: BudgetData[] = [
  { event: 'Cultural Bridges', budget: 8000, spent: 5200 },
  { event: 'Green Future', budget: 6000, spent: 2800 },
  { event: 'Digital Skills', budget: 5500, spent: 4100 },
];

export function BudgetChart({
  data = mockData,
  totalBudget = 19500,
  totalSpent = 12100,
  title = 'Budżet podróży',
  description = 'Wykorzystanie budżetu na koszty podróży uczestników',
}: BudgetChartProps) {
  const percentUsed = Math.round((totalSpent / totalBudget) * 100);
  const remaining = totalBudget - totalSpent;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Total Budget Summary */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Wykorzystano: €{totalSpent.toLocaleString()}</span>
            <span className="text-muted-foreground">z €{totalBudget.toLocaleString()}</span>
          </div>
          <Progress value={percentUsed} className="h-3" />
          <div className="flex justify-between text-xs mt-1">
            <span className="text-muted-foreground">{percentUsed}% wykorzystane</span>
            <span className="text-emerald-600 font-medium">€{remaining.toLocaleString()} pozostało</span>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis type="number" tickFormatter={(value) => `€${value}`} />
              <YAxis dataKey="event" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `€${value.toLocaleString()}`,
                  name === 'spent' ? 'Wydane' : 'Budżet',
                ]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="budget" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} name="Budżet" />
              <Bar dataKey="spent" radius={[0, 4, 4, 0]} name="Wydane">
                {data.map((entry, index) => {
                  const percent = (entry.spent / entry.budget) * 100;
                  let color = 'hsl(142.1 76.2% 36.3%)'; // green
                  if (percent > 90) color = 'hsl(0 84.2% 60.2%)'; // red
                  else if (percent > 70) color = 'hsl(38 92% 50%)'; // amber
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-muted" />
            <span>Budżet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span>&lt;70%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-500" />
            <span>70-90%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span>&gt;90%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

