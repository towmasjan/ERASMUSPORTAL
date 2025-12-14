'use client';

import { useEffect, useState, use } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EuStars } from '@/components/eu-stars';
import Link from 'next/link';
import { CheckCircle2, XCircle, Loader2, Mail } from 'lucide-react';

type VerificationStatus = 'loading' | 'success' | 'error' | 'expired';

export default function VerifyEmailPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock verification logic
        if (token === 'expired') {
          setStatus('expired');
          setMessage('Link weryfikacyjny wygasł. Poproś o nowy link.');
        } else if (token === 'invalid') {
          setStatus('error');
          setMessage('Nieprawidłowy link weryfikacyjny.');
        } else {
          // In real app: await api.verifyEmail(token);
          setStatus('success');
          setMessage('Twoje konto zostało zweryfikowane!');
        }
      } catch {
        setStatus('error');
        setMessage('Wystąpił błąd podczas weryfikacji. Spróbuj ponownie.');
      }
    };

    verifyEmail();
  }, [token]);

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
            {status === 'loading' && (
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}
            {status === 'success' && (
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
            )}
            {(status === 'error' || status === 'expired') && (
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl">
            {status === 'loading' && 'Weryfikacja...'}
            {status === 'success' && 'Email zweryfikowany!'}
            {status === 'error' && 'Błąd weryfikacji'}
            {status === 'expired' && 'Link wygasł'}
          </CardTitle>
          <CardDescription>
            {status === 'loading' && 'Trwa weryfikacja Twojego adresu email...'}
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'success' && (
            <>
              <p className="text-center text-muted-foreground">
                Możesz teraz zalogować się na swoje konto i korzystać z pełnej funkcjonalności portalu Erasmus+.
              </p>
              <Link href="/login" className="block">
                <Button className="w-full">
                  Przejdź do logowania
                </Button>
              </Link>
            </>
          )}

          {status === 'expired' && (
            <>
              <p className="text-center text-muted-foreground">
                Link weryfikacyjny jest ważny przez 24 godziny. Poproś o wysłanie nowego linku.
              </p>
              <Link href="/resend-verification" className="block">
                <Button className="w-full" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Wyślij nowy link
                </Button>
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <p className="text-center text-muted-foreground">
                Sprawdź czy link jest poprawny lub poproś o wysłanie nowego.
              </p>
              <div className="flex gap-3">
                <Link href="/resend-verification" className="flex-1">
                  <Button className="w-full" variant="outline">
                    Wyślij ponownie
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button className="w-full" variant="ghost">
                    Strona główna
                  </Button>
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <p className="mt-8 text-sm text-muted-foreground text-center">
        🇪🇺 Erasmus+ Youth Exchange Portal
      </p>
    </div>
  );
}

