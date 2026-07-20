"use client"
// hooks/use-create-docket.ts
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { createDocket } from '@/app/actions/docket'; // adjust import path
import type { CreateDocketArg } from '@/lib/schemas'; // adjust import

// Infer the return type of the server action
type CreateDocketResult = Awaited<ReturnType<typeof createDocket>>;

type MutationContext = {
  previousDockets?: unknown; // optionally store previous data for rollback
};

/**
 * Mutation hook to create a new docket.
 * Automatically invalidates the docket list query on success.
 */
export function useCreateDocket(
  options?: Omit<
    UseMutationOptions<CreateDocketResult, Error, CreateDocketArg, MutationContext>,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<CreateDocketResult, Error, CreateDocketArg, MutationContext>({
    mutationFn: createDocket,
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch docket list queries (adjust query key as needed)
      queryClient.invalidateQueries({ queryKey: ['dockets'] });
      // Optionally show a success toast here, or let the component handle it
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      // Optional global error handling (e.g., toast)
      console.error('Failed to create docket:', error);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
}