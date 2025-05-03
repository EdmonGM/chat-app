import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const receiverId = searchParams.get("receiverId")?.trim();

  if (!receiverId) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }
  if (receiverId === session.user.id) {
    return NextResponse.json(
      { error: "You can't send a friend request to yourself" },
      { status: 404 }
    );
  }

  try {
    const exists = await prisma.friendRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId: session.user.id,
          receiverId: receiverId,
        },
      },
    });
    if (exists) {
      return NextResponse.json(
        { error: "Request already sent" },
        { status: 409 }
      );
    }

    await prisma.friendRequest.create({
      data: {
        senderId: session.user.id,
        receiverId: receiverId,
      },
    });
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.error("Send friend request error: ", error);
    return NextResponse.json(
      { error: "Failed to send friend request" },
      { status: 500 }
    );
  }
}
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const requests = await prisma.friendRequest.findMany({
    where: {
      receiverId: session.user.id,
    },
    include: {
      sender: {
        select: {
          username: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  return NextResponse.json(requests);
}
