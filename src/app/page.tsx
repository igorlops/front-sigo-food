'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login'); // Redireciona para login se não houver token
    } else {
      router.push('/dashboard')
    }
  }, [router]);

  return (
    <main>
      <h1>Bem-vindo à Aplicação</h1>
      <p>Carregando...</p>
    </main>
  );
}
