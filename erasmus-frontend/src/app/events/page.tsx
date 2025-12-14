'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { EuStars } from '@/components/eu-stars';
import Link from 'next/link';
import { Search, Calendar, MapPin, Users, ArrowLeft, Filter } from 'lucide-react';

const events = [
  {
    id: 1,
    name: 'Cultural Bridges 2025',
    location: 'Warszawa, Polska',
    date: '15-22 stycznia 2025',
    spots: 8,
    totalSpots: 40,
    countries: ['🇵🇱', '🇩🇪', '🇪🇸', '🇮🇹', '🇫🇷'],
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
  },
  {
    id: 2,
    name: 'Green Future Youth',
    location: 'Lizbona, Portugalia',
    date: '5-12 lutego 2025',
    spots: 12,
    totalSpots: 35,
    countries: ['🇵🇹', '🇵🇱', '🇳🇱', '🇸🇪'],
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
  },
  {
    id: 3,
    name: 'Digital Skills Workshop',
    location: 'Berlin, Niemcy',
    date: '10-17 marca 2025',
    spots: 6,
    totalSpots: 30,
    countries: ['🇩🇪', '🇵🇱', '🇫🇷', '🇮🇹', '🇨🇿'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
  },
  {
    id: 4,
    name: 'Active Citizenship Camp',
    location: 'Rzym, Włochy',
    date: '1-8 kwietnia 2025',
    spots: 15,
    totalSpots: 40,
    countries: ['🇮🇹', '🇪🇸', '🇬🇷', '🇵🇱'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
  },
  {
    id: 5,
    name: 'Youth Media Festival',
    location: 'Amsterdam, Holandia',
    date: '15-22 maja 2025',
    spots: 20,
    totalSpots: 45,
    countries: ['🇳🇱', '🇧🇪', '🇩🇪', '🇵🇱', '🇫🇷'],
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400',
  },
  {
    id: 6,
    name: 'Eco Leadership Summit',
    location: 'Kopenhaga, Dania',
    date: '1-8 czerwca 2025',
    spots: 10,
    totalSpots: 35,
    countries: ['🇩🇰', '🇸🇪', '🇳🇴', '🇫🇮', '🇵🇱'],
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400',
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <EuStars className="w-8 h-8 text-primary" />
            <span className="font-bold">Erasmus+ Youth Exchange</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Zaloguj się</Button>
            </Link>
            <Link href="/register/participant">
              <Button>Dołącz</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Powrót do strony głównej
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Wymiany młodzieżowe</h1>
          <p className="text-muted-foreground">
            Przeglądaj dostępne wymiany Erasmus+ i znajdź idealną dla siebie
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Szukaj wydarzeń..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtry
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div 
                className="h-40 bg-cover bg-center" 
                style={{ backgroundImage: `url(${event.image})` }}
              />
              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  {event.countries.map((flag, i) => (
                    <span key={i} className="text-lg">{flag}</span>
                  ))}
                </div>
                <h3 className="font-semibold text-lg mb-2">{event.name}</h3>
                <div className="space-y-1 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {event.spots} wolnych miejsc
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {event.spots > 0 ? 'Otwarta rekrutacja' : 'Brak miejsc'}
                  </Badge>
                  <Link href={`/events/${event.id}`}>
                    <Button size="sm">Zobacz szczegóły</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-8 text-center text-sm text-muted-foreground">
        <p>🇪🇺 Współfinansowane przez Unię Europejską w ramach programu Erasmus+</p>
      </footer>
    </div>
  );
}

