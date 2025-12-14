'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Euro, TrendingUp, Plane, Users, FileText, Download } from 'lucide-react';

const budgetData = {
  total: 45000,
  used: 28500,
  travel: 12000,
  accommodation: 8500,
  activities: 5000,
  other: 3000,
};

const travelExpenses = [
  { id: 1, participant: 'Jan Kowalski', country: '🇵🇱', amount: 250, event: 'Cultural Bridges' },
  { id: 2, participant: 'Maria García', country: '🇪🇸', amount: 380, event: 'Cultural Bridges' },
  { id: 3, participant: 'Hans Müller', country: '🇩🇪', amount: 180, event: 'Cultural Bridges' },
];

export default function OrganizationBudgetPage() {
  const usedPercentage = (budgetData.used / budgetData.total) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Budżet</h1>
          <p className="text-muted-foreground">Zarządzanie finansami projektów Erasmus+</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Eksportuj raport
        </Button>
      </div>

      {/* Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Całkowity budżet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{budgetData.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">przyznany</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Wykorzystano</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">€{budgetData.used.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{usedPercentage.toFixed(0)}% budżetu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pozostało</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">€{(budgetData.total - budgetData.used).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">do wykorzystania</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Podróże</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{budgetData.travel.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">koszty transportu</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Wykorzystanie budżetu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Ogółem</span>
              <span className="text-sm font-medium">{usedPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={usedPercentage} className="h-3" />
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Plane className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Podróże</span>
              </div>
              <p className="text-lg font-semibold">€{budgetData.travel.toLocaleString()}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="text-sm">Zakwaterowanie</span>
              </div>
              <p className="text-lg font-semibold">€{budgetData.accommodation.toLocaleString()}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm">Aktywności</span>
              </div>
              <p className="text-lg font-semibold">€{budgetData.activities.toLocaleString()}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Inne</span>
              </div>
              <p className="text-lg font-semibold">€{budgetData.other.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Koszty podróży uczestników</CardTitle>
          <CardDescription>Ostatnie rozliczenia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {travelExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{expense.country}</span>
                  <div>
                    <p className="font-medium">{expense.participant}</p>
                    <p className="text-sm text-muted-foreground">{expense.event}</p>
                  </div>
                </div>
                <Badge variant="outline">€{expense.amount}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

