import { FormUploader } from './components/form-uploader'

export default function Home() {
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

      <section className="mx-auto flex w-full items-start gap-20 max-md:flex-col md:gap-4">
        <FormUploader />
      </section>
    </main>
  )
}
