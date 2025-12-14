'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import {
  Search,
  Plus,
  Filter,
  Download,
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  MoreHorizontal,
  Users,
  Plane,
  AlertTriangle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Mock participants data
const mockParticipants = [
  {
    id: 1,
    firstname: 'Jan',
    lastname: 'Kowalski',
    email: 'jan.kowalski@example.com',
    country: 'Polska',
    countryFlag: '🇵🇱',
    event: 'Cultural Bridges 2025',
    eventId: 1,
    status: 'accepted' as const,
    appliedAt: '2024-12-01',
    travelCost: 250,
    healthIssues: '',
  },
  {
    id: 2,
    firstname: 'Maria',
    lastname: 'García',
    email: 'maria.garcia@example.es',
    country: 'Hiszpania',
    countryFlag: '🇪🇸',
    event: 'Cultural Bridges 2025',
    eventId: 1,
    status: 'pending' as const,
    appliedAt: '2024-12-05',
    travelCost: null,
    healthIssues: 'Alergia na orzechy',
  },
  {
    id: 3,
    firstname: 'Hans',
    lastname: 'Müller',
    email: 'hans.muller@example.de',
    country: 'Niemcy',
    countryFlag: '🇩🇪',
    event: 'Green Future 2025',
    eventId: 2,
    status: 'accepted' as const,
    appliedAt: '2024-11-28',
    travelCost: 180,
    healthIssues: '',
  },
  {
    id: 4,
    firstname: 'Sophie',
    lastname: 'Dubois',
    email: 'sophie.dubois@example.fr',
    country: 'Francja',
    countryFlag: '🇫🇷',
    event: 'Cultural Bridges 2025',
    eventId: 1,
    status: 'rejected' as const,
    appliedAt: '2024-12-02',
    travelCost: null,
    healthIssues: '',
  },
  {
    id: 5,
    firstname: 'Luca',
    lastname: 'Rossi',
    email: 'luca.rossi@example.it',
    country: 'Włochy',
    countryFlag: '🇮🇹',
    event: 'Youth Democracy 2025',
    eventId: 3,
    status: 'pending' as const,
    appliedAt: '2024-12-08',
    travelCost: null,
    healthIssues: 'Dieta wegetariańska',
  },
];

export default function ParticipantsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [eventFilter, setEventFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredParticipants = mockParticipants.filter((p) => {
    const matchesSearch =
      p.firstname.toLowerCase().includes(search.toLowerCase()) ||
      p.lastname.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesEvent = eventFilter === 'all' || p.eventId.toString() === eventFilter;
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const stats = {
    total: mockParticipants.length,
    pending: mockParticipants.filter((p) => p.status === 'pending').length,
    accepted: mockParticipants.filter((p) => p.status === 'accepted').length,
    rejected: mockParticipants.filter((p) => p.status === 'rejected').length,
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

  const handleBulkAction = (action: string) => {
    if (selectedIds.length === 0) {
      toast.error('Wybierz uczestników');
      return;
    }
    toast.success(`Wykonano akcję: ${action} dla ${selectedIds.length} uczestników`);
    setSelectedIds([]);
  };

  const handleExport = () => {
    toast.success('Eksportowanie danych...', {
      description: 'Plik CSV zostanie pobrany.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Uczestnicy</h1>
          <p className="text-muted-foreground">Zarządzaj uczestnikami Twoich wydarzeń</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Eksportuj
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Dodaj uczestnika
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Wszystkich</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Oczekujących</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.accepted}</p>
                <p className="text-xs text-muted-foreground">Zaakceptowanych</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.rejected}</p>
                <p className="text-xs text-muted-foreground">Odrzuconych</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Wszyscy ({stats.total})</TabsTrigger>
          <TabsTrigger value="pending">Oczekujący ({stats.pending})</TabsTrigger>
          <TabsTrigger value="accepted">Zaakceptowani ({stats.accepted})</TabsTrigger>
          <TabsTrigger value="rejected">Odrzuceni ({stats.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {/* Filters */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Lista uczestników</CardTitle>
                {selectedIds.length > 0 && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('accept')}>
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Akceptuj ({selectedIds.length})
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('reject')}>
                      <XCircle className="w-4 h-4 mr-1" />
                      Odrzuć
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('email')}>
                      <Mail className="w-4 h-4 mr-1" />
                      Wyślij email
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* Search and filters */}
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Szukaj po nazwisku, imieniu lub emailu..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie</SelectItem>
                    <SelectItem value="pending">Oczekujące</SelectItem>
                    <SelectItem value="accepted">Zaakceptowane</SelectItem>
                    <SelectItem value="rejected">Odrzucone</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={eventFilter} onValueChange={setEventFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Wydarzenie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie wydarzenia</SelectItem>
                    <SelectItem value="1">Cultural Bridges 2025</SelectItem>
                    <SelectItem value="2">Green Future 2025</SelectItem>
                    <SelectItem value="3">Youth Democracy 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === filteredParticipants.length && filteredParticipants.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedIds(filteredParticipants.map((p) => p.id));
                            } else {
                              setSelectedIds([]);
                            }
                          }}
                          className="rounded border-muted-foreground"
                        />
                      </TableHead>
                      <TableHead>Uczestnik</TableHead>
                      <TableHead>Kraj</TableHead>
                      <TableHead>Wydarzenie</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data aplikacji</TableHead>
                      <TableHead>Koszty</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(participant.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds([...selectedIds, participant.id]);
                              } else {
                                setSelectedIds(selectedIds.filter((id) => id !== participant.id));
                              }
                            }}
                            className="rounded border-muted-foreground"
                          />
                        </TableCell>
                        <TableCell>
                          <Link href={`/organization/participants/${participant.id}`} className="flex items-center gap-3 hover:text-primary">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                {participant.firstname[0]}{participant.lastname[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{participant.firstname} {participant.lastname}</p>
                              <p className="text-xs text-muted-foreground">{participant.email}</p>
                            </div>
                            {participant.healthIssues && (
                              <AlertTriangle className="w-4 h-4 text-amber-500" title={participant.healthIssues} />
                            )}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-2">
                            <span className="text-lg">{participant.countryFlag}</span>
                            <span className="text-sm">{participant.country}</span>
                          </span>
                        </TableCell>
                        <TableCell>
                          <Link href={`/events/${participant.eventId}`} className="text-sm hover:text-primary hover:underline">
                            {participant.event}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={participant.status} />
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(participant.appliedAt).toLocaleDateString('pl-PL')}
                        </TableCell>
                        <TableCell>
                          {participant.travelCost ? (
                            <span className="flex items-center gap-1 text-sm">
                              <Plane className="w-3 h-3" />
                              €{participant.travelCost}
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/organization/participants/${participant.id}`}>
                                  Zobacz szczegóły
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Wyślij email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {participant.status === 'pending' && (
                                <>
                                  <DropdownMenuItem className="text-emerald-600">
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Akceptuj
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Odrzuć
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredParticipants.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Brak uczestników spełniających kryteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              Filtruj listę, aby zobaczyć tylko oczekujących uczestników
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accepted">
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              Filtruj listę, aby zobaczyć tylko zaakceptowanych uczestników
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              Filtruj listę, aby zobaczyć tylko odrzuconych uczestników
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
