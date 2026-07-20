"use client"
import { createDocket, CreateDocketArg } from '@/app/workspace/_actions';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

export function useCreateDocket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: CreateDocketArg) => {
      const result = await createDocket(arg);
      if (!result.success || !r) {
        if (result.error && result.error.validationErrors) 
          throw result.error
        throw new Error(result.message);
      }

      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dockets"] });
    },
  });
}