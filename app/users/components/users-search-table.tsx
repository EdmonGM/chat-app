"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sendFriendRequest } from "@/lib/api";
import { IUser } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

function UsersSearchTable({ users }: { users: IUser[] }) {
  const { mutateAsync } = useMutation({
    mutationKey: ["requests"],
    mutationFn: (id: string) => sendFriendRequest(id),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          return (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Image
                  src="/user-plus.svg"
                  alt="Add"
                  width={25}
                  height={25}
                  title="Add Friend"
                  className="cursor-pointer"
                  onClick={() => mutateAsync(user.id)}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default UsersSearchTable;
