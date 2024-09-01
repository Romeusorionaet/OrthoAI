import { ContentCorrectionProvider } from '@/providers/content-correction-provider'

export default async function CorrectionLayout({
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
