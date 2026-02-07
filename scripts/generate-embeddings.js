import fs from 'fs';
import { pipeline } from '@xenova/transformers';

async function generateEmbeddings() {
    const data = JSON.parse(fs.readFileSync('./scripts/knowledge_base.json', 'utf8'));

    // Use a lightweight, high-performance embedding model
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    console.log('Generating embeddings...');

    const updatedData = await Promise.all(data.map(async (item) => {
        const output = await extractor(item.text, { pooling: 'mean', normalize: true });
        return {
            ...item,
            embedding: output.tolist()[0] // Convert tensor to simple array
        };
    }));

    fs.writeFileSync('./src/data/vector_store.json', JSON.stringify(updatedData, null, 2));
    console.log('Embeddings saved to src/data/vector_store.json');
}

generateEmbeddings();