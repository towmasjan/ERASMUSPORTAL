'use client';

import { useUser } from '@/lib/user-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EuStars } from '@/components/eu-stars';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Home,
  Calendar,
  FileText,
  Award,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';

const navItems = [
  { title: 'Dashboard', url: '/participant', icon: Home },
  { title: 'Moje aplikacje', url: '/participant/applications', icon: FileText },
  { title: 'Wydarzenia', url: '/events', icon: Calendar },
  { title: 'Certyfikaty', url: '/participant/certificates', icon: Award },
  { title: 'Mój profil', url: '/participant/profile', icon: User },
];

export default function ParticipantLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated, logout, isParticipant } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/participant" className="flex items-center gap-3">
              <EuStars className="w-8 h-8 text-primary" />
              <span className="font-bold hidden sm:inline">Erasmus+ Youth</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.url} href={item.url}>
                  <Button
                    variant={pathname === item.url ? 'secondary' : 'ghost'}
                    size="sm"
                    className="gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {user?.firstName?.[0] || user?.name?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">{user?.name || 'Uczestnik'}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/participant/profile" className="gap-2">
                  <User className="w-4 h-4" />
                  Mój profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-destructive gap-2">
                <LogOut className="w-4 h-4" />
                Wyloguj się
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}

