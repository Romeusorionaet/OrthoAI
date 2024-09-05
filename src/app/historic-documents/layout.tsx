import { ContentCorrectionProvider } from '@/providers/content-correction-provider'

export default async function HistoricLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ContentCorrectionProvider>{children}</ContentCorrectionProvider>
    </>
  )
}
