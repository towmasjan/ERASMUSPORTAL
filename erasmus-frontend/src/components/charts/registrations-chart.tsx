'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface RegistrationData {
  date: string;
  registrations: number;
  accepted: number;
}

interface RegistrationsChartProps {
  data?: RegistrationData[];
  title?: string;
  description?: string;
}

// Mock data for demo
const mockData: RegistrationData[] = [
  { date: '1 Gru', registrations: 4, accepted: 2 },
  { date: '2 Gru', registrations: 7, accepted: 5 },
  { date: '3 Gru', registrations: 5, accepted: 3 },
  { date: '4 Gru', registrations: 12, accepted: 8 },
  { date: '5 Gru', registrations: 8, accepted: 6 },
  { date: '6 Gru', registrations: 15, accepted: 10 },
  { date: '7 Gru', registrations: 10, accepted: 8 },
  { date: '8 Gru', registrations: 18, accepted: 14 },
  { date: '9 Gru', registrations: 14, accepted: 11 },
  { date: '10 Gru', registrations: 22, accepted: 18 },
  { date: '11 Gru', registrations: 16, accepted: 12 },
  { date: '12 Gru', registrations: 25, accepted: 20 },
  { date: '13 Gru', registrations: 20, accepted: 16 },
  { date: '14 Gru', registrations: 28, accepted: 22 },
];

export function RegistrationsChart({
  data = mockData,
  title = 'Rejestracje w czasie',
  description = 'Liczba aplikacji w ostatnich 14 dniach',
}: RegistrationsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="registrations"
                name="Aplikacje"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="accepted"
                name="Zaakceptowane"
                stroke="hsl(142.1 76.2% 36.3%)"
                strokeWidth={2}
                dot={{ fill: 'hsl(142.1 76.2% 36.3%)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

