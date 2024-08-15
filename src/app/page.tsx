'use client'

import Evaluation from '@/components/evaluation';
import RoleConfig from '@/components/role-config';
import ShareQuestions from '@/components/share-questions';
import React, { useState } from 'react';

export default function Home() {
  const [originalText, setOriginalText] = useState<string | null>(null);
  const [correctedText, setCorrectedText] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Enviar o arquivo ao backend, que irá enviar ao ChatGPT para correção
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setOriginalText(data.originalText); // Texto original recebido
    setCorrectedText(data.correctedText); // Texto corrigido pelo ChatGPT
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10 pt-28">
      <section>
        <form onSubmit={handleUpload}>
          <label className="flex flex-col items-center gap-2">
            <input type="file" name="file" className="border p-1" />
            <span>(pdf/jpg/jpeg)</span>
          </label>
          <button type="submit" className="border p-1">Enviar</button>
        </form>
      </section>

      {originalText && correctedText && (
        <section className="flex flex-col items-center gap-4">
          <h2>Resultado da Correção</h2>
          <div className="flex gap-4">
            <div className="border p-4 w-1/2">
              <h3>Texto Original</h3>
              <p>{originalText}</p>
            </div>
            <div className="border p-4 w-1/2">
              <h3>Texto Corrigido</h3>
              <p>{correctedText}</p>
              <button className="border p-1 mt-4">Download do resultado em PDF</button>
            </div>
          </div>
        </section>
      )}

      <RoleConfig />

      <Evaluation />

      <ShareQuestions />
    </main>
  );
}
