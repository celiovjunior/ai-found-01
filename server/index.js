import express from 'express';
import cors from 'cors';
import { download } from './download.js';
import { transcribe } from './transcribe.js';
import { summarize } from './summarize.js'
import { convert } from './convert.js';

const app = express();
const corsOptions = {
  origin: ["https://ai-found-01.vercel.app/", "http://localhost:5173/"],
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));
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