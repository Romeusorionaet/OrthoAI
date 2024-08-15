import { useState } from 'react'

export default function ShareQuestions() {
  const [question, setQuestion] = useState<string>('')
  const [response, setResponse] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Enviar a questão para o backend, que chamará o ChatGPT
    const res = await fetch('/api/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    })
    const data = await res.json()
    setResponse(data.response) // Resposta do ChatGPT
  }

  return (
    <section>
      <h2>Envie sua questão</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border p-2"
          placeholder="Digite sua questão aqui"
        />
        <button type="submit" className="mt-2 border p-2">
          Enviar
        </button>
      </form>
      {response && (
        <div className="mt-4">
          <h3>Resposta do ChatGPT</h3>
          <p>{response}</p>
        </div>
      )}
    </section>
  )
}
