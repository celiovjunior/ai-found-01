import cors from 'cors';
import express from 'express';
import { download } from './download.js';

const app = express();
app.use(cors());

app.get('/api/summary/:id', (req, res) => {
  download(req.params.id)
  res.json({ result: "download finished successfully" })
})

app.listen(3333, () => {
  console.log('server is running locally at http://localhost:3333/')
});