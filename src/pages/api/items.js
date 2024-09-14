import Items from "./bussines/items"
const wait = (time = 200) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export default async function handler(req, res) {
  const items = new Items();
  if (req.method === 'GET') {
    try {
      const response = await items.getItems();
      console.log(response)
      //await wait()

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({
        error: true,
        message: 'failed to load items data'
      });
    }
  } else {
    // Lida com outros métodos HTTP
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}