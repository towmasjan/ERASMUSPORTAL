'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EuStars } from '@/components/eu-stars';
import { 
  ArrowRight, 
  Users, 
  Globe, 
  Calendar, 
  MapPin,
  Sparkles,
  Heart,
  Award,
  Plane,
  Building2,
  UserPlus,
  CheckCircle2,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Mail,
} from 'lucide-react';
import Link from 'next/link';

// Mock data for featured event
const featuredEvent = {
  id: 1,
  name: 'Cultural Bridges 2025',
  description: 'Międzykulturowy dialog i wzmacnianie młodzieży przez sztukę i kulturę. Poznaj młodych ludzi z całej Europy!',
  location: 'Warszawa, Polska',
  country: 'Poland',
  starts_at: '2025-01-15',
  ends_at: '2025-01-22',
  participants: 32,
  spots_left: 8,
  countries: ['🇵🇱', '🇩🇪', '🇪🇸', '🇮🇹', '🇫🇷', '🇵🇹'],
};

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 2,
    name: 'Green Future Youth',
    location: 'Lizbona, Portugalia',
    starts_at: '2025-02-05',
    ends_at: '2025-02-12',
    spots_left: 12,
    countries: ['🇵🇹', '🇫🇷', '🇳🇱', '🇧🇪'],
  },
  {
    id: 3,
    name: 'Digital Skills Workshop',
    location: 'Berlin, Niemcy',
    starts_at: '2025-03-10',
    ends_at: '2025-03-17',
    spots_left: 6,
    countries: ['🇩🇪', '🇨🇿', '🇦🇹', '🇭🇺'],
  },
  {
    id: 4,
    name: 'Active Citizenship Camp',
    location: 'Rzym, Włochy',
    starts_at: '2025-04-01',
    ends_at: '2025-04-08',
    spots_left: 15,
    countries: ['🇮🇹', '🇬🇷', '🇭🇷', '🇸🇮'],
  },
  {
    id: 5,
    name: 'Youth Media Lab',
    location: 'Amsterdam, Holandia',
    starts_at: '2025-05-12',
    ends_at: '2025-05-19',
    spots_left: 10,
    countries: ['🇳🇱', '🇧🇪', '🇱🇺', '🇩🇪'],
  },
  {
    id: 6,
    name: 'Sustainable Living',
    location: 'Kopenhaga, Dania',
    starts_at: '2025-06-03',
    ends_at: '2025-06-10',
    spots_left: 8,
    countries: ['🇩🇰', '🇸🇪', '🇳🇴', '🇫🇮'],
  },
  {
    id: 7,
    name: 'Art & Expression',
    location: 'Barcelona, Hiszpania',
    starts_at: '2025-07-15',
    ends_at: '2025-07-22',
    spots_left: 14,
    countries: ['🇪🇸', '🇵🇹', '🇫🇷', '🇮🇹'],
  },
];

