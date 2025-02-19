"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroqLLM = exports.AnthropicLLM = exports.OpenAILLM = exports.LLM = void 0;
const openai_1 = __importDefault(require("openai"));
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class LLM {
    constructor(model, customInstructions = "") {
        this.model = model;
        this.customInstructions = customInstructions;
    }
}
exports.LLM = LLM;
class OpenAILLM extends LLM {
    constructor(model = "gpt-4o-mini", customInstructions = "") {
        super(model, customInstructions);
        this.client = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async generate(prompt) {
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
exports.OpenAILLM = OpenAILLM;
class AnthropicLLM extends LLM {
    constructor(model = "claude-3-sonnet-20240229", customInstructions = "") {
        super(model, customInstructions);
        this.client = new sdk_1.default({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });
    }
    async generate(prompt) {
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
exports.AnthropicLLM = AnthropicLLM;
class GroqLLM extends LLM {
    constructor(model = "llama3-8b-8192", customInstructions = "") {
        super(model, customInstructions);
        this.client = new groq_sdk_1.default({
            apiKey: process.env.GROQ_API_KEY,
        });
    }
    async generate(prompt) {
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
exports.GroqLLM = GroqLLM;
