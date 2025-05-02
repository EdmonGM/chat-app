import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AppSidebarItem from "./app-sidebar-item";
import Image from "next/image";
import Link from "next/link";

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
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <AppSidebarItem {...item} key={item.id} />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="flex-row h-14 items-center border-red-500 border-2">
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/profile">
                <Avatar>
                  <AvatarImage src={session?.user.avatar || undefined} />
                  <AvatarFallback className="text-xl select-none">
                    {session?.user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/friends">
                <Image
                  src="/contact.svg"
                  alt="F"
                  title="Friends"
                  width={28}
                  height={28}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/users">
                <Image
                  src="/user-search.svg"
                  alt="S"
                  title="Search Users"
                  width={28}
                  height={28}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
