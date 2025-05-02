"use client";

import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";

type Item = {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string | null;
};

function AppSidebarItem({ id, name, lastMessage, avatar }: Item) {
  const { chatId } = useParams();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className="h-24" isActive={chatId == id}>
        <Link href={`/chat/${id}`} className="gap-4">
          <Avatar>
            <AvatarImage src={avatar || undefined} />
            <AvatarFallback className="text-2xl select-none">
              {name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg">{name}</h1>
            <span>{lastMessage}</span>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default AppSidebarItem;
