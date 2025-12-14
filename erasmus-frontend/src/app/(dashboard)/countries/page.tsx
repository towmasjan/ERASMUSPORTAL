'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Users,
  Building2,
  TrendingUp,
} from 'lucide-react';

const countries = [
  { name: 'Poland', flag: '🇵🇱', participants: 32, organizations: 3, code: 'PL' },
  { name: 'Germany', flag: '🇩🇪', participants: 28, organizations: 2, code: 'DE' },
  { name: 'Spain', flag: '🇪🇸', participants: 25, organizations: 2, code: 'ES' },
  { name: 'Italy', flag: '🇮🇹', participants: 22, organizations: 2, code: 'IT' },
  { name: 'France', flag: '🇫🇷', participants: 18, organizations: 1, code: 'FR' },
  { name: 'Portugal', flag: '🇵🇹', participants: 15, organizations: 1, code: 'PT' },
  { name: 'Netherlands', flag: '🇳🇱', participants: 12, organizations: 1, code: 'NL' },
  { name: 'Belgium', flag: '🇧🇪', participants: 10, organizations: 1, code: 'BE' },
];

export default function CountriesPage() {
  const totalParticipants = countries.reduce((sum, c) => sum + c.participants, 0);
  const totalOrganizations = countries.reduce((sum, c) => sum + c.organizations, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Globe className="w-8 h-8 text-primary" />
          Countries
        </h1>
        <p className="text-muted-foreground mt-1">
          Partner countries in your Erasmus+ projects
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countries.length}</div>
            <p className="text-xs text-muted-foreground">EU member states</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalParticipants}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="w-3 h-3" />
              Growing network
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrganizations}</div>
            <p className="text-xs text-muted-foreground">Partner organizations</p>
          </CardContent>
        </Card>
      </div>

      {/* Countries Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Country Overview</CardTitle>
          <CardDescription>Participants and organizations by country</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {countries.map((country) => (
              <div
                key={country.code}
                className="p-4 rounded-xl border-2 hover:border-primary/20 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <h3 className="font-semibold">{country.name}</h3>
                    <Badge variant="outline" className="text-xs">{country.code}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-3 h-3" />
                    {country.participants}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Building2 className="w-3 h-3" />
                    {country.organizations}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

