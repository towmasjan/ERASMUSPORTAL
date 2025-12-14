'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, PartnerOrganization, Attendee, Event } from './api';
import { toast } from 'sonner';

// Query Keys
export const queryKeys = {
  events: ['events'] as const,
  event: (id: number) => ['events', id] as const,
  partnerOrganizations: ['partnerOrganizations'] as const,
  partnerOrganization: (id: number) => ['partnerOrganizations', id] as const,
  attendees: ['attendees'] as const,
  attendee: (id: number) => ['attendees', id] as const,
  user: ['user'] as const,
};

// Events Hooks
export function useEvents() {
  return useQuery({
    queryKey: queryKeys.events,
    queryFn: () => api.getEvents(),
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: queryKeys.event(id),
    queryFn: () => api.getEvent(id),
    enabled: !!id,
  });
}

// Partner Organizations Hooks
export function usePartnerOrganizations(eventId?: number) {
  return useQuery({
    queryKey: [...queryKeys.partnerOrganizations, eventId],
    queryFn: () => api.getPartnerOrganizations(eventId),
  });
}

export function usePartnerOrganization(id: number) {
  return useQuery({
    queryKey: queryKeys.partnerOrganization(id),
    queryFn: () => api.getPartnerOrganization(id),
    enabled: !!id,
  });
}

export function useCreatePartnerOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<PartnerOrganization, 'id' | 'created_at' | 'modified_at'>) =>
      api.createPartnerOrganization(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.partnerOrganizations });
      toast.success('Partner organization created successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to create partner organization', {
        description: error.message,
      });
    },
  });
}

export function useUpdatePartnerOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<PartnerOrganization> }) =>
      api.updatePartnerOrganization(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.partnerOrganizations });
      queryClient.invalidateQueries({ queryKey: queryKeys.partnerOrganization(id) });
      toast.success('Partner organization updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update partner organization', {
        description: error.message,
      });
    },
  });
}

export function useDeletePartnerOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.deletePartnerOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.partnerOrganizations });
      toast.success('Partner organization deleted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete partner organization', {
        description: error.message,
      });
    },
  });
}

// Attendees Hooks
export function useAttendees(eventId?: number) {
  return useQuery({
    queryKey: [...queryKeys.attendees, eventId],
    queryFn: () => api.getAttendees(eventId),
  });
}

export function useAttendee(id: number) {
  return useQuery({
    queryKey: queryKeys.attendee(id),
    queryFn: () => api.getAttendee(id),
    enabled: !!id,
  });
}

export function useUpdateAttendee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Attendee> }) =>
      api.updateAttendee(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.attendees });
      queryClient.invalidateQueries({ queryKey: queryKeys.attendee(id) });
      toast.success('Attendee updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update attendee', {
        description: error.message,
      });
    },
  });
}

// User Hook
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: () => api.getCurrentUser(),
    retry: false,
  });
}

