import { pipeline } from "@xenova/transformers";
import { summaryExample } from "./utils/summary.js";

export async function summarize(text) {
  try {
    console.log('generating summary...')
    const generator = await pipeline("summarization", "Xenova/distilbart-cnn-12-6")
    const output = await generator(text)
    console.log('summary generated successfully')
    return output[0].summary_text;
  } catch (error) {
    console.log('summary generation error: ' + error)
    throw new Error(error)
  }
}