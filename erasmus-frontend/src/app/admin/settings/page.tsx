'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save, Shield, Mail, Globe, Database, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const handleSave = () => {
    toast.success('Ustawienia zapisane!');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Ustawienia systemu</h1>
        <p className="text-slate-400">Konfiguracja platformy Erasmus+ Youth Exchange</p>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Ustawienia ogólne
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName" className="text-slate-300">Nazwa platformy</Label>
            <Input 
              id="siteName" 
              defaultValue="Erasmus+ Youth Exchange Portal" 
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteUrl" className="text-slate-300">URL platformy</Label>
            <Input 
              id="siteUrl" 
              defaultValue="https://erasmus-youth.eu" 
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-300">Tryb konserwacji</Label>
              <p className="text-sm text-slate-500">Wyłącz dostęp dla użytkowników</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Powiadomienia email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="smtpHost" className="text-slate-300">SMTP Host</Label>
            <Input 
              id="smtpHost" 
              placeholder="smtp.example.com" 
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtpUser" className="text-slate-300">SMTP User</Label>
              <Input 
                id="smtpUser" 
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPass" className="text-slate-300">SMTP Password</Label>
              <Input 
                id="smtpPass" 
                type="password" 
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-300">Włącz powiadomienia email</Label>
              <p className="text-sm text-slate-500">Wysyłaj email przy nowych aplikacjach</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Bezpieczeństwo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-300">Wymagaj weryfikacji email</Label>
              <p className="text-sm text-slate-500">Nowi użytkownicy muszą potwierdzić email</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-300">Weryfikacja organizacji</Label>
              <p className="text-sm text-slate-500">Wymagaj weryfikacji OID</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-300">Moderacja wydarzeń</Label>
              <p className="text-sm text-slate-500">Wymagaj zatwierdzenia nowych wydarzeń</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-red-900/50 border">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Strefa niebezpieczna
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-300">Wyczyść cache</Label>
              <p className="text-sm text-slate-500">Usuń tymczasowe pliki systemu</p>
            </div>
            <Button variant="outline" className="border-slate-700 text-slate-300">
              Wyczyść
            </Button>
          </div>
          <Separator className="bg-slate-800" />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-300">Eksportuj dane</Label>
              <p className="text-sm text-slate-500">Pobierz backup bazy danych</p>
            </div>
            <Button variant="outline" className="border-slate-700 text-slate-300">
              <Database className="w-4 h-4 mr-2" />
              Eksportuj
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Zapisz ustawienia
        </Button>
      </div>
    </div>
  );
}

