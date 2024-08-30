import { StepMarker } from '@/components/step-marker'
import { ContentCorrection } from './components/content-correction'
import { QueryClient } from '@tanstack/react-query'

export default async function Correction() {
  // const queryClient = new QueryClient()

  // await queryClient.prefetchQuery({
  //   queryKey: ['addressData'],
  //   queryFn: () => getDataUserAddress(),
  //   staleTime: 1000 * 60 * 60 * 24, // 24 hours
  // })

  return (
    <main className="mx-auto w-full max-w-[1680px] space-y-10 px-4">
      <StepMarker />

      <div className="w-full max-w-[800px]">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, rerum!
          Optio perferendis impedit exercitationem dolorem tempora amet sint ab
          quasi mollitia vero, voluptatem id veritatis cupiditate? Perferendis
          fugiat repellat dolores.
        </p>
      </div>

      <ContentCorrection />
    </main>
  )
}
