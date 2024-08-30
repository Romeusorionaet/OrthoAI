interface Props {
  score: number
  comment: string
}

export default function Evaluation({ score, comment }: Props) {
  return (
    <div>
      <h3>Avaliação da Correção</h3>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star, index) => (
          <button
            key={index}
            className={`text-2xl ${star <= score ? 'text-yellow-500' : 'text-gray-400'}`}
          >
            ★
          </button>
        ))}
      </div>
      <p>{comment}</p>
    </div>
  )
}
