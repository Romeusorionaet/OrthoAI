interface Props {
  score: number
  comment?: string
}

export default function Evaluation({ score, comment }: Props) {
  return (
    <article className="w-full max-w-[40rem]">
      <h2 className="mb-6 text-center font-bold">Avaliação da Correção</h2>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-lg font-bold">{score}</span>

        <div className="flex">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <div
              key={index}
              className={`text-2xl ${star <= score ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              ★
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-justify">{comment}</p>
    </article>
  )
}
