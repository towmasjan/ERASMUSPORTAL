'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  Building2, 
  Globe, 
  TrendingUp, 
  ArrowRight,
  Plane,
  MapPin,
  Euro
} from 'lucide-react';
import Link from 'next/link';
import { EuStars } from '@/components/eu-stars';

// Mock data for demo
const stats = [
  {
    title: 'Active Events',
    value: '3',
    description: 'Youth exchanges in progress',
    icon: Calendar,
    trend: '+2 this month',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Total Participants',
    value: '127',
    description: 'From 8 countries',
    icon: Users,
    trend: '+23 new',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    title: 'Partner Organizations',
    value: '12',
    description: 'Active partnerships',
    icon: Building2,
    trend: '+3 this year',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
  },
  {
    title: 'Countries',
    value: '8',
    description: 'Represented nations',
    icon: Globe,
    trend: 'EU Programme',
    color: 'text-violet-600',
    bgColor: 'bg-violet-500/10',
  },
];

const upcomingEvents = [
  {
    id: 1,
    name: 'Cultural Bridges 2024',
    location: 'Warsaw, Poland',
    date: 'Jan 15-22, 2025',
    participants: 32,
    countries: ['🇵🇱', '🇩🇪', '🇪🇸', '🇮🇹'],
    status: 'upcoming',
  },
  {
    id: 2,
    name: 'Green Future Youth',
    location: 'Lisbon, Portugal',
    date: 'Feb 5-12, 2025',
    participants: 28,
    countries: ['🇵🇹', '🇫🇷', '🇳🇱', '🇧🇪'],
    status: 'registration',
  },
  {
    id: 3,
    name: 'Digital Skills Workshop',
    location: 'Berlin, Germany',
    date: 'Mar 10-17, 2025',
    participants: 24,
    countries: ['🇩🇪', '🇨🇿', '🇦🇹', '🇭🇺'],
    status: 'planning',
  },
];

const recentActivity = [
  { action: 'New participant registered', name: 'Maria García', time: '2 hours ago', flag: '🇪🇸' },
  { action: 'Travel cost submitted', name: 'Hans Müller', time: '5 hours ago', flag: '🇩🇪' },
  { action: 'Partner organization added', name: 'Youth Center Rome', time: '1 day ago', flag: '🇮🇹' },
  { action: 'Event documents uploaded', name: 'Cultural Bridges 2024', time: '2 days ago', flag: '🇵🇱' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-erasmus-gradient p-8 text-white">
        <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
          <EuStars className="w-full h-full text-secondary" />
        </div>
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
            Erasmus+ Programme
          </Badge>
          <h1 className="text-3xl font-bold mb-2">Welcome to Youth Exchange Portal</h1>
          <p className="text-white/80 max-w-xl mb-6">
            Manage your Erasmus+ youth exchange events, track participants, and coordinate with partner organizations across Europe.
          </p>
          <div className="flex gap-3">
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link href="/events/new">
                <Calendar className="w-4 h-4 mr-2" />
                Create Event
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/participants">
                <Users className="w-4 h-4 mr-2" />
                View Participants
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-secondary/20 to-transparent rounded-tl-full" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                {stat.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Events */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Your next youth exchange activities</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/events">
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Plane className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{event.name}</h3>
                      <Badge
                        variant={
                          event.status === 'upcoming'
                            ? 'default'
                            : event.status === 'registration'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-xs"
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                      {event.countries.map((flag, i) => (
                        <span
                          key={i}
                          className="w-6 h-6 rounded-full bg-background border-2 border-background flex items-center justify-center text-sm"
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{event.participants}</div>
                      <div className="text-xs text-muted-foreground">participants</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg">{activity.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Banner */}
      <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-dashed">
        <CardContent className="py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary">
                <Euro className="w-6 h-6" />
                €45,000
              </div>
              <p className="text-sm text-muted-foreground">Total Budget Allocated</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">18</div>
              <p className="text-sm text-muted-foreground">Mobility Days</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">95%</div>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">42</div>
              <p className="text-sm text-muted-foreground">Youthpass Certificates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

