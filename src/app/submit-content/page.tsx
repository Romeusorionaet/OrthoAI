import { FormRulesAndQuestion } from './components/form-rules-and-question'

export default function SubmitContent() {
  return (
    <main className="mx-auto mt-10 w-full max-w-[1680px] px-4 pb-20">
      <FormRulesAndQuestion />

      <div className="relative mt-20 w-full max-w-[800px] space-y-4">
        <div className="absolute -left-10 -top-6 -z-10 h-96 w-32 rounded-md bg-gradient-to-r from-cl_3 to-transparent" />
        <div className="space-y-4">
          <p>
            Configure regras e perguntas que serão importantes para o seu
            processo.
          </p>

          <p>
            Suas regras servirão como base para a correção do conteúdo enviado.
          </p>

          <h3>Exemplo de regra para um conteúdo de Redação:</h3>
          <ul className="flex list-disc flex-col gap-4 pl-6">
            <li>Coesão</li>
            <li>Coerência</li>
            <li>Argumentação</li>
            <li>Avalie a qualidade dos argumentos e análise de crítica</li>
            <li>Adequação Linguística</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
