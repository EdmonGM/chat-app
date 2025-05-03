"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createChatRoom, getAllFriends } from "@/lib/api";
import LoadingLogo from "@/components/ui/logo";
import { MessageSquareMore, UserMinus } from "lucide-react";
import { useRouter } from "next/navigation";

function FriendsList() {
  const { data: friends = [], isFetching } = useQuery({
    queryKey: ["users", "requests"],
    queryFn: () => getAllFriends(),
  });

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationKey: ["chats"],
    mutationFn: (secondUserId: string) => createChatRoom(secondUserId),
    onSuccess: (chat) => {
      router.push(`/chat/${chat.id}`);
    },
  });

  if (isFetching) return <LoadingLogo />;

  if (friends?.length < 1) return <></>;

  return (
    <section className="my-4">
      <h1 className="text-xl mb-4">Friends List</h1>
      {friends.map((friend) => {
        return (
          <Card key={friend.id}>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Avatar>
                  <AvatarImage src={friend.avatar!} />
                  <AvatarFallback className="text-xl select-none">
                    {friend.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <h1>{friend.name}</h1>
              </div>
              <div className="flex items-center gap-4">
                <MessageSquareMore
                  color="var(--primary)"
                  className="cursor-pointer"
                  onClick={async () => await mutateAsync(friend.id)}
                />
                <UserMinus
                  color="var(--destructive)"
                  className="cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}

export default FriendsList;
