import fs from "node:fs";
import wav from "node-wav";
import ffmpeg from "fluent-ffmpeg";
import ffmpegstatic from "ffmpeg-static";

const filePath = "./server/tmp/audio.mp4"
const outputPath = filePath.replace(".mp4", ".wav")

export const convert = () => new Promise((resolve, reject) => {
  console.log("converting video...")

  ffmpeg.setFfmpegPath(ffmpegstatic)

  ffmpeg()
    .input(filePath)
    .audioFrequency(16000)
    .audioChannels(1)
    .format("wav")
    .on("end", () => {
      const file = fs.readFileSync(outputPath)
      const fileDecoded = wav.decode(file)

      const audioData = fileDecoded.channelData[0]

      const floatArray = new Float32Array(audioData)

      resolve(floatArray)

      fs.unlinkSync(outputPath)
    })
    .on("error", (error) => {
      console.log("Convert video gonne wrong", error)
      reject(error)
    })
    .save(outputPath)
})