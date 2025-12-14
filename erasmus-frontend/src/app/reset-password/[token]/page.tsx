'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EuStars } from '@/components/eu-stars';
import Link from 'next/link';
import { KeyRound, Loader2, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Hasła nie są identyczne');
      return;
    }

    if (password.length < 8) {
      toast.error('Hasło musi mieć co najmniej 8 znaków');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In real app: await api.resetPassword(token, password);
      
      setIsSuccess(true);
      toast.success('Hasło zostało zmienione!');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch {
      toast.error('Błąd resetowania hasła', {
        description: 'Link mógł wygasnąć. Spróbuj ponownie.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 opacity-5">
          <EuStars className="w-full h-full text-primary" />
        </div>
      </div>

      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isSuccess ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-primary/10'}`}>
              {isSuccess ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              ) : (
                <KeyRound className="w-8 h-8 text-primary" />
              )}
            </div>
          </div>
          
          <CardTitle className="text-2xl">
            {isSuccess ? 'Hasło zmienione!' : 'Ustaw nowe hasło'}
          </CardTitle>
          <CardDescription>
            {isSuccess 
              ? 'Teraz możesz zalogować się z nowym hasłem'
              : 'Wprowadź nowe hasło dla swojego konta'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nowe hasło</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimum 8 znaków
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Zapisywanie...
                  </>
                ) : (
                  'Ustaw nowe hasło'
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-center">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Za chwilę zostaniesz przekierowany do strony logowania...
                </p>
              </div>

              <Link href="/login">
                <Button className="w-full">
                  Przejdź do logowania
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="mt-8 text-sm text-muted-foreground text-center">
        🇪🇺 Erasmus+ Youth Exchange Portal
      </p>
    </div>
  );
}

