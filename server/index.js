import axios from 'axios';
import cors from 'cors'
import express from 'express';
import { crypto_data } from './mock.js';
const app = express();
const port = process.env.PORT || 3001;


app.use(cors());
app.use(express.json())
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/crypto_data', (req, res) => {
  setTimeout(() => {
  const date = new Date();
  const [hours, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ].map(time => time.toString().padStart(2, 0))
  res.send(crypto_data.map(coin => ({
    name: coin.name,
    cmc_rank: coin.cmc_rank,
    price: parseFloat(coin.quote.USD.price * Math.random()).toFixed(2),
    symbol: coin.symbol,
    last_updated: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}, ${hours}:${minutes}:${seconds}`
  })));
  }, 3000)
}); 

const portfolio = [];

app.get('/portfolio', (req, res) => {
  setTimeout(() => {
    res.send(portfolio)
    // res.status(404)
    // res.json({ message: 'Could not add item!' })
  }, 3000)
})

app.post('/portfolio', (req, res) => {
  const found = portfolio.findIndex(coin => coin.name === req.body?.coin?.name)
  if (found !== -1) {
    portfolio[found] = req.body.coin;
  } else {
    portfolio.push(req.body.coin);
  }
  res.send('Coin Added Successfully')
})