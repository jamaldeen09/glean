import { OllamaEmbeddings } from "@langchain/ollama";

// TODO: Change embeddings model (don't know which yet but for now local ollama model works)
const embeddings = new OllamaEmbeddings({ model: "nomic-embed-text:latest" });

// TODO: Change vector size as well after changing the model (generated vector could be more than 768)
const VECTOR_SIZE = 768

export default async function embed (text: string) {
    try {
        const queryVector = await embeddings.embedQuery(text);
        const resized = queryVector.slice(0, VECTOR_SIZE);
        return { success: true, data: { vector: resized } }
    } catch (err) {
        console.error("Failed to generate embeddings: ", err);
        return { success: false, error: (err as any)?.message ?? err }
    }
}