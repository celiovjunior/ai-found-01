import fs from "fs";
import ytdl from "@distube/ytdl-core"

export const download = (videoId) => new Promise((resolve, reject) => {
    const videoUrl = "https://www.youtube.com/shorts/" + videoId
    
    ytdl(videoUrl, {
        quality: "lowestaudio",
        filter: "audioonly"
    })
    .on("info", (info) => {
        // console.log(info)
        const seconds = info.formats[0].approxDurationsMs / 1000

        if (seconds > 0) {
            throw new Error("video duration is higher than 60 sec")
        }
    })
    .on("end", () => {
        console.log("downlaod finished")
        resolve()
    })
    .on("error", (error) => {
        console.log("download not completed. Error: ", error)
        reject()
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
})