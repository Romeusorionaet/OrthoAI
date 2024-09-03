import { ContentCorrectionContext } from '@/providers/content-correction-provider'
import { jsPDF } from 'jspdf'
import { useContext } from 'react'

interface Props {
  selectedItems: {
    quiz: boolean
    rules: boolean
    evaluation: boolean
  }
}

export function DownloadDocument({ selectedItems }: Props) {
  const { contentCorrection } = useContext(ContentCorrectionContext)

  if (!contentCorrection) {
    return
  }

  const {
    comment,
    originalDocumentContent,
    evaluation,
    newDocumentContent,
    rules,
  } = contentCorrection.documentContent

  const quiz = contentCorrection.quizQuestions.quiz

  const generatePDF = () => {
    const doc = new jsPDF()
    const margin = 20
    const pageHeight = doc.internal.pageSize.height
    const pageWidth = doc.internal.pageSize.width
    const lineHeight = 8
    let y = margin
    let pageCount = 1

    const addText = (text: string) => {
      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin)
      lines.forEach((line: any) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage()
          y = margin
          pageCount++
        }
        doc.text(line, margin, y)
        y += lineHeight
      })
    }

    const addSection = (title: string, content: string) => {
      if (pageCount > 1) {
        doc.addPage()
        y = margin
        pageCount++
      }
      doc.setFontSize(12)
      doc.text(title, margin, y)
      y += 15
      addText(content || '')
    }

    doc.setFont('Times', 'arial')

    addSection('Conteúdo Original:', originalDocumentContent)

    addSection('Conteúdo Corrigido:', newDocumentContent)

    if (selectedItems.quiz) {
      addSection(
        'Questões:',
        JSON.parse(quiz || '[]')
          .map((item: string, index: number) => `${index + 1}. ${item}`)
          .join('\n'),
      )
    }

    if (selectedItems.rules) {
      addSection(
        'Regras:',
        JSON.parse(rules || '[]')
          .map((item: string, index: number) => `${index + 1}. ${item}`)
          .join('\n'),
      )
    }

    if (selectedItems.evaluation && evaluation) {
      addSection(
        'Avaliação:',
        `Pontuação: ${evaluation}${comment ? `\nComentário: ${comment}` : ''}`,
      )
    }

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(10)
      doc.text(`${i}`, pageWidth - margin, pageHeight - margin, {
        align: 'right',
      })
    }

    doc.save('resultado.pdf')
  }

  return (
    <button onClick={generatePDF} className="mt-4 rounded-md border p-1">
      Download do resultado em PDF
    </button>
  )
}
