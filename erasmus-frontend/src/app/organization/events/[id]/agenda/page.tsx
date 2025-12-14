'use client';

import { useState, use } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  Calendar,
  Clock,
  MapPin,
  User,
  Edit,
  Trash2,
  MoreHorizontal,
  Loader2,
  Download,
  GripVertical,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface Session {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  facilitator: string;
  type: 'workshop' | 'integration' | 'meal' | 'freetime' | 'evaluation' | 'ceremony' | 'other';
}

const sessionTypes = [
  { value: 'workshop', label: 'Warsztat', color: 'bg-primary' },
  { value: 'integration', label: 'Integracja', color: 'bg-purple-500' },
  { value: 'meal', label: 'Posiłek', color: 'bg-amber-500' },
  { value: 'freetime', label: 'Czas wolny', color: 'bg-emerald-500' },
  { value: 'evaluation', label: 'Ewaluacja', color: 'bg-blue-500' },
  { value: 'ceremony', label: 'Ceremonia', color: 'bg-pink-500' },
  { value: 'other', label: 'Inne', color: 'bg-gray-500' },
];

// Mock data
const mockSessions: Session[] = [
  {
    id: 1,
    title: 'Rejestracja i zakwaterowanie',
    description: 'Przyjazd uczestników, przydzielenie pokoi, wręczenie pakietów powitalnych',
    date: '2025-01-15',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Recepcja',
    facilitator: '',
    type: 'other',
  },
  {
    id: 2,
    title: 'Uroczyste otwarcie',
    description: 'Powitanie uczestników, przedstawienie programu, zasady bezpieczeństwa',
    date: '2025-01-15',
    startTime: '16:30',
    endTime: '18:00',
    location: 'Sala konferencyjna',
    facilitator: 'Anna Kowalska',
    type: 'ceremony',
  },
  {
    id: 3,
    title: 'Kolacja powitalna',
    description: 'Wspólna kolacja z prezentacją krajów uczestniczących',
    date: '2025-01-15',
    startTime: '18:30',
    endTime: '20:00',
    location: 'Restauracja',
    facilitator: '',
    type: 'meal',
  },
  {
    id: 4,
    title: 'Ice-breakers i gry integracyjne',
    description: 'Zabawy na poznanie się, budowanie zespołu',
    date: '2025-01-15',
    startTime: '20:00',
    endTime: '22:00',
    location: 'Sala aktywności',
    facilitator: 'Piotr Nowak',
    type: 'integration',
  },
  {
    id: 5,
    title: 'Śniadanie',
    description: '',
    date: '2025-01-16',
    startTime: '08:00',
    endTime: '09:00',
    location: 'Restauracja',
    facilitator: '',
    type: 'meal',
  },
  {
    id: 6,
    title: 'Warsztat: Komunikacja międzykulturowa',
    description: 'Nauka skutecznej komunikacji w środowisku międzynarodowym',
    date: '2025-01-16',
    startTime: '09:30',
    endTime: '12:30',
    location: 'Sala A',
    facilitator: 'Maria García',
    type: 'workshop',
  },
  {
    id: 7,
    title: 'Obiad',
    description: '',
    date: '2025-01-16',
    startTime: '12:30',
    endTime: '14:00',
    location: 'Restauracja',
    facilitator: '',
    type: 'meal',
  },
  {
    id: 8,
    title: 'Czas wolny / Aktywności opcjonalne',
    description: 'Zwiedzanie miasta lub odpoczynek',
    date: '2025-01-16',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Różne',
    facilitator: '',
    type: 'freetime',
  },
];

