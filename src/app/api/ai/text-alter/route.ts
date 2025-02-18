import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import { Annotation, MessagesAnnotation, StateGraph, START, END } from "@langchain/langgraph";
import { NextResponse } from "next/server";
// import { v4 as uuidv4} from "uuid";
import { NextRequest } from "next/server";

const GraphAnnotation = Annotation.Root({
    ...MessagesAnnotation.spec,
    prev_context: Annotation<string>({
        reducer: (_, action) => action,
        default: () => "",
    }),
    text: Annotation<string>({
        reducer: (_, action) => action,
        default: () => "",
    }),
});

const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are a creative writing expert specializing in prose expansion.
        
        CONTEXT: The text you'll receive includes two parts:
        1. Previous context - earlier parts of the scene
        2. Current text - the specific portion to expand

        TASK:
        - Analyze the writing style, tone, and tense from both parts
        - Get inputs from the human user if given or else use the default prompt
        - Expand ONLY the current text portion
        - Maintain consistent characterization and scene flow
        - Keep the same narrative voice and tense
        - Add sensory details, emotional depth, or descriptive elements
        - Ensure the expansion flows naturally with the previous context
        
        Return only the expanded version of the current text, without any explanations.`
    ],
    ["human", "Previous scene context:\n{prev_context}"],
    ["human", "Text to expand:\n{text}"],
]);

const model = new ChatGroq({
    model: "mixtral-8x7b-32768",
    temperature: 0,
});

async function callModel(state: typeof GraphAnnotation.State): Promise<typeof GraphAnnotation.State> {
    const { prev_context, text, messages } = state;

    const promptMessages = await prompt.formatMessages({
        prev_context,
        text,
        messages,
    });

    const response = await model.invoke(promptMessages);
    return {messages: [response], text: "", prev_context: ""};
}

const workflow = new StateGraph(GraphAnnotation)
    .addNode("alter", callModel)
    .addEdge(START, "alter")
    .addEdge("alter", END);

const app = workflow.compile();

const config = { configurable: {thread_id: "c6d892a5-8323-42bb-8152-e93ecf2fd39d"} };
// console.log(config.configurable.thread_id);

export async function POST(req: NextRequest) {

    const { prev_context, text, messages } = await req.json();
    const state = { prev_context, text, messages };

    const output = await app.invoke(state, config);
    return NextResponse.json(output);
}