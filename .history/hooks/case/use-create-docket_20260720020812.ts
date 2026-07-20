"use client"
import { createDocket, CreateDocketArg } from '@/app/workspace/_actions';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

// Infer the return type of the server action
type CreateDocketResult = Awaited<ReturnType<typeof createDocket>>;

/**
 * Mutation hook to create a new docket.
 * Automatically invalidates the docket list query on success.
 */
export function useCreateDocket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: CreateDocketArg) => {
      const result = await createDocket(arg);
      if (!result.success || result.error) {
        
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dockets"] });
    },
  });
}