'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ArrowLeft, Save, Calendar, MapPin, Globe, Users, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { api, EventCreate } from '@/lib/api';

const timezones = [
  { value: 'Europe/Warsaw', label: 'Europe/Warsaw (CET)' },
  { value: 'Europe/London', label: 'Europe/London (GMT)' },
  { value: 'Europe/Paris', label: 'Europe/Paris (CET)' },
  { value: 'Europe/Berlin', label: 'Europe/Berlin (CET)' },
  { value: 'Europe/Rome', label: 'Europe/Rome (CET)' },
  { value: 'Europe/Madrid', label: 'Europe/Madrid (CET)' },
  { value: 'Europe/Lisbon', label: 'Europe/Lisbon (WET)' },
  { value: 'Europe/Amsterdam', label: 'Europe/Amsterdam (CET)' },
  { value: 'Europe/Brussels', label: 'Europe/Brussels (CET)' },
  { value: 'Europe/Vienna', label: 'Europe/Vienna (CET)' },
  { value: 'Europe/Prague', label: 'Europe/Prague (CET)' },
  { value: 'Europe/Stockholm', label: 'Europe/Stockholm (CET)' },
  { value: 'Europe/Copenhagen', label: 'Europe/Copenhagen (CET)' },
  { value: 'Europe/Helsinki', label: 'Europe/Helsinki (EET)' },
  { value: 'Europe/Athens', label: 'Europe/Athens (EET)' },
  { value: 'Europe/Bucharest', label: 'Europe/Bucharest (EET)' },
];

