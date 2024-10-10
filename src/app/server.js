"use server";
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'

const host = process?.env?.HOST? process.env.HOST : 'https://anotaai-eight.vercel.app'

const wait = async (time = 500) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
let count
export const testServer = async (data) => {
  await wait(200);
  
  return data
}

export const getListItems = async (data) => {
  try {
    const response = await fetch(`${host}/api/items`);
    console.log(response)
    const resp = await response.json();

    return  resp
    
  } catch (error) {
    console.error({
      error: true,
      message: 'Erro ao buscar itens',
      statusCode: error
    });
    return []
  }
}

export const getOrder = async (params = 0) => {
  try {
    const response = await fetch(`${host}/api/comanda/${params}`);

    const resp = await response.json();

    return  resp
    
  } catch (error) {
    console.error('Erro ao buscar Comanda:', error);
    return []
  }
}

export const getComanda = async (params = 0) => { //remover
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

export const login = async (params) => {
  try {
    
    var token = jwt.sign({
      user: params.user,
      pass: params.password
    }, process?.env?.JWT);

    const response = await fetch(`${host}/api/login`, {
      method: "POST", // Define o método como POST
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify({token}), // Envia os parâmetros como JSON
    });
    const resp = await response.json();

    return resp
    
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return []
  }
}


export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    console.log(decoded)


    const issuedAtDate = new Date(decoded.iat * 1000);
    const currentDate = new Date();

    const diffInMilliseconds = currentDate - issuedAtDate;

    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);


    if (diffInDays > 3) {
      console.log("Já se passaram mais de 3 dias desde que o token foi criado.");
    } else {
      console.log("Ainda não se passaram 3 dias desde que o token foi criado.");
    }
  } catch (error) {
    redirect('/')

  }
}