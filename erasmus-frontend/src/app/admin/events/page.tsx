'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Calendar, Users, MapPin, Eye, Ban, CheckCircle2, AlertTriangle } from 'lucide-react';

const events = [
  { id: 1, name: 'Cultural Bridges 2025', org: 'Youth Center Warsaw', date: '15-22 sty 2025', participants: 32, status: 'approved', countries: ['🇵🇱', '🇩🇪', '🇪🇸'] },
  { id: 2, name: 'Green Future Youth', org: 'Eco Association Lisbon', date: '5-12 lut 2025', participants: 28, status: 'approved', countries: ['🇵🇹', '🇵🇱', '🇳🇱'] },
  { id: 3, name: 'Suspicious Event', org: 'Unknown Org', date: '1-5 mar 2025', participants: 5, status: 'flagged', countries: ['🇷🇴'] },
  { id: 4, name: 'Digital Skills Camp', org: 'Tech Youth Berlin', date: '10-17 kwi 2025', participants: 40, status: 'pending', countries: ['🇩🇪', '🇵🇱', '🇫🇷', '🇮🇹'] },
];

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Wszystkie wydarzenia</h1>
        <p className="text-slate-400">Moderacja i zarządzanie wydarzeniami na platformie</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Szukaj wydarzeń..." className="pl-10 bg-slate-800 border-slate-700 text-white" />
        </div>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant={
                        event.status === 'approved' ? 'default' : 
                        event.status === 'flagged' ? 'destructive' : 'secondary'
                      }
                    >
                      {event.status === 'approved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {event.status === 'flagged' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {event.status === 'approved' ? 'Zatwierdzone' : 
                       event.status === 'flagged' ? 'Zgłoszone' : 'Oczekuje'}
                    </Badge>
                    <div className="flex gap-0.5">
                      {event.countries.map((flag, i) => (
                        <span key={i} className="text-sm">{flag}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-white">{event.name}</h3>
                  <p className="text-sm text-slate-400 mb-2">{event.org}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.participants} uczestników
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {event.status === 'pending' && (
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Zatwierdź
                    </Button>
                  )}
                  {event.status !== 'approved' && (
                    <Button size="sm" variant="destructive">
                      <Ban className="w-4 h-4" />
                    </Button>
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

