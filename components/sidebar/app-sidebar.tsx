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
import Image from "next/image";
import Link from "next/link";
import AppSidebarChats from "./app-sidebar-chats";
import { Separator } from "../ui/separator";

async function AppSidebar() {
  const session = await getServerSession(authOptions);

  return (
    <Sidebar>
      <SidebarContent>
        <AppSidebarChats />
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <SidebarMenu className="flex-row h-14 items-center">
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
