import { ChatGroq } from "@langchain/groq";
import { ConversationChain } from "langchain/chains";
import { RedisChatMessageHistory } from "@langchain/redis";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";

// Initialize Redis client (you'll need to install redis package)
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

class ChatManager {
  private sessions: Map<string, ConversationChain>;
  private memories: Map<string, BufferMemory>;
  
  constructor() {
    this.sessions = new Map();
    this.memories = new Map();
  }

  async createOrGetSession(sessionId: string, topic: string) {
    if (this.sessions.has(sessionId)) {
      return this.sessions.get(sessionId);
    }

    // Create message history store in Redis
    const history = new RedisChatMessageHistory({
      sessionId,
      client: redis,
      sessionTTL: 24 * 60 * 60, // 24 hours expiry
    });

    // Create memory with history
    const memory = new BufferMemory({
      chatHistory: history,
      returnMessages: true,
      memoryKey: "chat_history",
    });

    this.memories.set(sessionId, memory);

    // Initialize LLM
    const llm = new ChatGroq({
      model: "gemma2-9b-it",
      apiKey: process.env.GROQ_API_KEY,
      temperature: 0.6,
      streaming: true,
    });

    // Create the system prompt with chat history
    const systemPrompt = 
      `You are having a conversation about ${topic}. ` +
      "Use the following pieces of context and chat history to answer the question.\n\n" +
      "Context: {context}\n\n" +
      "Chat History: {chat_history}\n\n" +
      "Human: {input}\n" +
      "Assistant: ";

    const prompt = ChatPromptTemplate.fromTemplate(systemPrompt);

    // Create chains with memory
    const questionAnswerChain = new ConversationChain({
      llm,
      prompt,
      memory,
    });

    const ragChain = await createRetrievalChain({
      
    });

    this.sessions.set(sessionId, ragChain);
    return ragChain;
  }

  async clearSession(sessionId: string) {
    await this.memories.get(sessionId)?.clear();
    this.sessions.delete(sessionId);
    this.memories.delete(sessionId);
  }
}

// API Route implementation
export async function POST(req) {
  const { message, sessionId, topic } = await req.json();
  
  // Create or get existing chat session
  const chatManager = new ChatManager();
  const chain = await chatManager.createOrGetSession(sessionId, topic);

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  (async () => {
    try {
      const ragStream = await chain.stream({
        input: message,
      });

      for await (const chunk of ragStream) {
        if (chunk.answer) {
          await writer.write(encoder.encode(chunk.answer));
        }
      }
    } catch (error) {
      console.error('Error:', error);
      await writer.write(encoder.encode('Error processing your request.'));
    } finally {
      await writer.close();
    }
  })();

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}