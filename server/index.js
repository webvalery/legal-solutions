import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Mail from './js/mail.js';

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>')
})

app.post('/mail', async (req, res) => {
  const formData = req.body;
  const name = req.body.name;
  const phone = req.body.phone;
  const time = req.body.time;
  return res.json({result: await Mail.send(name, phone, time)});
})

app.listen(PORT, () => {
  console.log('Server is running')
})