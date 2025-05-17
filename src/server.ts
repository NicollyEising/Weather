import express, { Request, Response } from 'express';
import axios from 'axios';
import path from 'path';

const app = express();
const PORT = 3000;
const API_KEY = 'fa1b810b93d5467994f30008251705';

app.use(express.static(path.join(__dirname, '../public')));

app.get('/clima', async (req: Request, res: Response) => {
  const cidade = req.query.cidade as string;
  const dias = parseInt(req.query.dias as string) || 3;

  if (!cidade) {
    return res.status(400).json({ erro: 'Parâmetro "cidade" é obrigatório.' });
  }

  try {
    const resposta = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
      params: {
        key: API_KEY,
        q: cidade,
        days: dias,
        lang: 'pt',
      },
    });

    return res.json(resposta.data);
  } catch (erro: any) {
    console.error('Erro ao consultar a WeatherAPI:', erro.response?.data || erro.message);

    return res.status(500).json({
      erro: 'Erro ao buscar clima',
      detalhe: erro.response?.data?.error?.message || erro.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
