'use client';

import { buscaProdutos, Produto } from '@/app/data/service/ProdutoService';
import Produtos from '@/app/ui/components/componentsResults/Produto';
import ProdutosForm from '@/app/ui/components/forms/Produto';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ProdutosPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const handleClose=()=> {
    setModalVisible(false)
  }
    const [categorias, setCategorias] = useState<Produto[]>([]);
    const [error, setError] = useState(false);
  
    const fetchCategorias = async () => {
      try {
        const response = await buscaProdutos();
        if (response?.data) {
          setCategorias(response.data.data);
        }
      } catch (err) {
        console.error('Erro ao buscar categorias:', err);
        setError(true);
      }
    };
  
    useEffect(() => {
      fetchCategorias();
    }, []); // Atualiza apenas no primeiro carregamento
  
  return (
    <div>
      <Typography variant='h2'>
        Produtos
      </Typography>
      <div>
          <ButtonCreateNew description="Criar Novo produto" handleViewForm={() => setModalVisible(!modalVisible)}/>
      </div>
      <Produtos/>
      <ModalComponent
        content={<ProdutosForm onSuccess={fetchCategorias}/>}
        open={modalVisible}
        handleClose={handleClose}
      />
    </div>
  );
}
