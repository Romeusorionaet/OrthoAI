'use client'

import { ReactNode, createContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDocumentContent } from '@/actions/get-document-content'

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
}

interface UserContextProps {
  children: ReactNode
}

export const ContentCorrectionContext = createContext(
  {} as ContentCorrectionType,
)

export function ContentCorrectionProvider({ children }: UserContextProps) {
  const {
    data,
    isLoading,
    error: err,
  } = useQuery({
    queryKey: ['contentDocument'],
    queryFn: () => getDocumentContent(),
  })

  return (
    <ContentCorrectionContext.Provider
      value={{
        contentCorrection: data?.documentContent || null,
        isLoading,
        err,
      }}
    >
      {children}
    </ContentCorrectionContext.Provider>
  )
}
