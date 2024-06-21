import express from 'express';
import cors from 'cors';
import { download } from './download.js';
import { transcribe } from './transcribe.js';
import { summarize } from './summarize.js'
import { convert } from './convert.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/summary/:id', async (req, res) => {
  try {
    await download(req.params.id)

    const audioConverted = await convert()
    const result = await transcribe(audioConverted)

    return res.json({ result })
  } catch (error) {
    return res.json({ error })
  }
})
app.post('/summary', async (req, res) => {
  try {
    const result = await summarize(req.body.text)
    return res.json({ result });
  } catch (error) {
    return res.json({ error })
  }
})
app.listen(3333, () => {
  console.log('server is running locally at http://localhost:3333/')
});