export default function EventAgendaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [facilitator, setFacilitator] = useState('');
  const [type, setType] = useState<Session['type']>('workshop');

  // Get unique dates
  const uniqueDates = [...new Set(sessions.map(s => s.date))].sort();
  const filteredSessions = selectedDate 
    ? sessions.filter(s => s.date === selectedDate)
    : sessions;

  // Group sessions by date
  const sessionsByDate = filteredSessions.reduce((acc, session) => {
    if (!acc[session.date]) {
      acc[session.date] = [];
    }
    acc[session.date].push(session);
    return acc;
  }, {} as Record<string, Session[]>);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setLocation('');
    setFacilitator('');
    setType('workshop');
    setEditingSession(null);
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setTitle(session.title);
    setDescription(session.description);
    setDate(session.date);
    setStartTime(session.startTime);
    setEndTime(session.endTime);
    setLocation(session.location);
    setFacilitator(session.facilitator);
    setType(session.type);
    setIsDialogOpen(true);
  };

  const handleDelete = (sessionId: number) => {
    if (confirm('Czy na pewno chcesz usunąć tę sesję?')) {
      setSessions(sessions.filter(s => s.id !== sessionId));
      toast.success('Sesja usunięta');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingSession) {
        setSessions(sessions.map(s => 
          s.id === editingSession.id 
            ? { ...s, title, description, date, startTime, endTime, location, facilitator, type }
            : s
        ));
        toast.success('Sesja zaktualizowana');
      } else {
        const newSession: Session = {
          id: Math.max(...sessions.map(s => s.id), 0) + 1,
          title,
          description,
          date,
          startTime,
          endTime,
          location,
          facilitator,
          type,
        };
        setSessions([...sessions, newSession].sort((a, b) => {
          if (a.date !== b.date) return a.date.localeCompare(b.date);
          return a.startTime.localeCompare(b.startTime);
        }));
        toast.success('Sesja dodana');
      }

      resetForm();
      setIsDialogOpen(false);
    } catch {
      toast.error('Wystąpił błąd');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    toast.success('Eksportowanie agendy...', {
      description: 'Plik PDF zostanie pobrany.',
    });
  };

  const getTypeInfo = (type: Session['type']) => {
    return sessionTypes.find(t => t.value === type) || sessionTypes[6];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/organization/events`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="w-4 h-4" />
            Powrót do wydarzeń
          </Link>
          <h1 className="text-2xl font-bold">Agenda wydarzenia</h1>
          <p className="text-muted-foreground">Zarządzaj harmonogramem sesji i aktywności</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Eksportuj PDF
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Dodaj sesję
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingSession ? 'Edytuj sesję' : 'Nowa sesja'}</DialogTitle>
                <DialogDescription>
                  {editingSession ? 'Zmień szczegóły sesji' : 'Dodaj nową aktywność do harmonogramu'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tytuł *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="np. Warsztat komunikacji"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Typ sesji</Label>
                  <Select value={type} onValueChange={(v) => setType(v as Session['type'])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionTypes.map(t => (
                        <SelectItem key={t.value} value={t.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${t.color}`} />
                            {t.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Opis</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Szczegóły sesji..."
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Początek *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Koniec *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Lokalizacja</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="np. Sala A"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facilitator">Prowadzący</Label>
                    <Input
                      id="facilitator"
                      value={facilitator}
                      onChange={(e) => setFacilitator(e.target.value)}
                      placeholder="Imię i nazwisko"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                    Anuluj
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Zapisywanie...
                      </>
                    ) : (
                      editingSession ? 'Zapisz zmiany' : 'Dodaj sesję'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Date filter */}
      <div className="flex gap-2 flex-wrap">
        <Button 
          variant={selectedDate === null ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedDate(null)}
        >
          Wszystkie dni
        </Button>
        {uniqueDates.map(d => (
          <Button 
            key={d} 
            variant={selectedDate === d ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedDate(d)}
          >
            {new Date(d).toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'short' })}
          </Button>
        ))}
      </div>

      {/* Timeline */}
      {Object.entries(sessionsByDate).sort(([a], [b]) => a.localeCompare(b)).map(([dateStr, daySessions]) => (
        <Card key={dateStr}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {new Date(dateStr).toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </CardTitle>
            <CardDescription>{daySessions.length} sesji zaplanowanych</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {daySessions.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((session) => {
                const typeInfo = getTypeInfo(session.type);
                return (
                  <div 
                    key={session.id} 
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border-l-4 hover:bg-muted transition-colors"
                    style={{ borderLeftColor: `var(--${typeInfo.color.replace('bg-', '')})` }}
                  >
                    <div className="flex items-center gap-1 text-muted-foreground cursor-grab">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="text-center min-w-[80px]">
                      <p className="font-mono font-bold">{session.startTime}</p>
                      <p className="text-xs text-muted-foreground">- {session.endTime}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{session.title}</h4>
                        <Badge variant="secondary" className={`${typeInfo.color} text-white text-xs`}>
                          {typeInfo.label}
                        </Badge>
                      </div>
                      {session.description && (
                        <p className="text-sm text-muted-foreground mb-2">{session.description}</p>
                      )}
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        {session.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {session.location}
                          </span>
                        )}
                        {session.facilitator && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {session.facilitator}
                          </span>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(session)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edytuj
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(session.id)} className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Usuń
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredSessions.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-semibold mb-2">Brak sesji</h3>
            <p className="text-muted-foreground mb-4">Dodaj pierwszą sesję do harmonogramu wydarzenia</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Dodaj sesję
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

