"use server";

const host = process?.env?.HOST? process.env.HOST : 'https://anotaai-eight.vercel.app'

const wait = async (time = 500) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const testServer = async (data) => {
  await wait(200);
  
  return data
}

export const getListItems = async (data) => {
  try {
    const response = await fetch(`${host}/api/items`);

    const resp = await response.json();

    return  resp
    
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    return []
  }
}

export const getComanda = async (params) => {
  try {
    const response = await fetch(`${host}/api/comanda/${params}`);

    const resp = await response.json();

    return  resp
    
  } catch (error) {
    console.error('Erro ao buscar Comanda:', error);
    return []
  }
}

export const postComanda = async (params) => {
  try {
    const response = await fetch(`${host}/api/comanda/create`, {
      method: "POST", // Define o método como POST
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify({id: params}), // Envia os parâmetros como JSON
    });
    const resp = await response.json();

    return resp
    
  } catch (error) {
    console.error('Erro ao buscar Comanda:', error);
    return []
  }
}

export const getAllComandas = async (params) => {
  try {
    const response = await fetch(`${host}/api/comanda/all`);

    const resp = await response.json();

    return  resp
    
  } catch (error) {
    console.error('Erro ao buscar todas as Comandas:', error);
    return []
  }
}