"use client";
import React from "react";
import { SidebarMenu } from "../ui/sidebar";
import AppSidebarItem from "./app-sidebar-item";
import { useQuery } from "@tanstack/react-query";
import { getUserChats } from "@/lib/api";

function AppSidebarChats() {
  const { data: chats = [] } = useQuery({
    queryKey: ["chats"],
    queryFn: getUserChats,
  });

  return (
    <SidebarMenu className="py-4">
      {chats.length > 0 &&
        chats.map((chat) => <AppSidebarItem {...chat} key={chat.id} />)}
    </SidebarMenu>
  );
}

export default AppSidebarChats;
