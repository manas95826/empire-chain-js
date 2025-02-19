declare abstract class LLM {
    protected model: string;
    protected customInstructions: string;
    constructor(model: string, customInstructions?: string);
    abstract generate(prompt: string): Promise<string>;
}
declare class OpenAILLM extends LLM {
    private client;
    constructor(model?: string, customInstructions?: string);
    generate(prompt: string): Promise<string>;
}
declare class AnthropicLLM extends LLM {
    private client;
    constructor(model?: string, customInstructions?: string);
    generate(prompt: string): Promise<string>;
}
declare class GroqLLM extends LLM {
    private client;
    constructor(model?: string, customInstructions?: string);
    generate(prompt: string): Promise<string>;
}
export { LLM, OpenAILLM, AnthropicLLM, GroqLLM };
