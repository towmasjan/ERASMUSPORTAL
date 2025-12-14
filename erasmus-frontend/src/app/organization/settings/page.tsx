'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/lib/user-context';
import { Building2, Mail, Phone, Globe, MapPin, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function OrganizationSettingsPage() {
  const { user } = useUser();

  const handleSave = () => {
    toast.success('Ustawienia zapisane!');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Ustawienia organizacji</h1>
        <p className="text-muted-foreground">Zarządzaj danymi swojej organizacji</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Dane organizacji
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nazwa organizacji</Label>
            <Input id="name" defaultValue={user?.organizationName || ''} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="oid">Kod OID</Label>
              <Input id="oid" defaultValue={user?.oidCode || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Kraj</Label>
              <Input id="country" placeholder="Polska" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Opis organizacji</Label>
            <Textarea id="description" rows={4} placeholder="Krótki opis działalności organizacji..." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kontakt</CardTitle>
          <CardDescription>Dane kontaktowe widoczne dla partnerów</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact">Osoba kontaktowa</Label>
            <Input id="contact" defaultValue={user?.contactPerson || ''} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" placeholder="+48 22 123 45 67" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Strona internetowa</Label>
            <Input id="website" placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adres</Label>
            <Textarea id="address" placeholder="Ulica, miasto, kod pocztowy" rows={2} />
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

