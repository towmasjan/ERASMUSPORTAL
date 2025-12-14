'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EuStars } from '@/components/eu-stars';
import { ApplicationForm } from '@/components/application-form';
import Link from 'next/link';
import { use, useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Plane, 
  Award, 
  Heart, 
  CheckCircle2,
  Mail,
  Phone,
  Building2
} from 'lucide-react';

// Mock event data
const eventsData: Record<string, {
  id: number;
  name: string;
  description: string;
  location: string;
  country: string;
  starts_at: string;
  ends_at: string;
  participants: number;
  maxParticipants: number;
  countries: { flag: string; name: string }[];
  organizer: { name: string; email: string; phone: string };
  requirements: string[];
  includes: string[];
}> = {
  '1': {
    id: 1,
    name: 'Cultural Bridges 2025',
    description: 'Międzykulturowy dialog i wzmacnianie młodzieży przez sztukę i kulturę. Projekt skupia się na budowaniu mostów między różnymi kulturami europejskimi poprzez wspólne warsztaty artystyczne, prezentacje kulturowe i dyskusje na temat różnorodności. Uczestnicy będą mieli okazję poznać tradycje, kuchnię i zwyczaje różnych krajów, a także rozwinąć swoje umiejętności komunikacji międzykulturowej.',
    location: 'Warszawa, Polska',
    country: 'Poland',
    starts_at: '2025-01-15',
    ends_at: '2025-01-22',
    participants: 32,
    maxParticipants: 40,
    countries: [
      { flag: '🇵🇱', name: 'Polska' },
      { flag: '🇩🇪', name: 'Niemcy' },
      { flag: '🇪🇸', name: 'Hiszpania' },
      { flag: '🇮🇹', name: 'Włochy' },
      { flag: '🇫🇷', name: 'Francja' },
      { flag: '🇵🇹', name: 'Portugalia' },
    ],
    organizer: {
      name: 'Youth Center Warsaw',
      email: 'contact@ycwarsaw.pl',
      phone: '+48 22 123 45 67',
    },
    requirements: [
      'Wiek: 18-30 lat',
      'Znajomość języka angielskiego na poziomie komunikatywnym',
      'Gotowość do aktywnego udziału we wszystkich aktywnościach',
      'Otwartość na poznawanie nowych kultur',
    ],
    includes: [
      'Zakwaterowanie (7 nocy)',
      'Pełne wyżywienie',
      'Materiały warsztatowe',
      'Ubezpieczenie',
      'Zwrot kosztów podróży (do limitu)',
      'Certyfikat Youthpass',
    ],
  },
  '2': {
    id: 2,
    name: 'Green Future Youth',
    description: 'Projekt skupiający się na edukacji ekologicznej i zrównoważonym rozwoju. Uczestnicy poznają praktyczne sposoby ochrony środowiska i walki ze zmianami klimatycznymi.',
    location: 'Lizbona, Portugalia',
    country: 'Portugal',
    starts_at: '2025-02-05',
    ends_at: '2025-02-12',
    participants: 28,
    maxParticipants: 35,
    countries: [
      { flag: '🇵🇹', name: 'Portugalia' },
      { flag: '🇵🇱', name: 'Polska' },
      { flag: '🇳🇱', name: 'Holandia' },
      { flag: '🇸🇪', name: 'Szwecja' },
    ],
    organizer: {
      name: 'Eco Association Lisbon',
      email: 'info@ecoalisbon.pt',
      phone: '+351 21 123 4567',
    },
    requirements: [
      'Wiek: 18-30 lat',
      'Zainteresowanie ekologią',
      'Znajomość języka angielskiego',
    ],
    includes: [
      'Zakwaterowanie',
      'Wyżywienie',
      'Zwrot kosztów podróży',
      'Youthpass',
    ],
  },
  '3': {
    id: 3,
    name: 'Digital Skills Workshop',
    description: 'Warsztaty rozwijające kompetencje cyfrowe młodzieży. Nauka programowania, projektowania graficznego i marketingu online.',
    location: 'Berlin, Niemcy',
    country: 'Germany',
    starts_at: '2025-03-10',
    ends_at: '2025-03-17',
    participants: 24,
    maxParticipants: 30,
    countries: [
      { flag: '🇩🇪', name: 'Niemcy' },
      { flag: '🇵🇱', name: 'Polska' },
      { flag: '🇫🇷', name: 'Francja' },
      { flag: '🇮🇹', name: 'Włochy' },
      { flag: '🇨🇿', name: 'Czechy' },
    ],
    organizer: {
      name: 'Tech Youth Berlin',
      email: 'hello@techyouth.de',
      phone: '+49 30 1234567',
    },
    requirements: [
      'Wiek: 18-30 lat',
      'Podstawowa znajomość komputera',
      'Znajomość języka angielskiego',
    ],
    includes: [
      'Zakwaterowanie',
      'Wyżywienie',
      'Laptop do użytku podczas warsztatów',
      'Zwrot kosztów podróży',
      'Youthpass',
    ],
  },
};

