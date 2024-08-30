'use client'

import { queryClient } from '@/lib/query-client'
import { ContentCorrectionProvider } from '@/providers/content-correction-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContentCorrectionProvider>{children}</ContentCorrectionProvider>
    </QueryClientProvider>
  )
}
