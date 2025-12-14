'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Building2, CheckCircle2, XCircle, Clock, Eye } from 'lucide-react';

const organizations = [
  { id: 1, name: 'Youth Center Warsaw', country: '🇵🇱', oid: 'E10123456', events: 5, status: 'verified' },
  { id: 2, name: 'Eco Association Lisbon', country: '🇵🇹', oid: 'E10234567', events: 3, status: 'verified' },
  { id: 3, name: 'Youth Alliance Hungary', country: '🇭🇺', oid: 'E10345678', events: 0, status: 'pending' },
  { id: 4, name: 'Nordic Youth Council', country: '🇸🇪', oid: 'E10456789', events: 0, status: 'pending' },
  { id: 5, name: 'Fake Organization', country: '🇷🇴', oid: 'INVALID', events: 0, status: 'rejected' },
];

export default function AdminOrganizationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Organizacje</h1>
        <p className="text-slate-400">Weryfikacja i zarządzanie organizacjami</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Szukaj organizacji..." className="pl-10 bg-slate-800 border-slate-700 text-white" />
        </div>
      </div>

      <div className="grid gap-4">
        {organizations.map((org) => (
          <Card key={org.id} className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{org.country}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{org.name}</h3>
                    <Badge 
                      variant={
                        org.status === 'verified' ? 'default' : 
                        org.status === 'rejected' ? 'destructive' : 'secondary'
                      }
                    >
                      {org.status === 'verified' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {org.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                      {org.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {org.status === 'verified' ? 'Zweryfikowana' : 
                       org.status === 'rejected' ? 'Odrzucona' : 'Oczekuje'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>OID: {org.oid}</span>
                    <span>•</span>
                    <span>{org.events} wydarzeń</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {org.status === 'pending' && (
                    <>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Weryfikuj
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

