'use client';

import { buscaProdutos, Produto } from '@/app/data/service/ProdutoService';
import Produtos from '@/app/ui/components/componentsResults/Produto';
import ProdutosForm from '@/app/ui/components/forms/Produto';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close } from '@mui/icons-material';
import { Alert, Collapse, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ProdutosPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [produto_id, setProdutoId] = useState<number | null>(null)
  const handleClose=()=> {
    setModalVisible(false)
  }
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [error, setError] = useState(false);

    const handleEditar = (product_id:number) => {
      if(confirm("Você deseja editar o produto?")) {
        setProdutoId(product_id)
        setModalVisible(true);
      }
    }
    const handleExcluir = (product_id:number) => {
      if(confirm("Você deseja excluir o produto?")) {
        setOpenAlert(true)
      }
    }
  
    const fetchProdutos = async () => {
      try {
        const response = await buscaProdutos();
        if (response?.data) {
          setProdutos(response.data.data);
        }
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError(true);
      }
    };
  
    useEffect(() => {
      fetchProdutos();
    }, []);
  
  return (
    <div>
      <Typography variant='h2'>
        Produtos
      </Typography>
      <Collapse in={openAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Produto excluído com sucesso
        </Alert>
      </Collapse>
      <p className='text-red-500 text-sm'>{error}</p>
      <div>
          <ButtonCreateNew description="Criar Novo produto" handleViewForm={() => {setModalVisible(!modalVisible); setProdutoId(null)}}/>
      </div>
      <Produtos produtos={produtos} handleEditar={handleEditar} handleExcluir={handleExcluir}/>
      <ModalComponent
        content={<ProdutosForm onSuccess={fetchProdutos} produto_id={produto_id}/>}
        open={modalVisible}
        handleClose={handleClose}
      />
    </div>
  );
}
