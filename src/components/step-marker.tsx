'use client'

import { ContentCorrectionContext } from '@/providers/content-correction-provider'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import { StepMarkerSkeleton } from './skeletons/step-marker-skeleton'
import { pathsForSteps } from '@/constants/paths-for-step'

export function StepMarker() {
  const { err, contentCorrection, isLoading } = useContext(
    ContentCorrectionContext,
  )
  const pathname = usePathname()

  const currentStepIndex = pathsForSteps.indexOf(pathname)

  if (isLoading) {
    return <StepMarkerSkeleton />
  }

  const hasDocumentContent =
    !contentCorrection?.documentContent.newDocumentContent &&
    pathname === '/correction'

  const processErr = hasDocumentContent || !!err

  return (
    <section className="flex h-10 w-full max-w-[1680px] items-center justify-center gap-1">
      {pathsForSteps.map((_, index) => (
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
