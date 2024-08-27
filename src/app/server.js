"use server";


const wait = async (time = 500) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const testServer = async (data) => {
  await wait();
  
  return data
}

export const getListItems = async (data) => {
  let resp;

  try {
    const host = process?.env?.HOST? process.env.HOST : 'https://anotaai-eight.vercel.app'
    console.log(host)
    const response = await fetch(`${host}/api/items`);
    // Transforma a resposta em JSON
    resp = await response.json();

    return  resp
    
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    return []
  }
}