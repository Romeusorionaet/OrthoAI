import { StepMarker } from '@/components/step-marker'
import { ContentCorrection } from './components/content-correction'

export default async function Correction() {
  return (
    <main className="mx-auto w-full max-w-[1680px] space-y-10 px-4">
      <StepMarker />

      <ContentCorrection />
    </main>
  )
}
