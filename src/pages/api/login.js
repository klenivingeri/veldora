import Login from "./bussines/login"

const wait = (time = 200) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export default async function handler(req, res) {
  const login = new Login();
  
  if (req.method === 'POST') {
    const { token } = req.body
    console.log(token)
    try {
      const response = await login.getUser(token);
      console.log(response)


      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({
        error: true,
        message: 'failed to load login'
      });
    }
  } else {
    // Lida com outros métodos HTTP
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}