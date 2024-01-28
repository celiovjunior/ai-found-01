import fs from "node:fs";
import ytdl from "ytdl-core";

export const download = (videoId) => {
  const videUrl = `https://www.youtube.com/shorts/${videoId}`;
  ytdl(videUrl, { 
    quality: "lowestaudio",
    filter: "audioonly" 
  })
  .on("info", (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000;
    if (seconds > 60) {
      throw new Error("invalid video format")
    }
    console.log(seconds);
  })
  .on("end", () => {
    console.log("download finished")
  })
  .on("error", (error) => {
    console.log("Not possible to download the video. Error details: ",  error)
  })
  .pipe(fs.createWriteStream("./server/tmp/audio.mp4"))
}