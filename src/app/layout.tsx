import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '../assets/styles/globals.css'
import '../assets/styles/scrollbar.css'
import ClientProviders from '@/utils/client-providers'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'OrthoAI',
  description:
    'OrthoAI é uma ferramenta de extração de conteúdo de arquivos como DOCX, PDF e imagens. Com integração à OpenAI, permite aplicar regras, criar perguntas sobre o conteúdo extraído e receber correções automáticas, incluindo comentários detalhados e notas de avaliação. Ao final, é possível baixar o resultado completo em PDF, oferecendo uma solução eficiente para análise e avaliação de textos.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.variable}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
