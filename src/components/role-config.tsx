'use client'

import React, { useState } from 'react'

export default function RoleConfig() {
  const [rules, setRules] = useState<string[]>([])

  const handleAddRule = (newRule: string) => {
    setRules([...rules, newRule])
  }

  return (
    <section>
      <h2>Regras de Correção</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()

          const rule = (e.target as any).rule.value
          handleAddRule(rule)
        }}
      >
        <input
          type="text"
          name="rule"
          placeholder="Nova regra"
          className="border p-1"
        />
        <button type="submit" className="border p-1">
          Adicionar Regra
        </button>
      </form>
      <div>
        {rules.map((rule, index) => (
          <div key={index} className="mt-2 border p-2">
            {rule}
          </div>
        ))}
      </div>
    </section>
  )
}
