"use client"
import { createDocket, CreateDocketArg } from '@/app/workspace/_actions';
import { formatValidationErrors } from '@/lib/utils';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateDocket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: CreateDocketArg) => {
      const result = await createDocket(arg);
      if (!result.success) {
        if (result.error && result.error.validationErrors) 
          throw result.error;
        throw new Error(result.message);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dockets"] });
    },

    onError: (error) => {
      const validationErrors = (error as any)?.validationErrors
      if (validationErrors) {
        const formatted = formatValidationErrors(validationErrors);
        toast.error("Validation failed", { description: formatted })
      }
      else toast.error(error.message);
    }
  });
}