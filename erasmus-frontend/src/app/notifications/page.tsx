'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import {
  Bell,
  CheckCircle2,
  Calendar,
  Users,
  MessageSquare,
  Mail,
  Trash2,
  Settings,
  Check,
} from 'lucide-react';

// Generate dates relative to now to avoid hardcoded dates
function getRelativeDates() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const yesterday = new Date(now.getTime() - 86400000).toISOString().split('T')[0];
  const twoDaysAgo = new Date(now.getTime() - 2 * 86400000).toISOString().split('T')[0];
  const threeDaysAgo = new Date(now.getTime() - 3 * 86400000).toISOString().split('T')[0];
  const fiveDaysAgo = new Date(now.getTime() - 5 * 86400000).toISOString().split('T')[0];
  return { today, yesterday, twoDaysAgo, threeDaysAgo, fiveDaysAgo };
}

interface Notification {
  id: number;
  type: 'application' | 'event' | 'message' | 'system';
  title: string;
  description: string;
  time: string;
  date: string;
  read: boolean;
  link?: string;
}

function createMockNotifications(): Notification[] {
  const dates = getRelativeDates();
  return [
    {
      id: 1,
      type: 'application',
      title: 'Nowa aplikacja',
      description: 'Jan Kowalski aplikował na Cultural Bridges 2025',
      time: '5 min temu',
      date: dates.today,
      read: false,
      link: '/organization/participants/1',
    },
    {
      id: 2,
      type: 'application',
      title: 'Nowa aplikacja',
      description: 'Maria García aplikowała na Cultural Bridges 2025',
      time: '2 godz. temu',
      date: dates.today,
      read: false,
      link: '/organization/participants/2',
    },
    {
      id: 3,
      type: 'application',
      title: 'Aplikacja zaakceptowana',
      description: 'Hans Müller został zaakceptowany na Green Future Youth',
      time: '5 godz. temu',
      date: dates.today,
      read: true,
      link: '/organization/participants/3',
    },
    {
      id: 4,
      type: 'event',
      title: 'Przypomnienie',
      description: 'Cultural Bridges 2025 zaczyna się za 7 dni. Sprawdź przygotowania.',
      time: '1 dzień temu',
      date: dates.yesterday,
      read: true,
      link: '/events/1',
    },
    {
      id: 5,
      type: 'message',
      title: 'Nowa wiadomość',
      description: 'Sophie Dubois wysłała pytanie dotyczące zakwaterowania',
      time: '2 dni temu',
      date: dates.twoDaysAgo,
      read: true,
    },
    {
      id: 6,
      type: 'system',
      title: 'Aktualizacja systemu',
      description: 'Dodaliśmy nowe funkcje raportowania i eksportu danych',
      time: '3 dni temu',
      date: dates.threeDaysAgo,
      read: true,
    },
    {
      id: 7,
      type: 'event',
      title: 'Wydarzenie opublikowane',
      description: 'Youth Media Lab jest teraz widoczne dla uczestników',
      time: '5 dni temu',
      date: dates.fiveDaysAgo,
      read: true,
      link: '/events/4',
    },
  ];
}

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'application':
      return <Users className="w-5 h-5 text-primary" />;
    case 'event':
      return <Calendar className="w-5 h-5 text-secondary" />;
    case 'message':
      return <MessageSquare className="w-5 h-5 text-emerald-500" />;
    case 'system':
      return <Mail className="w-5 h-5 text-muted-foreground" />;
    default:
      return <Bell className="w-5 h-5" />;
  }
};

const getTypeLabel = (type: Notification['type']) => {
  switch (type) {
    case 'application':
      return 'Aplikacje';
    case 'event':
      return 'Wydarzenia';
    case 'message':
      return 'Wiadomości';
    case 'system':
      return 'System';
    default:
      return 'Inne';
  }
};

export default function NotificationsPage() {
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // Initialize notifications only on client side to avoid hydration mismatch
  useEffect(() => {
    setNotifications(createMockNotifications());
    setMounted(true);
  }, []);

  // Get stable date references for comparison (only used after mount)
  const { today, yesterday } = useMemo(() => {
    if (!mounted) return { today: '', yesterday: '' };
    return getRelativeDates();
  }, [mounted]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === activeTab);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const deleteAllRead = () => {
    if (confirm('Czy na pewno chcesz usunąć wszystkie przeczytane powiadomienia?')) {
      setNotifications(notifications.filter(n => !n.read));
    }
  };

  // Group by date
  const groupedNotifications = filteredNotifications.reduce((acc, notification) => {
    const date = notification.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notification);
    return acc;
  }, {} as Record<string, Notification[]>);

  // Show loading state until client-side mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-muted-foreground">Ładowanie powiadomień...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Powiadomienia
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount}</Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Wszystkie Twoje powiadomienia w jednym miejscu</p>
        </div>
        <div className="flex gap-2">
          <Link href="/settings/notifications">
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mb-6">
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Oznacz wszystkie jako przeczytane
          </Button>
        )}
        {notifications.filter(n => n.read).length > 0 && (
          <Button variant="outline" size="sm" onClick={deleteAllRead}>
            <Trash2 className="w-4 h-4 mr-2" />
            Usuń przeczytane
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            Wszystkie ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Nieprzeczytane ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="application">Aplikacje</TabsTrigger>
          <TabsTrigger value="event">Wydarzenia</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {Object.keys(groupedNotifications).length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-semibold mb-2">Brak powiadomień</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'unread' 
                    ? 'Wszystkie powiadomienia zostały przeczytane'
                    : 'Nie masz jeszcze żadnych powiadomień'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedNotifications)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([date, items]) => (
                  <div key={date}>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      {date === today 
                        ? 'Dzisiaj'
                        : date === yesterday
                          ? 'Wczoraj'
                          : new Date(date).toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })
                      }
                    </h3>
                    <div className="space-y-2">
                      {items.map((notification) => (
                        <Card 
                          key={notification.id} 
                          className={`transition-colors ${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="mt-1">
                                {getIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {notification.title}
                                  </h4>
                                  <Badge variant="outline" className="text-xs">
                                    {getTypeLabel(notification.type)}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {notification.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {notification.time}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                {!notification.read && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => markAsRead(notification.id)}
                                    title="Oznacz jako przeczytane"
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                )}
                                {notification.link && (
                                  <Link href={notification.link}>
                                    <Button variant="outline" size="sm">
                                      Zobacz
                                    </Button>
                                  </Link>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

