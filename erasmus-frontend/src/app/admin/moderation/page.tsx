'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, AlertTriangle, Eye, Flag, Calendar, Building2 } from 'lucide-react';

const pendingEvents = [
  { id: 1, name: 'Eco Warriors Summit', org: 'Green Youth Poland', date: '2025-03-15', flags: 0 },
  { id: 2, name: 'Youth Democracy Forum', org: 'Civic Youth Network', date: '2025-04-20', flags: 1 },
];

const pendingOrganizations = [
  { id: 1, name: 'Youth Alliance Hungary', country: '🇭🇺', oid: 'E10345678', date: '2024-12-10' },
  { id: 2, name: 'Nordic Youth Council', country: '🇸🇪', oid: 'E10456789', date: '2024-12-08' },
];

const flaggedContent = [
  { id: 1, type: 'event', name: 'Suspicious Gathering', reason: 'Nieodpowiednia treść', reports: 3 },
  { id: 2, type: 'user', name: 'spam_user@fake.com', reason: 'Spam/Fałszywe konto', reports: 5 },
];

export default function AdminModerationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Moderacja</h1>
        <p className="text-slate-400">Weryfikacja treści i zgłoszeń</p>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="bg-slate-800">
          <TabsTrigger value="events" className="data-[state=active]:bg-slate-700">
            <Calendar className="w-4 h-4 mr-2" />
            Wydarzenia ({pendingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="organizations" className="data-[state=active]:bg-slate-700">
            <Building2 className="w-4 h-4 mr-2" />
            Organizacje ({pendingOrganizations.length})
          </TabsTrigger>
          <TabsTrigger value="flagged" className="data-[state=active]:bg-slate-700">
            <Flag className="w-4 h-4 mr-2" />
            Zgłoszenia ({flaggedContent.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Wydarzenia do weryfikacji</CardTitle>
              <CardDescription className="text-slate-400">Nowe wydarzenia wymagające zatwierdzenia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{event.name}</h4>
                        {event.flags > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {event.flags} zgłoszeń
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">{event.org} • {event.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-slate-400">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Zatwierdź
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizations" className="mt-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Organizacje do weryfikacji</CardTitle>
              <CardDescription className="text-slate-400">Nowe organizacje wymagające weryfikacji OID</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingOrganizations.map((org) => (
                  <div key={org.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{org.country}</span>
                      <div>
                        <h4 className="font-medium text-white">{org.name}</h4>
                        <p className="text-sm text-slate-400">OID: {org.oid} • Złożono: {org.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-slate-400">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Weryfikuj
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged" className="mt-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Zgłoszone treści</CardTitle>
              <CardDescription className="text-slate-400">Treści zgłoszone przez użytkowników</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flaggedContent.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border-l-4 border-red-500">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-slate-400 border-slate-600">
                          {item.type === 'event' ? 'Wydarzenie' : 'Użytkownik'}
                        </Badge>
                        <Badge variant="destructive">{item.reports} zgłoszeń</Badge>
                      </div>
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <p className="text-sm text-slate-400">Powód: {item.reason}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-slate-400">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                        Odrzuć zgłoszenie
                      </Button>
                      <Button size="sm" variant="destructive">
                        Usuń treść
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

