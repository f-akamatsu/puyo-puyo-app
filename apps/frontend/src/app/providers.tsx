'use client';

import { Provider as ChakraProvider } from '@/components/ui/provider';
import { useMemo } from 'react';
import {
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
  Provider as UrqlProvider,
} from 'urql';

export function Providers({ children }: { children: React.ReactNode }) {
  // urql
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined',
    });
    const client = createClient({
      url: 'http://localhost:3001/graphql', // TODO env
      exchanges: [cacheExchange, ssr, fetchExchange],
    });
    return [client, ssr];
  }, []);

  return (
    <UrqlProvider value={client}>
      <ChakraProvider>{children}</ChakraProvider>
    </UrqlProvider>
  );
}
