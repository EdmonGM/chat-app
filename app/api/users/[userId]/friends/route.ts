import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//TODO: Friends list endpoint
export async function GET(res: Response) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const friends = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      friends: {
        select: {
          id: true,
          username: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  return NextResponse.json(friends?.friends);
}
