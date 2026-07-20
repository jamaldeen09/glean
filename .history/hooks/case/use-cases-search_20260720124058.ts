import { useQuery } from "@tanstack/react-query"

export default function useDocketSearch() {
    const { data } = useQuery({
      queryKey: ["caseSearch"],
      queryFn: () => "",  
      initialData: "",
      staleTime: Infinity,
      enabled: false,
    })
    return data ?? ""
  }
  