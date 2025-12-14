'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Clock, CheckCircle2, XCircle } from 'lucide-react';

const applications = [
  {
    id: 1,
    eventName: 'Cultural Bridges 2025',
    eventId: 1,
    location: 'Warszawa, Polska',
    date: '15-22 stycznia 2025',
    appliedAt: '5 grudnia 2024',
    status: 'pending',
    countries: ['🇵🇱', '🇩🇪', '🇪🇸', '🇮🇹'],
  },
  {
    id: 2,
    eventName: 'Green Future Youth',
    eventId: 2,
    location: 'Lizbona, Portugalia',
    date: '5-12 lutego 2025',
    appliedAt: '28 listopada 2024',
    status: 'accepted',
    countries: ['🇵🇹', '🇵🇱', '🇳🇱', '🇸🇪'],
  },
  {
    id: 3,
    eventName: 'Digital Skills Summit',
    eventId: 3,
    location: 'Berlin, Niemcy',
    date: '1-5 marca 2024',
    appliedAt: '10 stycznia 2024',
    status: 'rejected',
    countries: ['🇩🇪', '🇫🇷', '🇵🇱'],
  },
];

export default function ApplicationsPage() {
  const pending = applications.filter((a) => a.status === 'pending');
  const accepted = applications.filter((a) => a.status === 'accepted');
  const rejected = applications.filter((a) => a.status === 'rejected');

  const renderApplication = (app: typeof applications[0]) => (
    <Card key={app.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={
                  app.status === 'accepted'
                    ? 'default'
                    : app.status === 'rejected'
                    ? 'destructive'
                    : 'secondary'
                }
              >
                {app.status === 'accepted' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                {app.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                {app.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                {app.status === 'accepted' ? 'Zaakceptowano' : app.status === 'rejected' ? 'Odrzucono' : 'Oczekuje'}
              </Badge>
              <span className="text-xs text-muted-foreground">Złożono: {app.appliedAt}</span>
            </div>
            <h3 className="font-semibold text-lg">{app.eventName}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {app.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {app.date}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {app.countries.map((flag, i) => (
                <span key={i} className="text-lg">{flag}</span>
              ))}
            </div>
          </div>
          <Link href={`/events/${app.eventId}`}>
            <Button variant="outline" size="sm">
              Szczegóły <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Moje aplikacje</h1>
        <p className="text-muted-foreground">Śledź status swoich zgłoszeń na wymiany</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Wszystkie ({applications.length})</TabsTrigger>
          <TabsTrigger value="pending">Oczekujące ({pending.length})</TabsTrigger>
          <TabsTrigger value="accepted">Zaakceptowane ({accepted.length})</TabsTrigger>
          <TabsTrigger value="rejected">Odrzucone ({rejected.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          {applications.map(renderApplication)}
        </TabsContent>
        <TabsContent value="pending" className="mt-4 space-y-4">
          {pending.length > 0 ? pending.map(renderApplication) : (
            <p className="text-muted-foreground text-center py-8">Brak oczekujących aplikacji</p>
          )}
        </TabsContent>
        <TabsContent value="accepted" className="mt-4 space-y-4">
          {accepted.length > 0 ? accepted.map(renderApplication) : (
            <p className="text-muted-foreground text-center py-8">Brak zaakceptowanych aplikacji</p>
          )}
        </TabsContent>
        <TabsContent value="rejected" className="mt-4 space-y-4">
          {rejected.length > 0 ? rejected.map(renderApplication) : (
            <p className="text-muted-foreground text-center py-8">Brak odrzuconych aplikacji</p>
          )}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Szukasz nowych możliwości?</CardTitle>
          <CardDescription>Przeglądaj dostępne wymiany młodzieżowe i aplikuj!</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/events">
            <Button>
              Zobacz wszystkie wydarzenia <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

