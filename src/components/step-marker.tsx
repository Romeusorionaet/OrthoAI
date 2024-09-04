'use client'

import { paths } from '@/constants/paths'
import { ContentCorrectionContext } from '@/providers/content-correction-provider'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import { StepMarkerSkeleton } from './skeletons/step-marker-skeleton'

export function StepMarker() {
  const { err, contentCorrection, isLoading } = useContext(
    ContentCorrectionContext,
  )
  const pathname = usePathname()

  const currentStepIndex = paths.indexOf(pathname)

  if (isLoading) {
    return <StepMarkerSkeleton />
  }

  const hasDocumentContent =
    !contentCorrection?.documentContent.newDocumentContent &&
    pathname === '/correction'

  const processErr = hasDocumentContent || !!err

  return (
    <section className="absolute left-0 top-24 flex h-10 w-full items-center justify-center gap-1">
      {paths.map((_, index) => (
        <div
          key={index}
          data-value={!!processErr && index === currentStepIndex}
          className={`h-1 w-full rounded-lg opacity-10 ${
            index <= currentStepIndex
              ? 'bg-cl_3 opacity-100 duration-700'
              : 'bg-cl_3'
          } ${processErr && index === currentStepIndex ? 'bg-cl_5' : ''}`}
        />
      ))}
    </section>
  )
}
