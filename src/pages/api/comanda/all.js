import Comanda from "../bussines/comanda"

const wait = (time = 200) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export default async function handler(req, res) {
  const comanda = new Comanda();
  if (req.method === 'GET') {
    
    try {
      const response = await comanda.getAllComandas(req.query.comanda);
      await wait(1000)
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: 'failed to load Comanda data' });
    }
  } else {
    // Lida com outros métodos HTTP
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}