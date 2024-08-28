"use server";

const wait = async (time = 500) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const testServer = async (data) => {
  await wait(200);
  
  return data
}

export const getListItems = async (data) => {
  let resp;

  try {
    const host = process?.env?.HOST? process.env.HOST : 'https://anotaai-eight.vercel.app'

    const response = await fetch(`${host}/api/items`);

    resp = await response.json();

    return  resp
    
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    return []
  }
}

export const getComanda = async (params) => {
  let resp;

  try {
    const host = process?.env?.HOST? process.env.HOST : 'https://anotaai-eight.vercel.app'

    const response = await fetch(`${host}/api/comanda/${params}`);

    resp = await response.json();

    return  resp
    
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    return []
  }
}