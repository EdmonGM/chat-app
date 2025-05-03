import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { secondUserId } = await req.json();
  if (!secondUserId) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    // Finds all Chat Rooms that has AT LEAST these 2 users
    const existingRooms = await prisma.chatRoom.findMany({
      where: {
        members: {
          every: {
            userId: {
              in: [session.user.id, secondUserId],
            },
          },
        },
      },
      include: {
        members: true,
      },
    });

    // Filter Chat Rooms that has ONLY these 2 users
    const exactMatchRoom = existingRooms.find(
      (room) =>
        room.members.length === 2 &&
        room.members.some((m) => m.userId === session.user.id) &&
        room.members.some((m) => m.userId === secondUserId)
    );
    if (exactMatchRoom) {
      return NextResponse.json({ id: exactMatchRoom.id }, { status: 200 });
    }
    const chatRoom = await prisma.chatRoom.create({
      data: {
        members: {
          create: [{ userId: session.user.id }, { userId: secondUserId }],
        },
      },
      include: {
        members: true,
      },
    });
    return NextResponse.json(chatRoom);
  } catch (error) {
    console.error("Error creating a chat", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const chats = await prisma.chatRoom.findMany({
      where: {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        members: {
          select: {
            userId: true,
            user: {
              select: {
                avatar: true,
                name: true,
                username: true,
              },
            },
          },
        },
        messages: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return NextResponse.json(chats);
  } catch (error) {
    console.error("Error getting chats", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
