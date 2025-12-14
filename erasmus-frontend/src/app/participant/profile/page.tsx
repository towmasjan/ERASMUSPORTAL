'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useUser } from '@/lib/user-context';
import { User, Mail, Phone, MapPin, Calendar, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user } = useUser();

  const handleSave = () => {
    toast.success('Profil zapisany!');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Mój profil</h1>
        <p className="text-muted-foreground">Zarządzaj swoimi danymi osobowymi</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {user?.firstName?.[0] || user?.name?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user?.name || 'Uczestnik'}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Dane osobowe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Imię</Label>
              <Input id="firstName" defaultValue={user?.firstName || ''} placeholder="Jan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nazwisko</Label>
              <Input id="lastName" defaultValue={user?.lastName || ''} placeholder="Kowalski" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user?.email || ''} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" placeholder="+48 123 456 789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Data urodzenia</Label>
              <Input id="dob" type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Kraj</Label>
            <Input id="country" defaultValue={user?.country || ''} placeholder="Polska" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informacje dodatkowe</CardTitle>
          <CardDescription>Te dane pomagają organizatorom lepiej przygotować wymianę</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="diet">Wymagania dietetyczne</Label>
            <Input id="diet" placeholder="np. wegetarianin, bezglutenowe..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="health">Informacje zdrowotne</Label>
            <Textarea id="health" placeholder="Alergie, choroby przewlekłe, przyjmowane leki..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency">Kontakt awaryjny</Label>
            <Input id="emergency" placeholder="Imię i nazwisko, telefon" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>O mnie</CardTitle>
          <CardDescription>Opowiedz o sobie organizatorom</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              placeholder="Kim jestem, czym się interesuję, dlaczego chcę uczestniczyć w wymianach..." 
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="languages">Języki</Label>
            <Input id="languages" placeholder="Polski (native), Angielski (B2), Niemiecki (A2)..." />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Zapisz zmiany
        </Button>
      </div>
    </div>
  );
}

