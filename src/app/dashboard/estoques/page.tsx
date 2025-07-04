'use client';

import { buscaEstoques, Estoque } from '@/app/data/service/EstoqueService';
import Estoques from '@/app/ui/components/componentsResults/Estoques';
import { useEffect, useState } from 'react';

export default function EstoquesPage() {
      // Especificar o tipo de estado corretamente
    const [estoques, setEstoques] = useState<Estoque[]>([]); // Agora o estado é um array de Estoque
    const [error, setError] = useState(false);

    // Função assíncrona para buscar Estoques
    async function fetchEstoques() {
      try {
        const response = await buscaEstoques();
        console.log(response?.data)
        if (response?.data) {
          setEstoques(response.data.data); // Atualiza o estado com as Estoques
        }
      } catch (err) {
        console.error("Erro ao buscar Estoques:", err);
        setError(true);
      }
    }
            
    useEffect(() => {
        fetchEstoques();
    }, []); // O array vazio garante que a função execute apenas uma vez
  
  return (
    <div>
      <Estoques estoques={estoques} error={error}/>
    </div>
  );
}
