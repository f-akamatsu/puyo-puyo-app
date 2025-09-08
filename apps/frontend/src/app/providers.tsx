'use client';

import { Provider as ChakraProvider } from '@/components/ui/provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
