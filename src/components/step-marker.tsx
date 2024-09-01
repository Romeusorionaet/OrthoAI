'use client'

import { paths } from '@/constants/paths'
import { usePathname } from 'next/navigation'

export function StepMarker() {
  const pathname = usePathname()

  const currentStepIndex = paths.indexOf(pathname)

  return (
    <section className="flex h-10 w-full items-center justify-center gap-1">
      {paths.map((_, index) => (
        <div
          key={index}
          className={`h-2 w-full rounded-lg opacity-10 ${
            index <= currentStepIndex
              ? 'bg-cl_3 opacity-100 duration-700'
              : 'bg-cl_3/10'
          }`}
        />
      ))}
    </section>
  )
}
