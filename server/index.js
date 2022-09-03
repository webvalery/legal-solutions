import express from 'express';
import bodyParser from 'body-parser';

import Mail from './js/mail.js';
const app = express();

app.use(bodyParser.json({ type: 'application/json'}));

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>')
})

app.post('/mail', async (req, res) => {
  const {email, message} = req.body;
  return res.json({result: await Mail.send(email, message)});
})

app.listen(7777, () => {
  console.log('Server is running')
})