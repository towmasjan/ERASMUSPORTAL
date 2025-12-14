'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'sonner';
import { UserProvider } from './user-context';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {children}
        <Toaster 
          position="top-right" 
          richColors
          toastOptions={{
            style: {
              fontFamily: 'Outfit, system-ui, sans-serif',
            },
          }}
        />
      </UserProvider>
    </QueryClientProvider>
  );
}
