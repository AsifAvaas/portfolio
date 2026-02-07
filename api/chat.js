// api/chat.js
import { HfInference } from '@huggingface/inference';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    // 1. Setup & Checks
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    if (!process.env.HF_TOKEN) {
        return res.status(500).json({ error: 'Missing HF_TOKEN' });
    }

    try {
        const { message } = req.body;
        const hf = new HfInference(process.env.HF_TOKEN);

        // 2. Load Knowledge Base
        const filePath = path.join(process.cwd(), 'src', 'data', 'vector_store.json');
        if (!fs.existsSync(filePath)) {
            return res.status(500).json({ error: 'Knowledge base not found' });
        }
        const vectorStore = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // 3. Create User Embedding
        const embeddingResponse = await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2',
            inputs: message,
        });

        const userEmbedding = Array.isArray(embeddingResponse) && Array.isArray(embeddingResponse[0])
            ? embeddingResponse[0]
            : embeddingResponse;

        // 4. Retrieve Context
        const scoredDocs = vectorStore.map(doc => {
            let dotProduct = 0;
            let magnitudeA = 0;
            let magnitudeB = 0;
            const vecA = userEmbedding;
            const vecB = doc.embedding;
            for (let i = 0; i < vecA.length; i++) {
                dotProduct += vecA[i] * vecB[i];
                magnitudeA += vecA[i] * vecA[i];
                magnitudeB += vecB[i] * vecB[i];
            }
            return { ...doc, score: dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB)) };
        });

        const topContext = scoredDocs
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(doc => doc.text)
            .join('\n\n');

        // 5. Generate Answer (Using Qwen 2.5 - Very Stable)
        console.log("Sending request to HF..."); // Debug log

        try {
            const response = await hf.chatCompletion({
                model: 'Qwen/Qwen2.5-7B-Instruct',
                messages: [
                    {
                        role: "system",
                        content: `You are Turing. You are Asif A Khuda's AI Portfolio Assistant. Your goal is to be helpful, professional, and concise.
          
          **Rules for answering:**
          1. **Be Concise:** Keep answers short (max 3-4 sentences) unless the user specifically asks for "details".
          2. **Use Formatting:** ALways use **bold text** for key terms and bullet points for lists. Never use large blocks of text.
          3. **Links:** If you mention a link (like GitHub or LinkedIn), format it as a clickable Markdown link, e.g., [LinkedIn](https://linkedin.com/...).
          4. **Tone:** Be conversational. For broad questions (like "Tell me about Asif"), give a high-level summary and ask if they want to know more about a specific topic (like "Projects" or "Thesis").
          5. **Grounding:** Only answer based on the Context below. If you don't know the answer, say "I don't have that information right now."
            Context:
            ${topContext}`
                    },
                    { role: "user", content: message }
                ],
                max_tokens: 500, // Increased slightly
                temperature: 0.5, // Lower temp = more focused, less errors
            });

            res.status(200).json({ reply: response.choices[0].message.content });

        } catch (apiError) {
            // This will print the EXACT reason from Hugging Face
            console.error("HF API Error Body:", JSON.stringify(apiError, null, 2));
            throw apiError; // Re-throw to be caught by the outer block
        }

    } catch (error) {
        console.error('Final Server Error:', error.message);
        res.status(500).json({
            error: 'Failed to process request',
            details: error.message
        });
    }
}