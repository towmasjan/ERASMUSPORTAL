'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Download, FileText, Calendar, Users, Euro, TrendingUp } from 'lucide-react';

const reports = [
  { id: 1, name: 'Raport miesięczny - Grudzień 2024', type: 'monthly', date: '01.12.2024', size: '2.4 MB' },
  { id: 2, name: 'Raport finansowy Q4 2024', type: 'financial', date: '30.11.2024', size: '1.8 MB' },
  { id: 3, name: 'Statystyki uczestników 2024', type: 'participants', date: '15.11.2024', size: '3.1 MB' },
];

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Raporty</h1>
        <p className="text-slate-400">Generowanie i pobieranie raportów platformy</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-600/20">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Wydarzeń w 2024</p>
                <p className="text-2xl font-bold text-white">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-600/20">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Uczestników</p>
                <p className="text-2xl font-bold text-white">856</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-600/20">
                <Euro className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Budżet 2024</p>
                <p className="text-2xl font-bold text-white">€245K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-600/20">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Wzrost r/r</p>
                <p className="text-2xl font-bold text-white">+34%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generate Report */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Generuj raport</CardTitle>
          <CardDescription className="text-slate-400">Wybierz typ raportu do wygenerowania</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <BarChart3 className="w-4 h-4 mr-2" />
              Raport miesięczny
            </Button>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Euro className="w-4 h-4 mr-2" />
              Raport finansowy
            </Button>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Users className="w-4 h-4 mr-2" />
              Statystyki uczestników
            </Button>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Calendar className="w-4 h-4 mr-2" />
              Podsumowanie wydarzeń
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Ostatnie raporty</CardTitle>
          <CardDescription className="text-slate-400">Pobierz wygenerowane raporty</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-slate-700">
                    <FileText className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{report.name}</p>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                  <Download className="w-4 h-4 mr-2" />
                  Pobierz
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

