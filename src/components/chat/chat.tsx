"use client";

import { toast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { PreviewMessage, ThinkingMessage } from "./message";
import { MultimodalInput } from "./multimodal-input";
import { Overview } from "./overview";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { useChat } from "ai/react";
import { useEffect } from "react";

type ChatParams = {
  llm: string;
  collection_name: string;
};

export function Chat({llm, collection_name}: ChatParams) {
  const chatId = "001";
  
  const chat_body: ChatParams = {
    llm: llm,
    collection_name: collection_name
  };

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    data
  } = useChat({
    api: "http://127.0.0.1:8086/api/llm/stream/chat",
    body: chat_body,
    streamProtocol: 'text',
    onResponse(response) {
      console.log("response: " + JSON.stringify(response));  
    },
    maxSteps: 4,
    onError: (error) => {
      if (error.message.includes("Too many requests")) {
        toast({
          variant: "destructive",
          title: "You are sending too many messages. Please try again later.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
  });

  useEffect(() => {
    console.log("data: " + data);
  }, [data]);

  // const {
  //   messages,
  //   setMessages,
  //   handleSubmit,
  //   input,
  //   setInput,
  //   append,
  //   isLoading,
  //   stop,
  // } = useChat({
  //   experimental_prepareRequestBody: ({ messages }) => {
  //     // e.g. only the text of the last message:
  //     return {
  //       user_query: messages[messages.length - 1].content,
  //       chat_history: []
  //     };
  //   },
  //   api: 'http://127.0.0.1:8086/api/llm/stream/chat',
  //   maxSteps: 4,
  //   onError: (error) => {
  //     if (error.message.includes("Too many requests")) {

  //       toast({
  //         variant: "destructive",
  //         title: "You are sending too many messages. Please try again later.",
  //         description: "There was a problem with your request.",
  //         action: <ToastAction altText="Try again">Try again</ToastAction>,
  //       })
  //     }
  //   },
  // });

  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  return (
    <div className="flex flex-col min-w-0 h-[calc(100dvh-52px)] bg-background">
      <div
        ref={messagesContainerRef}
        className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
      >
        {messages.length === 0 && <Overview />}

        {messages.map((message, index) => (
          <PreviewMessage
            key={message.id}
            chatId={chatId}
            message={message}
            isLoading={isLoading && messages.length - 1 === index}
          />
        ))}

        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && <ThinkingMessage />}

        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>

      <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <MultimodalInput
          chatId={chatId}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
          messages={messages}
          setMessages={setMessages}
          append={append}
        />
      </form>
    </div>
  );

  // return (
  //   <div className="flex flex-col min-w-0 h-[calc(100dvh-52px)] bg-background">
  //     <div
  //       ref={messagesContainerRef}
  //       className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
  //     >
  //       {messages.length === 0 && <Overview />}

  //       {messages.map((message, index) => (
  //         <PreviewMessage
  //           key={message.id}
  //           chatId={chatId}
  //           message={message}
  //           isLoading={isLoading && messages.length - 1 === index}
  //         />
  //       ))}

  //       {isLoading &&
  //         messages.length > 0 &&
  //         messages[messages.length - 1].role === "user" && <ThinkingMessage />}

  //       <div
  //         ref={messagesEndRef}
  //         className="shrink-0 min-w-[24px] min-h-[24px]"
  //       />
  //     </div>

  //     <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
  //       <MultimodalInput
  //         chatId={chatId}
  //         input={input}
  //         setInput={setInput}
  //         handleSubmit={handleSubmit}
  //         isLoading={isLoading}
  //         stop={stop}
  //         messages={messages}
  //         setMessages={setMessages}
  //         append={append}
  //       />
  //     </form>
  //   </div>
  // );
}
