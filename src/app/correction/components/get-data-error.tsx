import Link from 'next/link'

export function GetDataError() {
  return (
    <div className="space-y-4 pt-44 text-center">
      <h2 className="font-bold">Error</h2>
      <p>
        Ocorreu um erro inesperado. Por favor tente repetir o processo mais uma
        vez
      </p>
      <Link href="/" className="mt-10 block text-center underline">
        Iniciar um novo processo
      </Link>
    </div>
  )
}
