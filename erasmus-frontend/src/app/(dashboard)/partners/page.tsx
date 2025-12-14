'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Building2, 
  Plus, 
  Search, 
  Mail, 
  MapPin, 
  Euro,
  Users,
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePartnerOrganizations, useCreatePartnerOrganization } from '@/lib/hooks';
import { PartnerOrganization } from '@/lib/api';

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
  'Czech Republic': '🇨🇿',
  'Austria': '🇦🇹',
  'Hungary': '🇭🇺',
  'Romania': '🇷🇴',
};

// Mock data for fallback when API is not available
const mockPartners: PartnerOrganization[] = [
  {
    id: 1,
    name: 'Youth Center Warsaw',
    country: 'Poland',
    oid_code: 'E10123456',
    contact_email: 'contact@ycwarsaw.pl',
    contact_person: 'Anna Kowalska',
    contact_phone: '+48 22 123 4567',
    address: 'Warsaw, Poland',
    travel_budget_limit: 5000,
    event_id: 1,
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Jugendwerk Berlin',
    country: 'Germany',
    oid_code: 'E10234567',
    contact_email: 'info@jugendwerk-berlin.de',
    contact_person: 'Hans Müller',
    contact_phone: '+49 30 987 6543',
    address: 'Berlin, Germany',
    travel_budget_limit: 4500,
    event_id: 1,
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Centro Juvenil Madrid',
    country: 'Spain',
    oid_code: 'E10345678',
    contact_email: 'hola@cjmadrid.es',
    contact_person: 'María García',
    contact_phone: '+34 91 234 5678',
    address: 'Madrid, Spain',
    travel_budget_limit: 6000,
    event_id: 1,
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Associazione Giovani Roma',
    country: 'Italy',
    oid_code: 'E10456789',
    contact_email: 'info@giovaniroma.it',
    contact_person: 'Marco Rossi',
    contact_phone: '+39 06 123 4567',
    address: 'Rome, Italy',
    travel_budget_limit: 5500,
    event_id: 1,
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Maison de la Jeunesse Paris',
    country: 'France',
    oid_code: 'E10567890',
    contact_email: 'contact@mjparis.fr',
    contact_person: 'Sophie Dubois',
    contact_phone: '+33 1 23 45 67 89',
    address: 'Paris, France',
    travel_budget_limit: 4800,
    event_id: 1,
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
  },
];

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPartner, setNewPartner] = useState({
    name: '',
    country: '',
    oid_code: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    travel_budget_limit: 0,
  });

  // Fetch from API with fallback to mock data
  const { data: apiPartners, isLoading, isError, refetch } = usePartnerOrganizations();
  const createPartner = useCreatePartnerOrganization();

  // Use API data if available, otherwise use mock data
  const partners = apiPartners || mockPartners;
  const isUsingMockData = !apiPartners || isError;

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (partner.oid_code?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  const totalBudget = partners.reduce((sum, p) => sum + (p.travel_budget_limit || 0), 0);

  const handleCreatePartner = async () => {
    try {
      await createPartner.mutateAsync({
        ...newPartner,
        event_id: 1, // Default event
        address: null,
        contact_phone: newPartner.contact_phone || null,
      });
      setIsDialogOpen(false);
      setNewPartner({
        name: '',
        country: '',
        oid_code: '',
        contact_person: '',
        contact_email: '',
        contact_phone: '',
        travel_budget_limit: 0,
      });
    } catch {
      // Error handled by mutation
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Building2 className="w-8 h-8 text-primary" />
            Partner Organizations
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your Erasmus+ partner organizations and their participants
          </p>
        </div>
        <div className="flex gap-2">
          {isUsingMockData && (
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry API
            </Button>
          )}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Partner
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Partner Organization</DialogTitle>
                <DialogDescription>
                  Register a new partner organization for your Erasmus+ project.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Organization Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Youth Center Warsaw"
                    value={newPartner.name}
                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      placeholder="Poland"
                      value={newPartner.country}
                      onChange={(e) => setNewPartner({ ...newPartner, country: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="oid">OID Code</Label>
                    <Input 
                      id="oid" 
                      placeholder="E10123456"
                      value={newPartner.oid_code}
                      onChange={(e) => setNewPartner({ ...newPartner, oid_code: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact_person">Contact Person</Label>
                  <Input 
                    id="contact_person" 
                    placeholder="Anna Kowalska"
                    value={newPartner.contact_person}
                    onChange={(e) => setNewPartner({ ...newPartner, contact_person: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="contact@org.eu"
                      value={newPartner.contact_email}
                      onChange={(e) => setNewPartner({ ...newPartner, contact_email: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      placeholder="+48 22 123 4567"
                      value={newPartner.contact_phone}
                      onChange={(e) => setNewPartner({ ...newPartner, contact_phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="budget">Travel Budget Limit (€)</Label>
                  <Input 
                    id="budget" 
                    type="number" 
                    placeholder="5000"
                    value={newPartner.travel_budget_limit || ''}
                    onChange={(e) => setNewPartner({ ...newPartner, travel_budget_limit: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePartner} disabled={createPartner.isPending}>
                  {createPartner.isPending ? 'Adding...' : 'Add Partner'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* API Status Banner */}
      {isUsingMockData && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">
            Using demo data. Connect to <strong>http://localhost:8080</strong> for live data.
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Partners
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{partners.length}</div>
                <p className="text-xs text-muted-foreground">Organizations registered</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {new Set(partners.map((p) => p.country)).size}
                </div>
                <p className="text-xs text-muted-foreground">EU member states</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">€{totalBudget.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Travel allowance</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              API Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isUsingMockData ? 'text-amber-600' : 'text-emerald-600'}`}>
              {isUsingMockData ? 'Demo' : 'Live'}
            </div>
            <p className="text-xs text-muted-foreground">
              {isUsingMockData ? 'Mock data' : 'Connected to API'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Partners Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Partners</CardTitle>
              <CardDescription>
                View and manage all partner organizations
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search partners..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>OID Code</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Budget</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPartners.map((partner) => (
                  <TableRow key={partner.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                          {countryFlags[partner.country] || '🏢'}
                        </div>
                        <div>
                          <div className="font-medium">{partner.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {partner.country}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {partner.oid_code || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{partner.contact_person || 'N/A'}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          {partner.contact_email || 'N/A'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 font-medium">
                        <Euro className="w-4 h-4 text-muted-foreground" />
                        {(partner.travel_budget_limit || 0).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
