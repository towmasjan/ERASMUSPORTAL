'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Loader2, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { api, CustomForm, Attendee } from '@/lib/api';

interface ApplicationFormProps {
  eventId: number;
  eventName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'date' | 'select' | 'textarea' | 'checkbox';
  required: boolean;
  description?: string;
  options?: string[];
}

// Default fields for Erasmus+ applications
const defaultFields: FormField[] = [
  { id: 'firstname', name: 'Imię', type: 'text', required: true },
  { id: 'lastname', name: 'Nazwisko', type: 'text', required: true },
  { id: 'email', name: 'Email', type: 'email', required: true },
  { id: 'dateOfBirth', name: 'Data urodzenia', type: 'date', required: true },
  { id: 'nationality', name: 'Narodowość', type: 'select', required: true, options: ['Polska', 'Niemcy', 'Hiszpania', 'Francja', 'Włochy', 'Portugalia', 'Holandia', 'Belgia', 'Austria', 'Czechy', 'Węgry', 'Szwecja', 'Dania', 'Finlandia', 'Irlandia', 'Grecja', 'Rumunia', 'Bułgaria', 'Chorwacja', 'Słowacja', 'Słowenia', 'Litwa', 'Łotwa', 'Estonia', 'Cypr', 'Malta', 'Luksemburg'] },
  { id: 'phone', name: 'Telefon', type: 'text', required: false },
  { id: 'specialDietNeeds', name: 'Wymagania dietetyczne', type: 'textarea', required: false, description: 'np. wegetarianin, wegan, alergie pokarmowe' },
  { id: 'healthIssues', name: 'Problemy zdrowotne', type: 'textarea', required: false, description: 'Informacje ważne dla organizatorów' },
  { id: 'emergencyContactName', name: 'Kontakt awaryjny - imię i nazwisko', type: 'text', required: true },
  { id: 'emergencyContactPhone', name: 'Kontakt awaryjny - telefon', type: 'text', required: true },
  { id: 'motivation', name: 'Motywacja', type: 'textarea', required: true, description: 'Dlaczego chcesz wziąć udział w tej wymianie?' },
  { id: 'experience', name: 'Doświadczenie', type: 'textarea', required: false, description: 'Czy masz doświadczenie w projektach międzynarodowych?' },
  { id: 'consent', name: 'Zgoda na przetwarzanie danych', type: 'checkbox', required: true, description: 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu organizacji wymiany młodzieżowej zgodnie z RODO.' },
];

export function ApplicationForm({ eventId, eventName, onSuccess, onCancel }: ApplicationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customFields, setCustomFields] = useState<CustomForm[]>([]);
  const [useMockApi, setUseMockApi] = useState(true);
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Load custom fields from API
  useEffect(() => {
    const loadCustomFields = async () => {
      if (useMockApi) return;
      
      setIsLoading(true);
      try {
        const fields = await api.getCustomForms(eventId);
        setCustomFields(fields);
      } catch (error) {
        console.error('Failed to load custom fields:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomFields();
  }, [eventId, useMockApi]);

  // Determine which fields to use
  const fields = useMockApi ? defaultFields : [...defaultFields, ...customFields.map(cf => ({
    id: cf.field_identifier,
    name: cf.name,
    type: cf.type as FormField['type'],
    required: cf.is_required,
    description: cf.description || undefined,
  }))];

  const handleChange = (fieldId: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      if (field.required) {
        const value = formData[field.id];
        if (value === undefined || value === '' || value === false) {
          newErrors[field.id] = 'To pole jest wymagane';
        }
      }

      // Email validation
      if (field.type === 'email' && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.id] as string)) {
          newErrors[field.id] = 'Nieprawidłowy adres email';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Popraw błędy w formularzu');
      return;
    }

    setIsSubmitting(true);

    try {
      if (useMockApi) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSubmitted(true);
        toast.success('Aplikacja wysłana!', {
          description: 'Wkrótce otrzymasz email z potwierdzeniem.',
        });
        onSuccess?.();
      } else {
        // Real API - create order with attendee
        const attendeeData: Partial<Attendee> = {
          firstname: formData.firstname as string,
          lastname: formData.lastname as string,
          email: formData.email as string,
          date_of_birth: formData.dateOfBirth as string,
          nationality: formData.nationality as string,
          special_diet_needs: formData.specialDietNeeds as string || null,
          health_issues: formData.healthIssues as string || null,
          emergency_contact_name: formData.emergencyContactName as string,
          emergency_contact_phone: formData.emergencyContactPhone as string,
        };

        // Get tickets for the event and create order
        const tickets = await api.getTickets(eventId);
        if (tickets.length === 0) {
          throw new Error('Brak dostępnych biletów na to wydarzenie');
        }

        await api.createOrder(eventId, tickets[0].id, attendeeData);
        
        setSubmitted(true);
        toast.success('Aplikacja wysłana!');
        onSuccess?.();
      }
    } catch (error) {
      console.error('Failed to submit application:', error);
      toast.error('Błąd wysyłania aplikacji', {
        description: error instanceof Error ? error.message : 'Spróbuj ponownie.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Aplikacja wysłana!</h3>
        <p className="text-muted-foreground mb-4">
          Dziękujemy za zgłoszenie na {eventName}. Wkrótce otrzymasz email z potwierdzeniem.
        </p>
        <Button onClick={onCancel}>Zamknij</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Aplikuj na: {eventName}</h3>
        <p className="text-sm text-muted-foreground">Wypełnij formularz aplikacyjny</p>
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.name}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            {field.type === 'text' && (
              <Input
                id={field.id}
                value={(formData[field.id] as string) || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={errors[field.id] ? 'border-red-500' : ''}
              />
            )}

            {field.type === 'email' && (
              <Input
                id={field.id}
                type="email"
                value={(formData[field.id] as string) || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={errors[field.id] ? 'border-red-500' : ''}
              />
            )}

            {field.type === 'date' && (
              <Input
                id={field.id}
                type="date"
                value={(formData[field.id] as string) || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={errors[field.id] ? 'border-red-500' : ''}
              />
            )}

            {field.type === 'select' && (
              <Select
                value={(formData[field.id] as string) || ''}
                onValueChange={(value) => handleChange(field.id, value)}
              >
                <SelectTrigger className={errors[field.id] ? 'border-red-500' : ''}>
                  <SelectValue placeholder={`Wybierz ${field.name.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field.type === 'textarea' && (
              <Textarea
                id={field.id}
                value={(formData[field.id] as string) || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={errors[field.id] ? 'border-red-500' : ''}
                rows={3}
              />
            )}

            {field.type === 'checkbox' && (
              <div className="flex items-start gap-3">
                <input
                  id={field.id}
                  type="checkbox"
                  checked={(formData[field.id] as boolean) || false}
                  onChange={(e) => handleChange(field.id, e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor={field.id} className="text-sm text-muted-foreground">
                  {field.description}
                </label>
              </div>
            )}

            {field.description && field.type !== 'checkbox' && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}

            {errors[field.id] && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors[field.id]}
              </p>
            )}
          </div>
        ))}
      </div>

      <Separator />

      {/* Dev mode toggle */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-dashed">
        <div>
          <Label className="text-xs">Tryb Mock API</Label>
          <p className="text-xs text-muted-foreground">Symulacja bez backendu</p>
        </div>
        <Switch checked={useMockApi} onCheckedChange={setUseMockApi} />
      </div>

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Anuluj
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Wysyłanie...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Wyślij aplikację
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

