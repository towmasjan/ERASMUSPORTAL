'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/lib/user-context';
import { RegistrationsChart } from '@/components/charts/registrations-chart';
import { CountriesChart } from '@/components/charts/countries-chart';
import { BudgetChart } from '@/components/charts/budget-chart';
import Link from 'next/link';
import {
  Calendar,
  Users,
  Building2,
  Euro,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const myEvents = [
  { id: 1, name: 'Cultural Bridges 2025', date: '15-22 sty 2025', participants: 32, maxParticipants: 40, status: 'active', pending: 5 },
  { id: 2, name: 'Green Future Youth', date: '10-17 mar 2025', participants: 18, maxParticipants: 35, status: 'active', pending: 3 },
  { id: 3, name: 'Youth Media Lab', date: '12-19 maj 2025', participants: 10, maxParticipants: 30, status: 'draft', pending: 0 },
];

const recentApplications = [
  { id: 1, name: 'Jan Kowalski', event: 'Cultural Bridges 2025', country: '🇵🇱', time: '2 godz. temu' },
  { id: 2, name: 'Maria García', event: 'Cultural Bridges 2025', country: '🇪🇸', time: '5 godz. temu' },
  { id: 3, name: 'Hans Müller', event: 'Green Future Youth', country: '🇩🇪', time: '1 dzień temu' },
  { id: 4, name: 'Sophie Dubois', event: 'Cultural Bridges 2025', country: '🇫🇷', time: '2 dni temu' },
];

export default function OrganizationDashboard() {
  const { user } = useUser();

  const totalParticipants = myEvents.reduce((sum, e) => sum + e.participants, 0);
  const totalPending = myEvents.reduce((sum, e) => sum + e.pending, 0);
  const activeEvents = myEvents.filter(e => e.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Witaj, {user?.organizationName || 'Organizacja'} 🏢
          </h1>
          <p className="text-muted-foreground">
            Zarządzaj wydarzeniami i uczestnikami Erasmus+
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/organization/events">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Moje wydarzenia
            </Button>
          </Link>
          <Link href="/organization/events/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nowe wydarzenie
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Aktywne wydarzenia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeEvents}</div>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +1 w tym miesiącu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Uczestnicy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalParticipants}</div>
            <p className="text-xs text-muted-foreground">zaakceptowanych</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Oczekujące
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{totalPending}</div>
            <p className="text-xs text-muted-foreground">aplikacje do rozpatrzenia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Euro className="w-4 h-4" />
              Budżet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">€19,500</div>
            <p className="text-xs text-emerald-600">€7,400 pozostało</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert for pending applications */}
      {totalPending > 0 && (
        <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Masz {totalPending} oczekujących aplikacji</h3>
                <p className="text-sm text-muted-foreground">
                  Rozpatrz zgłoszenia, aby uczestnicy mogli przygotować się do wymiany
                </p>
              </div>
              <Link href="/organization/participants?status=pending">
                <Button variant="outline">
                  Rozpatrz teraz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RegistrationsChart />
        <CountriesChart />
      </div>

      {/* Budget Chart */}
      <BudgetChart />

      {/* Events and Applications */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Moje wydarzenia</CardTitle>
              <CardDescription>Twoje wymiany młodzieżowe</CardDescription>
            </div>
            <Link href="/organization/events">
              <Button variant="ghost" size="sm">
                Wszystkie <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{event.name}</h4>
                        {event.pending > 0 && (
                          <Badge variant="secondary" className="text-amber-600">
                            {event.pending} nowych
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.participants}/{event.maxParticipants}
                        </span>
                      </div>
                    </div>
                    <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                      {event.status === 'active' ? (
                        <><CheckCircle2 className="w-3 h-3 mr-1" />Aktywne</>
                      ) : (
                        <><Clock className="w-3 h-3 mr-1" />Szkic</>
                      )}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Ostatnie aplikacje</CardTitle>
              <CardDescription>Nowe zgłoszenia uczestników</CardDescription>
            </div>
            <Link href="/organization/participants">
              <Button variant="ghost" size="sm">
                Wszystkie <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <span className="text-2xl">{app.country}</span>
                  <div className="flex-1">
                    <h4 className="font-medium">{app.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{app.event}</span>
                      <span>•</span>
                      <span>{app.time}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Rozpatrz</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Szybkie akcje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Link href="/organization/events/new">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <Plus className="w-5 h-5" />
                <span>Nowe wydarzenie</span>
              </Button>
            </Link>
            <Link href="/organization/partners">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <Building2 className="w-5 h-5" />
                <span>Dodaj partnera</span>
              </Button>
            </Link>
            <Link href="/organization/participants">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <Users className="w-5 h-5" />
                <span>Uczestnicy</span>
              </Button>
            </Link>
            <Link href="/organization/budget">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <Euro className="w-5 h-5" />
                <span>Zarządzaj budżetem</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
