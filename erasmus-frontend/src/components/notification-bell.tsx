'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, CheckCircle2, Calendar, Users, MessageSquare, Mail } from 'lucide-react';
import Link from 'next/link';

interface Notification {
  id: number;
  type: 'application' | 'event' | 'message' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
  link?: string;
}

interface NotificationBellProps {
  notifications?: Notification[];
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'application',
    title: 'Nowa aplikacja',
    description: 'Jan Kowalski aplikował na Cultural Bridges 2025',
    time: '5 min temu',
    read: false,
    link: '/organization/participants/1',
  },
  {
    id: 2,
    type: 'application',
    title: 'Nowa aplikacja',
    description: 'Maria García aplikowała na Cultural Bridges 2025',
    time: '2 godz. temu',
    read: false,
    link: '/organization/participants/2',
  },
  {
    id: 3,
    type: 'event',
    title: 'Przypomnienie',
    description: 'Cultural Bridges 2025 zaczyna się za 7 dni',
    time: '1 dzień temu',
    read: true,
    link: '/events/1',
  },
  {
    id: 4,
    type: 'system',
    title: 'Aktualizacja systemu',
    description: 'Dodaliśmy nowe funkcje raportowania',
    time: '3 dni temu',
    read: true,
  },
];

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'application':
      return <Users className="w-4 h-4 text-primary" />;
    case 'event':
      return <Calendar className="w-4 h-4 text-secondary" />;
    case 'message':
      return <MessageSquare className="w-4 h-4 text-emerald-500" />;
    case 'system':
      return <Mail className="w-4 h-4 text-muted-foreground" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

export function NotificationBell({ notifications = mockNotifications }: NotificationBellProps) {
  const [items, setItems] = useState<Notification[]>(notifications);
  const unreadCount = items.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setItems(items.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setItems(items.map(n => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Powiadomienia</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto py-1 text-xs" onClick={markAllAsRead}>
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Oznacz wszystkie
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {items.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Brak powiadomień
          </div>
        ) : (
          <>
            {items.slice(0, 5).map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className="flex items-start gap-3 p-3 cursor-pointer"
                onClick={() => markAsRead(notification.id)}
                asChild={!!notification.link}
              >
                {notification.link ? (
                  <Link href={notification.link}>
                    <div className={`flex items-start gap-3 w-full ${!notification.read ? 'font-medium' : ''}`}>
                      <div className="mt-0.5">{getIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{notification.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary mt-1" />
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className={`flex items-start gap-3 w-full ${!notification.read ? 'font-medium' : ''}`}>
                    <div className="mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{notification.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{notification.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary mt-1" />
                    )}
                  </div>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/notifications" className="justify-center text-primary">
                Zobacz wszystkie
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

