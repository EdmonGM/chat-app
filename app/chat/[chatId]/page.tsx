"use client";
import { useParams } from "next/navigation";
import React from "react";
import MessageForm from "../components/message-form";
import { Separator } from "@/components/ui/separator";

function ChatPage({ params }: { params: { chatId: string } }) {
  const { chatId } = useParams();

  return (
    <section className="flex flex-col justify-between h-full w-full">
      <div className="grow">
        <div>CHAT!</div>
      </div>
      <Separator />
      <div>
        <MessageForm />
      </div>
    </section>
  );
}

export default ChatPage;
