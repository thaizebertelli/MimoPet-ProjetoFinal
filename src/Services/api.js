const API_URL = 'http://localhost:3001';

/**
 * Busca todos os produtos da API
 */
export const buscarProdutos = async () => {
  try {
    const response = await fetch(`${API_URL}/produtos`);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

/**
 * Busca um produto específico pelo ID
 */
export const buscarProdutoPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/produtos/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Erro ao buscar o produto ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}:`, error);
    throw error;
  }
};