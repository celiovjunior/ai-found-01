import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  content.classList.add("placeholder")

  const videoUrl = input.value

  if(!videoUrl.includes("shorts")) {
    return content.textContent = "This link does not appear to be a shorts"
  }

  const [_, params] = videoUrl.split("/shorts/")
  const [videoId] = params.split("?si")
  
  content.textContent = "Transcripting the video..."
  
  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Making summary..."

  // const summary = await server.post("/summary", {
  //   text: transcription.data.result,
  // })

  content.textContent = transcription.data.result

  content.classList.remove("placeholder")
})