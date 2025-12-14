'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Trash2,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Heart,
  AlertTriangle,
  Plane,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

// Mock participant data
const mockParticipants: Record<string, {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  country: string;
  countryFlag: string;
  status: 'pending' | 'accepted' | 'rejected';
  event: string;
  eventId: number;
  specialDiet: string;
  healthIssues: string;
  emergencyName: string;
  emergencyPhone: string;
  travelCost: number | null;
  partnerOrg: string | null;
  appliedAt: string;
}> = {
  '1': {
    id: 1,
    firstname: 'Jan',
    lastname: 'Kowalski',
    email: 'jan.kowalski@example.com',
    phone: '+48 123 456 789',
    dateOfBirth: '1999-05-15',
    nationality: 'Polish',
    country: 'Polska',
    countryFlag: '🇵🇱',
    status: 'accepted',
    event: 'Cultural Bridges 2025',
    eventId: 1,
    specialDiet: 'Wegetarianin',
    healthIssues: 'Brak',
    emergencyName: 'Anna Kowalska',
    emergencyPhone: '+48 987 654 321',
    travelCost: 250,
    partnerOrg: 'Youth Center Warsaw',
    appliedAt: '2024-12-01',
  },
  '2': {
    id: 2,
    firstname: 'Maria',
    lastname: 'García',
    email: 'maria.garcia@example.es',
    phone: '+34 612 345 678',
    dateOfBirth: '2000-08-22',
    nationality: 'Spanish',
    country: 'Hiszpania',
    countryFlag: '🇪🇸',
    status: 'pending',
    event: 'Cultural Bridges 2025',
    eventId: 1,
    specialDiet: '',
    healthIssues: 'Alergia na orzechy',
    emergencyName: 'Carlos García',
    emergencyPhone: '+34 698 765 432',
    travelCost: null,
    partnerOrg: 'Centro Juvenil Madrid',
    appliedAt: '2024-12-05',
  },
};

export default function ParticipantDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const participant = mockParticipants[id];
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Editable fields
  const [status, setStatus] = useState(participant?.status || 'pending');
  const [travelCost, setTravelCost] = useState(participant?.travelCost?.toString() || '');
  const [notes, setNotes] = useState('');

  if (!participant) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">Uczestnik nie znaleziony</h2>
            <p className="text-muted-foreground mb-4">Nie znaleziono uczestnika o podanym ID.</p>
            <Link href="/organization/participants">
              <Button>Wróć do listy</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Mock save
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Zapisano zmiany!');
    } catch {
      toast.error('Błąd zapisu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus as 'pending' | 'accepted' | 'rejected');
    // In real app, call API here
    toast.success(`Status zmieniony na: ${newStatus === 'accepted' ? 'Zaakceptowany' : newStatus === 'rejected' ? 'Odrzucony' : 'Oczekuje'}`);
  };

  const handleDelete = async () => {
    if (!confirm('Czy na pewno chcesz usunąć tego uczestnika?')) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Uczestnik usunięty');
      router.push('/organization/participants');
    } catch {
      toast.error('Błąd usuwania');
    } finally {
      setIsLoading(false);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'accepted':
        return <Badge className="bg-emerald-600"><CheckCircle2 className="w-3 h-3 mr-1" />Zaakceptowany</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Odrzucony</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Oczekuje</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link href="/organization/participants" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="w-4 h-4" />
            Powrót do uczestników
          </Link>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-xl">
                {participant.firstname[0]}{participant.lastname[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{participant.firstname} {participant.lastname}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-xl">{participant.countryFlag}</span>
                <span>{participant.country}</span>
                <span>•</span>
                <StatusBadge status={status} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isLoading}>
            <Trash2 className="w-4 h-4 mr-1" />
            Usuń
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Dane osobowe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Imię</Label>
                  <p className="font-medium">{participant.firstname}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Nazwisko</Label>
                  <p className="font-medium">{participant.lastname}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Data urodzenia</Label>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(participant.dateOfBirth).toLocaleDateString('pl-PL')}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Narodowość</Label>
                  <p className="font-medium">{participant.nationality}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Kontakt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${participant.email}`} className="text-primary hover:underline">
                      {participant.email}
                    </a>
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Telefon</Label>
                  <p className="font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {participant.phone}
                  </p>
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-muted-foreground">Kontakt awaryjny</Label>
                <p className="font-medium">{participant.emergencyName}</p>
                <p className="text-sm text-muted-foreground">{participant.emergencyPhone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Health & Diet */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Zdrowie i dieta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Wymagania dietetyczne</Label>
                <p className="font-medium">{participant.specialDiet || 'Brak'}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Problemy zdrowotne</Label>
                <p className="font-medium flex items-center gap-2">
                  {participant.healthIssues !== 'Brak' && (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                  {participant.healthIssues || 'Brak'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Status aplikacji</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Oczekuje
                    </span>
                  </SelectItem>
                  <SelectItem value="accepted">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Zaakceptowany
                    </span>
                  </SelectItem>
                  <SelectItem value="rejected">
                    <span className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      Odrzucony
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>

              <div>
                <Label className="text-muted-foreground text-xs">Data aplikacji</Label>
                <p className="text-sm">{new Date(participant.appliedAt).toLocaleDateString('pl-PL')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Event */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Wydarzenie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/events/${participant.eventId}`} className="text-primary hover:underline font-medium">
                {participant.event}
              </Link>
            </CardContent>
          </Card>

          {/* Partner Organization */}
          {participant.partnerOrg && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Organizacja
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{participant.partnerOrg}</p>
              </CardContent>
            </Card>
          )}

          {/* Travel Cost */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                Koszty podróży
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="travelCost">Rzeczywisty koszt (€)</Label>
                <Input
                  id="travelCost"
                  type="number"
                  value={travelCost}
                  onChange={(e) => setTravelCost(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notatki</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Dodaj notatkę o uczestniku..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button className="w-full" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Zapisywanie...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Zapisz zmiany
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

