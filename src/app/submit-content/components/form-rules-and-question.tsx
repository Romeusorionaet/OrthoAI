'use client'

import { submitContent } from '@/actions/submit-content'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export function FormRulesAndQuestion() {
  const [inputRules, setInputRules] = useState([{ id: 1, value: '' }])
  const [inputQuestions, setInputQuestions] = useState([{ id: 1, value: '' }])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const rules = inputRules.map((input) => input.value.trim()).filter(Boolean)
    const questions = inputQuestions
      .map((input) => input.value.trim())
      .filter(Boolean)

    if (rules.length === 0 && questions.length === 0) {
      setLoading(false)
      setError('Por favor, preencha pelo menos um campo antes de enviar.')

      return
    }

    setError(null)

    const response = await submitContent({ questions, rules })

    if (response.success === true) {
      setLoading(false)

      router.push('/correction')
    } else {
      setLoading(false)
      alert(response.message)
    }
  }

  const addRuleInput = () => {
    setInputRules([...inputRules, { id: Date.now(), value: '' }])
  }

  const addQuestionInput = () => {
    setInputQuestions([...inputQuestions, { id: Date.now(), value: '' }])
  }

  const removeRuleInput = (id: number) => {
    setInputRules(inputRules.filter((input) => input.id !== id))
  }

  const removeQuestionInput = (id: number) => {
    setInputQuestions(inputQuestions.filter((input) => input.id !== id))
  }

  const handleRuleChange = (id: number, value: string) => {
    setInputRules(
      inputRules.map((input) =>
        input.id === id ? { ...input, value } : input,
      ),
    )
  }

  const handleQuestionChange = (id: number, value: string) => {
    setInputQuestions(
      inputQuestions.map((input) =>
        input.id === id ? { ...input, value } : input,
      ),
    )
  }

  return (
    <form onSubmit={handleUpload} className="mx-auto w-full text-center">
      <label className="flex flex-col items-center gap-2">
        Adicione sua regra
        {inputRules.map((input, index) => (
          <div key={input.id} className="flex items-center gap-2">
            <input
              type="text"
              name={`rules-${index}`}
              className=""
              placeholder={`Regra ${index + 1}`}
              value={input.value}
              onChange={(e) => handleRuleChange(input.id, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeRuleInput(input.id)}
              className="rounded bg-red-500 p-2 text-white"
            >
              -
            </button>
          </div>
        ))}
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <button
          type="button"
          onClick={addRuleInput}
          className="mt-2 rounded bg-blue-500 p-2 text-white"
        >
          +
        </button>
      </label>

      <label className="mt-4 flex flex-col items-center gap-2">
        Adicione sua pergunta (opcional)
        {inputQuestions.map((input, index) => (
          <div key={input.id} className="flex items-center gap-2">
            <input
              type="text"
              name={`pergunta-${index}`}
              className=""
              placeholder={`Pergunta ${index + 1}`}
              value={input.value}
              onChange={(e) => handleQuestionChange(input.id, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeQuestionInput(input.id)}
              className="rounded bg-red-500 p-2 text-white"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestionInput}
          className="mt-2 rounded bg-blue-500 p-2 text-white"
        >
          +
        </button>
      </label>

      {loading ? (
        <p>processando...</p>
      ) : (
        <button
          type="submit"
          className="mt-4 rounded bg-green-500 p-2 text-white"
        >
          Enviar
        </button>
      )}
    </form>
  )
}
