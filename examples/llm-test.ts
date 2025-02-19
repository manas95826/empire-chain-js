import { OpenAILLM, AnthropicLLM, GroqLLM } from 'empire-chain-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testLLMs() {
    try {
        // Test prompt
        const prompt = "What is the capital of France?";

        // Initialize LLM instances
        const openai = new OpenAILLM();
        const anthropic = new AnthropicLLM();
        const groq = new GroqLLM();

        console.log("Testing different LLM providers...\n");

        // Test OpenAI
        console.log("OpenAI Response:");
        try {
            const openaiResponse = await openai.generate(prompt);
            console.log(openaiResponse);
        } catch (error: any) {
            console.error("OpenAI Error:", error?.message || error);
        }
        console.log("\n-------------------\n");

        // Test Anthropic
        console.log("Anthropic Response:");
        try {
            const anthropicResponse = await anthropic.generate(prompt);
            console.log(anthropicResponse);
        } catch (error: any) {
            console.error("Anthropic Error:", error?.message || error);
        }
        console.log("\n-------------------\n");

        // Test Groq
        console.log("Groq Response:");
        try {
            const groqResponse = await groq.generate(prompt);
            console.log(groqResponse);
        } catch (error: any) {
            console.error("Groq Error:", error?.message || error);
        }
        console.log("\n-------------------\n");

    } catch (error: any) {
        console.error("General error:", error?.message || error);
    }
}

// Run the test
testLLMs().catch(console.error); 