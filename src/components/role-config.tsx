'use client'

import { X } from 'lucide-react'
import React, { useState } from 'react'

export default function RoleConfig() {
  const [rules, setRules] = useState<string[]>([])

  const handleAddRule = (newRule: string) => {
    setRules([...rules, newRule])
  }

  const hasRules = rules.length > 0

  return (
    <section className="w-full">
      <h2 className="mb-6 text-xl font-bold">Regras de Correção</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()

          const rule = (e.target as any).rule.value
          handleAddRule(rule)
        }}
        className="flex flex-col items-start gap-4"
      >
        <textarea
          name="rule"
          placeholder="Nova regra"
          className="h-32 w-full max-w-[600px] resize-none rounded-lg bg-cl_6 p-2"
        />

        <button
          type="submit"
          className="h-10 rounded-lg border p-1 duration-500 hover:scale-105"
        >
          Adicionar
        </button>
      </form>

      <div
        data-value={hasRules}
        className="mt-10 flex h-32 w-full flex-wrap items-center justify-center gap-2 overflow-auto rounded-lg bg-cl_6 p-4 data-[value=false]:opacity-0"
      >
        {rules.map((rule, index) => (
          <button
            key={index}
            className="flex h-10 w-52 items-center justify-start overflow-hidden rounded-md border border-cl_1 border-opacity-30 duration-500 hover:scale-105"
          >
            <div className="line-clamp-1 w-40">
              <p className="">{rule}</p>
            </div>

            <button className="pl-4 opacity-70 hover:text-cl_5 hover:opacity-100">
              <X />
            </button>
          </button>
        ))}
      </div>
    </section>
  )
}
