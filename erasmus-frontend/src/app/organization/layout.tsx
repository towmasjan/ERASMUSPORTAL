'use client';

import { useUser } from '@/lib/user-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EuStars } from '@/components/eu-stars';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NotificationBell } from '@/components/notification-bell';
import {
  Home,
  Calendar,
  Users,
  Building2,
  Settings,
  LogOut,
  ChevronDown,
  Euro,
} from 'lucide-react';

const navItems = [
  { title: 'Dashboard', url: '/organization', icon: Home },
  { title: 'Moje wydarzenia', url: '/organization/events', icon: Calendar },
  { title: 'Uczestnicy', url: '/organization/participants', icon: Users },
  { title: 'Partnerzy', url: '/organization/partners', icon: Building2 },
  { title: 'Budżet', url: '/organization/budget', icon: Euro },
  { title: 'Ustawienia', url: '/organization/settings', icon: Settings },
];

export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated, logout } = useUser();
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
        <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/organization" className="flex items-center gap-3">
              <EuStars className="w-8 h-8 text-secondary" />
              <div className="hidden sm:block">
                <span className="font-bold">Erasmus+</span>
                <Badge variant="secondary" className="ml-2 text-xs">Organizacja</Badge>
              </div>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-1">
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

          <div className="flex items-center gap-2">
            <NotificationBell />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-secondary/20 text-secondary text-xs">
                    {user?.organizationName?.[0] || 'O'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline max-w-32 truncate">
                  {user?.organizationName || user?.name}
                </span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/organization/settings" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Ustawienia
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-destructive gap-2">
                <LogOut className="w-4 h-4" />
                Wyloguj się
              </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

