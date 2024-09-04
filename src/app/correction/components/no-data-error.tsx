import Link from 'next/link'

export function NoDataError() {
  return (
    <div className="space-y-4 pt-44 text-center">
      <h2 className="font-bold">Dados não encontado</h2>
      <p>Você deverá voltar a etapa inicial para iniciar um novo processo.</p>
      <Link href="/" className="mt-10 block text-center underline">
        Iniciar um novo processo
      </Link>
    </div>
  )
}
