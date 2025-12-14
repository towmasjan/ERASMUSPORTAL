'use client';

import { useState, use } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  Ticket,
  Users,
  Calendar,
  Edit,
  Trash2,
  MoreHorizontal,
  Loader2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface TicketType {
  id: number;
  name: string;
  description: string;
  quantity: number;
  sold: number;
  isHidden: boolean;
  salesStart: string;
  salesEnd: string;
}

// Mock data
const mockTickets: TicketType[] = [
  {
    id: 1,
    name: 'Uczestnik',
    description: 'Standardowy uczestnik wymiany młodzieżowej',
    quantity: 30,
    sold: 22,
    isHidden: false,
    salesStart: '2024-12-01',
    salesEnd: '2025-01-10',
  },
  {
    id: 2,
    name: 'Lider grupy',
    description: 'Lider grupy krajowej (1 na kraj)',
    quantity: 6,
    sold: 4,
    isHidden: false,
    salesStart: '2024-12-01',
    salesEnd: '2025-01-10',
  },
  {
    id: 3,
    name: 'Wolontariusz',
    description: 'Wolontariusz wspierający organizację',
    quantity: 5,
    sold: 2,
    isHidden: true,
    salesStart: '2024-12-01',
    salesEnd: '2025-01-05',
  },
];

export default function EventTicketsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [tickets, setTickets] = useState<TicketType[]>(mockTickets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('10');
  const [salesStart, setSalesStart] = useState('');
  const [salesEnd, setSalesEnd] = useState('');

  const totalCapacity = tickets.reduce((sum, t) => sum + t.quantity, 0);
  const totalSold = tickets.reduce((sum, t) => sum + t.sold, 0);

  const resetForm = () => {
    setName('');
    setDescription('');
    setQuantity('10');
    setSalesStart('');
    setSalesEnd('');
    setEditingTicket(null);
  };

  const handleEdit = (ticket: TicketType) => {
    setEditingTicket(ticket);
    setName(ticket.name);
    setDescription(ticket.description);
    setQuantity(ticket.quantity.toString());
    setSalesStart(ticket.salesStart);
    setSalesEnd(ticket.salesEnd);
    setIsDialogOpen(true);
  };

  const handleDelete = (ticketId: number) => {
    if (confirm('Czy na pewno chcesz usunąć ten typ miejsca?')) {
      setTickets(tickets.filter(t => t.id !== ticketId));
      toast.success('Typ miejsca usunięty');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingTicket) {
        // Update existing
        setTickets(tickets.map(t => 
          t.id === editingTicket.id 
            ? { ...t, name, description, quantity: parseInt(quantity), salesStart, salesEnd }
            : t
        ));
        toast.success('Typ miejsca zaktualizowany');
      } else {
        // Create new
        const newTicket: TicketType = {
          id: Math.max(...tickets.map(t => t.id)) + 1,
          name,
          description,
          quantity: parseInt(quantity),
          sold: 0,
          isHidden: false,
          salesStart,
          salesEnd,
        };
        setTickets([...tickets, newTicket]);
        toast.success('Typ miejsca utworzony');
      }

      resetForm();
      setIsDialogOpen(false);
    } catch {
      toast.error('Wystąpił błąd');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVisibility = (ticketId: number) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, isHidden: !t.isHidden } : t
    ));
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
          <h1 className="text-2xl font-bold">Typy miejsc / Bilety</h1>
          <p className="text-muted-foreground">Zarządzaj typami uczestników na wydarzenie</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nowy typ miejsca
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTicket ? 'Edytuj typ miejsca' : 'Nowy typ miejsca'}</DialogTitle>
              <DialogDescription>
                {editingTicket ? 'Zmień ustawienia typu miejsca' : 'Utwórz nowy typ uczestnika na wydarzenie'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nazwa *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="np. Uczestnik, Lider grupy"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Opis</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Krótki opis roli"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Liczba miejsc *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salesStart">Początek rejestracji</Label>
                  <Input
                    id="salesStart"
                    type="date"
                    value={salesStart}
                    onChange={(e) => setSalesStart(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salesEnd">Koniec rejestracji</Label>
                  <Input
                    id="salesEnd"
                    type="date"
                    value={salesEnd}
                    onChange={(e) => setSalesEnd(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                  Anuluj
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Zapisywanie...
                    </>
                  ) : (
                    editingTicket ? 'Zapisz zmiany' : 'Utwórz'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Ticket className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalSold} / {totalCapacity}</p>
                <p className="text-sm text-muted-foreground">miejsc zajętych</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Wolne miejsca</p>
              <p className="text-xl font-bold text-emerald-600">{totalCapacity - totalSold}</p>
            </div>
          </div>
          <Progress value={(totalSold / totalCapacity) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => {
          const percentFilled = (ticket.sold / ticket.quantity) * 100;
          const spotsLeft = ticket.quantity - ticket.sold;

          return (
            <Card key={ticket.id} className={ticket.isHidden ? 'opacity-60' : ''}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{ticket.name}</h3>
                      {ticket.isHidden && (
                        <Badge variant="secondary">Ukryty</Badge>
                      )}
                      {spotsLeft === 0 && (
                        <Badge variant="destructive">Wyprzedane</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{ticket.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{ticket.sold} / {ticket.quantity} miejsc</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {new Date(ticket.salesStart).toLocaleDateString('pl-PL')} - {new Date(ticket.salesEnd).toLocaleDateString('pl-PL')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 max-w-xs">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{Math.round(percentFilled)}% zajęte</span>
                        <span>{spotsLeft} wolnych</span>
                      </div>
                      <Progress 
                        value={percentFilled} 
                        className={`h-2 ${percentFilled > 90 ? '[&>div]:bg-red-500' : percentFilled > 70 ? '[&>div]:bg-amber-500' : ''}`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 mr-4">
                      <Label htmlFor={`visible-${ticket.id}`} className="text-sm text-muted-foreground">
                        Widoczny
                      </Label>
                      <Switch
                        id={`visible-${ticket.id}`}
                        checked={!ticket.isHidden}
                        onCheckedChange={() => toggleVisibility(ticket.id)}
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(ticket)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edytuj
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(ticket.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Usuń
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {tickets.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Ticket className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-semibold mb-2">Brak typów miejsc</h3>
            <p className="text-muted-foreground mb-4">Utwórz pierwszy typ miejsca, aby uczestnicy mogli się rejestrować</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Dodaj typ miejsca
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

