'use client';

import { useEffect, useState } from "react";
import { Typography, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { adicionaEstoque, atualizaEstoque, buscaEstoque } from "@/app/data/service/EstoqueService";
import { buscaProdutos, Produto } from "@/app/data/service/ProdutoService";

interface FormEstoquesProps {
  onSuccess: () => void;
  estoque_id: number | null;
}

const movementTypes = [
  { value: 'in', label: 'Entrada' },
  { value: 'out', label: 'Saída' },
];

export default function FormEstoques({ onSuccess, estoque_id }: FormEstoquesProps) {
  const [id_product, setIdProduct] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [type, setType] = useState<string>('in');
  const [observation, setObservation] = useState<string>('');
  const [products, setProducts] = useState<Produto[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (estoque_id) {
      fetchEstoque(estoque_id);
    }
  }, [estoque_id]);

  const fetchProducts = async () => {
    try {
      const response = await buscaProdutos();
      if (response?.data.data) {
        setProducts(response.data.data.data);
      }
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      setError("Erro ao buscar produtos");
    }
  };

  const fetchEstoque = async (id: number) => {
    try {
      const response = await buscaEstoque(id);
      if (response?.data.data && response.data.data.length > 0) {
        const estoque = response.data.data[0];
        setIdProduct(estoque.id_product);
        setQuantity(String(estoque.quantity));
        // Note: type and observation may not exist in current API
        // setType(estoque.type || 'in');
        // setObservation(estoque.observation || '');
      }
    } catch (err) {
      console.error('Erro ao buscar estoque:', err);
      setError('Erro ao buscar estoque');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!id_product) {
      setError("Selecione um produto");
      return;
    }

    const formData = new FormData();
    formData.append('id_product', String(id_product));
    formData.append('quantity', quantity);
    formData.append('type', type);
    if (observation) {
      formData.append('observation', observation);
    }

    try {
      const response = estoque_id
        ? await atualizaEstoque(estoque_id, formData)
        : await adicionaEstoque(id_product, Number(quantity));

      if (!response?.data.error) {
        setIdProduct(null);
        setQuantity('');
        setType('in');
        setObservation('');
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      setError("Erro ao salvar movimento de estoque");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="px-10 py-10 rounded-xl flex flex-col gap-6 items-center min-w-[400px] bg-gray-100"
    >
      <Typography variant="h5" className="text-blue-900 font-bold">
        {estoque_id ? 'Editar Movimento' : 'Adicionar Movimento de Estoque'}
      </Typography>

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      <FormControl className="w-full">
        <InputLabel id="select-product-label">Produto</InputLabel>
        <Select
          labelId="select-product-label"
          value={id_product ?? ''}
          onChange={(e) => setIdProduct(e.target.value ? Number(e.target.value) : null)}
          label="Produto"
          required
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className="w-full">
        <InputLabel id="type-label">Tipo de Movimento</InputLabel>
        <Select
          labelId="type-label"
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Tipo de Movimento"
          required
        >
          {movementTypes.map((t) => (
            <MenuItem key={t.value} value={t.value}>
              {t.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        className="w-full"
        label="Quantidade"
        variant="outlined"
        type="number"
        inputProps={{ step: "0.01", min: "0" }}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />

      <TextField
        className="w-full"
        label="Observação (opcional)"
        variant="outlined"
        multiline
        rows={2}
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
        helperText="Ex: Compra de fornecedor, Perda, etc."
      />

      <Button type="submit" variant="contained" color="primary" className="w-full">
        {estoque_id ? 'Atualizar' : 'Adicionar'}
      </Button>
    </Box>
  );
}
