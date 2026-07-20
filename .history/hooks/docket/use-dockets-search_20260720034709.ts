import { useQuery, useQueryClient } from "@tanstack/react-query"


export default function useDocketSearch() {
    const { data } = useQuery({
      queryKey: ["docketSearch"],
      queryFn: () => "",       // never actually runs — enabled: false below
      initialData: "",
      staleTime: Infinity,     // never considered stale, so it never auto-refetches
      enabled: false,
    })
    return data ?? ""
  }
  