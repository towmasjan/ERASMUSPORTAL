'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/lib/user-context';
import Link from 'next/link';
import {
  Calendar,
  FileText,
  Award,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2,
  Plane,
} from 'lucide-react';

// Mock data
const myApplications = [
  {
    id: 1,
    eventName: 'Cultural Bridges 2025',
    location: 'Warszawa, Polska',
    date: '15-22 stycznia 2025',
    status: 'pending',
  },
  {
    id: 2,
    eventName: 'Green Future Youth',
    location: 'Lizbona, Portugalia',
    date: '5-12 lutego 2025',
    status: 'accepted',
  },
];

const upcomingEvents = [
  {
    id: 3,
    name: 'Digital Skills Workshop',
    location: 'Berlin, Niemcy',
    date: '10-17 marca 2025',
    spots: 6,
  },
  {
    id: 4,
    name: 'Active Citizenship Camp',
    location: 'Rzym, Włochy',
    date: '1-8 kwietnia 2025',
    spots: 15,
  },
];

export default function ParticipantDashboard() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-2">
          Witaj, {user?.firstName || user?.name || 'Uczestniku'}! 👋
        </h1>
        <p className="text-muted-foreground">
          Przeglądaj dostępne wymiany i zarządzaj swoimi aplikacjami.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Moje aplikacje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myApplications.length}</div>
            <p className="text-xs text-muted-foreground">aktywne</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Zaakceptowane</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {myApplications.filter(a => a.status === 'accepted').length}
            </div>
            <p className="text-xs text-muted-foreground">wymian</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Certyfikaty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Youthpass</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Moje aplikacje
              </CardTitle>
              <CardDescription>Status Twoich zgłoszeń</CardDescription>
            </div>
            <Link href="/participant/applications">
              <Button variant="ghost" size="sm">
                Zobacz wszystkie <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myApplications.map((app) => (
                <div key={app.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <h4 className="font-medium">{app.eventName}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {app.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {app.date}
                      </span>
                    </div>
                  </div>
                  <Badge variant={app.status === 'accepted' ? 'default' : 'secondary'}>
                    {app.status === 'accepted' ? (
                      <><CheckCircle2 className="w-3 h-3 mr-1" />Zaakceptowano</>
                    ) : (
                      <><Clock className="w-3 h-3 mr-1" />Oczekuje</>
                    )}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-secondary" />
                Polecane wymiany
              </CardTitle>
              <CardDescription>Wymiany dla Ciebie</CardDescription>
            </div>
            <Link href="/events">
              <Button variant="ghost" size="sm">
                Wszystkie <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium">{event.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                    </div>
                  </div>
                  <Link href={`/events/${event.id}`}>
                    <Button size="sm">Aplikuj</Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

