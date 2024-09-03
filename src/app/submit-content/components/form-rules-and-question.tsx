'use client'

import { submitContent } from '@/actions/submit-content'
import { CPLoading } from '@/components/cp-loading'
import { CircleX, Plus } from 'lucide-react'
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
    <div className="mx-auto w-full text-center">
      <CPLoading loading={loading} />

      <form onSubmit={handleUpload}>
        <div className="flex items-center justify-between gap-20 max-md:flex-col md:gap-10">
          <section className="relative h-56 w-full md:w-1/2">
            <div className="flex justify-between md:justify-evenly">
              <label
                htmlFor="rules"
                className="flex flex-col gap-2 md:items-center"
              >
                <span className="mb-4">Regras</span>
              </label>

              <p className="font-bold">({inputRules.length})</p>
            </div>

            {error && <p className="my-2 text-red-500">{error}</p>}

            <div className="h-full space-y-2 overflow-auto border-y border-cl_2 p-2">
              {inputRules.map((input, index) => (
                <div key={input.id} className="flex items-center gap-2">
                  <input
                    autoFocus
                    type="text"
                    name="rules"
                    placeholder={`Regra ${index + 1}`}
                    value={input.value}
                    onChange={(e) => handleRuleChange(input.id, e.target.value)}
                    className="rounded-md bg-cl_2 p-1 text-cl_1"
                  />
                  <button
                    type="button"
                    title="delete"
                    onClick={() => removeRuleInput(input.id)}
                    className="rounded text-white"
                  >
                    <CircleX className="text-cl_5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              title="new input"
              onClick={addRuleInput}
              className="absolute bottom-2 right-8 rounded-full bg-blue-500 p-1 text-white"
            >
              <Plus />
            </button>
          </section>

          <section className="relative h-56 w-full md:w-1/2">
            <div className="flex justify-between md:justify-evenly">
              <label
                htmlFor="questions"
                className="flex flex-col gap-2 md:items-center"
              >
                <span className="mb-4">Perguntas (Opicional)</span>
              </label>

              <p className="font-bold">({inputQuestions.length})</p>
            </div>

            <div className="h-full space-y-2 overflow-auto border-y border-cl_2 p-2">
              {inputQuestions.map((input, index) => (
                <div key={input.id} className="flex items-center gap-2">
                  <input
                    autoFocus
                    type="text"
                    name="questions"
                    placeholder={`Pergunta ${index + 1}`}
                    value={input.value}
                    onChange={(e) =>
                      handleQuestionChange(input.id, e.target.value)
                    }
                    className="rounded-md bg-cl_2 p-1 text-cl_1"
                  />
                  <button
                    type="button"
                    title="delete"
                    onClick={() => removeQuestionInput(input.id)}
                    className="rounded text-white"
                  >
                    <CircleX className="text-cl_5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              title="new input"
              onClick={addQuestionInput}
              className="absolute bottom-2 right-8 rounded-full bg-blue-500 p-1 text-white"
            >
              <Plus />
            </button>
          </section>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-20 w-28 rounded-lg border border-cl_1 p-1 duration-500 disabled:cursor-not-allowed disabled:opacity-50 data-[value=false]:cursor-not-allowed data-[value=false]:opacity-50 data-[value=true]:hover:scale-105"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
