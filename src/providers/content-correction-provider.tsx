'use client'

import { ReactNode, createContext } from 'react'
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { getCorrectionDocumentContent } from '@/actions/get-correction-document-content'

interface ContentCorrectionProps {
  originalDocumentContent: string
  newDocumentContent: string
  evaluation: string
  comment: string
  rules: string
}

export interface DocumentContentProps {
  documentContent: ContentCorrectionProps
  quizQuestions: { quiz: string | '[]' }
}

interface ContentCorrectionType {
  contentCorrection: DocumentContentProps | null
  isLoading: boolean
  err: Error | null
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
  clearCache: () => void
}

interface UserContextProps {
  children: ReactNode
}

export const ContentCorrectionContext = createContext(
  {} as ContentCorrectionType,
)

export function ContentCorrectionProvider({ children }: UserContextProps) {
  const queryClient = useQueryClient()

  const {
    data,
    isLoading,
    error: err,
    refetch,
  } = useQuery({
    queryKey: ['contentDocument'],
    queryFn: () => getCorrectionDocumentContent(),
  })

  const clearCache = () => {
    queryClient.removeQueries({ queryKey: ['contentDocument'] })
  }

  return (
    <ContentCorrectionContext.Provider
      value={{
        contentCorrection: data?.documentContent || null,
        isLoading,
        err,
        refetch,
        clearCache,
      }}
    >
      {children}
    </ContentCorrectionContext.Provider>
  )
}
