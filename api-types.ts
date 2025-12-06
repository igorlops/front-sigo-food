/**
 * ============================================================================
 * API SIGOFOOD - TYPESCRIPT INTERFACES
 * ============================================================================
 * Mapeamento completo de todos os Models e suas estruturas de retorno
 * Gerado automaticamente baseado nos Models Laravel
 * ============================================================================
 */

// ============================================================================
// ESTRUTURAS DE RESPOSTA PADRÃO
// ============================================================================

/**
 * Estrutura padrão de resposta da API (sem paginação)
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
  error: boolean;
}

/**
 * Estrutura de resposta para operações de DELETE
 */
export interface ApiDeleteResponse {
  data: null;
  message: string;
  error: boolean;
}

/**
 * Estrutura de paginação do Laravel
 */
export interface PaginationMeta {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

/**
 * Estrutura de resposta paginada
 */
export interface PaginatedData<T> extends PaginationMeta {
  data: Array<T>;
}

/**
 * Estrutura de resposta da API com paginação
 */
export interface ApiPaginatedResponse<T> {
  data: PaginatedData<T>;
  message: string;
  error: boolean;
}

// ============================================================================
// MODELS - ENTIDADES DO SISTEMA
// ============================================================================

/**
 * Model: User
 * Tabela: users
 * Campos: id, name, email, restaurant_id, password, created_at, updated_at
 */
export interface User {
  id: number;
  name: string;
  email: string;
  restaurant_id: number;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  // Relacionamentos
  restaurant?: Restaurant;
}

/**
 * Model: Restaurant
 * Tabela: restaurants
 * Campos: id, name, contact_email, phone, kitchen_type, slug, logo_path, primary_color, secondary_color
 */
export interface Restaurant {
  id: number;
  name: string;
  contact_email: string;
  phone: string;
  kitchen_type: string;
  slug: string;
  logo_path: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Model: Category
 * Tabela: categories
 * Campos: id, restaurant_id, name, created_at, updated_at
 */
export interface Category {
  id: number;
  restaurant_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  // Relacionamentos
  restaurant?: Restaurant;
  products?: Array<Product>;
}

/**
 * Model: Status
 * Tabela: status
 * Campos: id, description, created_at, updated_at
 */
export interface Status {
  id: number;
  description: string;
  created_at: string;
  updated_at: string;
}

/**
 * Model: Product
 * Tabela: products
 * Campos: id, restaurant_id, category_id, status_id, name, description, price, image_path
 */
export interface Product {
  id: number;
  restaurant_id: number;
  category_id: number;
  status_id: number;
  name: string;
  description: string;
  price: string; // Decimal como string
  image_path: string | null;
  created_at: string;
  updated_at: string;
  // Relacionamentos
  category?: Category;
  status?: Status;
  restaurant?: Restaurant;
  imageProduct?: Array<ImageProduct>;
  ingredients?: Array<IngredientProduct>; // Pivot com ingredientes
}

/**
 * Model: ImageProduct
 * Tabela: image_product
 * Campos: id, product_id, image_path, created_at, updated_at
 */
export interface ImageProduct {
  id: number;
  product_id: number;
  image_path: string;
  created_at: string;
  updated_at: string;
  // Relacionamentos
  product?: Product;
}

/**
 * Model: Client
 * Tabela: clients
 * Campos: id, restaurant_id, name, email, phone, created_at, updated_at
 */
export interface Client {
  id: number;
  restaurant_id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  // Relacionamentos
  restaurant?: Restaurant;
}

/**
 * Model: Stock
 * Tabela: stocks
 * Campos: id, product_id, quantity, observation, type (in/out), created_at, updated_at
 */
export interface Stock {
  id: number;
  product_id: number;
  quantity: number;
  observation: string;
  type: 'in' | 'out';
  created_at: string;
  updated_at: string;
  // Relacionamentos
  product?: Product;
}

/**
 * Model: Ingredient
 * Tabela: ingredients
 * Campos: id, restaurant_id, name, quantity, unit, min_quantity, observation
 */
export interface Ingredient {
  id: number;
  restaurant_id: number;
  name: string;
  quantity: string; // Decimal como string
  unit: string; // kg, g, L, ml, etc
  min_quantity: string | null; // Decimal como string
  observation: string | null;
  created_at: string;
  updated_at: string;
  // Relacionamentos
  restaurant?: Restaurant;
  products?: Array<ProductIngredient>; // Pivot com produtos
}

/**
 * Tabela Pivot: ingredient_product
 * Relacionamento Many-to-Many entre Ingredient e Product
 */
export interface IngredientProduct {
  id: number;
  product_id: number;
  ingredient_id: number;
  quantity: string; // Decimal como string
  unit: string;
  created_at: string;
  updated_at: string;
  // Dados do ingrediente (quando carregado)
  ingredient?: Ingredient;
}

/**
 * Tabela Pivot: ingredient_product (visão do produto)
 * Relacionamento Many-to-Many entre Product e Ingredient
 */
export interface ProductIngredient {
  id: number;
  product_id: number;
  ingredient_id: number;
  quantity: string; // Decimal como string
  unit: string;
  created_at: string;
  updated_at: string;
  // Dados do produto (quando carregado)
  product?: Product;
}

/**
 * Model: PaymentMethod
 * Tabela: payment_methods
 * Campos: id, name, created_at, updated_at
 */
export interface PaymentMethod {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

/**
 * Model: OrderFee
 * Tabela: order_fee
 * Campos: id, restaurant_id, type, desc, unit_price, created_at, updated_at
 */
export interface OrderFee {
  id: number;
  restaurant_id: number;
  type: string; // delivery, service, etc
  desc: string;
  unit_price: string; // Decimal como string
  created_at: string;
  updated_at: string;
  // Relacionamentos
  restaurant?: Restaurant;
}

/**
 * Model: Order
 * Tabela: orders
 * Campos: id, restaurant_id, client_id, payment_method_id, status_id, order_type, total_value, delivery_address
 */
export interface Order {
  id: number;
  restaurant_id: number;
  client_id: number;
  payment_method_id: number;
  status_id: number;
  order_type: string;
  total_value: string; // Decimal como string
  delivery_address: string | null;
  created_at: string;
  updated_at: string;
  // Relacionamentos
  client?: Client;
  paymentMethod?: PaymentMethod;
  status?: Status;
  restaurant?: Restaurant;
  products?: Array<OrderProduct>; // Pivot com produtos
}

/**
 * Tabela Pivot: order_product
 * Relacionamento Many-to-Many entre Order e Product
 */
export interface OrderProduct {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: string; // Decimal como string
  created_at: string;
  updated_at: string;
  // Dados do produto (quando carregado)
  product?: Product;
}

// ============================================================================
// TIPOS DE RESPOSTA POR ENDPOINT
// ============================================================================

// ---------- USERS ----------
export type UsersListResponse = ApiResponse<Array<User>>;
export type UserShowResponse = ApiResponse<User>;
export type UserCreateResponse = ApiResponse<User>;
export type UserUpdateResponse = ApiResponse<User>;
export type UserDeleteResponse = ApiDeleteResponse;

// ---------- PRODUCTS ----------
export type ProductsListResponse = ApiResponse<Array<Product>>;
export type ProductsPaginatedResponse = ApiPaginatedResponse<Product>;
export type ProductShowResponse = ApiResponse<Product>;
export type ProductCreateResponse = ApiResponse<Product>;
export type ProductUpdateResponse = ApiResponse<Product>;
export type ProductDeleteResponse = ApiDeleteResponse;

// ---------- CLIENTS ----------
export type ClientsListResponse = ApiResponse<Array<Client>>;
export type ClientsPaginatedResponse = ApiPaginatedResponse<Client>;
export type ClientShowResponse = ApiResponse<Client>;
export type ClientCreateResponse = ApiResponse<Client>;
export type ClientUpdateResponse = ApiResponse<Client>;
export type ClientDeleteResponse = ApiDeleteResponse;

// ---------- CATEGORIES ----------
export type CategoriesListResponse = ApiResponse<Array<Category>>;
export type CategoriesPaginatedResponse = ApiPaginatedResponse<Category>;
export type CategoryShowResponse = ApiResponse<Category>;
export type CategoryCreateResponse = ApiResponse<Category>;
export type CategoryUpdateResponse = ApiResponse<Category>;
export type CategoryDeleteResponse = ApiDeleteResponse;

// ---------- STOCKS ----------
export type StocksListResponse = ApiResponse<Array<Stock>>;
export type StockShowResponse = ApiResponse<Stock>;
export type StockCreateResponse = ApiResponse<Stock>;
export type StockUpdateResponse = ApiResponse<Stock>;
export type StockDeleteResponse = ApiDeleteResponse;

// ---------- INGREDIENTS ----------
export type IngredientsListResponse = ApiResponse<Array<Ingredient>>;
export type IngredientsPaginatedResponse = ApiPaginatedResponse<Ingredient>;
export type IngredientShowResponse = ApiResponse<Ingredient>;
export type IngredientCreateResponse = ApiResponse<Ingredient>;
export type IngredientUpdateResponse = ApiResponse<Ingredient>;
export type IngredientDeleteResponse = ApiDeleteResponse;

// ---------- ORDERS ----------
export type OrdersListResponse = ApiResponse<Array<Order>>;
export type OrderShowResponse = ApiResponse<Order>;
export type OrderCreateResponse = ApiResponse<Order>;
export type OrderUpdateResponse = ApiResponse<Order>;
export type OrderDeleteResponse = ApiDeleteResponse;

// ---------- ORDER FEES ----------
export type OrderFeesListResponse = ApiResponse<Array<OrderFee>>;
export type OrderFeesPaginatedResponse = ApiPaginatedResponse<OrderFee>;
export type OrderFeeShowResponse = ApiResponse<OrderFee>;
export type OrderFeeCreateResponse = ApiResponse<OrderFee>;
export type OrderFeeUpdateResponse = ApiResponse<OrderFee>;
export type OrderFeeDeleteResponse = ApiDeleteResponse;

// ---------- PAYMENT METHODS ----------
export type PaymentMethodsListResponse = ApiResponse<Array<PaymentMethod>>;
export type PaymentMethodShowResponse = ApiResponse<PaymentMethod>;
export type PaymentMethodCreateResponse = ApiResponse<PaymentMethod>;
export type PaymentMethodUpdateResponse = ApiResponse<PaymentMethod>;
export type PaymentMethodDeleteResponse = ApiDeleteResponse;

// ---------- IMAGE PRODUCTS ----------
export type ImageProductsListResponse = ApiResponse<Array<ImageProduct>>;
export type ImageProductShowResponse = ApiResponse<ImageProduct>;
export type ImageProductCreateResponse = ApiResponse<ImageProduct>;
export type ImageProductDeleteResponse = ApiDeleteResponse;

// ============================================================================
// EXEMPLO DE USO
// ============================================================================

/**
 * Exemplo de como usar as interfaces:
 * 
 * // Listar produtos (sem paginação)
 * const response: ProductsListResponse = await api.get('/products');
 * const products: Array<Product> = response.data;
 * 
 * // Listar produtos (com paginação)
 * const response: ProductsPaginatedResponse = await api.get('/products?page=1');
 * const products: Array<Product> = response.data.data;
 * const totalPages: number = response.data.last_page;
 * 
 * // Buscar um produto específico
 * const response: ProductShowResponse = await api.get('/products/1');
 * const product: Product = response.data;
 * 
 * // Criar produto
 * const response: ProductCreateResponse = await api.post('/products', formData);
 * const newProduct: Product = response.data;
 * 
 * // Atualizar produto
 * const response: ProductUpdateResponse = await api.put('/products/1', formData);
 * const updatedProduct: Product = response.data;
 * 
 * // Deletar produto
 * const response: ProductDeleteResponse = await api.delete('/products/1');
 * console.log(response.message); // "Produto deletado com sucesso"
 */
