import { ChatGroq } from '@langchain/groq';
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  Annotation,
  // MemorySaver,
} from "@langchain/langgraph";
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { HumanMessage, RemoveMessage } from '@langchain/core/messages';

const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  summary: Annotation<string>({
    reducer: (_, action) => action,
    default: () => "",
  })
})

const conversationPrompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful AI assistant. If a summary of previous conversation exists, take it into account."],
  ["system", "{summary_prompt}"],
  ["placeholder", "{messages}"]
]);

const summaryPrompt = ChatPromptTemplate.fromMessages([
  ["system", "You are an expert at creating concise and comprehensive summaries of conversations."],
  ["system", "{summary_strategy}"],
  ["placeholder", "{messages}"],
]);


const model = new ChatGroq({
  model: "mixtral-8x7b-32768",
  temperature: 0
});


async function callModel(state: typeof GraphAnnotation.State): Promise<Partial<typeof GraphAnnotation.State>> {
  const { summary } = state;
  
  // Prepare summary prompt
  const summaryPromptStr = summary 
    ? `Previous conversation summary: ${summary}` 
    : "No previous summary exists.";

  // Prepare messages for the prompt
  const promptMessages = await conversationPrompt.formatMessages({
    summary_prompt: summaryPromptStr,
    messages: state.messages
  });

  const response = await model.invoke(promptMessages);
  return { messages: [response] };
}

async function summarizeConversation(state: typeof GraphAnnotation.State): Promise<Partial<typeof GraphAnnotation.State>> {
  const { summary, messages } = state;
  
  // Determine summary strategy
  const summaryStrategy = summary
    ? "Extend the existing summary by incorporating new conversation details." 
    : "Create a comprehensive summary capturing the key points of the conversation.";

  // Prepare messages for summary prompt
  const summaryMessages = await summaryPrompt.formatMessages({
    summary_strategy: summaryStrategy,
    messages: [...messages, new HumanMessage("Summarize the conversation.")]
  });

  const response = await model.invoke(summaryMessages);
  
  // Error handling for response
  if (typeof response.content !== "string") {
    throw new Error("Expected a string response from the model");
  }

  // Remove all but the last two messages
  const deleteMessages = messages.slice(0, -2).map((m) => new RemoveMessage({ id: m.id ?? '' }));
  
  return { 
    summary: response.content, 
    messages: deleteMessages 
  };
}

function shouldContinue(state: typeof GraphAnnotation.State): "summarize_conversation" | typeof END {
  const messages = state.messages;
  return messages.length > 6 ? "summarize_conversation" : END;
}

const workflow = new StateGraph(GraphAnnotation)
  // Define the node and edge
  .addNode("conversation", callModel)
  .addNode("summarize_conversation", summarizeConversation)
  .addEdge(START, "conversation")
  .addConditionalEdges("conversation", shouldContinue)
  .addEdge("summarize_conversation", END);

// Define the memory saver
if (!process.env.POSTGRES_CHECKPOINTER) {
  throw new Error("POSTGRES_CONN_STRING is not defined");
}
const checkpointer = PostgresSaver.fromConnString(process.env.POSTGRES_CHECKPOINTER);
await checkpointer.setup();

const app = workflow.compile({ checkpointer: checkpointer });

const config = { configurable: { thread_id: uuidv4() } };

export async function POST(req: NextRequest){
  const { message } = await req.json();
  const input = [
    {
      role: "user",
      content: message
    }
  ];

  const tuples = await checkpointer.list(config);

  console.log("Tuples", tuples);

  const output = await app.invoke({messages: input}, config);
  return NextResponse.json(output);
}



