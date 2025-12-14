'use client';

import { useState, use } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  Users,
  Mail,
  Shield,
  Crown,
  Edit,
  Trash2,
  MoreHorizontal,
  Loader2,
  CheckCircle2,
  X,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: 'owner' | 'organizer' | 'moderator' | 'registrator';
  status: 'active' | 'pending';
  addedAt: string;
}

const roles = [
  { value: 'owner', label: 'Właściciel', icon: Crown, color: 'bg-amber-500', description: 'Pełny dostęp do wszystkiego' },
  { value: 'organizer', label: 'Organizator', icon: Shield, color: 'bg-primary', description: 'Zarządzanie wydarzeniem i uczestnikami' },
  { value: 'moderator', label: 'Moderator', icon: Users, color: 'bg-purple-500', description: 'Rozpatrywanie aplikacji' },
  { value: 'registrator', label: 'Rejestracja', icon: Edit, color: 'bg-emerald-500', description: 'Tylko rejestracja uczestników' },
];

// Mock data
const mockTeam: TeamMember[] = [
  {
    id: 1,
    name: 'Anna Kowalska',
    email: 'anna@youthcenter.pl',
    role: 'owner',
    status: 'active',
    addedAt: '2024-10-01',
  },
  {
    id: 2,
    name: 'Piotr Nowak',
    email: 'piotr@youthcenter.pl',
    role: 'organizer',
    status: 'active',
    addedAt: '2024-10-15',
  },
  {
    id: 3,
    name: 'Maria García',
    email: 'maria@example.es',
    role: 'moderator',
    status: 'active',
    addedAt: '2024-11-20',
  },
  {
    id: 4,
    name: '',
    email: 'hans@example.de',
    role: 'registrator',
    status: 'pending',
    addedAt: '2024-12-10',
  },
];

export default function EventTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<TeamMember['role']>('moderator');

  const getRoleInfo = (roleValue: TeamMember['role']) => {
    return roles.find(r => r.value === roleValue) || roles[1];
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (team.some(m => m.email === email)) {
      toast.error('Ta osoba już jest w zespole');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newMember: TeamMember = {
        id: Math.max(...team.map(m => m.id)) + 1,
        name: '',
        email,
        role,
        status: 'pending',
        addedAt: new Date().toISOString().split('T')[0],
      };

      setTeam([...team, newMember]);
      toast.success('Zaproszenie wysłane', {
        description: `Wysłaliśmy zaproszenie na ${email}`,
      });

      setEmail('');
      setRole('moderator');
      setIsDialogOpen(false);
    } catch {
      toast.error('Wystąpił błąd');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = (memberId: number) => {
    const member = team.find(m => m.id === memberId);
    if (member?.role === 'owner') {
      toast.error('Nie można usunąć właściciela');
      return;
    }
    if (confirm('Czy na pewno chcesz usunąć tę osobę z zespołu?')) {
      setTeam(team.filter(m => m.id !== memberId));
      toast.success('Osoba usunięta z zespołu');
    }
  };

  const handleRoleChange = (memberId: number, newRole: TeamMember['role']) => {
    const member = team.find(m => m.id === memberId);
    if (member?.role === 'owner') {
      toast.error('Nie można zmienić roli właściciela');
      return;
    }
    setTeam(team.map(m => m.id === memberId ? { ...m, role: newRole } : m));
    toast.success('Rola zmieniona');
  };

  const resendInvite = (email: string) => {
    toast.success('Zaproszenie wysłane ponownie', {
      description: `Wysłaliśmy nowe zaproszenie na ${email}`,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/organization/events`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="w-4 h-4" />
            Powrót do wydarzeń
          </Link>
          <h1 className="text-2xl font-bold">Zespół organizacyjny</h1>
          <p className="text-muted-foreground">Zarządzaj osobami współorganizującymi wydarzenie</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Zaproś osobę
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Zaproś do zespołu</DialogTitle>
              <DialogDescription>
                Wyślij zaproszenie email do nowego członka zespołu
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adres email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="osoba@przykład.pl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rola</Label>
                <Select value={role} onValueChange={(v) => setRole(v as TeamMember['role'])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.slice(1).map(r => (
                      <SelectItem key={r.value} value={r.value}>
                        <div className="flex items-center gap-2">
                          <r.icon className="w-4 h-4" />
                          <div>
                            <p>{r.label}</p>
                            <p className="text-xs text-muted-foreground">{r.description}</p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Anuluj
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Wysyłanie...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Wyślij zaproszenie
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles explanation */}
      <div className="grid gap-4 md:grid-cols-4">
        {roles.map(r => (
          <Card key={r.value}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg ${r.color} flex items-center justify-center`}>
                  <r.icon className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-medium">{r.label}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{r.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team table */}
      <Card>
        <CardHeader>
          <CardTitle>Członkowie zespołu ({team.length})</CardTitle>
          <CardDescription>Osoby mające dostęp do zarządzania tym wydarzeniem</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Osoba</TableHead>
                <TableHead>Rola</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dodano</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((member) => {
                const roleInfo = getRoleInfo(member.role);
                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {member.name 
                              ? member.name.split(' ').map(n => n[0]).join('').toUpperCase()
                              : member.email[0].toUpperCase()
                            }
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name || 'Oczekuje na akceptację'}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {member.role === 'owner' ? (
                        <Badge className={`${roleInfo.color} text-white`}>
                          <Crown className="w-3 h-3 mr-1" />
                          {roleInfo.label}
                        </Badge>
                      ) : (
                        <Select 
                          value={member.role} 
                          onValueChange={(v) => handleRoleChange(member.id, v as TeamMember['role'])}
                        >
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.slice(1).map(r => (
                              <SelectItem key={r.value} value={r.value}>
                                {r.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    <TableCell>
                      {member.status === 'active' ? (
                        <Badge variant="outline" className="text-emerald-600">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Aktywny
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Mail className="w-3 h-3 mr-1" />
                          Oczekuje
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(member.addedAt).toLocaleDateString('pl-PL')}
                    </TableCell>
                    <TableCell>
                      {member.role !== 'owner' && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {member.status === 'pending' && (
                              <DropdownMenuItem onClick={() => resendInvite(member.email)}>
                                <Mail className="w-4 h-4 mr-2" />
                                Wyślij ponownie
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => handleRemove(member.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Usuń z zespołu
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

