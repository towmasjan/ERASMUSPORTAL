/**
 * Erasmus+ Youth Exchange API Client
 * Connects to eventyay-server backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Types for Erasmus+ Youth Exchange
export interface PartnerOrganization {
  id: number;
  name: string;
  country: string;
  oid_code: string | null;
  contact_email: string | null;
  contact_person: string | null;
  contact_phone: string | null;
  address: string | null;
  travel_budget_limit: number;
  event_id: number;
  created_at: string;
  modified_at: string;
}

export interface Attendee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  date_of_birth: string | null;
  nationality: string | null;
  special_diet_needs: string | null;
  health_issues: string | null;
  actual_travel_cost: number | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  passport_number: string | null;
  passport_expiry_date: string | null;
  partner_organization_id: number | null;
  partner_organization?: PartnerOrganization;
  event_id: number;
  order_id: number | null;
  ticket_id: number | null;
  is_checked_in?: boolean;
  checkin_times?: string;
  // Application status (custom field for Erasmus+)
  application_status?: 'pending' | 'accepted' | 'rejected';
}

export interface Event {
  id: number;
  name: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  location_name: string | null;
  timezone: string;
  state: string;
  logo_url: string | null;
  original_image_url: string | null;
  // Additional fields
  searchable_location_name?: string;
  is_sessions_speakers_enabled?: boolean;
  is_ticketing_enabled?: boolean;
  is_featured?: boolean;
  privacy?: string;
  ticket_url?: string;
  code_of_conduct?: string;
  owner_name?: string;
  owner_description?: string;
  external_event_url?: string;
}

export interface EventCreate {
  name: string;
  description?: string;
  starts_at: string;
  ends_at: string;
  location_name?: string;
  timezone: string;
  state?: string;
  privacy?: string;
  searchable_location_name?: string;
  is_sessions_speakers_enabled?: boolean;
  is_ticketing_enabled?: boolean;
}

export interface User {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean;
  is_super_admin: boolean;
  is_verified?: boolean;
  was_registered_with_order?: boolean;
}

export interface UserRegister {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface ApiError {
  errors: Array<{
    detail: string;
    source?: { pointer: string };
    status: string;
    title: string;
  }>;
}

export interface CustomForm {
  id: number;
  field_identifier: string;
  form: string;
  type: string;
  name: string;
  description: string | null;
  is_required: boolean;
  is_included: boolean;
  is_fixed: boolean;
  position: number;
  event_id: number;
}

export interface Ticket {
  id: number;
  name: string;
  description: string | null;
  type: string;
  price: number;
  quantity: number;
  is_description_visible: boolean;
  position: number;
  is_fee_absorbed: boolean;
  sales_starts_at: string;
  sales_ends_at: string;
  is_hidden: boolean;
  min_order: number;
  max_order: number;
  event_id: number;
}

export interface Order {
  id: number;
  identifier: string;
  amount: number;
  status: string;
  completed_at: string | null;
  paid_via: string | null;
  payment_mode: string;
  event_id: number;
  user_id: number | null;
}

// JSON:API response wrapper
interface JsonApiResponse<T> {
  data: T | T[];
  included?: unknown[];
  meta?: {
    count?: number;
  };
}

interface JsonApiResource<T> {
  id: string;
  type: string;
  attributes: T;
  relationships?: Record<string, unknown>;
}

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('erasmus_token', token);
      } else {
        localStorage.removeItem('erasmus_token');
      }
    }
  }

  getToken(): string | null {
    if (this.token) return this.token;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('erasmus_token');
    }
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `JWT ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.detail || 'API request failed');
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // ==========================================
  // AUTHENTICATION
  // ==========================================
  
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Invalid credentials');
    }

    const data = await response.json();
    this.setToken(data.access_token);
    return data;
  }

  async register(userData: UserRegister): Promise<User> {
    const response = await this.request<JsonApiResponse<JsonApiResource<User>>>(
      '/v1/users',
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'user',
            attributes: {
              email: userData.email,
              password: userData.password,
              'first-name': userData.first_name,
              'last-name': userData.last_name,
            },
          },
        }),
      }
    );
    const item = response.data as JsonApiResource<User>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  logout() {
    this.setToken(null);
  }

  // ==========================================
  // EVENTS
  // ==========================================

  async getEvents(): Promise<Event[]> {
    const response = await this.request<JsonApiResponse<JsonApiResource<Event>[]>>(
      '/v1/events'
    );
    return (response.data as JsonApiResource<Event>[]).map((item) => ({
      id: parseInt(item.id),
      ...item.attributes,
    }));
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const response = await this.request<JsonApiResponse<JsonApiResource<Event>[]>>(
      '/v1/events/upcoming'
    );
    return (response.data as JsonApiResource<Event>[]).map((item) => ({
      id: parseInt(item.id),
      ...item.attributes,
    }));
  }

  async getEvent(id: number): Promise<Event> {
    const response = await this.request<JsonApiResponse<JsonApiResource<Event>>>(
      `/v1/events/${id}`
    );
    const item = response.data as JsonApiResource<Event>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  async createEvent(data: EventCreate): Promise<Event> {
    const response = await this.request<JsonApiResponse<JsonApiResource<Event>>>(
      '/v1/events',
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'event',
            attributes: {
              name: data.name,
              description: data.description,
              'starts-at': data.starts_at,
              'ends-at': data.ends_at,
              'location-name': data.location_name,
              timezone: data.timezone,
              state: data.state || 'draft',
              privacy: data.privacy || 'public',
              'searchable-location-name': data.searchable_location_name,
              'is-sessions-speakers-enabled': data.is_sessions_speakers_enabled ?? false,
              'is-ticketing-enabled': data.is_ticketing_enabled ?? true,
            },
          },
        }),
      }
    );
    const item = response.data as JsonApiResource<Event>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  async updateEvent(id: number, data: Partial<EventCreate>): Promise<Event> {
    const attributes: Record<string, unknown> = {};
    if (data.name) attributes['name'] = data.name;
    if (data.description !== undefined) attributes['description'] = data.description;
    if (data.starts_at) attributes['starts-at'] = data.starts_at;
    if (data.ends_at) attributes['ends-at'] = data.ends_at;
    if (data.location_name !== undefined) attributes['location-name'] = data.location_name;
    if (data.timezone) attributes['timezone'] = data.timezone;
    if (data.state) attributes['state'] = data.state;
    if (data.privacy) attributes['privacy'] = data.privacy;

    const response = await this.request<JsonApiResponse<JsonApiResource<Event>>>(
      `/v1/events/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          data: {
            type: 'event',
            id: id.toString(),
            attributes,
          },
        }),
      }
    );
    const item = response.data as JsonApiResource<Event>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  async deleteEvent(id: number): Promise<void> {
    await this.request(`/v1/events/${id}`, {
      method: 'DELETE',
    });
  }

  // ==========================================
  // PARTNER ORGANIZATIONS
  // ==========================================

  async getPartnerOrganizations(eventId?: number): Promise<PartnerOrganization[]> {
    const endpoint = eventId 
      ? `/v1/events/${eventId}/partner-organizations`
      : '/v1/partner-organizations';
    const response = await this.request<JsonApiResponse<JsonApiResource<PartnerOrganization>[]>>(
      endpoint
    );
    return (response.data as JsonApiResource<PartnerOrganization>[]).map((item) => ({
      id: parseInt(item.id),
      ...item.attributes,
    }));
  }

  async getPartnerOrganization(id: number): Promise<PartnerOrganization> {
    const response = await this.request<JsonApiResponse<JsonApiResource<PartnerOrganization>>>(
      `/v1/partner-organizations/${id}`
    );
    const item = response.data as JsonApiResource<PartnerOrganization>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  async createPartnerOrganization(
    data: Omit<PartnerOrganization, 'id' | 'created_at' | 'modified_at'>
  ): Promise<PartnerOrganization> {
    const response = await this.request<JsonApiResponse<JsonApiResource<PartnerOrganization>>>(
      '/v1/partner-organizations',
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'partner-organization',
            attributes: {
              name: data.name,
              country: data.country,
              'oid-code': data.oid_code,
              'contact-email': data.contact_email,
              'contact-person': data.contact_person,
              'contact-phone': data.contact_phone,
              address: data.address,
              'travel-budget-limit': data.travel_budget_limit,
            },
            relationships: {
              event: {
                data: {
                  type: 'event',
                  id: data.event_id.toString(),
                },
              },
            },
          },
        }),
      }
    );
    const item = response.data as JsonApiResource<PartnerOrganization>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  async updatePartnerOrganization(
    id: number,
    data: Partial<PartnerOrganization>
  ): Promise<PartnerOrganization> {
    const attributes: Record<string, unknown> = {};
    if (data.name) attributes['name'] = data.name;
    if (data.country) attributes['country'] = data.country;
    if (data.oid_code !== undefined) attributes['oid-code'] = data.oid_code;
    if (data.contact_email !== undefined) attributes['contact-email'] = data.contact_email;
    if (data.contact_person !== undefined) attributes['contact-person'] = data.contact_person;
    if (data.contact_phone !== undefined) attributes['contact-phone'] = data.contact_phone;
    if (data.address !== undefined) attributes['address'] = data.address;
    if (data.travel_budget_limit !== undefined) attributes['travel-budget-limit'] = data.travel_budget_limit;

    const response = await this.request<JsonApiResponse<JsonApiResource<PartnerOrganization>>>(
      `/v1/partner-organizations/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          data: {
            type: 'partner-organization',
            id: id.toString(),
            attributes,
          },
        }),
      }
    );
    const item = response.data as JsonApiResource<PartnerOrganization>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  async deletePartnerOrganization(id: number): Promise<void> {
    await this.request(`/v1/partner-organizations/${id}`, {
      method: 'DELETE',
    });
  }

  // ==========================================
  // ATTENDEES
  // ==========================================

  async getAttendees(eventId?: number): Promise<Attendee[]> {
    const endpoint = eventId
      ? `/v1/events/${eventId}/attendees`
      : '/v1/attendees';
    const response = await this.request<JsonApiResponse<JsonApiResource<Attendee>[]>>(
      endpoint
    );
    return (response.data as JsonApiResource<Attendee>[]).map((item) => ({
      id: parseInt(item.id),
      ...item.attributes,
    }));
  }

  async getAttendee(id: number): Promise<Attendee> {
    const response = await this.request<JsonApiResponse<JsonApiResource<Attendee>>>(
      `/v1/attendees/${id}`
    );
    const item = response.data as JsonApiResource<Attendee>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  async updateAttendee(
    id: number,
    data: Partial<Attendee>
  ): Promise<Attendee> {
    const attributes: Record<string, unknown> = {};
    if (data.firstname) attributes['firstname'] = data.firstname;
    if (data.lastname) attributes['lastname'] = data.lastname;
    if (data.email) attributes['email'] = data.email;
    if (data.date_of_birth !== undefined) attributes['date-of-birth'] = data.date_of_birth;
    if (data.nationality !== undefined) attributes['nationality'] = data.nationality;
    if (data.special_diet_needs !== undefined) attributes['special-diet-needs'] = data.special_diet_needs;
    if (data.health_issues !== undefined) attributes['health-issues'] = data.health_issues;
    if (data.actual_travel_cost !== undefined) attributes['actual-travel-cost'] = data.actual_travel_cost;
    if (data.emergency_contact_name !== undefined) attributes['emergency-contact-name'] = data.emergency_contact_name;
    if (data.emergency_contact_phone !== undefined) attributes['emergency-contact-phone'] = data.emergency_contact_phone;
    if (data.is_checked_in !== undefined) attributes['is-checked-in'] = data.is_checked_in;

    const response = await this.request<JsonApiResponse<JsonApiResource<Attendee>>>(
      `/v1/attendees/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          data: {
            type: 'attendee',
            id: id.toString(),
            attributes,
          },
        }),
      }
    );
    const item = response.data as JsonApiResource<Attendee>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  async deleteAttendee(id: number): Promise<void> {
    await this.request(`/v1/attendees/${id}`, {
      method: 'DELETE',
    });
  }

  // ==========================================
  // TICKETS
  // ==========================================

  async getTickets(eventId: number): Promise<Ticket[]> {
    const response = await this.request<JsonApiResponse<JsonApiResource<Ticket>[]>>(
      `/v1/events/${eventId}/tickets`
    );
    return (response.data as JsonApiResource<Ticket>[]).map((item) => ({
      id: parseInt(item.id),
      ...item.attributes,
    }));
  }

  async createTicket(eventId: number, data: Partial<Ticket>): Promise<Ticket> {
    const response = await this.request<JsonApiResponse<JsonApiResource<Ticket>>>(
      '/v1/tickets',
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'ticket',
            attributes: {
              name: data.name,
              description: data.description,
              type: data.type || 'free',
              price: data.price || 0,
              quantity: data.quantity || 100,
              'is-description-visible': data.is_description_visible ?? true,
              position: data.position || 1,
              'is-fee-absorbed': data.is_fee_absorbed ?? false,
              'sales-starts-at': data.sales_starts_at,
              'sales-ends-at': data.sales_ends_at,
              'is-hidden': data.is_hidden ?? false,
              'min-order': data.min_order || 1,
              'max-order': data.max_order || 10,
            },
            relationships: {
              event: {
                data: {
                  type: 'event',
                  id: eventId.toString(),
                },
              },
            },
          },
        }),
      }
    );
    const item = response.data as JsonApiResource<Ticket>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  // ==========================================
  // ORDERS (Applications)
  // ==========================================

  async getOrders(eventId?: number): Promise<Order[]> {
    const endpoint = eventId
      ? `/v1/events/${eventId}/orders`
      : '/v1/orders';
    const response = await this.request<JsonApiResponse<JsonApiResource<Order>[]>>(
      endpoint
    );
    return (response.data as JsonApiResource<Order>[]).map((item) => ({
      id: parseInt(item.id),
      ...item.attributes,
    }));
  }

  async createOrder(eventId: number, ticketId: number, attendeeData: Partial<Attendee>): Promise<Order> {
    const response = await this.request<JsonApiResponse<JsonApiResource<Order>>>(
      '/v1/orders',
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'order',
            attributes: {
              amount: 0,
              'payment-mode': 'free',
            },
            relationships: {
              event: {
                data: {
                  type: 'event',
                  id: eventId.toString(),
                },
              },
              attendees: {
                data: [
                  {
                    type: 'attendee',
                    attributes: {
                      firstname: attendeeData.firstname,
                      lastname: attendeeData.lastname,
                      email: attendeeData.email,
                      'date-of-birth': attendeeData.date_of_birth,
                      nationality: attendeeData.nationality,
                      'special-diet-needs': attendeeData.special_diet_needs,
                      'health-issues': attendeeData.health_issues,
                      'emergency-contact-name': attendeeData.emergency_contact_name,
                      'emergency-contact-phone': attendeeData.emergency_contact_phone,
                    },
                    relationships: {
                      ticket: {
                        data: {
                          type: 'ticket',
                          id: ticketId.toString(),
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        }),
      }
    );
    const item = response.data as JsonApiResource<Order>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  // ==========================================
  // CUSTOM FORMS
  // ==========================================

  async getCustomForms(eventId: number): Promise<CustomForm[]> {
    const response = await this.request<JsonApiResponse<JsonApiResource<CustomForm>[]>>(
      `/v1/events/${eventId}/custom-forms`
    );
    return (response.data as JsonApiResource<CustomForm>[]).map((item) => ({
      id: parseInt(item.id),
      ...item.attributes,
    }));
  }

  // ==========================================
  // USERS
  // ==========================================

  async getCurrentUser(): Promise<User> {
    const response = await this.request<JsonApiResponse<JsonApiResource<User>>>(
      '/v1/users/me'
    );
    const item = response.data as JsonApiResource<User>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  async getUser(id: number): Promise<User> {
    const response = await this.request<JsonApiResponse<JsonApiResource<User>>>(
      `/v1/users/${id}`
    );
    const item = response.data as JsonApiResource<User>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const attributes: Record<string, unknown> = {};
    if (data.first_name) attributes['first-name'] = data.first_name;
    if (data.last_name) attributes['last-name'] = data.last_name;

    const response = await this.request<JsonApiResponse<JsonApiResource<User>>>(
      `/v1/users/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          data: {
            type: 'user',
            id: id.toString(),
            attributes,
          },
        }),
      }
    );
    const item = response.data as JsonApiResource<User>;
    return {
      id: parseInt(item.id),
      ...item.attributes,
    };
  }
}

export const api = new ApiClient();
