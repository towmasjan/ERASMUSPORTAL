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
import {
  Home,
  Calendar,
  Users,
  Building2,
  Settings,
  LogOut,
  ChevronDown,
  BarChart3,
  Shield,
  FileCheck,
} from 'lucide-react';

const navItems = [
  { title: 'Dashboard', url: '/admin', icon: Home },
  { title: 'Wydarzenia', url: '/admin/events', icon: Calendar },
  { title: 'Organizacje', url: '/admin/organizations', icon: Building2 },
  { title: 'Użytkownicy', url: '/admin/users', icon: Users },
  { title: 'Raporty', url: '/admin/reports', icon: BarChart3 },
  { title: 'Moderacja', url: '/admin/moderation', icon: FileCheck },
  { title: 'Ustawienia', url: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated, logout, isAdmin } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    // Only admins can access this layout
    if (!isLoading && isAuthenticated && !isAdmin) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-destructive border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-white">SuperAdmin</span>
                <Badge variant="destructive" className="ml-2 text-xs">ADMIN</Badge>
              </div>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.url} href={item.url}>
                  <Button
                    variant={pathname === item.url ? 'secondary' : 'ghost'}
                    size="sm"
                    className={`gap-2 ${pathname === item.url ? '' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
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
              <Button variant="ghost" className="gap-2 text-slate-300 hover:text-white hover:bg-slate-800">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-red-600 text-white text-xs">
                    A
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">{user?.name || 'Admin'}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="gap-2 text-slate-300 hover:text-white">
                  <Settings className="w-4 h-4" />
                  Ustawienia
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-red-400 gap-2 hover:text-red-300">
                <LogOut className="w-4 h-4" />
                Wyloguj się
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

