"use client";
import { Card, CardContent } from "@/components/ui/card";
import { getFriendRequests, respondToFriendRequest } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Ban, Check } from "lucide-react";

function FriendRequests() {
  const { data: requests = [] } = useQuery({
    queryKey: ["requests"],
    queryFn: () => getFriendRequests(),
  });
  const { mutateAsync } = useMutation({
    mutationKey: ["requests"],
    mutationFn: (variables: {
      action: "accept" | "reject";
      senderId: string;
    }) => respondToFriendRequest(variables.action, variables.senderId),
  });

  if (requests.length < 1) return;

  return (
    <section className="my-4">
      <h1 className="text-xl mb-4">Friends Requests</h1>
      {requests.map((request) => {
        return (
          <Card className="py-2">
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Avatar>
                  <AvatarImage src={undefined} />
                  <AvatarFallback className="text-xl select-none">
                    {request.sender.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <p>
                  Username:
                  <span className="text-gray-300">
                    {" " + request.sender.username}
                  </span>
                </p>
                <p>
                  Since:
                  <span className="text-gray-300">
                    {" " + formatDistanceToNow(request.sentAt)}
                  </span>
                </p>
              </div>
              <div className="flex gap-4">
                <Check
                  color="var(--primary)"
                  className="cursor-pointer"
                  onClick={() =>
                    mutateAsync({
                      action: "accept",
                      senderId: request.senderId,
                    })
                  }
                />
                <Ban color="var(--destructive)" className="cursor-pointer" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}

export default FriendRequests;
