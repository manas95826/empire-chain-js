# Empire Chain JS

A powerful JavaScript/TypeScript library for working with multiple LLM providers including OpenAI, Anthropic, and Groq.

## Installation

```bash
npm install empire-chain-js
```

## Features

- Unified interface for multiple LLM providers
- Support for OpenAI, Anthropic, and Groq
- TypeScript support
- Easy to use API
- Environment variables configuration

## Usage

First, set up your environment variables:

```env
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GROQ_API_KEY=your_groq_key
```

Then use the library:

```typescript
import { OpenAILLM, AnthropicLLM, GroqLLM } from 'empire-chain-js';

// Initialize LLM instances
const openai = new OpenAILLM();
const anthropic = new AnthropicLLM();
const groq = new GroqLLM();

// Generate text
const response = await openai.generate("What is the capital of France?");
console.log(response);
```

## API Reference

### OpenAILLM

```typescript
const llm = new OpenAILLM();
const response = await llm.generate(prompt: string);
```

### AnthropicLLM

```typescript
const llm = new AnthropicLLM();
const response = await llm.generate(prompt: string);
```

### GroqLLM

```typescript
const llm = new GroqLLM();
const response = await llm.generate(prompt: string);
```

## License

MIT

## Author

Manas Chopra 