import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

abstract class LLM {
    protected model: string;
    protected customInstructions: string;

    constructor(model: string, customInstructions: string = "") {
        this.model = model;
        this.customInstructions = customInstructions;
    }

    abstract generate(prompt: string): Promise<string>;
}

class OpenAILLM extends LLM {
    private client: OpenAI;

    constructor(model: string = "gpt-4o-mini", customInstructions: string = "") {
        super(model, customInstructions);
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async generate(prompt: string): Promise<string> {
        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: [
                { role: "system", content: this.customInstructions },
                { role: "user", content: prompt }
            ]
        });
        return response.choices[0].message.content || "";
    }
}

class AnthropicLLM extends LLM {
    private client: Anthropic;

    constructor(model: string = "claude-3-sonnet-20240229", customInstructions: string = "") {
        super(model, customInstructions);
        this.client = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });
    }

    async generate(prompt: string): Promise<string> {
        const response = await this.client.messages.create({
            model: this.model,
            max_tokens: 1000,
            messages: [
                { 
                    role: "user", 
                    content: this.customInstructions ? 
                        `${this.customInstructions}\n\n${prompt}` : 
                        prompt 
                }
            ]
        });
        return response.content[0].text;
    }
}

class GroqLLM extends LLM {
    private client: Groq;

    constructor(model: string = "llama3-8b-8192", customInstructions: string = "") {
        super(model, customInstructions);
        this.client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async generate(prompt: string): Promise<string> {
        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: [
                { role: "system", content: this.customInstructions },
                { role: "user", content: prompt }
            ]
        });
        return response.choices[0].message.content || "";
    }
}

export { LLM, OpenAILLM, AnthropicLLM, GroqLLM }; 