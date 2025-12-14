'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Search, Plus, Building2, Mail, Phone, MapPin } from 'lucide-react';

const partners = [
  {
    id: 1,
    name: 'Youth Center Berlin',
    country: '🇩🇪',
    countryName: 'Niemcy',
    oid: 'E10234567',
    email: 'contact@ycberlin.de',
    events: 3,
  },
  {
    id: 2,
    name: 'Asociación Juvenil Madrid',
    country: '🇪🇸',
    countryName: 'Hiszpania',
    oid: 'E10345678',
    email: 'info@ajmadrid.es',
    events: 2,
  },
  {
    id: 3,
    name: 'Centro Giovani Roma',
    country: '🇮🇹',
    countryName: 'Włochy',
    oid: 'E10456789',
    email: 'centro@cgroma.it',
    events: 5,
  },
];

export default function OrganizationPartnersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Partnerzy</h1>
          <p className="text-muted-foreground">Organizacje partnerskie do wspólnych projektów</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Dodaj partnera
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Szukaj partnerów..." className="pl-10" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <Card key={partner.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{partner.country}</span>
                  <div>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <CardDescription>{partner.countryName}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" />
                OID: {partner.oid}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {partner.email}
              </div>
              <div className="flex items-center justify-between pt-2">
                <Badge variant="secondary">{partner.events} wspólnych projektów</Badge>
                <Link href={`/partners/${partner.id}`}>
                  <Button variant="outline" size="sm">Szczegóły</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

