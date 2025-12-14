'use client';

import { useState, use } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Send,
  Clock,
  CheckCircle2,
  Users,
  FileText,
  Loader2,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

interface SentEmail {
  id: number;
  subject: string;
  recipients: string;
  recipientCount: number;
  sentAt: string;
  status: 'sent' | 'failed';
}

const templates: EmailTemplate[] = [
  {
    id: 'acceptance',
    name: 'Akceptacja aplikacji',
    subject: 'Gratulacje! Twoja aplikacja została zaakceptowana',
    body: `Drogi/a {{imię}},

Z radością informujemy, że Twoja aplikacja na wymianę młodzieżową "{{wydarzenie}}" została zaakceptowana!

📅 Termin: {{data_rozpoczęcia}} - {{data_zakończenia}}
📍 Miejsce: {{lokalizacja}}

Wkrótce otrzymasz więcej informacji dotyczących przygotowań do wyjazdu.

W razie pytań skontaktuj się z nami.

Z poważaniem,
Zespół organizacyjny`,
  },
  {
    id: 'rejection',
    name: 'Odrzucenie aplikacji',
    subject: 'Informacja o statusie aplikacji',
    body: `Drogi/a {{imię}},

Dziękujemy za zainteresowanie wymianą młodzieżową "{{wydarzenie}}".

Niestety, z powodu ograniczonej liczby miejsc nie możemy tym razem przyjąć Twojej aplikacji.

Zachęcamy do aplikowania na przyszłe wydarzenia!

Z poważaniem,
Zespół organizacyjny`,
  },
  {
    id: 'reminder',
    name: 'Przypomnienie przed wyjazdem',
    subject: 'Przypomnienie: {{wydarzenie}} zaczyna się za 7 dni!',
    body: `Drogi/a {{imię}},

Przypominamy, że wymiana młodzieżowa "{{wydarzenie}}" zaczyna się już za tydzień!

📅 Data przyjazdu: {{data_rozpoczęcia}}
📍 Miejsce: {{lokalizacja}}
⏰ Godzina rejestracji: 14:00 - 16:00

Nie zapomnij zabrać:
- Dokumentu tożsamości
- Ubezpieczenia zdrowotnego
- Biletów podróżnych
- Wygodnych ubrań

Do zobaczenia!
Zespół organizacyjny`,
  },
  {
    id: 'info',
    name: 'Informacje logistyczne',
    subject: 'Ważne informacje dotyczące wymiany {{wydarzenie}}',
    body: `Drogi/a {{imię}},

Oto ważne informacje dotyczące Twojego udziału w wymianie młodzieżowej.

ZAKWATEROWANIE:
{{informacje_o_zakwaterowaniu}}

DOJAZD:
{{informacje_o_dojeździe}}

KONTAKT W NAGŁYCH PRZYPADKACH:
{{kontakt_awaryjny}}

Z poważaniem,
Zespół organizacyjny`,
  },
];

const mockSentEmails: SentEmail[] = [
  {
    id: 1,
    subject: 'Gratulacje! Twoja aplikacja została zaakceptowana',
    recipients: 'Zaakceptowani uczestnicy',
    recipientCount: 25,
    sentAt: '2024-12-10T14:30:00',
    status: 'sent',
  },
  {
    id: 2,
    subject: 'Przypomnienie: Cultural Bridges 2025 zaczyna się za 7 dni!',
    recipients: 'Wszyscy zaakceptowani',
    recipientCount: 32,
    sentAt: '2024-12-08T10:00:00',
    status: 'sent',
  },
  {
    id: 3,
    subject: 'Ważne informacje dotyczące wymiany',
    recipients: 'Wszyscy uczestnicy',
    recipientCount: 32,
    sentAt: '2024-12-05T16:45:00',
    status: 'sent',
  },
];

export default function EventEmailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState('compose');
  const [sentEmails] = useState<SentEmail[]>(mockSentEmails);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Form state
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [recipients, setRecipients] = useState<string>('all');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      setBody(template.body);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !body) {
      toast.error('Wypełnij temat i treść wiadomości');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Email wysłany!', {
        description: `Wiadomość została wysłana do wybranych odbiorców.`,
      });

      // Reset form
      setSelectedTemplate('');
      setSubject('');
      setBody('');
      setActiveTab('history');
    } catch {
      toast.error('Błąd wysyłania');
    } finally {
      setIsLoading(false);
    }
  };

  const getRecipientLabel = (value: string) => {
    switch (value) {
      case 'all': return 'Wszyscy uczestnicy';
      case 'accepted': return 'Zaakceptowani';
      case 'pending': return 'Oczekujący';
      case 'rejected': return 'Odrzuceni';
      default: return value;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <Link href={`/organization/events`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="w-4 h-4" />
          Powrót do wydarzeń
        </Link>
        <h1 className="text-2xl font-bold">Komunikacja email</h1>
        <p className="text-muted-foreground">Wysyłaj wiadomości do uczestników wydarzenia</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="compose">
            <Mail className="w-4 h-4 mr-2" />
            Nowa wiadomość
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="w-4 h-4 mr-2" />
            Szablony
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="w-4 h-4 mr-2" />
            Historia ({sentEmails.length})
          </TabsTrigger>
        </TabsList>

        {/* Compose Tab */}
        <TabsContent value="compose">
          <Card>
            <CardHeader>
              <CardTitle>Napisz wiadomość</CardTitle>
              <CardDescription>Wyślij email do uczestników wydarzenia</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSend} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="template">Szablon (opcjonalnie)</Label>
                    <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz szablon..." />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map(t => (
                          <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipients">Odbiorcy *</Label>
                    <Select value={recipients} onValueChange={setRecipients}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          <span className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Wszyscy uczestnicy
                          </span>
                        </SelectItem>
                        <SelectItem value="accepted">Zaakceptowani</SelectItem>
                        <SelectItem value="pending">Oczekujący</SelectItem>
                        <SelectItem value="rejected">Odrzuceni</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Temat *</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Temat wiadomości..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body">Treść wiadomości *</Label>
                  <Textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Treść emaila..."
                    rows={12}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Użyj zmiennych: {'{{imię}}'}, {'{{nazwisko}}'}, {'{{wydarzenie}}'}, {'{{data_rozpoczęcia}}'}, {'{{lokalizacja}}'}
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsPreviewOpen(true)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Podgląd
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Wysyłanie...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Wyślij email
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates">
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map(template => (
              <Card key={template.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => {
                handleTemplateChange(template.id);
                setActiveTab('compose');
              }}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {template.name}
                  </CardTitle>
                  <CardDescription>{template.subject}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {template.body.substring(0, 150)}...
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    Użyj tego szablonu →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historia wysłanych emaili</CardTitle>
              <CardDescription>Wszystkie wiadomości wysłane do uczestników</CardDescription>
            </CardHeader>
            <CardContent>
              {sentEmails.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nie wysłano jeszcze żadnych emaili</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sentEmails.map(email => (
                    <div key={email.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{email.subject}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {email.recipients} ({email.recipientCount} osób)
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(email.sentAt).toLocaleString('pl-PL')}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-emerald-600">
                        Wysłano
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

