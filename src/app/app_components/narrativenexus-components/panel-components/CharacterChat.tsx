import React, { useState, useRef, useEffect } from "react";
// import Image from 'next/image';

type CharacterChatProps = {
  character: {
    name: string;
    image: string;
  };
};

type Message = {
  message: string;
  isUser: boolean;
};

function CharacterChat(props: CharacterChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = async (userMessage: string) =>
    await fetch("/api/ai/summary-chatbot", {
      method: "POST",
      body: JSON.stringify({ message: userMessage }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      message: input,
      isUser: true,
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate character response (in a real app, this would call an API)
    getAIResponse(input).then((response) => {

      const characterMessage: Message = {
        message: response.messages[response.messages.length - 1].kwargs.content,
        isUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, characterMessage]);
    });
  };

  return (
    <div className="flex flex-col h-[93%] w-full">
      {/* Character header bar */}
      <div className="flex items-center justify-center p-3 border-b-[1px] border-secondary">
        <div className="w-10 h-10 relative mr-3 bg-primary rounded-full">
          {/* <Image 
                        src={props.character.image} 
                        alt={props.character.name}
                        fill
                        className="rounded-full object-cover"
                    /> */}
        </div>
        <p className="font-semibold text-xl">{props.character.name}</p>
      </div>

      {/* Input area - at the top as requested */}
      <div className="p-3">
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 bg-background focus:outline-none text-secondary placeholder-secondary"
            placeholder={`Type here, to talk to your own written character ${props.character.name}!`}
          />
        </form>
      </div>

      {/* Chat history area - stylized like a notebook */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-2">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <p
              className={`font-medium ${
                message.isUser ? "text-blue-600" : "text-purple-600"
              }`}
            >
              {message.isUser ? "You" : props.character.name}:
            </p>
            <p className="ml-4">{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterChat;
