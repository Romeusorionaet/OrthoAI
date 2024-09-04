'use client'

import { BgDecorator } from '@/components/bg-decorator'
import { Header } from '@/components/header'
import { queryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <BgDecorator />
      {children}
    </QueryClientProvider>
  )
}
