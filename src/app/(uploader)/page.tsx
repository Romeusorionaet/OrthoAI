import { FormUploader } from './components/form-uploader'

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1680px] space-y-10 px-4 pb-10">
      <section className="mx-auto mt-10 flex w-full items-start gap-20 max-md:flex-col md:gap-4">
        <FormUploader />
      </section>

      <div className="relative w-full max-w-[800px]">
        <div className="absolute -left-10 -top-6 -z-10 h-96 w-32 rounded-md bg-gradient-to-r from-cl_3 to-transparent" />
        <p>
          <strong>Atenção aos Requisitos de Upload de Arquivos</strong>
        </p>
        <p>
          Para garantir o processamento correto dos arquivos enviados, é
          importante que você atenda aos seguintes critérios:
        </p>
        <ul className="mt-4 flex list-disc flex-col gap-4 pl-6">
          <li>
            <strong>Formatos Aceitos:</strong> Certifique-se de que o arquivo
            esteja em um dos formatos aceitos pela nossa plataforma. Atualmente,
            os formatos recomendados são <strong>PDF</strong> e{' '}
            <strong>DOCX</strong>.
          </li>
          <li>
            <strong>Tamanho do Arquivo:</strong> Verifique o tamanho do arquivo
            antes de enviá-lo, pois arquivos acima de 2 MB não são aceitos.
          </li>
          <li>
            <strong>Limitações com Formatos de Imagem:</strong> Informamos que o
            suporte para arquivos de imagem (como JPEG, JPG e PNG) ainda está em
            fase de aprimoramento. Devido à variedade de tipos e qualidades de
            imagens que podem ser enviados, os resultados obtidos podem não
            corresponder às expectativas. Por isso, sugerimos fortemente que,
            sempre que possível, você opte por enviar arquivos nos formatos PDF
            ou DOCX.
          </li>
        </ul>
      </div>
    </main>
  )
}
