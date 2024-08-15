import { useState } from 'react'

export default function Evaluation() {
  const [rating, setRating] = useState<number>(0)

  return (
    <div>
      <h3>Avaliação da Correção</h3>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => setRating(star)}
          >
            ★
          </button>
        ))}
      </div>
      <p>Sua avaliação: {rating} estrelas</p>
    </div>
  )
}
