'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search, 
  Download,
  Filter,
  Plane,
  Heart,
  AlertCircle,
  CheckCircle2,
  Clock,
  Euro,
} from 'lucide-react';

// Country flag mapping
const countryFlags: Record<string, string> = {
  'Poland': '🇵🇱',
  'Germany': '🇩🇪',
  'Spain': '🇪🇸',
  'Italy': '🇮🇹',
  'France': '🇫🇷',
  'Portugal': '🇵🇹',
  'Netherlands': '🇳🇱',
  'Belgium': '🇧🇪',
};

// Mock participants data
const mockParticipants = [
  {
    id: 1,
    firstname: 'Anna',
    lastname: 'Kowalska',
    email: 'anna.k@example.pl',
    nationality: 'Poland',
    date_of_birth: '1998-05-15',
    partner_organization: 'Youth Center Warsaw',
    special_diet_needs: null,
    health_issues: null,
    actual_travel_cost: 320,
    emergency_contact_name: 'Jan Kowalski',
    emergency_contact_phone: '+48 123 456 789',
    status: 'confirmed',
  },
  {
    id: 2,
    firstname: 'Hans',
    lastname: 'Müller',
    email: 'hans.m@example.de',
    nationality: 'Germany',
    date_of_birth: '1999-08-22',
    partner_organization: 'Jugendwerk Berlin',
    special_diet_needs: 'Vegetarian',
    health_issues: null,
    actual_travel_cost: 280,
    emergency_contact_name: 'Petra Müller',
    emergency_contact_phone: '+49 30 123 4567',
    status: 'confirmed',
  },
  {
    id: 3,
    firstname: 'María',
    lastname: 'García',
    email: 'maria.g@example.es',
    nationality: 'Spain',
    date_of_birth: '2000-03-10',
    partner_organization: 'Centro Juvenil Madrid',
    special_diet_needs: null,
    health_issues: 'Asthma',
    actual_travel_cost: null,
    emergency_contact_name: 'Carlos García',
    emergency_contact_phone: '+34 612 345 678',
    status: 'pending',
  },
  {
    id: 4,
    firstname: 'Marco',
    lastname: 'Rossi',
    email: 'marco.r@example.it',
    nationality: 'Italy',
    date_of_birth: '1997-11-28',
    partner_organization: 'Associazione Giovani Roma',
    special_diet_needs: 'Gluten-free',
    health_issues: null,
    actual_travel_cost: 350,
    emergency_contact_name: 'Laura Rossi',
    emergency_contact_phone: '+39 333 123 4567',
    status: 'confirmed',
  },
  {
    id: 5,
    firstname: 'Sophie',
    lastname: 'Dubois',
    email: 'sophie.d@example.fr',
    nationality: 'France',
    date_of_birth: '1999-07-05',
    partner_organization: 'Maison de la Jeunesse Paris',
    special_diet_needs: 'Vegan',
    health_issues: 'Peanut allergy',
    actual_travel_cost: 290,
    emergency_contact_name: 'Pierre Dubois',
    emergency_contact_phone: '+33 6 12 34 56 78',
    status: 'confirmed',
  },
  {
    id: 6,
    firstname: 'João',
    lastname: 'Silva',
    email: 'joao.s@example.pt',
    nationality: 'Portugal',
    date_of_birth: '1998-12-18',
    partner_organization: 'Associação Jovem Lisboa',
    special_diet_needs: null,
    health_issues: null,
    actual_travel_cost: null,
    emergency_contact_name: 'Maria Silva',
    emergency_contact_phone: '+351 912 345 678',
    status: 'pending',
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'confirmed':
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Confirmed
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="text-amber-600 border-amber-300">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default function ParticipantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredParticipants = mockParticipants.filter((p) => {
    const matchesSearch =
      `${p.firstname} ${p.lastname}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nationality.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'confirmed') return matchesSearch && p.status === 'confirmed';
    if (activeTab === 'pending') return matchesSearch && p.status === 'pending';
    if (activeTab === 'special') return matchesSearch && (p.special_diet_needs || p.health_issues);
    return matchesSearch;
  });

  const confirmedCount = mockParticipants.filter((p) => p.status === 'confirmed').length;
  const pendingCount = mockParticipants.filter((p) => p.status === 'pending').length;
  const specialNeedsCount = mockParticipants.filter((p) => p.special_diet_needs || p.health_issues).length;
  const totalTravelCost = mockParticipants.reduce((sum, p) => sum + (p.actual_travel_cost || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Participants
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage youth exchange participants and their information
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockParticipants.length}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-emerald-600">{confirmedCount} confirmed</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-amber-600">{pendingCount} pending</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(mockParticipants.map((p) => p.nationality)).size}
            </div>
            <div className="flex gap-1 mt-1">
              {[...new Set(mockParticipants.map((p) => p.nationality))].slice(0, 5).map((country) => (
                <span key={country} className="text-lg">{countryFlags[country]}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Special Needs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{specialNeedsCount}</div>
            <p className="text-xs text-muted-foreground">Dietary or health requirements</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Travel Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-1">
              <Euro className="w-5 h-5" />
              {totalTravelCost.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Submitted reimbursements</p>
          </CardContent>
        </Card>
      </div>

      {/* Participants Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>All Participants</CardTitle>
                <CardDescription>
                  View and manage participant details
                </CardDescription>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search participants..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">
                  All ({mockParticipants.length})
                </TabsTrigger>
                <TabsTrigger value="confirmed">
                  Confirmed ({confirmedCount})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({pendingCount})
                </TabsTrigger>
                <TabsTrigger value="special">
                  Special Needs ({specialNeedsCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Special Needs</TableHead>
                <TableHead className="text-right">Travel Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParticipants.map((participant) => (
                <TableRow key={participant.id} className="group cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {participant.firstname[0]}{participant.lastname[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {participant.firstname} {participant.lastname}
                          <span className="text-lg">{countryFlags[participant.nationality]}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {participant.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{participant.partner_organization}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {calculateAge(participant.date_of_birth)} years
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(participant.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {participant.special_diet_needs && (
                        <Badge variant="secondary" className="text-xs">
                          <Heart className="w-3 h-3 mr-1" />
                          {participant.special_diet_needs}
                        </Badge>
                      )}
                      {participant.health_issues && (
                        <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {participant.health_issues}
                        </Badge>
                      )}
                      {!participant.special_diet_needs && !participant.health_issues && (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {participant.actual_travel_cost ? (
                      <div className="flex items-center justify-end gap-1 font-medium text-emerald-600">
                        <Plane className="w-4 h-4" />
                        €{participant.actual_travel_cost}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">Not submitted</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

