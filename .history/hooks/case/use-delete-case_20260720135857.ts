"use client"
import { deleteCase } from "@/app/workspace/_actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCase() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (caseId: string) => {
            const result = await deleteCase(caseId);
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