import cors from 'cors';
import express from 'express';
import { download } from './download.js';
import { transcribe } from './transcribe.js';
import { summarize } from './summarize.js'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/summary/:id', async (req, res) => {
  await download(req.params.id)
  
  const result = await transcribe()

  return res.json({ result })
})
app.post('/summary', async (req, res) => {
  const result = await summarize(req.body.text)
  return res.json({ result });
})
app.listen(3333, () => {
  console.log('server is running locally at http://localhost:3333/')
});