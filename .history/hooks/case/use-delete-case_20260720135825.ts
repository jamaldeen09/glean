"use client"

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
  
        return result.message;
      },
      onSuccess: (msg) => {
          queryClient.resetQueries({ queryKey: ["cases"] });
          toast.success(msg);
      },
  
      onError: (err) => toast.error(err.message)
    });
  }