'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { EuStars } from '@/components/eu-stars';
import { Loader2, ArrowLeft, Users, Building2, Shield } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useUser, UserRole } from '@/lib/user-context';

export default function LoginPage() {
  const { login, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState<string>('participant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent, role: UserRole) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Wprowadź email i hasło');
      return;
    }

    try {
      await login(email, password, role);
      toast.success('Zalogowano pomyślnie!');
    } catch {
      toast.error('Błąd logowania', {
        description: 'Sprawdź dane logowania.',
      });
    }
  };

  const handleGoogleLogin = () => {
    toast.info('Logowanie Google', {
      description: 'Funkcja w przygotowaniu...',
    });
  };

  const renderLoginForm = (role: UserRole, title: string, description: string, showGoogle: boolean = true) => (
    <form onSubmit={(e) => handleSubmit(e, role)} className="space-y-4">
      {showGoogle && (
        <>
          <Button
            type="button"
            variant="outline"
            className="w-full h-11"
            onClick={handleGoogleLogin}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Zaloguj przez Google
          </Button>
          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
              lub
            </span>
          </div>
        </>
      )}
      
      <div className="space-y-2">
        <Label htmlFor={`email-${role}`}>Email</Label>
        <Input
          id={`email-${role}`}
          type="email"
          placeholder="twoj.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`password-${role}`}>Hasło</Label>
        <Input
          id={`password-${role}`}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Logowanie...
          </>
        ) : (
          'Zaloguj się'
        )}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 opacity-5">
          <EuStars className="w-full h-full text-primary" />
        </div>
      </div>

      {/* Header */}
      <header className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Powrót do strony głównej
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-2">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <EuStars className="w-9 h-9 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Zaloguj się</CardTitle>
            <CardDescription>
              Wybierz typ konta i zaloguj się do portalu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="participant" className="text-xs sm:text-sm">
                  <Users className="w-4 h-4 mr-1 hidden sm:inline" />
                  Uczestnik
                </TabsTrigger>
                <TabsTrigger value="organization" className="text-xs sm:text-sm">
                  <Building2 className="w-4 h-4 mr-1 hidden sm:inline" />
                  Organizacja
                </TabsTrigger>
                <TabsTrigger value="admin" className="text-xs sm:text-sm">
                  <Shield className="w-4 h-4 mr-1 hidden sm:inline" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="participant">
                {renderLoginForm('participant', 'Uczestnik', 'Zaloguj się jako uczestnik wymiany')}
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Nie masz konta?{' '}
                  <Link href="/register/participant" className="text-primary hover:underline">
                    Zarejestruj się
                  </Link>
                </p>
              </TabsContent>

              <TabsContent value="organization">
                {renderLoginForm('organization', 'Organizacja', 'Zaloguj się jako organizacja')}
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Nie masz konta?{' '}
                  <Link href="/register/organization" className="text-primary hover:underline">
                    Zarejestruj organizację
                  </Link>
                </p>
              </TabsContent>

              <TabsContent value="admin">
                {renderLoginForm('admin', 'Administrator', 'Panel administratora', false)}
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Dostęp tylko dla administratorów systemu
                </p>
              </TabsContent>
            </Tabs>

            {/* Demo credentials */}
            <div className="mt-6 p-3 rounded-lg bg-muted/50 border border-dashed text-xs">
              <p className="font-medium mb-2 text-center">Konta demo:</p>
              <div className="space-y-1 text-muted-foreground">
                <p>👤 participant@demo.eu / demo123</p>
                <p>🏢 organization@demo.eu / demo123</p>
                <p>🔐 admin@erasmus.eu / admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground">
        <span>🇪🇺 Współfinansowane przez Unię Europejską</span>
      </footer>
    </div>
  );
}
