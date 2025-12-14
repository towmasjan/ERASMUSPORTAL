'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EuStars } from '@/components/eu-stars';
import Link from 'next/link';
import { ArrowLeft, Building2, Mail, Phone, Globe, MapPin, Calendar, Users } from 'lucide-react';
import { use } from 'react';

const partnersData: Record<string, {
  id: number;
  name: string;
  country: string;
  countryName: string;
  oid: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  description: string;
  events: { id: number; name: string; date: string; participants: number }[];
}> = {
  '1': {
    id: 1,
    name: 'Youth Center Warsaw',
    country: '🇵🇱',
    countryName: 'Polska',
    oid: 'E10123456',
    email: 'contact@ycwarsaw.pl',
    phone: '+48 22 123 45 67',
    website: 'www.ycwarsaw.pl',
    address: 'ul. Młodzieżowa 15, 00-001 Warszawa',
    description: 'Youth Center Warsaw to organizacja non-profit działająca od 2010 roku. Specjalizujemy się w organizacji wymian młodzieżowych, szkoleń i projektów wolontariatu europejskiego. Naszą misją jest wspieranie rozwoju młodych ludzi poprzez edukację pozaformalną i międzynarodową współpracę.',
    events: [
      { id: 1, name: 'Cultural Bridges 2025', date: '15-22 sty 2025', participants: 32 },
      { id: 2, name: 'Youth Media Lab', date: '12-19 maj 2025', participants: 28 },
    ],
  },
  '2': {
    id: 2,
    name: 'Eco Association Lisbon',
    country: '🇵🇹',
    countryName: 'Portugalia',
    oid: 'E10234567',
    email: 'info@ecoalisbon.pt',
    phone: '+351 21 123 4567',
    website: 'www.ecoalisbon.pt',
    address: 'Rua da Juventude 42, 1100 Lisboa',
    description: 'Eco Association Lisbon to portugalska organizacja ekologiczna skupiona na edukacji młodzieży w zakresie zrównoważonego rozwoju i ochrony środowiska.',
    events: [
      { id: 3, name: 'Green Future Youth', date: '5-12 lut 2025', participants: 35 },
    ],
  },
};

export default function PartnerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const partner = partnersData[id];

  if (!partner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-bold mb-2">Organizacja nie znaleziona</h2>
            <p className="text-muted-foreground mb-4">Nie znaleziono organizacji o podanym ID.</p>
            <Link href="/">
              <Button>Wróć do strony głównej</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <Link href="/register/organization">
              <Button>Dołącz jako organizacja</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Powrót
        </Link>

        {/* Partner Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <span className="text-5xl">{partner.country}</span>
            <div>
              <Badge className="mb-2">Zweryfikowana organizacja</Badge>
              <h1 className="text-2xl font-bold">{partner.name}</h1>
              <p className="text-muted-foreground">{partner.countryName}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>O organizacji</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{partner.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wydarzenia</CardTitle>
                <CardDescription>Wymiany organizowane przez {partner.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {partner.events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <h4 className="font-medium">{event.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {event.participants} uczestników
                          </span>
                        </div>
                      </div>
                      <Link href={`/events/${event.id}`}>
                        <Button size="sm" variant="outline">Zobacz</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kontakt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span>OID: {partner.oid}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${partner.email}`} className="text-primary hover:underline">
                    {partner.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{partner.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <a href={`https://${partner.website}`} className="text-primary hover:underline" target="_blank">
                    {partner.website}
                  </a>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span>{partner.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Button className="w-full">Skontaktuj się</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t mt-12 py-8 text-center text-sm text-muted-foreground">
        <p>🇪🇺 Współfinansowane przez Unię Europejską</p>
      </footer>
    </div>
  );
}

