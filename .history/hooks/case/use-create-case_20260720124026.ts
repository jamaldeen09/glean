"use client"
import { createCase, CreateCaseArgs } from '@/app/workspace/_actions';
import { formatValidationErrors } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: CreateCaseArgs) => {
      const result = await createCase(arg);
      if (!result.success) {
        if (result.error && result.error.validationErrors) 
          throw result.error;
        throw new Error(result.message);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["dockets"] })
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