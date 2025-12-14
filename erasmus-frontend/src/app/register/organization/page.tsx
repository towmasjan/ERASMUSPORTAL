'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { EuStars } from '@/components/eu-stars';
import { Loader2, ArrowLeft, Building2, Globe, Users, Calendar, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { api } from '@/lib/api';

const countries = [
  { code: 'PL', name: 'Polska', flag: '🇵🇱' },
  { code: 'DE', name: 'Niemcy', flag: '🇩🇪' },
  { code: 'ES', name: 'Hiszpania', flag: '🇪🇸' },
  { code: 'IT', name: 'Włochy', flag: '🇮🇹' },
  { code: 'FR', name: 'Francja', flag: '🇫🇷' },
  { code: 'PT', name: 'Portugalia', flag: '🇵🇹' },
  { code: 'NL', name: 'Holandia', flag: '🇳🇱' },
  { code: 'BE', name: 'Belgia', flag: '🇧🇪' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'CZ', name: 'Czechy', flag: '🇨🇿' },
  { code: 'HU', name: 'Węgry', flag: '🇭🇺' },
  { code: 'SE', name: 'Szwecja', flag: '🇸🇪' },
  { code: 'DK', name: 'Dania', flag: '🇩🇰' },
  { code: 'FI', name: 'Finlandia', flag: '🇫🇮' },
  { code: 'IE', name: 'Irlandia', flag: '🇮🇪' },
  { code: 'GR', name: 'Grecja', flag: '🇬🇷' },
];

export default function OrganizationRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [useMockApi, setUseMockApi] = useState(true);
  const [formData, setFormData] = useState({
    organizationName: '',
    country: '',
    oidCode: '',
    contactPerson: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Hasła nie są identyczne');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Hasło musi mieć co najmniej 6 znaków');
      return;
    }
    
    setIsLoading(true);

    try {
      if (useMockApi) {
        // Mock API - simulate success
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success('Rejestracja zakończona!', {
          description: 'Twoja organizacja została zarejestrowana. Możesz się teraz zalogować.',
        });
      } else {
        // Real API registration
        // First create user account
        await api.register({
          email: formData.email,
          password: formData.password,
          first_name: formData.contactPerson.split(' ')[0] || formData.organizationName,
          last_name: formData.contactPerson.split(' ').slice(1).join(' ') || '',
        });
        toast.success('Rejestracja zakończona!', {
          description: 'Sprawdź email, aby potwierdzić konto. Po weryfikacji będziesz mógł dodać organizację.',
        });
      }
      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Błąd rejestracji', {
        description: error instanceof Error ? error.message : 'Spróbuj ponownie później.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    toast.info('Logowanie Google', {
      description: 'Funkcja w przygotowaniu...',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 opacity-5">
          <EuStars className="w-full h-full text-secondary" />
        </div>
        <div className="absolute bottom-20 left-20 w-48 h-48 opacity-5">
          <EuStars className="w-full h-full text-primary" />
        </div>
      </div>

      {/* Header */}
      <header className="p-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Powrót do strony głównej
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Benefits */}
          <div className="hidden lg:block">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">
                Dołącz jako <span className="text-secondary">organizacja</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Zarejestruj swoją organizację i realizuj projekty Erasmus+
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Znajdź partnerów</h3>
                  <p className="text-sm text-muted-foreground">
                    Nawiąż współpracę z organizacjami z całej Europy
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Rekrutuj uczestników</h3>
                  <p className="text-sm text-muted-foreground">
                    Łatwo zarządzaj rekrutacją uczestników online
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Zarządzaj projektami</h3>
                  <p className="text-sm text-muted-foreground">
                    Wszystkie projekty w jednym miejscu
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Dofinansowanie UE</h3>
                  <p className="text-sm text-muted-foreground">
                    Uzyskaj wsparcie finansowe z programu Erasmus+
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 rounded-xl bg-muted/50 border">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇪🇺</span>
                <p className="text-sm text-muted-foreground">
                  Program Erasmus+ jest współfinansowany przez Unię Europejską
                </p>
              </div>
            </div>
          </div>
          
          {/* Right side - Form */}
          <Card className="shadow-xl border-2">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Rejestracja organizacji</CardTitle>
              <CardDescription>
                Zarejestruj swoją organizację w portalu Erasmus+
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Google Register Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 mb-4"
                onClick={handleGoogleRegister}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Zarejestruj przez Google
              </Button>
              
              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  lub wypełnij formularz
                </span>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Nazwa organizacji</Label>
                  <Input
                    id="organizationName"
                    placeholder="Stowarzyszenie Młodzieżowe XYZ"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Kraj</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData({ ...formData, country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz kraj" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="oidCode">Kod OID (opcjonalnie)</Label>
                    <Input
                      id="oidCode"
                      placeholder="E10XXXXXX"
                      value={formData.oidCode}
                      onChange={(e) => setFormData({ ...formData, oidCode: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Osoba kontaktowa</Label>
                  <Input
                    id="contactPerson"
                    placeholder="Jan Kowalski"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="kontakt@organizacja.pl"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon (opcjonalnie)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+48 123 456 789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Hasło</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                {/* Dev mode toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-dashed">
                  <div>
                    <Label className="text-xs">Tryb Mock API</Label>
                    <p className="text-xs text-muted-foreground">Symulacja bez backendu</p>
                  </div>
                  <Switch checked={useMockApi} onCheckedChange={setUseMockApi} />
                </div>
                
                <Button
                  type="submit"
                  className="w-full h-11 bg-secondary hover:bg-secondary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Rejestracja...
                    </>
                  ) : (
                    <>
                      <Building2 className="w-4 h-4 mr-2" />
                      Zarejestruj organizację
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>
                  Masz już konto?{' '}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Zaloguj się
                  </Link>
                </p>
              </div>
              
              <div className="mt-4 text-center">
                <Link href="/register/participant" className="text-sm text-muted-foreground hover:text-foreground">
                  Jesteś uczestnikiem? <span className="text-primary">Zarejestruj się jako uczestnik</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

