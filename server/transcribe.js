import { pipeline } from "@xenova/transformers"

export async function transcribe(audio) {
    try {
        console.log("doing transcription...")
        const transcribe = await pipeline(
            "automatic-speech-recognition",
            "Xenova/whisper-small"
        )

        const transcription = await transcribe(audio, {
            chunk_length_s: 30,
            stride_length_s: 5,
            language: "english",
            task: "transcribe",
        })

        console.log("transcription finished.");
        return transcription?.text.replace("[Music]", "")
    } catch (error) {
        throw new Error("error", error)
    }
}