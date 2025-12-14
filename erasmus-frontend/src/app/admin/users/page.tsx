'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Users, Ban, Mail, Shield } from 'lucide-react';

const users = [
  { id: 1, name: 'Jan Kowalski', email: 'jan@example.com', type: 'participant', country: '🇵🇱', events: 2, status: 'active' },
  { id: 2, name: 'Maria García', email: 'maria@example.es', type: 'participant', country: '🇪🇸', events: 1, status: 'active' },
  { id: 3, name: 'Youth Center Warsaw', email: 'contact@ycw.pl', type: 'organization', country: '🇵🇱', events: 5, status: 'active' },
  { id: 4, name: 'Super Admin', email: 'admin@erasmus.eu', type: 'admin', country: '🇪🇺', events: 0, status: 'active' },
  { id: 5, name: 'Banned User', email: 'bad@spam.com', type: 'participant', country: '🇷🇺', events: 0, status: 'banned' },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Użytkownicy</h1>
        <p className="text-slate-400">Zarządzanie wszystkimi użytkownikami platformy</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Szukaj użytkowników..." className="pl-10 bg-slate-800 border-slate-700 text-white" />
        </div>
      </div>

      <div className="grid gap-3">
        {users.map((user) => (
          <Card key={user.id} className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className={`
                    ${user.type === 'admin' ? 'bg-red-600' : 
                      user.type === 'organization' ? 'bg-secondary' : 'bg-primary/20'}
                    text-white
                  `}>
                    {user.type === 'admin' ? <Shield className="w-4 h-4" /> : user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xl">{user.country}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-white">{user.name}</h4>
                    <Badge variant={
                      user.type === 'admin' ? 'destructive' : 
                      user.type === 'organization' ? 'secondary' : 'outline'
                    }>
                      {user.type === 'admin' ? 'Admin' : 
                       user.type === 'organization' ? 'Organizacja' : 'Uczestnik'}
                    </Badge>
                    {user.status === 'banned' && (
                      <Badge variant="destructive">Zablokowany</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>{user.email}</span>
                    <span>•</span>
                    <span>{user.events} wydarzeń</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <Mail className="w-4 h-4" />
                  </Button>
                  {user.status !== 'banned' && user.type !== 'admin' && (
                    <Button size="sm" variant="destructive">
                      <Ban className="w-4 h-4 mr-1" />
                      Zablokuj
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

