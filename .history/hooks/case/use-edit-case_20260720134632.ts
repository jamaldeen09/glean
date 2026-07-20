import { editCase, EditCaseData } from '@/app/workspace/_actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';


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
    onSuccess: () => {
        queryClient.resetQueries({ queryKey: ["cases"] });
    },
  });
}