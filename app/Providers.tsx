'use client';

import { ReactNode } from 'react';
import { ListProvider } from '@/components/SelectedListContext'; // update the path based on your project

export function Providers({ children }: { children: ReactNode }) {
  return <ListProvider>{children}</ListProvider>;
}
