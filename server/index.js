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

app.post('/backcall', async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const time = req.body.time;
  const subject = 'ЗАЯВКА С ФОРМЫ ОБРАТНОГО ЗВОНКА'
  const messageHtml = `<b>Имя: ${name} <br>Номер телефона: ${phone}<br>Время: ${time}</br>`;
  return res.json({ result: await Mail.send(subject, messageHtml)});
})

app.post('/backconnection', async (req, res) => {
  const name = req.body.backmodalName;
  const email = req.body.backmodalEmail;
  const phone = req.body.backmodalPhone;
  const way = req.body.backmodalWay;
  const site = req.body.backmodalSite;
  const desc = req.body.backmodalDesc;

  const subject = 'ЗАЯВКА С ФОРМЫ ЗАПРОСА ОБРАТНОЙ СВЯЗИ';
  const messageHtml = `<b>
    Имя: ${name} <br>
    Email: ${email} <br>
    Телефон: ${phone} <br>
    Удобный способ связи: ${way} <br>
    Сайт застройщика: ${site} <br>
    Описание проблемы: <br> ${desc}
  </b>`;
  return res.json({ result: await Mail.send(subject, messageHtml) });
})

app.listen(PORT, () => {
  console.log('Server is running')
})