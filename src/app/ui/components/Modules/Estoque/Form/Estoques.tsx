'use client';

import { useEffect, useState } from "react";
import { Typography, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { adicionaEstoque } from "@/app/data/service/EstoqueService";
import { buscaProdutos, Produto } from "@/app/data/service/ProdutoService";

// Interface para representar um produto
interface Product {
  id: number;
  name: string;
}

interface FormEstoquesProps {
  onSuccess: () => void;
}

export default function FormEstoques({ onSuccess }: FormEstoquesProps) {
  const [id_product, setIdProduct] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [products, setProducts] = useState<Produto[]>([]);
  const [error, setError] = useState("");

  // Carregar produtos ao montar o componente
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await buscaProdutos();
        if (response && response?.data.data) {
          setProducts(response.data.data.data);
        }
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError("Erro");
      }
    }

    fetchProducts();
  }, []);

  const handleEstoque = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpa mensagens de erro anteriores

    try {
      const response = await adicionaEstoque(id_product, quantity);
      if (!response?.data.error) {
        setIdProduct(null);
        setQuantity(null);
        onSuccess();
      }
    } catch (error) {
      setError("Erro ao adicionar Estoque "+error);
    }
  };

  return (
    <Box
      className="p-8 bg-white rounded-lg shadow-md w-full max-w-md"
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      onSubmit={handleEstoque}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" className="text-gray-800 font-bold text-center mb-4">
        Adicionar Estoque
      </Typography>

      {error && (
        <Typography variant="body2" color="error" className="text-center">
          {error}
        </Typography>
      )}

      <FormControl fullWidth>
        <InputLabel id="select-product-label">Produto</InputLabel>
        <Select
          labelId="select-product-label"
          id="select-product"
          value={id_product}
          onChange={(e) => setIdProduct(e.target.value ? Number(e.target.value) : null)}
          label="Produto"
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        id="quantity"
        label="Quantidade"
        variant="outlined"
        fullWidth
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />

      <Button type="submit" variant="contained" color="primary" className="mt-4">
        Adicionar
      </Button>
    </Box>
  );
}
