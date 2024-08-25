"use server";
require('dotenv').config()

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
    const response = await fetch(`${process.env.HOST}/api/items`);
    // Transforma a resposta em JSON
    resp = await response.json();
    console.log(resp)
    return  resp
    
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    return []
  }
}