// Default event for unknown IDs
const defaultEvent = {
  id: 0,
  name: 'Wydarzenie',
  description: 'Szczegóły wydarzenia będą dostępne wkrótce.',
  location: 'Europa',
  country: 'EU',
  starts_at: '2025-01-01',
  ends_at: '2025-01-07',
  participants: 0,
  maxParticipants: 30,
  countries: [{ flag: '🇪🇺', name: 'Europa' }],
  organizer: { name: 'Organizator', email: 'contact@example.com', phone: '+48 123 456 789' },
  requirements: ['Wiek: 18-30 lat'],
  includes: ['Zakwaterowanie', 'Wyżywienie'],
};

export default function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const event = eventsData[id] || defaultEvent;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const spotsLeft = event.maxParticipants - event.participants;
  const daysCount = Math.ceil((new Date(event.ends_at).getTime() - new Date(event.starts_at).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <EuStars className="w-8 h-8 text-primary" />
            <span className="font-bold hidden sm:inline">Erasmus+ Youth</span>
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

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Powrót do listy wydarzeń
        </Link>

        {/* Hero */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {event.countries.map((country, i) => (
              <span key={i} className="text-2xl" title={country.name}>{country.flag}</span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.name}</h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {event.location}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(event.starts_at).toLocaleDateString('pl-PL')} - {new Date(event.ends_at).toLocaleDateString('pl-PL')}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {spotsLeft} wolnych miejsc
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4 text-center">
                  <Clock className="w-6 h-6 mx-auto text-primary mb-2" />
                  <div className="font-bold text-lg">{daysCount} dni</div>
                  <p className="text-xs text-muted-foreground">czas trwania</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 text-center">
                  <Users className="w-6 h-6 mx-auto text-primary mb-2" />
                  <div className="font-bold text-lg">{event.maxParticipants}</div>
                  <p className="text-xs text-muted-foreground">uczestników</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 text-center">
                  <span className="text-2xl block mb-1">🌍</span>
                  <div className="font-bold text-lg">{event.countries.length}</div>
                  <p className="text-xs text-muted-foreground">krajów</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 text-center">
                  <Award className="w-6 h-6 mx-auto text-secondary mb-2" />
                  <div className="font-bold text-lg">Youthpass</div>
                  <p className="text-xs text-muted-foreground">certyfikat</p>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>O wydarzeniu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </CardContent>
            </Card>

            {/* Countries */}
            <Card>
              <CardHeader>
                <CardTitle>Kraje uczestniczące</CardTitle>
                <CardDescription>Poznaj młodzież z całej Europy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {event.countries.map((country, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-medium">{country.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Wymagania</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {event.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Includes */}
            <Card>
              <CardHeader>
                <CardTitle>Co obejmuje?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {event.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-secondary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-primary" />
                  Aplikuj teraz
                </CardTitle>
                <CardDescription>
                  Zostało tylko {spotsLeft} miejsc!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      Aplikuj na tę wymianę
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Formularz aplikacyjny</DialogTitle>
                    </DialogHeader>
                    <ApplicationForm
                      eventId={event.id}
                      eventName={event.name}
                      onSuccess={() => setIsDialogOpen(false)}
                      onCancel={() => setIsDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Udział jest bezpłatny. Koszty podróży są zwracane.
                </p>
              </CardContent>
            </Card>

            {/* Organizer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Organizator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="font-medium">{event.organizer.name}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${event.organizer.email}`} className="text-primary hover:underline">
                    {event.organizer.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {event.organizer.phone}
                </div>
              </CardContent>
            </Card>

            {/* Youthpass */}
            <Card className="bg-gradient-to-br from-secondary/10 to-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Award className="w-10 h-10 text-secondary" />
                  <div>
                    <h4 className="font-semibold mb-1">Certyfikat Youthpass</h4>
                    <p className="text-sm text-muted-foreground">
                      Po ukończeniu wymiany otrzymasz oficjalny certyfikat UE potwierdzający nabyte kompetencje.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t mt-12 py-8 text-center text-sm text-muted-foreground">
        <p>🇪🇺 Współfinansowane przez Unię Europejską w ramach programu Erasmus+</p>
      </footer>
    </div>
  );
}

