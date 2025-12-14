'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Users,
  MoreHorizontal,
  Edit,
  Copy,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import { toast } from 'sonner';

// Mock events data
const mockEvents = [
  {
    id: 1,
    name: 'Cultural Bridges 2025',
    location: 'Warszawa, Polska',
    starts_at: '2025-01-15',
    ends_at: '2025-01-22',
    participants: 32,
    maxParticipants: 40,
    status: 'published' as const,
    countries: ['🇵🇱', '🇩🇪', '🇪🇸', '🇮🇹', '🇫🇷', '🇵🇹'],
    pending: 5,
  },
  {
    id: 2,
    name: 'Green Future Youth',
    location: 'Kraków, Polska',
    starts_at: '2025-03-10',
    ends_at: '2025-03-17',
    participants: 18,
    maxParticipants: 35,
    status: 'draft' as const,
    countries: ['🇵🇱', '🇳🇱', '🇸🇪', '🇩🇰'],
    pending: 0,
  },
  {
    id: 3,
    name: 'Digital Skills Workshop',
    location: 'Gdańsk, Polska',
    starts_at: '2024-10-01',
    ends_at: '2024-10-08',
    participants: 30,
    maxParticipants: 30,
    status: 'completed' as const,
    countries: ['🇵🇱', '🇩🇪', '🇫🇷', '🇮🇹'],
    pending: 0,
  },
];

export default function OrganizationEventsPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' && event.status === 'published') ||
      (activeTab === 'draft' && event.status === 'draft') ||
      (activeTab === 'completed' && event.status === 'completed');
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: mockEvents.length,
    active: mockEvents.filter((e) => e.status === 'published').length,
    draft: mockEvents.filter((e) => e.status === 'draft').length,
    completed: mockEvents.filter((e) => e.status === 'completed').length,
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Czy na pewno chcesz usunąć wydarzenie "${name}"?`)) {
      toast.success('Wydarzenie usunięte');
    }
  };

  const handleDuplicate = (name: string) => {
    toast.success(`Skopiowano "${name}"`, {
      description: 'Wydarzenie zostało zduplikowane jako szkic.',
    });
  };

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'published':
        return (
          <Badge className="bg-emerald-600">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Opublikowane
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Szkic
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Zakończone
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Moje wydarzenia</h1>
          <p className="text-muted-foreground">Zarządzaj wymianami młodzieżowymi</p>
        </div>
        <Link href="/organization/events/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nowe wydarzenie
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
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
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Aktywnych</p>
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
                <p className="text-2xl font-bold">{stats.draft}</p>
                <p className="text-xs text-muted-foreground">Szkiców</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <XCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-xs text-muted-foreground">Zakończonych</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs & Search */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Wszystkie ({stats.total})</TabsTrigger>
            <TabsTrigger value="active">Aktywne ({stats.active})</TabsTrigger>
            <TabsTrigger value="draft">Szkice ({stats.draft})</TabsTrigger>
            <TabsTrigger value="completed">Zakończone ({stats.completed})</TabsTrigger>
          </TabsList>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj wydarzeń..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          {filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-semibold mb-2">Brak wydarzeń</h3>
                <p className="text-muted-foreground mb-4">Utwórz swoje pierwsze wydarzenie</p>
                <Link href="/organization/events/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nowe wydarzenie
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Event Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex -space-x-1">
                            {event.countries.slice(0, 4).map((flag, i) => (
                              <span key={i} className="text-xl">{flag}</span>
                            ))}
                            {event.countries.length > 4 && (
                              <span className="text-sm text-muted-foreground ml-1">+{event.countries.length - 4}</span>
                            )}
                          </div>
                          <div>
                            <Link href={`/events/${event.id}`} className="font-semibold hover:text-primary">
                              {event.name}
                            </Link>
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(event.starts_at).toLocaleDateString('pl-PL')} - {new Date(event.ends_at).toLocaleDateString('pl-PL')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-lg font-semibold">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            {event.participants}/{event.maxParticipants}
                          </div>
                          <p className="text-xs text-muted-foreground">uczestników</p>
                        </div>

                        {event.pending > 0 && (
                          <div className="text-center">
                            <Badge variant="secondary" className="text-amber-600">
                              {event.pending} oczekujących
                            </Badge>
                          </div>
                        )}

                        <StatusBadge status={event.status} />

                        {/* Actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-5 h-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/events/${event.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                Podgląd
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/organization/events/${event.id}/edit`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edytuj
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(event.name)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplikuj
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(event.id, event.name)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Usuń
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
