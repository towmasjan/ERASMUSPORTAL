'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Download, 
  FileText, 
  TrendingUp,
  Users,
  Euro,
  Calendar,
  PieChart
} from 'lucide-react';

const reports = [
  {
    name: 'Participant Summary',
    description: 'Overview of all participants by country and organization',
    type: 'PDF',
    lastGenerated: '2 days ago',
    icon: Users,
  },
  {
    name: 'Budget Report',
    description: 'Travel costs and budget allocation breakdown',
    type: 'Excel',
    lastGenerated: '1 week ago',
    icon: Euro,
  },
  {
    name: 'Event Timeline',
    description: 'Gantt chart of all events and milestones',
    type: 'PDF',
    lastGenerated: '3 days ago',
    icon: Calendar,
  },
  {
    name: 'Country Distribution',
    description: 'Participants and organizations per country',
    type: 'PDF',
    lastGenerated: '5 days ago',
    icon: PieChart,
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            Generate and download reports for your Erasmus+ projects
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <FileText className="w-4 h-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reports Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="w-3 h-3" />
              +6 this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 days ago</div>
            <p className="text-xs text-muted-foreground">Participant Summary</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Auto-generated monthly</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Click to generate and download reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.name}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <report.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{report.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {report.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last generated: {report.lastGenerated}
                  </p>
                </div>
                <Button variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

