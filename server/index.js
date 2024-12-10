import cors from "cors";
import express from "express"

const app = express()
const port = 3333

app.use(cors())

app.get("/summary", (request, response) => {
    response.send("hello world")
})

app.listen(port, () => {
    console.log("server is running on http://localhost:" + port)
})
