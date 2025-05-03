"use client";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { IChatRoom } from "@/types/types";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";

function AppSidebarItem({ id, name, members, updatedAt, messages }: IChatRoom) {
  const { chatId } = useParams();
  const { data: session } = useSession();

  const secondUser = members.filter(
    (member) => member.userId !== session?.user.id
  );

  const lastActivity = formatDistanceToNow(updatedAt);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className="h-24 px-4" isActive={chatId == id}>
        <Link href={`/chat/${id}`} className="flex-col items-start">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={secondUser[0].user.avatar || undefined} />
              <AvatarFallback className="text-2xl select-none">
                {secondUser[0].user.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl">{name || secondUser[0].user.name}:</h1>
              <p>{messages[0]?.content || "TEST MESSAGE"}</p>
            </div>
          </div>
          <span className="text-gray-400 self-end">{lastActivity} ago</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default AppSidebarItem;
