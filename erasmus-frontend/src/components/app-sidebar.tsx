'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EuStars } from '@/components/eu-stars';
import {
  Home,
  Calendar,
  Users,
  Building2,
  Settings,
  LogOut,
  ChevronUp,
  Globe,
  BarChart3,
  FileText,
} from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

const mainNavItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Events', url: '/events', icon: Calendar },
  { title: 'Participants', url: '/participants', icon: Users },
  { title: 'Partner Organizations', url: '/partners', icon: Building2 },
];

const managementItems = [
  { title: 'Reports', url: '/reports', icon: BarChart3 },
  { title: 'Documents', url: '/documents', icon: FileText },
  { title: 'Countries', url: '/countries', icon: Globe },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    api.logout();
    localStorage.removeItem('erasmus_demo_user');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-secondary rounded-lg opacity-20" />
            <EuStars className="w-8 h-8 text-secondary" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-sidebar-foreground">
              Erasmus+
            </span>
            <span className="text-xs text-sidebar-foreground/60">
              Youth Exchange
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase text-xs tracking-wider">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url || pathname.startsWith(item.url + '/')}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase text-xs tracking-wider">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                      EU
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex-1 text-left">Admin User</span>
                  <ChevronUp className="w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
