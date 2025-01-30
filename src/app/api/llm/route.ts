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

const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  summary: Annotation<string>({
    reducer: (_, action) => action,
    default: () => "",
  })
})

const llm = new ChatGroq({
  model: "mixtral-8x7b-32768",
  temperature: 0
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a Samurai, you speak respectfully with honour and dignity. Answer all the questions with best of your ability."
  ],
  [ "placeholder", "{messages}"],
]);

const callModel = async (state: typeof MessagesAnnotation.State) => {
  const prompt = await promptTemplate.invoke(state);
  const response = await llm.invoke(prompt);
  return { messages: response };
};

const workflow = new StateGraph(MessagesAnnotation)
  // Define the node and edge
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

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



