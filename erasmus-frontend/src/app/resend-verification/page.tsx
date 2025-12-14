'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EuStars } from '@/components/eu-stars';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ResendVerificationPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Wprowadź adres email');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In real app: await api.resendVerificationEmail(email);
      
      setIsSent(true);
      toast.success('Link wysłany!');
    } catch {
      toast.error('Błąd wysyłania', {
        description: 'Sprawdź adres email i spróbuj ponownie.',
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
          <Link href="/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 self-start">
            <ArrowLeft className="w-4 h-4" />
            Powrót do logowania
          </Link>
          
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isSent ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-primary/10'}`}>
              {isSent ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              ) : (
                <Mail className="w-8 h-8 text-primary" />
              )}
            </div>
          </div>
          
          <CardTitle className="text-2xl">
            {isSent ? 'Email wysłany!' : 'Wyślij link weryfikacyjny'}
          </CardTitle>
          <CardDescription>
            {isSent 
              ? 'Sprawdź swoją skrzynkę pocztową'
              : 'Wprowadź adres email, na który wyślemy link weryfikacyjny'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adres email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="twoj@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Wysyłanie...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Wyślij link
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">
                  Wysłaliśmy link weryfikacyjny na adres:
                </p>
                <p className="font-medium mt-1">{email}</p>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Nie otrzymałeś emaila? Sprawdź folder spam lub{' '}
                <button 
                  onClick={() => setIsSent(false)} 
                  className="text-primary hover:underline"
                >
                  spróbuj ponownie
                </button>
              </p>

              <Link href="/login">
                <Button variant="outline" className="w-full">
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

