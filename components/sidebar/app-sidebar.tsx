import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AppSidebarItem from "./app-sidebar-item";

async function AppSidebar() {
  const items = [
    {
      id: "1",
      name: "Chat 1",
      lastMessage: "hello",
      avatar: null,
    },
    {
      id: "2",
      name: "Chat 2",
      lastMessage: "welcome",
      avatar: null,
    },
    {
      id: "3",
      name: "Chat 3",
      lastMessage: "bye",
      avatar: null,
    },
  ];
  const session = await getServerSession(authOptions);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton className="h-24">
            <Avatar className="size-16">
              <AvatarImage src={session?.user.avatar || undefined} />
              <AvatarFallback className="text-2xl select-none">
                {session?.user.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <SidebarMenuItem>
              <span className="text-lg">{session?.user.name}</span>
            </SidebarMenuItem>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <AppSidebarItem {...item} key={item.id} />
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