// Mock data for partner organizations
const partnerOrganizations = [
  { id: 1, name: 'Youth Center Warsaw', country: 'Polska', flag: '🇵🇱' },
  { id: 2, name: 'Jugendwerk Berlin', country: 'Niemcy', flag: '🇩🇪' },
  { id: 3, name: 'Centro Juvenil Madrid', country: 'Hiszpania', flag: '🇪🇸' },
  { id: 4, name: 'Associazione Giovani Roma', country: 'Włochy', flag: '🇮🇹' },
  { id: 5, name: 'Maison de la Jeunesse Paris', country: 'Francja', flag: '🇫🇷' },
  { id: 6, name: 'Jovens Unidos Lisboa', country: 'Portugalia', flag: '🇵🇹' },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
  });
}

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
            <div className="relative w-8 h-8">
              <EuStars className="w-full h-full text-primary" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">Erasmus+ Youth</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#events" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Wydarzenia
            </a>
            <a href="#partners" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Organizacje
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              O nas
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Zaloguj się</Button>
            </Link>
            <Link href="/register/participant" className="hidden sm:block">
              <Button size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Dołącz jako uczestnik
              </Button>
            </Link>
            <Link href="/register/organization" className="hidden lg:block">
              <Button variant="outline" size="sm">
                <Building2 className="w-4 h-4 mr-2" />
                Dołącz jako organizacja
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        
        {/* Animated flags background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-[10%] text-4xl animate-float opacity-20" style={{ animationDelay: '0s' }}>🇪🇺</div>
          <div className="absolute top-20 right-[15%] text-3xl animate-float opacity-15" style={{ animationDelay: '0.5s' }}>🇵🇱</div>
          <div className="absolute top-40 left-[20%] text-2xl animate-float opacity-10" style={{ animationDelay: '1s' }}>🇩🇪</div>
          <div className="absolute bottom-20 right-[25%] text-3xl animate-float opacity-15" style={{ animationDelay: '1.5s' }}>🇪🇸</div>
          <div className="absolute bottom-40 left-[30%] text-2xl animate-float opacity-10" style={{ animationDelay: '2s' }}>🇮🇹</div>
          <div className="absolute top-1/2 right-[10%] text-4xl animate-float opacity-20" style={{ animationDelay: '2.5s' }}>🇫🇷</div>
        </div>
        
        <div className="absolute top-20 right-10 w-48 h-48 opacity-10 hidden lg:block">
          <EuStars className="w-full h-full text-primary" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              Program Erasmus+ 2021-2027
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Odkryj Europę
              <span className="block text-primary mt-2">z Erasmus+</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Dołącz do międzynarodowych wymian młodzieżowych. Poznaj nowych przyjaciół, 
              rozwijaj umiejętności i przeżyj niezapomnianą przygodę w Europie!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#events">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                  Zobacz dostępne wymiany
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link href="/register/participant">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                  Zarejestruj się teraz
                </Button>
              </Link>
            </div>
            
            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span><strong>500+</strong> uczestników</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-secondary" />
                <span><strong>27</strong> krajów UE</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span><strong>50+</strong> wymian rocznie</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section id="featured" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-secondary/20 text-secondary-foreground">
              <Sparkles className="w-3 h-3 mr-1" />
              Wyróżnione
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Najbliższa wymiana</h2>
          </div>
          
          <Card className="max-w-4xl mx-auto overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <div className="grid md:grid-cols-2">
              {/* Left side - visual */}
              <div className="relative h-64 md:h-auto bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-secondary blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-white blur-2xl" />
                </div>
                <div className="relative text-center text-white p-6">
                  <div className="flex justify-center gap-2 mb-4">
                    {featuredEvent.countries.map((flag, i) => (
                      <span key={i} className="text-3xl">{flag}</span>
                    ))}
                  </div>
                  <div className="text-6xl font-bold mb-2">
                    {new Date(featuredEvent.starts_at).getDate()}
                  </div>
                  <div className="text-xl opacity-90">
                    {new Date(featuredEvent.starts_at).toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
              
              {/* Right side - content */}
              <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                <Badge variant="outline" className="w-fit mb-3 text-primary border-primary/30">
                  <Clock className="w-3 h-3 mr-1" />
                  {featuredEvent.spots_left} wolnych miejsc
                </Badge>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{featuredEvent.name}</h3>
                
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{featuredEvent.location}</span>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {featuredEvent.description}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    {formatDateRange(featuredEvent.starts_at, featuredEvent.ends_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-primary" />
                    {featuredEvent.participants} uczestników
                  </div>
                </div>
                
                <Link href={`/events/${featuredEvent.id}`}>
                  <Button className="w-full md:w-auto">
                    <Plane className="w-4 h-4 mr-2" />
                    Aplikuj teraz
                  </Button>
                </Link>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nadchodzące wymiany młodzieżowe
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wybierz wymianę, która Cię interesuje i przeżyj niezapomnianą przygodę!
            </p>
          </div>
          
          {/* First row - 3 events */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {upcomingEvents.slice(0, 3).map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30 h-full">
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center">
                    <div className="flex gap-1">
                      {event.countries.map((flag, i) => (
                        <span key={i} className="text-2xl">{flag}</span>
                      ))}
                    </div>
                    <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                      {event.spots_left} miejsc
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {event.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      {formatDateRange(event.starts_at, event.ends_at)}
                    </div>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      Zobacz szczegóły
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {/* Second row - 3 events */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {upcomingEvents.slice(3, 6).map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30 h-full">
                  <div className="h-32 bg-gradient-to-br from-secondary/20 to-primary/20 relative flex items-center justify-center">
                    <div className="flex gap-1">
                      {event.countries.map((flag, i) => (
                        <span key={i} className="text-2xl">{flag}</span>
                      ))}
                    </div>
                    <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                      {event.spots_left} miejsc
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {event.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      {formatDateRange(event.starts_at, event.ends_at)}
                    </div>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      Zobacz szczegóły
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/events">
              <Button variant="outline" size="lg">
                Zobacz wszystkie wydarzenia
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section id="partners" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Organizacje, które nam zaufały
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dołącz do sieci organizacji młodzieżowych w całej Europie
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{partnerOrganizations.length}+</div>
              <div className="text-muted-foreground">organizacji</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary">{new Set(partnerOrganizations.map(o => o.country)).size}</div>
              <div className="text-muted-foreground">krajów</div>
            </div>
          </div>
          
          {/* Organizations grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {partnerOrganizations.map((org) => (
              <Link key={org.id} href={`/partners/${org.id}`}>
                <Card className="text-center p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
                  <div className="text-4xl mb-2">{org.flag}</div>
                  <h4 className="font-medium text-sm mb-1 line-clamp-2">{org.name}</h4>
                  <p className="text-xs text-muted-foreground">{org.country}</p>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/register/organization">
              <Button size="lg">
                <Building2 className="w-5 h-5 mr-2" />
                Dołącz jako organizacja
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dołącz do nas
            </h2>
            <p className="text-lg text-muted-foreground">
              Wybierz swoją ścieżkę
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* For Participants */}
            <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full" />
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Dla uczestników</h3>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Plane className="w-5 h-5 text-primary mt-0.5" />
                    <span>Podróżuj po Europie za darmo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-primary mt-0.5" />
                    <span>Zdobądź certyfikat Youthpass</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-primary mt-0.5" />
                    <span>Poznaj przyjaciół z całej Europy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                    <span>Rozwijaj nowe umiejętności</span>
                  </li>
                </ul>
                
                <Link href="/register/participant">
                  <Button className="w-full" size="lg">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Zarejestruj się jako uczestnik
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* For Organizations */}
            <Card className="relative overflow-hidden border-2 hover:border-secondary/50 transition-colors group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full" />
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-secondary" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Dla organizacji</h3>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Znajdź partnerów międzynarodowych</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Zarządzaj projektami w jednym miejscu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Rekrutuj uczestników online</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Uzyskaj dofinansowanie UE</span>
                  </li>
                </ul>
                
                <Link href="/register/organization">
                  <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground" size="lg">
                    <Building2 className="w-5 h-5 mr-2" />
                    Zarejestruj organizację
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-erasmus-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O Erasmus+ Youth Exchange Portal
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Platforma łącząca młodych ludzi i organizacje młodzieżowe w całej Europie
              </p>
            </div>
            
            {/* How it works */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-bold text-xl mb-2">Zarejestruj się</h3>
                <p className="text-white/70">
                  Utwórz konto jako uczestnik lub organizacja
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-bold text-xl mb-2">Wybierz wymianę</h3>
                <p className="text-white/70">
                  Przeglądaj dostępne projekty i aplikuj
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-bold text-xl mb-2">Jedź i odkrywaj!</h3>
                <p className="text-white/70">
                  Przeżyj niezapomnianą przygodę w Europie
                </p>
              </div>
            </div>
            
            {/* About creators */}
            <div className="text-center border-t border-white/20 pt-12">
              <p className="text-white/70 mb-6">
                Portal został stworzony z myślą o ułatwieniu dostępu do programu Erasmus+ 
                dla młodych ludzi i organizacji młodzieżowych. Naszą misją jest wspieranie 
                mobilności młodzieży i budowanie mostów między kulturami w Europie.
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">🇪🇺</span>
                <span className="text-white/80">Współfinansowane przez Unię Europejską</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo & description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <EuStars className="w-8 h-8 text-primary" />
                <span className="font-bold text-lg">Erasmus+ Youth Exchange</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-md">
                Platforma do zarządzania wymianami młodzieżowymi w ramach programu Erasmus+.
                Łączymy młodych ludzi z całej Europy.
              </p>
            </div>
            
            {/* Quick links */}
            <div>
              <h4 className="font-semibold mb-4">Szybkie linki</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#events" className="hover:text-foreground transition-colors">Wydarzenia</a></li>
                <li><a href="#partners" className="hover:text-foreground transition-colors">Organizacje</a></li>
                <li><a href="#about" className="hover:text-foreground transition-colors">O nas</a></li>
                <li><Link href="/login" className="hover:text-foreground transition-colors">Zaloguj się</Link></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Informacje</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Polityka prywatności</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Regulamin</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Kontakt</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>🇪🇺</span>
              <span>Współfinansowane przez Unię Europejską</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 Erasmus+ Youth Exchange Portal
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
