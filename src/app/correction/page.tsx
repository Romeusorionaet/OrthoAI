import { ContentCorrection } from './components/content-correction'

export default async function Correction() {
  return (
    <main className="mx-auto w-full max-w-[1680px] space-y-10 px-4">
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
