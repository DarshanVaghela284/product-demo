import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 10,
            retry: 0,
            refetchOnWindowFocus: false,
            gcTime: 2000 * 10,
        },
    },
});

export const invalidateQuery = (queryKey: string[]) => queryClient.invalidateQueries({ queryKey });

export default queryClient;
