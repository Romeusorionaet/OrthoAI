import { ReactNode, createContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

interface ContentCorrectionProps {
  originalDocumentContent: string
  newDocumentContent: string
  evaluation: string
  comment: string
  rules: string
}

interface DocumentContentProps {
  documentContent: ContentCorrectionProps
  quizQuestions: { quiz: string | null }
}

interface ContentCorrectionType {
  contentCorrection: DocumentContentProps
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
  const [documentContentId, setDocumentContentId] = useState<string | null>(
    null,
  )

  useEffect(() => {
    const id = localStorage.getItem('@ortho-ai/documentContentId/1.0')
    setDocumentContentId(id)
  }, [])

  const {
    data,
    isLoading,
    error: err,
  } = useQuery<DocumentContentProps>({
    queryKey: ['contentDocument', documentContentId],
    queryFn: () =>
      api
        .get(`/correction/${documentContentId}`)
        .then((response) => response.data),
    enabled: !!documentContentId,
  })

  if (!data) {
    return null
  }

  return (
    <ContentCorrectionContext.Provider
      value={{ contentCorrection: data, isLoading, err }}
    >
      {children}
    </ContentCorrectionContext.Provider>
  )
}
