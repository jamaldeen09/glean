export default function QueryProvider () {

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }));
      
    return (
        const [queryClient] = useState(() => new QueryClient({
            defaultOptions: {
              queries: {
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
                retry: 1,
              },
            },
          }));
    )
}