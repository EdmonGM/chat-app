"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getAllFriends } from "@/lib/api";
import { useSession } from "next-auth/react";
import LoadingLogo from "@/components/ui/logo";

function FriendsList() {
  const { data: session } = useSession();
  const { data: friends = [], isFetching } = useQuery({
    queryKey: ["users", "requests"],
    queryFn: () => getAllFriends(session?.user.id!),
  });
  console.log(friends);

  if (isFetching) return <LoadingLogo />;

  if (friends?.length < 1) return <></>;

  return (
    <div>
      {friends.map((friend) => {
        return (
          <Card className="cursor-pointer" key={friend.id}>
            <CardContent className="flex items-center gap-8">
              <Avatar>
                <AvatarImage src={friend.avatar!} />
                <AvatarFallback className="text-xl select-none">
                  {friend.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1>{friend.name}</h1>
                <p>last message</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default FriendsList;
