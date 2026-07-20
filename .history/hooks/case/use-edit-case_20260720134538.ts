import { editCase, EditCaseData } from '@/app/workspace/_actions';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';


export function useEditCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ caseId, data }: {
        caseId: string;
        data: EditCaseData;
    }) => {
      const result = await editCase(caseId, data);
      if (!result.success) 
        throw new Error(result.message);
    },
    onMutate: async (variables) => {
      // Cancel outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['cases'] });
      await queryClient.cancelQueries({ queryKey: ['case', variables.caseId] });

    },
    onSuccess: (data, variables, context) => {
      // Invalidate queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['case', variables.caseId] });
      // Also invalidate any other related queries (e.g., paginated lists)
    },
    onError: (error, variables, context) => {
      // Rollback optimistic update on error
      if (context?.previousCases) {
        queryClient.setQueryData(['cases'], context.previousCases);
      }
      if (context?.previousCase) {
        queryClient.setQueryData(['case', variables.caseId], context.previousCase);
      }
      // Log or show error toast
      console.error('Edit case mutation error:', error);
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      // Ensure queries are re-fetched even if mutation fails (for consistency)
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['case', variables.caseId] });
    },
    ...options,
  });
}