const countries = [
  { code: 'PL', name: 'Polska', flag: '🇵🇱' },
  { code: 'DE', name: 'Niemcy', flag: '🇩🇪' },
  { code: 'FR', name: 'Francja', flag: '🇫🇷' },
  { code: 'IT', name: 'Włochy', flag: '🇮🇹' },
  { code: 'ES', name: 'Hiszpania', flag: '🇪🇸' },
  { code: 'PT', name: 'Portugalia', flag: '🇵🇹' },
  { code: 'NL', name: 'Holandia', flag: '🇳🇱' },
  { code: 'BE', name: 'Belgia', flag: '🇧🇪' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'CZ', name: 'Czechy', flag: '🇨🇿' },
  { code: 'SE', name: 'Szwecja', flag: '🇸🇪' },
  { code: 'DK', name: 'Dania', flag: '🇩🇰' },
  { code: 'FI', name: 'Finlandia', flag: '🇫🇮' },
  { code: 'GR', name: 'Grecja', flag: '🇬🇷' },
  { code: 'RO', name: 'Rumunia', flag: '🇷🇴' },
  { code: 'HU', name: 'Węgry', flag: '🇭🇺' },
  { code: 'SK', name: 'Słowacja', flag: '🇸🇰' },
  { code: 'HR', name: 'Chorwacja', flag: '🇭🇷' },
  { code: 'SI', name: 'Słowenia', flag: '🇸🇮' },
  { code: 'BG', name: 'Bułgaria', flag: '🇧🇬' },
  { code: 'IE', name: 'Irlandia', flag: '🇮🇪' },
  { code: 'LT', name: 'Litwa', flag: '🇱🇹' },
  { code: 'LV', name: 'Łotwa', flag: '🇱🇻' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'CY', name: 'Cypr', flag: '🇨🇾' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹' },
  { code: 'LU', name: 'Luksemburg', flag: '🇱🇺' },
];

export default function NewEventPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [useMockApi, setUseMockApi] = useState(true);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [locationName, setLocationName] = useState('');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('Europe/Warsaw');
  const [maxParticipants, setMaxParticipants] = useState('30');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e: React.FormEvent, asDraft: boolean = false) => {
    e.preventDefault();

    if (!name || !startsAt || !endsAt) {
      toast.error('Wypełnij wymagane pola', {
        description: 'Nazwa, data rozpoczęcia i zakończenia są wymagane.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const selectedCountry = countries.find(c => c.code === country);
      const fullLocation = locationName + (selectedCountry ? `, ${selectedCountry.name}` : '');

      const eventData: EventCreate = {
        name,
        description: description || undefined,
        starts_at: new Date(startsAt).toISOString(),
        ends_at: new Date(endsAt).toISOString(),
        location_name: fullLocation || undefined,
        timezone,
        state: asDraft ? 'draft' : 'published',
        privacy: isPublic ? 'public' : 'private',
        searchable_location_name: fullLocation || undefined,
        is_ticketing_enabled: true,
        is_sessions_speakers_enabled: false,
      };

      if (useMockApi) {
        // Mock API - simulate success
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success(asDraft ? 'Szkic zapisany!' : 'Wydarzenie utworzone!', {
          description: `"${name}" zostało ${asDraft ? 'zapisane jako szkic' : 'opublikowane'}.`,
        });
        router.push('/organization/events');
      } else {
        // Real API
        const event = await api.createEvent(eventData);
        
        // Create a free ticket for registrations
        await api.createTicket(event.id, {
          name: 'Rejestracja uczestnika',
          description: 'Bezpłatna rejestracja na wymianę młodzieżową',
          type: 'free',
          price: 0,
          quantity: parseInt(maxParticipants),
          sales_starts_at: new Date().toISOString(),
          sales_ends_at: new Date(endsAt).toISOString(),
        });

        toast.success(asDraft ? 'Szkic zapisany!' : 'Wydarzenie utworzone!');
        router.push('/organization/events');
      }
    } catch (error) {
      console.error('Failed to create event:', error);
      toast.error('Błąd tworzenia wydarzenia', {
        description: error instanceof Error ? error.message : 'Spróbuj ponownie.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/organization/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="w-4 h-4" />
            Powrót do wydarzeń
          </Link>
          <h1 className="text-2xl font-bold">Nowe wydarzenie</h1>
          <p className="text-muted-foreground">Utwórz nową wymianę młodzieżową Erasmus+</p>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)}>
        {/* Basic Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Informacje podstawowe
            </CardTitle>
            <CardDescription>Podstawowe dane wydarzenia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nazwa wydarzenia *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="np. Cultural Bridges 2025"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Opis</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Opisz cel i program wymiany..."
                rows={4}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startsAt">Data rozpoczęcia *</Label>
                <Input
                  id="startsAt"
                  type="datetime-local"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endsAt">Data zakończenia *</Label>
                <Input
                  id="endsAt"
                  type="datetime-local"
                  value={endsAt}
                  onChange={(e) => setEndsAt(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Strefa czasowa</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz strefę czasową" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Lokalizacja
            </CardTitle>
            <CardDescription>Gdzie odbędzie się wymiana?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="country">Kraj</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz kraj" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="locationName">Miasto / Miejsce</Label>
                <Input
                  id="locationName"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="np. Warszawa"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participants */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Uczestnicy
            </CardTitle>
            <CardDescription>Ustawienia rejestracji</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Maksymalna liczba uczestników</Label>
              <Input
                id="maxParticipants"
                type="number"
                min="1"
                max="1000"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Visibility */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Widoczność
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Wydarzenie publiczne</Label>
                <p className="text-sm text-muted-foreground">
                  Publiczne wydarzenia są widoczne dla wszystkich
                </p>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>
          </CardContent>
        </Card>

        {/* API Mode Toggle (for development) */}
        <Card className="mb-6 border-dashed">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Tryb Mock API</Label>
                <p className="text-sm text-muted-foreground">
                  Użyj symulacji zamiast prawdziwego API
                </p>
              </div>
              <Switch checked={useMockApi} onCheckedChange={setUseMockApi} />
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isLoading}
          >
            Zapisz jako szkic
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Tworzenie...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Opublikuj wydarzenie
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

