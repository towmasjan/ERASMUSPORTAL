'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EuStars } from '@/components/eu-stars';
import { 
  ArrowRight, 
  Calendar, 
  MapPin,
  Plane,
  Building2,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';

// Mock data for featured event
const featuredEvent = {
  id: 1,
  name: 'Cultural Bridges 2025',
  description: 'Międzykulturowy dialog i wzmacnianie młodzieży przez sztukę i kulturę.',
  location: 'Warszawa, Polska',
  starts_at: '2025-01-15',
  ends_at: '2025-01-22',
  spots_left: 8,
  countries: ['🇵🇱', '🇩🇪', '🇪🇸', '🇮🇹', '🇫🇷'],
};

// Mock data for upcoming events (reduced to 3)
const upcomingEvents = [
  {
    id: 2,
    name: 'Green Future Youth',
    location: 'Lizbona, Portugalia',
    starts_at: '2025-02-05',
    ends_at: '2025-02-12',
    countries: ['🇵🇹', '🇫🇷', '🇳🇱'],
  },
  {
    id: 3,
    name: 'Digital Skills Workshop',
    location: 'Berlin, Niemcy',
    starts_at: '2025-03-10',
    ends_at: '2025-03-17',
    countries: ['🇩🇪', '🇨🇿', '🇦🇹'],
  },
  {
    id: 4,
    name: 'Active Citizenship Camp',
    location: 'Rzym, Włochy',
    starts_at: '2025-04-01',
    ends_at: '2025-04-08',
    countries: ['🇮🇹', '🇬🇷', '🇭🇷'],
  },
];

function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return `${startDate.getDate()}-${endDate.getDate()} ${endDate.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}`;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <EuStars className="w-8 h-8 text-primary" />
            <span className="font-bold text-lg hidden sm:inline">Erasmus+ Youth</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Wydarzenia
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              O programie
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Zaloguj się</Button>
            </Link>
            <Link href="/register/participant">
              <Button size="sm">Dołącz</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Simplified */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Odkryj Europę
              <span className="block text-primary">z Erasmus+</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10">
              Dołącz do międzynarodowych wymian młodzieżowych. Poznaj nowych przyjaciół 
              i przeżyj niezapomnianą przygodę.
            </p>
            
            <a href="#events">
              <Button size="lg" className="text-lg px-8">
                Zobacz dostępne wymiany
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Event - Simplified */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="h-48 md:h-auto bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center p-8">
                <div className="text-center text-white">
                  <div className="flex justify-center gap-2 mb-4 text-2xl">
                    {featuredEvent.countries.map((flag, i) => (
                      <span key={i}>{flag}</span>
                    ))}
                  </div>
                  <div className="text-5xl font-bold">
                    {new Date(featuredEvent.starts_at).getDate()}
                  </div>
                  <div className="text-lg opacity-90">
                    {new Date(featuredEvent.starts_at).toLocaleDateString('pl-PL', { month: 'long' })}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 md:p-8">
                <Badge variant="outline" className="mb-3">
                  {featuredEvent.spots_left} wolnych miejsc
                </Badge>
                
                <h3 className="text-2xl font-bold mb-2">{featuredEvent.name}</h3>
                
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  {featuredEvent.location}
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {featuredEvent.description}
                </p>
                
                <Link href={`/events/${featuredEvent.id}`}>
                  <Button className="w-full">
                    <Plane className="w-4 h-4 mr-2" />
                    Aplikuj teraz
                  </Button>
                </Link>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Events - Reduced to 3 */}
      <section id="events" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Nadchodzące wymiany</h2>
            <p className="text-muted-foreground">
              Wybierz wymianę i przeżyj przygodę
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {upcomingEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <Card className="group hover:shadow-lg transition-shadow h-full">
                  <div className="h-24 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="flex gap-1 text-xl">
                      {event.countries.map((flag, i) => (
                        <span key={i}>{flag}</span>
                      ))}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {event.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDateRange(event.starts_at, event.ends_at)}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/events">
              <Button variant="outline">
                Zobacz wszystkie
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Simplified */}
      <section id="about" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">O programie</h2>
            
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  1
                </div>
                <p className="text-sm text-white/80">Zarejestruj się</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  2
                </div>
                <p className="text-sm text-white/80">Wybierz wymianę</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  3
                </div>
                <p className="text-sm text-white/80">Jedź i odkrywaj</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register/participant">
                <Button variant="secondary" size="lg">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Dołącz jako uczestnik
                </Button>
              </Link>
              <Link href="/register/organization">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Building2 className="w-4 h-4 mr-2" />
                  Dołącz jako organizacja
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <EuStars className="w-6 h-6 text-primary" />
              <span className="font-semibold">Erasmus+ Youth Exchange</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>🇪🇺</span>
              <span>Współfinansowane przez Unię Europejską</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 Erasmus+ Youth Exchange
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
