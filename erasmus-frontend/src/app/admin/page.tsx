'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/lib/user-context';
import Link from 'next/link';
import {
  Calendar,
  Users,
  Building2,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Globe,
  Euro,
} from 'lucide-react';

const stats = {
  totalEvents: 24,
  activeEvents: 8,
  totalOrganizations: 47,
  pendingOrganizations: 3,
  totalParticipants: 856,
  totalBudget: '€245,000',
  countries: 28,
};

const pendingApprovals = [
  { id: 1, type: 'organization', name: 'Youth Alliance Hungary', country: '🇭🇺', date: '2 godz. temu' },
  { id: 2, type: 'event', name: 'Eco Warriors Summit', org: 'Green Youth Poland', date: '5 godz. temu' },
  { id: 3, type: 'organization', name: 'Nordic Youth Council', country: '🇸🇪', date: '1 dzień temu' },
];

const recentActivity = [
  { id: 1, action: 'Nowe wydarzenie', detail: 'Cultural Bridges 2025', time: '10 min temu', type: 'event' },
  { id: 2, action: 'Nowa organizacja', detail: 'Youth Center Berlin', time: '2 godz. temu', type: 'org' },
  { id: 3, action: 'Aplikacja zaakceptowana', detail: 'Maria García → Green Future', time: '3 godz. temu', type: 'user' },
];

export default function AdminDashboard() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl p-6 border border-red-600/30">
        <h1 className="text-2xl font-bold mb-2 text-white">
          Panel SuperAdmina 🛡️
        </h1>
        <p className="text-slate-300">
          Pełna kontrola nad platformą Erasmus+ Youth Exchange
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Wydarzenia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalEvents}</div>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {stats.activeEvents} aktywnych
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Organizacje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalOrganizations}</div>
            <p className="text-xs text-yellow-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {stats.pendingOrganizations} do weryfikacji
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Uczestnicy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalParticipants}</div>
            <p className="text-xs text-slate-400">zarejestrowanych</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Kraje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.countries}</div>
            <p className="text-xs text-slate-400">państw UE</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Approvals */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Do zatwierdzenia
              </CardTitle>
              <CardDescription className="text-slate-400">
                Organizacje i wydarzenia wymagające weryfikacji
              </CardDescription>
            </div>
            <Link href="/admin/moderation">
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                Wszystkie <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={item.type === 'organization' ? 'secondary' : 'default'} className="text-xs">
                        {item.type === 'organization' ? 'Organizacja' : 'Wydarzenie'}
                      </Badge>
                      <span className="text-xs text-slate-500">{item.date}</span>
                    </div>
                    <h4 className="font-medium text-white mt-1">{item.name}</h4>
                    {item.country && <span className="text-sm text-slate-400">{item.country}</span>}
                    {item.org && <span className="text-sm text-slate-400">{item.org}</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      ✕
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Ostatnia aktywność</CardTitle>
            <CardDescription className="text-slate-400">
              Najnowsze działania na platformie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50">
                  <div className={`w-2 h-2 rounded-full ${
                    item.type === 'event' ? 'bg-blue-500' :
                    item.type === 'org' ? 'bg-purple-500' : 'bg-emerald-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.action}</p>
                    <p className="text-xs text-slate-400">{item.detail}</p>
                  </div>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Szybkie akcje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/events">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Calendar className="w-4 h-4 mr-2" />
                Zarządzaj wydarzeniami
              </Button>
            </Link>
            <Link href="/admin/organizations">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Building2 className="w-4 h-4 mr-2" />
                Weryfikuj organizacje
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Users className="w-4 h-4 mr-2" />
                Zarządzaj użytkownikami
              </Button>
            </Link>
            <Link href="/admin/reports">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Euro className="w-4 h-4 mr-2" />
                Generuj raporty
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

